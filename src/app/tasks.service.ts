import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay, take, tap } from 'rxjs/operators';
import { Task } from './model/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly API = `${environment.TASKS}tarefas`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Task[]>(this.API)
    .pipe(  
      delay(1000),
      tap(console.log)
    );
  }


  loadByID(id) {
    return this.http.get<Task>(`${this.API}/${id}`).pipe(take(1));
 }


   private create(task) {
    return this.http.post(this.API, task).pipe(take(1));
  }


  private update(task) {
    return this.http.put(`${this.API}/${task.id}`, task).pipe(take(1));
  }


  save(task) {
    if ( task.id ) {
      return this.update(task);
    } else {
      return this.create(task);
    }
  }

  
  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
