import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
// const uri = environment.apiBaseUrl +'/file/upload';
const uri = 'https://craftedbycreative.com/banner.php';
@Component({
  selector: 'app-bannerupload',
  templateUrl: './bannerupload.component.html',
  styleUrls: ['./bannerupload.component.css']
})
export class BanneruploadComponent implements OnInit {

  bannerurl: any;

  @Input() passBannerUrl: string;

  uploader: FileUploader = new FileUploader({
    url: uri
  });

  constructor() {

  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const str = JSON.parse(response);
      const fileUrl = str['url'];
      console.log(fileUrl);
      localStorage.setItem('banner', fileUrl)
    };

    this.uploader.onProgressItem = (progress: any) => {
      console.log(progress['progress']);
    };

    this.bannerset();
  }

  bannerset() {
    this.bannerurl = localStorage.getItem('banner');
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.bannerurl = event.target.result;
      },
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
