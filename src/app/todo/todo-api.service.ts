import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodosService } from '../api';

@Injectable({ providedIn: 'root' })
export class TodoApiService {

  private generated = inject(TodosService);

  getAll(): Observable<Todo[]> {
    return this.generated.getAllTodos();
  }

  getById(id: number): Observable<Todo> {
    return this.generated.getTodoById(id);
  }

  create(title: string): Observable<Todo> {
    return this.generated.createTodo({ title, status: false });
  }

  update(id: number, changes: Partial<Todo>): Observable<Todo> {
    return this.generated.updateTodo(id, changes as Todo);
  }

  remove(id: number): Observable<unknown> {
    return this.generated.deleteTodo(id);
  }
}