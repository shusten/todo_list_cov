import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from '../shared/alert-modal.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.less']
})
export class TaskFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private        fb:    FormBuilder,
    private     route:    ActivatedRoute,
    private   service:    TasksService,
    private  location:    Location,
    private     modal:    AlertModalService
  ) { }

  ngOnInit(): void {

    const task = this.route.snapshot.data['task'];

    this.form = this.fb.group({
      id:          [task.id],
      title:       [task.title,       [Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
      description: [task.description, [Validators.minLength(5), Validators.maxLength(250)] ]
    });

  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    
    if ( this.form.valid ) {
      
      let msgSuccess = 'Tarefa criada com sucesso!';
      let msgError   = 'Erro ao criar tarefa. Tente mais tarde!';
      
      
      if ( this.form.value.id ) {
        msgSuccess = 'A tarefa foi atualizada!';
        msgError   = 'Erro ao atualizar tarefa!';
      }
  
      this.service.save( this.form.value ).subscribe(
        
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
      },
      error => {this.modal.showAlertDanger(msgError)}

      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('onCancel');
  }

}
