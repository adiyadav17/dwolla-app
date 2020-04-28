import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
// const uri = environment.apiBaseUrl +'/file/upload';
const uri = 'https://craftedbycreative.com/attachment.php';
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  form: FormGroup;
  fileurl: any;
  download;

  @Input() passFileUrl: string;

  uploader: FileUploader = new FileUploader({
    url: uri
  });

  constructor() { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const str = JSON.parse(response);
      const fileUrl = str['url'];
      console.log(fileUrl);
      localStorage.setItem('file', fileUrl)
    };

    this.uploader.onProgressItem = (progress: any) => {
      console.log(progress['progress']);
    };

    this.fileset();
  }

  fileset() {
    this.fileurl = localStorage.getItem('file');
  }

  readFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        // this.fileurl = event.target.result;
      },
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
