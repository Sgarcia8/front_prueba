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

  users: User[] = [];

  constructor(private service: JwtService,){}


  deleteUser(email: string) {

    // Mostrar cuadro de confirmación
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar a este usuario?');
    if(confirmDelete){
      this.service.deleteUser(email).subscribe({
        next: (data) => {
          console.log(data)
          this.users = this.users.filter(user => user.email !== email); // Filtra y elimina el usuario de la lista
        },
        error: (err) => console.error('Error:', err)
      })
    }
  
  }
  editUser(_t25: any) {
    throw new Error('Method not implemented.');
  }
  viewUser(_t25: any) {
    throw new Error('Method not implemented.');
  }

  userInfo: any;

  ngOnInit(): void {
    // Obtener la información del localStorage
    this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    this.service.loadUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users)
      },
      error: (err) => console.error('Error:', err)
    })
  }

}
