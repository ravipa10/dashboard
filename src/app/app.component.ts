import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilesService } from '../app/services/files.service';
import { files } from '../app/models/files.models'
// import { AlertService } from './services/alert.service';
// import { MessageSeverity } from './services/alert.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dejero dashboard';

  allFiles: any[] = [];
  Files: files[] = [];
  filesArray: files[] = [];
  progress: Boolean = false;
  @ViewChild("fileUpload")
  fileUpload: ElementRef;
  // private alertService: AlertService
  constructor(private filesService: FilesService) { }

  ngOnInit() {
    this.getAllFiles();
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
      // this.alertService.showMessage(`Files uploaded successfully`, MessageSeverity.success, false)
    },
    error => {
      // this.alertService.showMessage(`File Upload Failed`, MessageSeverity.error, true);
      this.progress = false;
    });
  }

  clear() {
    this.fileUpload.nativeElement.value = '';
    this.allFiles = [];
  }

  refreshFiles(){
    this.getAllFiles();

  }

  getAllFiles(){
    this.filesService.getAllFiles().subscribe(data => {
      this.Files = data;
      this.filesArray = [];
      for (let file of this.Files) {
          this.filesArray.push(file);
          console.log(file.fileName)
      }
    });
  }

  deleteFile(file: any, index) {
    if (file == null) { return; }

      this.filesService.deleteFile(file).subscribe(data => {
        this.Files.splice(index, 1);
        this.filesArray = [];
        for (let file of this.Files) {
            this.filesArray.push(file);
        }
      },
        error => {}
    );
  }

}
