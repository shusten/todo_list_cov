import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
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
  taskData$: Observable<Task[]>;
  tasks$: Observable<Task[]>;
  error$ = new Subject<boolean>();
  queryField = new FormControl();
  results$: Observable<Task[]>;
  dataFilter$: Observable<Task[]>;
  tasksData$: Observable<Task[]>;
  data$: Observable<Task>;

  

  ngOnInit() {

    this.tasks$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return EMPTY;
      })
    )
 
    filtrar(this.tasks$) {
      if(!this.tasks$) {
         this.dataFilter$ = this.tasks$;
      } else {
        this.tasksData$ = this.tasks$.pipe(filter(x => 
           x.CLIENTE.trim().toLowerCase().includes(value.trim().toLowerCase())
        );)
      }
   }
 
  }

 



    /*
    this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        debounceTime(200),
        distinctUntilChanged(),
        tap(value => console.log(value))
      ).subscribe();
  
      */  


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
      })
    ); 
    }
    

    handleError() {
      this.alertService.showAlertDanger('Erro ao carregar as tarefas. Tente mais tarde.');
    }
}
