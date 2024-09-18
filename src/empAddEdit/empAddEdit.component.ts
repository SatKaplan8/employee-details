import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpServiceService } from '../services/emp-service.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';




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
    salary: new FormControl(''),
    gender: new FormControl(''),
    state: new FormControl(''),
    phone: new FormControl('')

  })
  chooseGender: string | undefined;
  genders: string[] = ['Male','Female'];
  states: string[] = ['JH', 'KA', 'DL'];
  constructor(private formBuilder: FormBuilder, private empService: EmpServiceService, private dilaogRef: MatDialogRef<EmpaddeditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.empForm.patchValue(this.data)
  }
  onFormSubmit() {
    if (this.data) {
      this.empService.updateEmp(this.data._id, this.empForm.value).subscribe(() => {
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


