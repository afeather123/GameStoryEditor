import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainEditorComponent } from '../components/main-editor/main-editor.component';
import { DataSetupComponent } from '../components/data-setup/data-setup.component';
import { DataTypeSetupComponent } from '../components/data-type-setup/data-type-setup.component';

const routes: Routes = [
  {
    path: '',
    component: MainEditorComponent
  },
  {
    path: 'data-settings',
    component: DataSetupComponent
  },
  {
    path: 'data-types',
    component: DataTypeSetupComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  declarations: []
})
export class AppRoutingModule { }
