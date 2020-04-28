import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
// const uri = environment.apiBaseUrl +'/file/upload';
const uri = 'https://craftedbycreative.com/thumb.php';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {
  imgurl: any;
  form: FormGroup;

  @Input() passThumbUrl: string;

  uploader: FileUploader = new FileUploader({
    url: uri
  });

  constructor(private formBuilder: FormBuilder,) {

  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
       const str = JSON.parse(response);
       const fileUrl = str['url'];
       localStorage.setItem('thumb', fileUrl)
    };

    this.uploader.onProgressItem = (progress: any) => {
      console.log(progress['progress']);
    };

    this.imageset();

  }

  imageset() {
    this.imgurl = localStorage.getItem('thumb');
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
        reader.onload = (event: any) => {
            this.imgurl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
  }

}
