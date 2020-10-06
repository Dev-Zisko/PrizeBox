import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:8000/api/';
  API_STORAGE = 'http://localhost:8000/storage/';
  constructor() { }
}