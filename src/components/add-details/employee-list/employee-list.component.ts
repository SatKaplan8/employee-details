import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { EmployeeDetails } from '../../../users.models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmpServiceService } from '../../../services/emp-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmpaddeditComponent } from '../../../empAddEdit/empAddEdit.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  users: EmployeeDetails[] = []
  displayedColumns: string[] = ['_id', 'name', 'age', 'dept', 'salary','gender','state','phone','action']
  dataSource!: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private empService: EmpServiceService,private dialog:MatDialog) { }


  ngOnInit(): void {
    this.loadEmp()

  }
  loadEmp(): void {
    this.empService.getEmp().subscribe((response) => {
      this.users = response
      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delUser(_id: any) {
    this.empService.deleteEmp(_id).subscribe(() => {
      this.loadEmp()
    })
  }
  openAddEditEmpForm() {
    const dialogRef =
      this.dialog.open(EmpaddeditComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.loadEmp()
    })
  }
  openEditForm(data: any) {
    const dialogRef =
      this.dialog.open(EmpaddeditComponent, { data })
    dialogRef.afterClosed().subscribe(() => {
      this.loadEmp()
    })
  }
}