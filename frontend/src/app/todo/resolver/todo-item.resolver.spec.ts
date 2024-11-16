import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { todoItemResolver } from './todo-item.resolver';

describe('todoItemResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => todoItemResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
