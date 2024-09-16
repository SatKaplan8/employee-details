import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpServiceService } from '../emp-service.service';
import {MatSelectModule} from '@angular/material/select';

interface State {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-empaddedit',
  templateUrl: './empaddedit.component.html',
  styleUrl: './empaddedit.component.scss'
})

export class EmpaddeditComponent {
  empForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    age: new FormControl(''),
    dept: new FormControl(''),
    salary: new FormControl('')
  })
  states: State[] = [
    {value: 'karnataka', viewValue: 'Karnataka'},
    {value: 'delhi', viewValue: 'Delhi'},
    {value: 'jharkhand', viewValue: 'Jharkhand'},
  ];
  constructor(private formBuilder: FormBuilder, private empService: EmpServiceService, private dilaogRef: MatDialogRef<EmpaddeditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.empForm.patchValue(this.data)
  }
  onFormSubmit() {
    if (this.data) {
      this.empService.updateEmp(this.data.id, this.empForm.value).subscribe(() => {
        this.dilaogRef.close(true)
      })
    }
    else {
      this.empService.addEmp(this.empForm.value).subscribe(() => {
        this.dilaogRef.close(true)
      })

    }
  }
}
