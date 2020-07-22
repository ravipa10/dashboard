import { TestBed } from '@angular/core/testing';

import { FilesService } from './files.service';
import { HttpClient } from '@angular/common/http';
import { files } from '../models/files.models';

describe('FilesService', () => {
  
  it('Test FileService'), () => {
    let service: FilesService;
    let http: HttpClient;
    beforeEach(() => { service = new FilesService(http); });

    it('getObservableValue should return value from observable',
    (done: DoneFn) => {
    service.getAllFiles().subscribe(value => {
      expect(value).toBe(this.Files);
      done();
    });
  });
  }
});
