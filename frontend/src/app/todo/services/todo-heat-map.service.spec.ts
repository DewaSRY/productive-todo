import { TestBed } from '@angular/core/testing';

import { TodoHeatMapService } from './todo-heat-map.service';

describe('TodoHeatMapService', () => {
  let service: TodoHeatMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoHeatMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
