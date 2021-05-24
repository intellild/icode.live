import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CodeService {
  fontSize$ = new BehaviorSubject(14);
}
