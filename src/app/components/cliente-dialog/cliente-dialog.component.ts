import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.css']
})
export class ClienteDialogComponent implements OnInit {

  public registerForm = this.fb.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', Validators.required],
    dni: ['', Validators.required],
    correo: ['', [Validators.required]],
  });

  constructor(public dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private clienteService: ClientesService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  registrarCliente() {
    console.log(this.registerForm.value);

    const cliente: Cliente = {
      "idCliente": '',
      "nombres": this.registerForm.value.nombres,
      'apellidos': this.registerForm.value.apellidos,
      'dni': this.registerForm.value.dni,
      'correo': this.registerForm.value.correo,
    }

    this.clienteService.registrarCliente(cliente).subscribe((response: any ) => {
      console.log(response);
      this.limpiarFormulario();
      this.onNoClick();
    });
    
  }

  limpiarFormulario() {
    this.registerForm.controls['nombres'].setValue('');
    this.registerForm.controls['apellidos'].setValue('');
    this.registerForm.controls['dni'].setValue('');
    this.registerForm.controls['correo'].setValue('');

    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
  }

}
