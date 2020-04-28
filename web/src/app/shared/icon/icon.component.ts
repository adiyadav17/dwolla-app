import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
const uri = 'https://craftedbycreative.com/icon.php';
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  iconurl: any;
  form: FormGroup;

  @Input() passIconUrl: string;

  uploader: FileUploader = new FileUploader({
    url: uri
  });

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const str = JSON.parse(response);
      const fileUrl = str['url'];
       console.log(fileUrl);
       localStorage.setItem('icon', fileUrl);
    };

    this.uploader.onProgressItem = (progress: any) => {
      console.log(progress['progress']);
    };

    this.imageset();

  }

  imageset(){
    this.iconurl = localStorage.getItem('icon');
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
       const reader = new FileReader();
        reader.onload = (event: any) => {
            this.iconurl = event.target.result;
        },
        reader.readAsDataURL(event.target.files[0]);
    }
  }

}
