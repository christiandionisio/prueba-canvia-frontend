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

  getFacturas() {
    return this.http.get(`${BASE_URL}/facturas`);
  }

  getFacturaConsolidadoPorId(id: number) {
    return this.http.get(`${BASE_URL}/facturas/${id}`);
  }

  registrarFacturaConsolidado(facturaConsolidado: FacturaConsolidado) {
    return this.http.post(`${BASE_URL}/facturas`, facturaConsolidado, {observe: "response"});
  }
}
