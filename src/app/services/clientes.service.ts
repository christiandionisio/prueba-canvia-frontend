import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente.interface';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  getClientesPageable(page: number, size: number) {
    return this.http.get(`${BASE_URL}/clientes/pageable?page=${page}&size=${size}`);
  }

  getClientes() {
    return this.http.get(`${BASE_URL}/clientes`);
  }

  getFiltroClientesPorDni(dni: String) {
    return this.http.get(`${BASE_URL}/clientes/buscarPorDni/${dni}`);
  }

  registrarCliente(cliente: Cliente) {
    return this.http.post(`${BASE_URL}/clientes`, cliente, {observe: "response"});
  }

  updateCliente(cliente: Cliente) {
    return this.http.put(`${BASE_URL}/clientes`, cliente, {observe: "response"});
  }

  eliminarCliente(idCliente: number) {
    return this.http.delete(`${BASE_URL}/clientes/${idCliente}`, {observe: "response"});
  }
}
