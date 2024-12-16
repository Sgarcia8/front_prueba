import { Component, Input, OnInit } from '@angular/core';
import { JwtService } from '../../services/jwt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';

type Role = 'USER' | 'ADMIN';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  mode: string = "";
  registerForm!: FormGroup;
  isAdmin: boolean = false;  // Para saber si es admin
  userData: any; // Datos del usuario (si vienen de la navegación)

  // Opciones para el campo "role" y "status"
  roles = ['USER', 'ADMIN'];
  statuses = ['Active', 'Inactive'];

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.userData = this.sharedService.getUser(); // Recupera el usuario desde el servicio
    this.mode = this.sharedService.getMode();
    console.log(this.mode)


    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      address: ['', [Validators.required]],
      role: [null], // Campo role
      status: [null], // Campo status
      tokenRevoked: [null],
      createDate: [null]
    }, { validator: this.passwordMathValidator })
    // Comprobamos si la ruta contiene el parámetro 'admin'
    this.route.url.subscribe(url => {
      this.isAdmin = url.some(segment => segment.path === 'admin');  // Si la ruta es /register/admin, isAdmin será true
    });

    if (this.mode === "edit") {
      this.registerForm.enable();
      console.log(this.userData)
      this.registerForm.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        password: this.userData.password,
        confirmPassword: "",
        address: this.userData.address,
        role: this.userData.role.name, // Campo role
        status: this.userData.status, // Campo status
        tokenRevoked: this.userData.tokenRevoked,
        createDate: this.userData.createDate
      }); // Llena el formulario con los datos
    }

    else if (this.mode === "view") {
      this.registerForm.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        address: this.userData.address,
        role: this.userData.role.name, // Campo role
        status: this.userData.status, // Campo status
      }); // Llena el formulario con los datos
      this.registerForm.disable(); // Deshabilita los campos si es solo lectura
    }


    else if (this.isAdmin) {

      this.registerForm.enable();
      this.registerForm.addControl('role', this.fb.control('', Validators.required));
      this.registerForm.addControl('status', this.fb.control('', Validators.required));
      // Asignamos valores por defecto a campos no visibles
      this.registerForm.patchValue({
        tokenRevoked: false,
        createDate: new Date()
      });
    }

    else {
      // Asignamos valores por defecto a campos no visibles
      this.registerForm.patchValue({
        role: 'USER',
        status: 'Active',
        tokenRevoked: false,
        createDate: new Date()
      });
    }
  }


  passwordMathValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }


  submitForm() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Convertir el role a un objeto { id: 1 } o { id: 2 }
      // Aseguramos que formData.role tiene un tipo 'USER' o 'ADMIN'
      const rolesMap: { [key in Role]: number } = { 'USER': 2, 'ADMIN': 1 };

      const roleId = rolesMap[formData.role as Role];  // Usamos el tipo Role aquí

      // Aquí puedes enviar el formulario, con el role transformado a { id: 1 } o { id: 2 }
      const payload = {
        ...formData,
        role: { id: roleId },  // Asignar el role con el id
      };
      if(this.mode === ''){
        this.service.register(payload).subscribe(
          (response) => {
            alert("Usuario creado con exito")
            if (this.isAdmin) {
              this.router.navigate(["/dashboard"])
            }
            else {
              this.router.navigate([""])
            }
  
          },
          (error) => {
            alert("El usuario ya existe en la base de datos")
          }
        );
      }
      else{
        console.log(payload)
        this.service.editUser(this.userData.id,payload).subscribe(
          (response) => {
            alert("Usuario editado con exito")
            console.log(response)
            if (this.mode === 'edit') {
              this.router.navigate(["/dashboard"])
            }
            else {
              this.router.navigate([""])
            }
  
          },
          (error) => {
            alert("El usuario no se pudo editar")
          }
        );
      }
    }
  }


}
