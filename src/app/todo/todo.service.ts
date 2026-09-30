import { Injectable, computed, inject, signal } from '@angular/core';
import { Todo, TodoFilter } from './models/todo.model';
import { TodoApiService } from './todo-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TodoService {

  private api = inject(TodoApiService);

  private readonly _todos = signal<Todo[]>([]);
  readonly todos = this._todos.asReadonly();

  readonly loading = signal(false);
  readonly error   = signal<string | null>(null);

  readonly searchText      = signal('');
  readonly filterSelection = signal<TodoFilter>('all');

  readonly totalCount      = computed(() => this._todos().length);
  readonly completedCount  = computed(() => this._todos().filter(t => t.status).length);
  readonly incompleteCount = computed(() => this.totalCount() - this.completedCount());

  readonly filteredTodos = computed(() => {
    const search   = this.searchText().toLowerCase().trim();
    const selected = this.filterSelection();

    return this._todos().filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(search);
      const matchesFilter =
        selected === 'all'       ? true :
        selected === 'completed' ? todo.status :
                                   !todo.status;
      return matchesSearch && matchesFilter;
    });
  });

  loadTodos() {
    this.loading.set(true);
    this.error.set(null);

    this.api.getAll().subscribe({
      next: (todos) => {
        this._todos.set(todos);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load todos.');
        this.loading.set(false);
      }
    });
  }

  addTodo(title: string) {
    const clean = title.trim();
    if (clean === '') return;

    this.api.create(clean).subscribe({
      next: (created) => this._todos.update(list => [...list, created]),
      error: (err: HttpErrorResponse) => {
        const serverMessage = err.error?.title;
        this.error.set(serverMessage ?? 'Could not add the todo.');
      }
    });
  }

  toggleTodo(id: number) {
    const todo = this._todos().find(t => t.id === id);
    if (!todo) return;

    this.api.update(id, { status: !todo.status }).subscribe({
      next: (updated) => this._todos.update(list =>
        list.map(t => t.id === id ? updated : t)
      ),
      error: () => this.error.set('Could not update the todo.')
    });
  }

  deleteTodo(id: number) {
    this.api.remove(id).subscribe({
      next: () => this._todos.update(list => list.filter(t => t.id !== id)),
      error: () => this.error.set('Could not delete the todo.')
    });
  }
}