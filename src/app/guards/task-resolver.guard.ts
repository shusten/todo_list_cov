import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Task } from '../model/task';
import { TasksService } from '../tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TaskResolverGuard implements Resolve<Task>{
  
  constructor(
    private service: TasksService
    ) {}
  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): 
   Observable<Task> {

    if( route.params && route.params['id'] ) {
      return this.service.loadByID(route.params['id']);
    }
      return of({
        id:   null,
        title: null,
        description: null
      });
  }
}
