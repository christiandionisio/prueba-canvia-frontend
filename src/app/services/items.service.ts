import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Items } from '../interfaces/items.interface';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItemsPageable(page: number, size: number) {
    return this.http.get(`${BASE_URL}/items-detalles/pageable?page=${page}&size=${size}`);
  }

  getItems() {
    return this.http.get(`${BASE_URL}/items-detalles`);
  }

  registrarItem(item: Items) {
    return this.http.post(`${BASE_URL}/items-detalles`, item, {observe: "response"});
  }

  updateItem(item: Items) {
    return this.http.put(`${BASE_URL}/items-detalles`, item, {observe: "response"});
  }

  eliminarItem(idItem: number) {
    return this.http.delete(`${BASE_URL}/items-detalles/${idItem}`, {observe: "response"});
  }
}
