import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './model/task';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Tasks: Task[], searchValue: string): Task[] {
    
    if (!Tasks || !searchValue) {
      return Tasks;
    }
    return Tasks.filter(task => 
      task.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );}

}
