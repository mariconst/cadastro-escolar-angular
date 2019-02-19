import { TestBed, inject } from '@angular/core/testing';

import { EstudantesService } from './estudantes.service';

describe('EstudantesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstudantesService]
    });
  });

  it('should be created', inject([EstudantesService], (service: EstudantesService) => {
    expect(service).toBeTruthy();
  }));
});
