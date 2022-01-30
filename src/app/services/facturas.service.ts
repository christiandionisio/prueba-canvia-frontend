import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FacturaConsolidado } from '../interfaces/factura-consolidado.interface';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient) { }

  getItemsPageable(page: number, size: number) {
    return this.http.get(`${BASE_URL}/facturas/pageable?page=${page}&size=${size}`);
  }

  getItems() {
    return this.http.get(`${BASE_URL}/facturas`);
  }

  registrarFacturaConsolidado(facturaConsolidado: FacturaConsolidado) {
    return this.http.post(`${BASE_URL}/facturas`, facturaConsolidado, {observe: "response"});
  }
}
