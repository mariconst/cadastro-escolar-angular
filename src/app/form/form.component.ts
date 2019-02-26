import { Component, OnInit } from '@angular/core';
import { Estudantes } from '../interfaces/estudantes';
import { EstudantesService } from '../services/estudantes.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EstadosBr } from '../interfaces/estadosbr';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formulario: FormGroup;
 

  editing: boolean = false;
  estudantes: Estudantes[];
  estados: Observable<EstadosBr[]>;
  id = this.activetedRoute.snapshot.params['id'];
  constructor(
    private estudanteServices: EstudantesService, 
    private activetedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    
    this.estados = this.estudanteServices.getEstadosBr();
   
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      nascimento: [null, Validators.required],
      serie: [null, Validators.required],
      cep: [null, Validators.required],
      rua: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
      mae: [null, Validators.required],
      cpf: [null, [Validators.required]],
      dia_pagamento: [null, Validators.required]
    });

   
    if(this.id>0){
      this.editing = true;
      this.estudanteServices.getOne(this.id).subscribe((data: Estudantes[]) => this.popularDadosEstudante(data));
      
    }
    
  }

  
  popularDadosEstudante(data){
    console.log(data);
    this.formulario.patchValue({
      nome: data.nome,
      nascimento: data.nascimento,
      serie: data.serie,
      cep: data.cep,
      rua: data.rua,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      mae: data.mae,
      cpf: data.cpf,
      dia_pagamento: data.dia_pagamento
    });
   
  }

 
  resetForm(){
    this.formulario.reset();
  }

  consultaCEP(){
    let cep = this.formulario.get('cep').value;
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        //Consulta o webservice viacep.com.br/
        this.estudanteServices.getCEP(cep)
          .subscribe(dados => this.popularDadosCEP(dados));
      }else{
        alert('CEP inválido!');
        this.resetCEP();
      }
    }
  }

  resetCEP(){
    this.formulario.patchValue({
      cep: null,
      rua: null,
      bairro: null,
      cidade: null,
      estado: null
    });
  }

  popularDadosCEP(dados){
    this.formulario.patchValue({
      cep: dados.cep,
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.cidade,
      estado: dados.estado
    });
  }
  

  onSubmit(){
    if(this.formulario.valid){
      this.estudanteServices.save(this.formulario).subscribe((data) => {
        alert('Salvo com sucesso!');
        console.log(data);
        //limpa formulário
        this.resetForm();

      },
        error => {
          console.log(error);
          alert('Erro');
        }
      );
    }else{
      Object.keys(this.formulario.controls).forEach(campo => {
        const controle = this.formulario.get(campo);
        console.log(campo);
        controle.markAsTouched();
      });
    }
  }

  update(){
    if(this.formulario.valid){
      this.estudanteServices.update(this.formulario, this.id).subscribe((data) => {
        alert('Salvo com sucesso!');
        console.log(data);
        //limpa formulário
        this.resetForm();

      },
        error => {
          console.log(error);
          alert('Erro');
        }
      );
    }else{
      Object.keys(this.formulario.controls).forEach(campo => {
        const controle = this.formulario.get(campo);
        console.log(campo);
        controle.markAsTouched();
      });
    }
  }

  verificaValidTouched(campo: string){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  aplicaCSSErro(campo: string){
    return{
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

}
