import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstalacionesServiceService {
  private url = 'http://localhost:3000/instalaciones';
  constructor() { }
}
