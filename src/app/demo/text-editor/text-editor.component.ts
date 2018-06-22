import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base.component';
import { fadeInAnim } from '../../shared/animations/template.animation';
import { LangService } from '../../shared/services/lang.service';

@Component({
    selector: 'demo-text-editor',
    templateUrl: './text-editor.component.html',
    animations: [fadeInAnim],
    host: {class: 'container-fluid', '[@fadeInAnim]': 'true'}
})
export class TextEditorComponent extends BaseComponent {

    editorConfig = {
        menubar: true,
        branding: false,
        language_url: '/assets/tinymce/langs/es.js',
        skin_url: '/assets/tinymce/skins/sgp'
        //statusbar: true
        // setup: function(editor) {
        //     editor.on('click', function(e) {
        //       console.log('Editor was clicked');
        //     });
        //   }
    };

    constructor(
        public langService: LangService
    ) {
        super();
    }
}
