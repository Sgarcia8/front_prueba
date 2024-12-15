import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../services/jwt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

type Role = 'USER' | 'ADMIN';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isAdmin: boolean = false;  // Para saber si es admin

  // Opciones para el campo "role" y "status"
  roles = ['USER', 'ADMIN'];
  statuses = ['Active', 'Inactive'];

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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

    if (this.isAdmin) {
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
  }


}
