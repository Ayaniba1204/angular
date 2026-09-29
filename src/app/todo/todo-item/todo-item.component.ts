import { Component,input,output } from '@angular/core';
import {Todo} from '../models/todo.model';
@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {

  todo= input.required<Todo>();

  toggle=output<number>();
  remove=output<number>();

  onToggle(){
    this.toggle.emit(this.todo().id);
  }
  onRemove(){
    this.remove.emit(this.todo().id);
  }
}
