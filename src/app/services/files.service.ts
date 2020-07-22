import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { files } from '../models/files.models'

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  public baseUrl: string = environment.baseUrl; 

  private readonly _FileUploadUrl: string = "/api/File/Upload";
  private readonly _GetAllFilesUrl: string = "/api/File/View";
  private readonly _DeleteFilesUrl: string = "/api/File/Delete";

  get fileUploadUrl() { return this.baseUrl + this._FileUploadUrl; }
  get getAllFilesUrl() { return this.baseUrl + this._GetAllFilesUrl; }
  get deleteFileUrl() { return this.baseUrl + this._DeleteFilesUrl; }

  constructor(private http: HttpClient) { }

  handleError(error, continuation: () => Observable<any>){
    return Observable.throw("An unexpected error occured. Contact support team - support@dejero.ca");
  }

  getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({
        'Access-Control-Allow-Origin': 'https://localhost:4200',
        'Content-Type': 'application/json',
        'Accept': `application/vnd.iman.v1+json, application/json, text/plain, */*`
    });

    return { headers: headers };
}
// , this.getRequestHeaders()

  uploadFiles(files: any):Observable<any>
    {
      if(files==null){

      }
      const formData = new FormData();
      for (let file of files) {
            var info = file.name;
          formData.append(info, file);
      }
    return this.http.post(this.fileUploadUrl, formData)
    .catch(error => this.handleError(error,()=>this.uploadFiles(files)));
    }

    getAllFiles():Observable<files[]>{
      return this.http.get<files[]>(this.getAllFilesUrl)
        .catch(error => this.handleError(error,()=>this.getAllFiles()));
    }

    deleteFile(fileId: number): Observable<number> {
      return this.http.get<number>(this.deleteFileUrl + "/" + fileId.toString())
       .catch(error => this.handleError(error,()=>this.deleteFile(fileId)));

  }
  
}
