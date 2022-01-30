import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteDialogComponent } from 'src/app/components/cliente-dialog/cliente-dialog.component';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  ELEMENT_DATA: Cliente[] = [];

  displayedColumns: string[] = [ 'nombres', 'apellidos', 'dni', 'correo', 'operaciones'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);
  selection = new SelectionModel<Cliente>(true, []);

  constructor(private clienteService: ClientesService,
            public dialog: MatDialog) { }

  ngOnInit(): void {
    this.clienteService.getClientesPageable(0, 5).subscribe((response: any) => {
      this.ELEMENT_DATA = response.content;
      this.dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '400px',
      data: { operacion: 'Registro'},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  editarCliete(element: Cliente) {
    console.log(element);
  }

  eliminarCliente(element: Cliente) {
    console.log(element);
  }

}
