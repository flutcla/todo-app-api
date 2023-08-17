import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './shared/components/toolbar/toolbar/toolbar.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoStoreComponent } from './todo/todo-store/todo-store.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryStoreComponent } from './category/category-store/category-store.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';

import { NgxsModule } from '@ngxs/store';
import { TodoCategoryState } from './shared/store/todo.state';
import { CategoryState } from './shared/store/category.state';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoStoreComponent,
    TodoEditComponent,
    CategoryListComponent,
    CategoryStoreComponent,
    CategoryEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToolbarComponent,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxMatColorPickerModule,
    NgxsModule.forRoot([TodoCategoryState, CategoryState]),
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
