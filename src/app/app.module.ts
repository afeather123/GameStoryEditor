import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { MainEditorComponent } from './components/main-editor/main-editor.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VariableSelectService } from './services/variable-select.service';
import { GlobalVarSelectComponent } from './components/global-var-select/global-var-select.component';
import { VariableNameComponent } from './components/variable-name/variable-name.component';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { GlobalVarEditorComponent } from './components/global-var-editor/global-var-editor.component';
import { LocalVarEditorComponent } from './components/local-var-editor/local-var-editor.component';
import { LocalVarSelectComponent } from './components/local-var-select/local-var-select.component';
import { LoadJsonService } from './services/load-json.service';
import { ConditionCollectionComponent } from './components/condition-collection/condition-collection.component';
import { InteractableService } from './services/interactable.service';
import { KeysPipe } from './pipes/keys-pipe.pipe';
import { NodePreviewComponent } from './components/node-preview/node-preview.component';
import { Select2Component } from './components/select2/select2.component';
import { NodeSelectComponent } from './components/node-select/node-select.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { EntrypointComponent } from './components/entrypoint/entrypoint.component';
import { EntrypointContainerComponent } from './components/entrypoint-container/entrypoint-container.component';
import { RedirectWrapperComponent } from './components/redirect-wrapper/redirect-wrapper.component';
import { RedirectContainerComponent } from './components/redirect-container/redirect-container.component';
import { ChoiceComponent } from './components/choice/choice.component';
import { NodeComponent } from './components/node/node.component';
import { ChoiceCollectionComponent } from './components/choice-collection/choice-collection.component';
import { NodeDisplayComponent } from './components/node-display/node-display.component';
import { ProjectDownloadComponent } from './components/project-download/project-download.component';
import { ProjectUploadComponent } from './components/project-upload/project-upload.component';
import { DataCollectionComponent } from './components/data-collection/data-collection.component';
import { GoToButtonComponent } from './components/go-to-button/go-to-button.component';
import { GameFormatComponent } from './components/game-format/game-format.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DownloadService } from './services/download.service';


@NgModule({
  declarations: [
    AppComponent,
    MainEditorComponent,
    GlobalVarSelectComponent,
    VariableNameComponent,
    FileTreeComponent,
    GlobalVarEditorComponent,
    LocalVarEditorComponent,
    LocalVarSelectComponent,
    ConditionCollectionComponent,
    KeysPipe,
    NodePreviewComponent,
    Select2Component,
    NodeSelectComponent,
    RedirectComponent,
    EntrypointComponent,
    EntrypointContainerComponent,
    RedirectWrapperComponent,
    RedirectContainerComponent,
    ChoiceComponent,
    NodeComponent,
    ChoiceCollectionComponent,
    NodeDisplayComponent,
    ProjectDownloadComponent,
    ProjectUploadComponent,
    DataCollectionComponent,
    GoToButtonComponent,
    GameFormatComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    HttpModule
  ],
  providers: [VariableSelectService, LoadJsonService, InteractableService, DownloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
