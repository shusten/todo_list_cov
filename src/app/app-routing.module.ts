import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { TaskResolverGuard } from "./guards/task-resolver.guard";

const routes: Routes = [
  {path: "",  component:  ListComponent},

  {
    path: "new",         
    component:  TaskFormComponent,
    resolve: {
      task: TaskResolverGuard
  }

},
  {
    path: "edit/:id",  
    component:  TaskFormComponent,
    resolve: {
      task: TaskResolverGuard
    }

},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
