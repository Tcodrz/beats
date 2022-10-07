import { TestBed } from '@angular/core/testing';

import { EditorApiService } from './editor-api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('EditorApiService', () => {
  let service: EditorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EditorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
