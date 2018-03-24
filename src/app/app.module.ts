import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'


import { AppComponent } from './app.component';
import { MainEditorComponent } from './components/main-editor/main-editor.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VariableSelectService } from './services/variable-select.service';
import { GlobalVarSelectComponent } from './components/global-var-select/global-var-select.component';
import { VariableNameComponent } from './components/variable-name/variable-name.component';
import { FileTreeComponent } from './components/file-tree/file-tree.component';


@NgModule({
  declarations: [
    AppComponent,
    MainEditorComponent,
    GlobalVarSelectComponent,
    VariableNameComponent,
    FileTreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    HttpModule
  ],
  providers: [VariableSelectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
