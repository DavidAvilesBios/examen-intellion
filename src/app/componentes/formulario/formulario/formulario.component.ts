import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { resolve } from "url";
import { ServicioFormularioService } from "../../../servicios/servicio-formulario.service";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"],
})
export class FormularioComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  id = 0;

  constructor(
    private formBuilder: FormBuilder,
    private FormularioService: ServicioFormularioService,
    private route: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      segundoApellido: ["", Validators.required],
      calle: ["", Validators.required],
      colonia: ["", Validators.required],
      numeroCasa: ["", Validators.required],
      rfc: ["", [Validators.required, Validators.minLength(12)]],
      codigoPostal: ["", [Validators.required, Validators.minLength(5)]],
    });

    this.route.params.subscribe((params)=> {
      if(params['id']){
         this.id = params['id'];
         this.initializeForm(this.id);
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  initializeForm(id){

    this.FormularioService.getDataId(id).subscribe((resp)=>{
      this.registerForm.setValue({
          nombre: resp.producto.nombre,
          apellido: resp.producto.apellido,
          segundoApellido: resp.producto.segundoApellido,
          calle: resp.producto.calle,
          colonia: resp.producto.colonia,
          numeroCasa: resp.producto.numeroCasa,
          rfc: resp.producto.rfc,
          codigoPostal: resp.producto.codigoPostal
      });
    });

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    if(!this.id){
    this.FormularioService.postData(this.registerForm.value).subscribe(
      (resp) => {
        alert("Se genero correctamente");
        this.router.navigate(['/home']);
      },
      (error) => {
        alert("Ocurrio un error al generarse");
      }
    );
    } else {
      this.FormularioService.putData(this.id,this.registerForm.value).subscribe(
        (resp) => {
          alert("Se genero correctamente");
          this.router.navigate(['/home']);
        },
        (error) => {
          alert("Ocurrio un error al generarse");
        }
      );
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
