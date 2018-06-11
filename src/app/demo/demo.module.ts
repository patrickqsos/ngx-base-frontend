import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry/registry.component';
import { RouterModule } from '@angular/router';
import { demoRoutes } from './demo.routing';
import { SharedModule } from '../shared/shared.module';
import { DemoService } from './services/demo.service';
import { TagsComponent } from './tags/tags.component';

@NgModule({
    declarations: [
        RegistryComponent,
        TagsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(demoRoutes),
        SharedModule
    ],
    providers: [
        DemoService
    ]
})
export class DemoModule {}
