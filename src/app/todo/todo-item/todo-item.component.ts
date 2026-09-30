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

  onToggle() {
    const id = this.todo().id;
    if (id == null) {
      return;
    }
    this.toggle.emit(id);
  }

  onRemove() {
    const id = this.todo().id;
    if (id == null) {
      return;
    }
    this.remove.emit(id);
  }
}
