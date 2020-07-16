import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FilesService } from '../app/services/files.service';
import { MessageSeverity } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dejero dashboard';

  allFiles: any[] = [];
  progress: Boolean = false;
  fileUpload: ElementRef;

  constructor(private filesService: FilesService, private alertService: AlertService) { }

  ngOnInit() {
  }

  detectFiles(event) {
    let files = event.target.files;
    if (files) {

      for (let file of files) {
        this.allFiles.push(file);
      }
    }
  }

  dropHandler(event){
    event.stopPropagation();
    event.preventDefault();
    this.detectDroppedFiles(event);
  }

  dragOverhandler(event){
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  detectDroppedFiles(event){
    let files = event.dataTransfer.files;
    if(files){
      for(let file in files){
        this.allFiles.push(file);
      }
    }
  }

  
  uploadFiles() {
    if (this.allFiles.length === 0)
      return;

    this.progress = true;
    this.filesService.uploadFiles(this.allFiles).subscribe(event => {
      this.clear();
      this.progress = false;
      this.alertService.showMessage(`Files uploaded successfully`, MessageSeverity.success, false)
    },
    error => {
      this.alertService.showStickyMessage("",`File Upload Failed`, MessageSeverity.error, error, true);
      this.progress = false;
    });
  }

  clear() {
    this.fileUpload.nativeElement.value = '';
    this.allFiles = [];
  }

}
