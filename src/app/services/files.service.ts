import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  public baseUrl: string = environment.baseUrl; 

  private readonly _FileUploadUrl: string = "/api/File/Upload";
  get fileUploadUrl() { return this.baseUrl + this._FileUploadUrl; }

  constructor(private http: HttpClient) { }

  handleError(error, continuation: () => Observable<any>){
    return Observable.throw("An unexpected error occured. Contact support team - support@dejero.ca");
  }

  uploadFiles(files: any):Observable<any>
    {
      const formData = new FormData();
      for (let file of files) {
            var info = file.name;
          formData.append(info, file);
      }
    return this.http.post( this.fileUploadUrl, formData).catch(error => this.handleError(error,()=>this.uploadFiles(files)));
    }

  
}
