import { Cliente } from "./cliente.interface";
import { Factura } from "./factura.interface";
import { Items } from "./items.interface";

export interface FacturaConsolidado {
    facturaCabecera: Factura;
    clienteFactura: ClienteFactura;
    facturaDetalleList: FacturaDetalle[];
}

export interface ClienteFactura {
    cliente: Cliente;
}

export interface FacturaDetalle {
    itemDetalle: Items;
    cantidad: number;
}