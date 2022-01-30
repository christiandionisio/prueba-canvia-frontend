import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Items } from 'src/app/interfaces/items.interface';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    tipo: ['', Validators.required],
    precio: ['', Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.llenarDatos();
  }

  llenarDatos() {
    if (this.data.operacion == 'Editar') {
      this.registerForm.controls['nombre'].setValue(this.data.item.nombre);
      this.registerForm.controls['tipo'].setValue(this.data.item.tipo);
      this.registerForm.controls['precio'].setValue(this.data.item.precio);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  registrarItem() {

    const item: Items = {
      "nombre": this.registerForm.value.nombre,
      'tipo': this.registerForm.value.tipo,
      'precio': this.registerForm.value.precio,
    }

    this.itemsService.registrarItem(item).subscribe((response: any ) => {
      this.limpiarFormulario();
      this.onNoClick();
    });
    
  }

  limpiarFormulario() {
    this.registerForm.controls['nombre'].setValue('');
    this.registerForm.controls['tipo'].setValue('');
    this.registerForm.controls['precio'].setValue('');

    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
  }

  editarItem() {
    const item: Items = {
      "idItem": this.data.item.idItem,
      "nombre": this.registerForm.value.nombre,
      'tipo': this.registerForm.value.tipo,
      'precio': this.registerForm.value.precio,
    }

    this.itemsService.updateItem(item).subscribe((response: any ) => {
      this.limpiarFormulario();
      this.onNoClick();
    });
  }

}
