import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkMenuModule } from '@angular/cdk/menu'
import { LucideAngularModule, X,Search } from 'lucide-angular';
import { NgxEditorModule } from 'ngx-editor';

import { LayoutModule } from '@app/layout/layout.module';

import { TodoRoutingModule } from './todo-routing.module';
import { HomeTodoComponent } from './components/home-todo/home-todo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyCalenderComponent } from './components/my-calender/my-calender.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { TodoHeatMapComponent } from "./components/todo-heat-map/todo-heat-map.component"
import { TodoHeatMapFilterComponent } from './components/todo-heat-map-filter/todo-heat-map-filter.component'
import { TodoContainerComponent } from "./components/todo-container/todo-container.component"
import { TodoCompletedFilterComponent } from "./components/todo-completed-filter/todo-completed-filter.component"
import { TodoPriorityFilterComponent } from './components/todo-priority-filter/todo-priority-filter.component'
import { TodoItemsComponent } from "./components/todo-items/todo-items.component"

import { ProprityDirective } from './directive/proprity.directive'

import { SharedModule } from "@app/shared/shared.module"
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeTodoComponent,
    DashboardComponent,
    MyCalenderComponent,
    MyTaskComponent,
    TodoHeatMapComponent,
    TodoHeatMapFilterComponent,
    TodoContainerComponent,
    TodoCompletedFilterComponent,
    TodoPriorityFilterComponent,
    TodoItemsComponent,
    ProprityDirective
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    LayoutModule,
    NgxChartsModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    LucideAngularModule.pick({ X, Search }),
    CdkMenuModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
        enterValidUrl: 'Please enter a valid URL',
      },
    })
  ],
})
export class TodoModule { }
