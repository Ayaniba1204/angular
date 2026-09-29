import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, TodoItemComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  protected readonly todoService = inject(TodoService);

  newTodoTitle = signal('');

  addTodo() {
    this.todoService.addTodo(this.newTodoTitle());
    this.newTodoTitle.set('');
  }
}