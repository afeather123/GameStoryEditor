import { Variable } from './variable';
import { VariableSelectService } from '../services/variable-select.service';
import { Injectable } from '@angular/core';

export class Condition {
    varID: string;
    operator: string;
    value: (string | boolean | number);
}

