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
import { GridEmptyComponent } from './grids/grid-empty/grid-empty.component';
import { GridFullComponent } from './grids/grid-full/grid-full.component';
import { GridModalComponent } from './grids/grid-full/grid-modal/grid-modal.component';
import { GridNuevoComponent } from './grids/grid-full/grid-nuevo/grid-nuevo.component';

@NgModule({
    declarations: [
        DemoListComponent,
        RegistryComponent,
        TagsComponent,
        TextEditorComponent,
        GridEmptyComponent,
        GridFullComponent,
        GridModalComponent,
        GridNuevoComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(demoRoutes),
        SharedModule,
        EditorModule
    ],
    providers: [
        DemoService
    ],
    entryComponents: [
        GridModalComponent
    ]
})
export class DemoModule {}
