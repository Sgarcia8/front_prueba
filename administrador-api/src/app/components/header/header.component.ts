import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  currentRoute: string = '';
  userInfo: any;

  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    // Inicializamos el valor de la ruta al momento de cargar el componente
    this.currentRoute = this.router.url;

    // Observamos los cambios de la ruta para actualizar la visibilidad en tiempo real
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      // Obtener la información del localStorage
      this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    });
  }

  isHomePage(): number {
    if (this.router.url === '/') {
      return 1;
    }
    else if (this.router.url === '/dashboard') {
      return 2;
    }
    return 3;
  }

  logout(): void {
    // Mostrar cuadro de confirmación
    const confirmDelete = window.confirm('¿Estás seguro de que quieres cerrar tu sesión?');
    if (confirmDelete) {
      localStorage.removeItem('jwt'); // Elimina el token JWT
      localStorage.removeItem('user'); // Elimina el usuario
      this.router.navigate(['']);
    }
  }

  isAdministrator(): boolean {
    //Si el usuario esta logueado lo que hace es restablecer la información para que la vista de registro se pueda reutilizar
    if (this.router.url === '/dashboard/register/admin' || this.router.url === '/dashboard/view' || this.router.url === '/dashboard/edit' || this.router.url === '/dashboard') {
      this.sharedService.clearUser();
      this.sharedService.setMode(""); 
      return true;
    }
    return false;
  }

}
