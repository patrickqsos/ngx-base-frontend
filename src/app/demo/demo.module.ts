import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry/registry.component';
import { RouterModule } from '@angular/router';
import { demoRoutes } from './demo.routing';
import { SharedModule } from '../shared/shared.module';
import { DemoService } from './services/demo.service';
import { TagsComponent } from './tags/tags.component';
import { DemoListComponent } from './demo-list/demo-list.component';
import { EditorModule } from 'tinymce-material';
import { TextEditorComponent } from './text-editor/text-editor.component';

@NgModule({
    declarations: [
        DemoListComponent,
        RegistryComponent,
        TagsComponent,
        TextEditorComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(demoRoutes),
        SharedModule,
        EditorModule
    ],
    providers: [
        DemoService
    ]
})
export class DemoModule {}
