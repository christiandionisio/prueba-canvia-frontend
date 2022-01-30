import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClienteFactura, FacturaConsolidado, FacturaDetalle } from 'src/app/interfaces/factura-consolidado.interface';
import { Factura } from 'src/app/interfaces/factura.interface';
import { Items } from 'src/app/interfaces/items.interface';
import { ClientesService } from 'src/app/services/clientes.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-factura-dialig',
  templateUrl: './factura-dialig.component.html',
  styleUrls: ['./factura-dialig.component.css']
})
export class FacturaDialigComponent implements OnInit {

  public facturaClienteForm = this.fb.group({
    estado: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
  });

  controlCliente = new FormControl();
  clientesFiltrados: Cliente[] = [];
  filteredOptions!: Observable<Cliente[]>;

  controlItem = new FormControl();
  itemsFiltrados: Items[] = [];
  filteredOptionsItems!: Observable<Items[]>;

  facturaDetalle: FacturaDetalle[] = [];

  displayedColumns: string[] = [ 'nombre', 'cantidad', 'precio', 'operaciones'];
  dataSource = new MatTableDataSource<FacturaDetalle>(this.facturaDetalle);
  selection = new SelectionModel<FacturaDetalle>(true, []);

  precioTotal: number = 0;

  constructor(public dialogRef: MatDialogRef<FacturaDialigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private facturaService: FacturasService,
    private clienteService: ClientesService,
    private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.filteredOptions = this.controlCliente.valueChanges.pipe(
      startWith(''),
      map(value => this._filterClientes(value)),
    );

    this.filteredOptionsItems = this.controlItem.valueChanges.pipe(
      startWith(''),
      map(value => this._filterItems(value)),
    );
  }

  private _filterClientes(value: string): Cliente[] {
    const filterValue = value;

    if (value != '') {
      this.clienteService.getFiltroClientesPorDni(value).subscribe((response: any) => {
        this.clientesFiltrados = [];
        response.forEach((cliente: any) => {
          this.clientesFiltrados.push(cliente)
        });
      }); 
    }


    return this.clientesFiltrados.filter((cliente) => cliente.dni.toLowerCase().includes(filterValue));
  }

  private _filterItems(value: string): Items[] {
    const filterValue = value;

    if (value != '') {
      this.itemsService.getFiltroItemsPorNombre(value).subscribe((response: any) => {
        this.itemsFiltrados = [];
        response.forEach((item: any) => {
          this.itemsFiltrados.push(item)
        });
      }); 
    }


    return this.itemsFiltrados.filter((item) => item.nombre.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  agregarFacturaDetalle() {

    this.itemsService.getItemPorId(this.controlItem.value).subscribe((response: any) => {
      let item: Items = response;
      let facturaDetalle: FacturaDetalle = {itemDetalle: item, cantidad: this.facturaClienteForm.value.cantidad};
      this.facturaDetalle.push(facturaDetalle);
      this.dataSource = new MatTableDataSource<FacturaDetalle>(this.facturaDetalle);
      this.precioTotal += item.precio * this.facturaClienteForm.value.cantidad; 
    });
  }

  registrarFactura() {

    const fecha = new Date();
    const mes = ((fecha.getMonth() + 1) < 10) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1);

    const cliente: Cliente = {
      idCliente: this.controlCliente.value,
      nombres: '',
      apellidos: '',
      dni: '',
      correo: ''
    }

    const clienteFactura: ClienteFactura = {
      cliente
    }

    const facturaCabecera: Factura = {
      fechaEmision: fecha.getFullYear() + '-' + mes + '-' + fecha.getDate(),
      estado: this.facturaClienteForm.value.estado
    }

    const facturaConsolidado: FacturaConsolidado = {
      facturaCabecera,
      clienteFactura,
      facturaDetalleList: this.facturaDetalle
    }

    console.log(facturaConsolidado);

    this.facturaService.registrarFacturaConsolidado(facturaConsolidado).subscribe(resp => {
      this.onNoClick();
    });
    
  }

  eliminarDetalle(index: any) {
    
    this.precioTotal -= this.facturaDetalle[index].itemDetalle.precio * this.facturaDetalle[index].cantidad; 
    this.facturaDetalle.splice(index, 1); 
    this.dataSource = new MatTableDataSource<FacturaDetalle>(this.facturaDetalle);
  }

}
