import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ItemDialogComponent } from 'src/app/components/item-dialog/item-dialog.component';
import { Items } from 'src/app/interfaces/items.interface';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  ELEMENT_DATA: Items[] = [];

  displayedColumns: string[] = [ 'nombre', 'tipo', 'precio', 'operaciones'];
  dataSource = new MatTableDataSource<Items>(this.ELEMENT_DATA);
  selection = new SelectionModel<Items>(true, []);

  constructor(private itemsService: ItemsService,
            public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mostrarItems();
  }

  mostrarItems(): void {
    this.itemsService.getItems().subscribe((response: any) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Items>(this.ELEMENT_DATA);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '400px',
      data: { operacion: 'Registro'},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mostrarItems();
    });
  }

  editarCliete(element: Items) {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '400px',
      data: { operacion: 'Editar', item: element},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mostrarItems();
    });
  }

  eliminarCliente(element: Items) {
    this.itemsService.eliminarItem(element.idItem!).subscribe(response => {
      this.mostrarItems();
    });
  }

}
