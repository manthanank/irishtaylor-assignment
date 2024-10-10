import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';

export const routes: Routes = [
    { path: 'list', component: TableComponent },
    { path: 'create', component: FormComponent },
    { path: 'edit/:id', component: FormComponent },
    { path: '**', redirectTo: 'list' }
];
