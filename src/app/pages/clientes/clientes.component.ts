import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteDialogComponent } from 'src/app/components/cliente-dialog/cliente-dialog.component';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  ELEMENT_DATA: Cliente[] = [];

  displayedColumns: string[] = [ 'nombres', 'apellidos', 'dni', 'correo', 'operaciones'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);
  selection = new SelectionModel<Cliente>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private clienteService: ClientesService,
            public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mostrarClientes();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.mostrarClientes();
  }

  mostrarClientes() {
    this.clienteService.getClientesPageable(this.currentPage, this.pageSize).subscribe((response: any) => {
      this.totalSize = response.totalElements;
      this.ELEMENT_DATA = response.content;
      this.dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '400px',
      data: { operacion: 'Registro'},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mostrarClientes();
    });
  }

  editarCliete(element: Cliente) {
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '400px',
      data: { operacion: 'Editar', cliente: element},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mostrarClientes();
    });
  }

  eliminarCliente(element: Cliente) {
    this.clienteService.eliminarCliente(element.idCliente!).subscribe(response => {
      this.mostrarClientes();
    });
  }

}
