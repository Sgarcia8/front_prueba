import { SharedService } from './../../services/shared-service.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { JwtService } from './../../services/jwt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {


  allUsers: User[] = []; // Lista de usuarios sin filtrar
  searchTerm: string = ''; // Término de búsqueda
  users: User[] = [];

  constructor(private service: JwtService, private router: Router, private sharedService: SharedService) { }


  deleteUser(email: string) {

    // Mostrar cuadro de confirmación
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar a este usuario?');
    if (confirmDelete) {
      this.service.deleteUser(email).subscribe({
        next: (data) => {
          this.allUsers = this.users.filter(user => user.email !== email); // Filtra y elimina el usuario de la lista
        },
        error: (err) => console.error('Error:', err)
      })
    }

  }
  editUser(user: any) {
    this.sharedService.setMode("edit");
    this.sharedService.setUser(user); // Almacena el usuario seleccionado
    this.router.navigate(['/dashboard/edit']); // Navega al componente de registro
  }
  viewUser(user: any) {
    this.sharedService.setMode("view");
    this.sharedService.setUser(user); // Almacena el usuario seleccionado
    this.router.navigate(['/dashboard/view']); // Navega al componente de registro
  }

  // Buscar cuando se presiona Enter
  onSearchEnter() {
    if (this.searchTerm.trim() === '') {
      this.users = this.allUsers; // Si el campo de búsqueda está vacío, mostrar todos los usuarios
    } else {
      this.filterUsers();
    }
  }

  // Filtrar usuarios por nombre
  filterUsers() {
    this.users = this.allUsers.filter(user =>
      user.name.includes(this.searchTerm)
    );
  }

  // Propiedad que devuelve los usuarios filtrados
  get filteredUsers() {
    return this.users;
  }




  userInfo: any;

  ngOnInit(): void {
    // Obtener la información del localStorage
    this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    this.service.loadUsers().subscribe({
      next: (data) => {
        this.allUsers = data;
      },
      error: (err) => console.error('Error:', err)
    })
  }

}
