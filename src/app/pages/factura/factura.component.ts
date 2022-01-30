import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FacturaDialigComponent } from 'src/app/components/factura-dialig/factura-dialig.component';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(private facturasService: FacturasService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FacturaDialigComponent, {
      width: '700px',
      data: { operacion: 'Registro'},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.mostrarItems();
    });
  }

}
