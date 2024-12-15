import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  currentRoute: string = '';
  userInfo: any;

  constructor(private router: Router){}

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
    if(this.router.url === '/'){
      return 1;
    }
    else if(this.router.url === '/dashboard'){
      return 2;
    }
    return 3;
  }

  isAdministrator(): boolean{
    if(this.router.url === '/dashboard/register/admin'){
      return true;
    }
    return false;
  }

}
