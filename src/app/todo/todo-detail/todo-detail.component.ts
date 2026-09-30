import { Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Todo } from '../models/todo.model';
import { TodoApiService } from '../todo-api.service';

@Component({
  selector: 'app-todo-detail',
  imports: [RouterLink],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent implements OnInit {

  id = input.required<string>();

  private api = inject(TodoApiService);

  todo    = signal<Todo | null>(null);
  loading = signal(true);

  ngOnInit() {
    this.api.getById(Number(this.id())).subscribe({
      next: (todo) => {
        this.todo.set(todo);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}