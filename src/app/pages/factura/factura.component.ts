import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaDialigComponent } from 'src/app/components/factura-dialig/factura-dialig.component';
import { Factura } from 'src/app/interfaces/factura.interface';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  ELEMENT_DATA: Factura[] = [];

  displayedColumns: string[] = [ 'idFactura', 'fechaEmision', 'estado', 'operaciones'];
  dataSource = new MatTableDataSource<Factura>(this.ELEMENT_DATA);
  selection = new SelectionModel<Factura>(true, []);

  constructor(private facturasService: FacturasService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mostrarFacturas();
  }

  mostrarFacturas(): void {
    this.facturasService.getFacturas().subscribe((response: any) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Factura>(this.ELEMENT_DATA);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FacturaDialigComponent, {
      width: '700px',
      data: { operacion: 'Registro'},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mostrarFacturas();
    });
  }

  verFactura(element: Factura) {
    const dialogRef = this.dialog.open(FacturaDialigComponent, {
      width: '700px',
      data: { operacion: 'Ver', factura: element},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mostrarFacturas();
    });
  }

}
