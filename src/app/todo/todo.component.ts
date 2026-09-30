import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  imports: [ReactiveFormsModule, TodoItemComponent, TodoFormComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  protected readonly todoService = inject(TodoService);

  searchControl = new FormControl('', { nonNullable: true });

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),          // wait until the user stops typing
        distinctUntilChanged(),     // ignore the same value twice
        takeUntilDestroyed()        // stop when the component is destroyed
      )
      .subscribe(text => this.todoService.searchText.set(text));
  }

  ngOnInit() {
    this.todoService.loadTodos();
  }

  onSubmitTodo(title: string) {
    this.todoService.addTodo(title);
  }
}