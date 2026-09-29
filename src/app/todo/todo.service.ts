import { Injectable, computed, signal } from '@angular/core';
import { Todo, TodoFilter } from './models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly _todos = signal<Todo[]>([
    { id: 1, title: 'Learn Angular', status: false },
    { id: 2, title: 'Build Todo App', status: true }
  ]);

  readonly todos = this._todos.asReadonly();

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

  addTodo(title: string) {
    const clean = title.trim();
    if (clean === '') {
      return;
    }

    const newTodo: Todo = { id: Date.now(), title: clean, status: false };
    this._todos.update(list => [...list, newTodo]);
  }

  toggleTodo(id: number) {
    this._todos.update(list =>
      list.map(todo =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this._todos.update(list => list.filter(todo => todo.id !== id));
  }
}