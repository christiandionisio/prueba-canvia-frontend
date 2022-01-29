import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.clienteService.getClientesPageable(0, 5).subscribe((response: any) => {
      this.ELEMENT_DATA = response.content;
      this.dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);
    });
  }

  editarCliete(element: Cliente) {
    console.log(element);
  }

  eliminarCliente(element: Cliente) {
    console.log(element);
  }

}
