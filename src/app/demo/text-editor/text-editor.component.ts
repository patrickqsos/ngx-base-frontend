import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base.component';
import { fadeInAnim } from '../../shared/animations/template.animation';
import { LangService } from '../../shared/services/lang.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContextoService } from '../../shared/services/contexto.service';

@Component({
    selector: 'demo-text-editor',
    templateUrl: './text-editor.component.html',
    animations: [fadeInAnim],
    host: {class: 'container-fluid', '[@fadeInAnim]': 'true'}
})
export class TextEditorComponent extends BaseComponent implements OnInit {

    form: FormGroup;

    editorConfig = {
        menubar: true,
        branding: false,
        language_url: '/assets/tinymce/langs/es.js',
        skin_url: '/assets/tinymce/skins/sgp',
        templates: [
            {title: 'Some title 1', description: 'Some desc 1', content: '<b>My content</b>'},
            {title: 'Some title 2', description: 'Some desc 2', content: 'Hola mundo'}
        ],
        // tslint:disable-next-line:max-line-length
        plugins: 'print preview searchreplace visualchars fullscreen image template table charmap hr pagebreak nonbreaking insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
        // tslint:disable-next-line:max-line-length
        toolbar: 'undo redo | cut copy paste | formatselect fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent  | table image template print | removeformat',
        images_upload_url: 'postAcceptor.php',
        // we override default upload handler to simulate successful upload
        images_upload_handler: (blobInfo, success, failure) => {
            setTimeout(() => {
            // no matter what you upload, we will turn it into TinyMCE logo :)
            success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
            }, 2000);
        }
        // setup: (editor) => {
        //     editor.on('click', (e) => {
        //       console.log('Editor was clicked');
        //     });

        //     editor.addButton('mybutton', {
        //         text: 'My Button',
        //         onclick: () => {
        //            alert('My Button clicked!');
        //         }
        //       });
        //   }
    };

    constructor(
        public langService: LangService,
        public contextService: ContextoService,
        private formbuilder: FormBuilder

    ) {
        super();
    }

    submitForm(): void {
        console.log('asd');
    }

    ngOnInit(): void {
        this.form = this.formbuilder.group({
            title: ['', [Validators.required]],
            content: ['', [Validators.required]]
        });
    }
}
