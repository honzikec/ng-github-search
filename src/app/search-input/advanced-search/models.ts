import { AbstractControl } from '@angular/forms';

export interface ControlMeta {
    key: string;
    type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'checkbox';
    label: string;
    control: AbstractControl;
    hasQualifier?: boolean;
    enumeration?: EnumerationItem[];
}

export interface EnumerationItem {
    value: string;
    label: string;
}