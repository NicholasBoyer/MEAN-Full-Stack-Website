import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient
  ) { }

  private apiBaseUrl = 'http://localhost:3000/api'; // Ensure this is the correct URL

  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public login(user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/login`;
    return lastValueFrom(this.http.post<AuthResponse>(url, user))
      .then(response => {
        this.saveToken(response.token);
        return response;
      });
  }

  public register(user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/register`;
    return lastValueFrom(this.http.post<AuthResponse>(url, user))
      .then(response => {
        this.saveToken(response.token);
        return response;
      });
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return {} as User;
  }
}
