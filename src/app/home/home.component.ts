import { Component, OnInit } from '@angular/core';
import { EstudantesService } from '../services/estudantes.service';
import {Estudantes} from '../interfaces/estudantes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  estudantes$: Observable<Estudantes[]>;
  constructor(private estudanteService: EstudantesService) {}

  ngOnInit() {
    this.buscarEstudante();
  }

  buscarEstudante(){
    this.estudantes$ = this.estudanteService.get();
  }

  deleteEstudate(id, nome){
    if(confirm('Deseja excluir o estudante '+nome+ '?')){
      this.estudanteService.delete(id).subscribe(
      res => {
        console.log(res);
        alert('Excluido com sucesso');
        this.buscarEstudante();
        
      }, erro => {
        console.log(erro);
      });
    }
    
  }

}
