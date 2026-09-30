import { Component, inject,output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { noWhitespace } from '../../shared/validators/no-whitespace.validator';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {

  private fb = inject(FormBuilder);
  submitTodo = output<string>();

  form = this.fb.nonNullable.group({
    title:    ['', [Validators.required, Validators.minLength(3), noWhitespace]],
    priority: ['normal', Validators.required]
  });

  get title() {
    return this.form.controls.title;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    const value = this.form.getRawValue();
    this.submitTodo.emit(value.title.trim());
 
    this.form.reset({ title: '', priority: 'normal' });
  }
}