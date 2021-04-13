import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Task } from '../model/task';
import { AlertModalService } from '../shared/alert-modal.service';
import { TasksService } from '../tasks.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  constructor(
        private     service:    TasksService,
        private      router:    Router,
        private       route:    ActivatedRoute,
        private alertService:   AlertModalService,

  ) { }

  selectedTask: Task;

  //public taskList : Task [] =[];
  error$ = new Subject<boolean>();
  title: any;

  tasks$: Observable<Task[]>;
  searchValue: string;


  ngOnInit() {
    this.onRefresh();
  }


  onEdit(id) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }


  onCloseTask(task) {
    this.selectedTask = task;

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja encerrar está tarefa?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(task.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.alertService.showAlertSuccess('A tarefa foi encerrada.')
        this.onRefresh();
      },
      error => { 
        this.alertService.showAlertDanger('Erro ao encerrar tarefa. Tente mais tarde.')
    }
    )
  }

  
  onRefresh() {
    this.tasks$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        return EMPTY;
      }),
      take(1)
    ); 
    }
    

    handleError() {
      this.alertService.showAlertDanger('Erro ao carregar as tarefas. Tente mais tarde.');
    }
}
