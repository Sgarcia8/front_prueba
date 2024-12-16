import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedUser: any = null;
  private mode: string = "";

  setUser(user: any): void {
    this.selectedUser = user;
  }

  getUser(): any {
    return this.selectedUser;
  }

  clearUser(): void {
    this.selectedUser = null;
  }

  setMode(mode: string): void {
    this.mode = mode;
  }

  getMode(): any {
    return this.mode;
  }

}
