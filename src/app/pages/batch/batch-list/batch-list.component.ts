import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { interval } from 'rxjs';
import { Constant } from '../../../Constant/Constant';
import { BatchService } from '../../../services/batch.service';
import { IBatch } from '../../../Model/interface/batch';
import { TableComponent } from '../../../reusable/component/table/table.component';
import { ITableData } from '../../../Model/interface/tableData';
import { FilterPipe } from '../../../pipes/filter.pipe';
@Component({
  selector: 'app-batch-list',
  imports: [ReactiveFormsModule, TableComponent, FormsModule, FilterPipe],

  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.scss',
})
export class BatchListComponent {
  batchService = inject(BatchService);

  totalBatches: IBatch[] = [];

  formBuilder = inject(FormBuilder);

  requiredMessage: string = 'This Is Required';

  validationConstant: any;

  timer = interval(5000);
  searchtext: any;

  columnData: ITableData[] = [
    {
      fieldname: 'batchName',
      headername: 'Batch Name',
    },
    {
      fieldname: 'startDate',
      headername: 'Batch Start Date',
      isDate: true,
    },
    {
      fieldname: 'endDate',
      headername: 'Batch End Date',
      isDate: true,
    },
    {
      fieldname: 'teacher',
      headername: 'Teacher',
    },
  ];

  constructor() {
    this.validationConstant = Constant.VALIDATION_MESSAGE;
    this.initializeForm();
    this.getAllBatches();
    setTimeout(() => {
      this.onEdit();
    }, 8000);
  }

  batchForm: FormGroup = this.formBuilder.group({
    batchId: ['', [Validators.required]],
    batchName: new FormControl(''),
    startDate: new FormControl(''),
    teacher: new FormControl(''),
    endDate: new FormControl(''),
  });

  onEdit(data?: any) {
    data = {
      batchId: 1,
      batchName: 'string',
      startDate: '2025-01-13T15:26:35.228Z',
      teacher: 'string',
      endDate: '2025-01-13T15:26:35.228Z',
    };
    this.initializeForm(data);
  }

  onSave() {
    this.batchForm.reset();
    this.batchForm = this.formBuilder.group({
      batchId: ['', [Validators.required]],
      batchName: new FormControl(''),
      startDate: new FormControl(''),
      teacher: new FormControl(''),
      endDate: new FormControl(''),
    });

    if (this.batchForm.valid) {
      this.batchService.createBatches(this.batchForm.value).subscribe(() => {
        this.getAllBatches();
        this.batchForm.reset();
      });
    }
  }

  initializeForm(data?: any) {
    this.batchForm = this.formBuilder.group({
      batchId: new FormControl(data !== undefined ? data.batchId : 0),
      batchName: new FormControl(data ? data.batchName : ''),
      startDate: new FormControl(''),
      teacher: new FormControl(''),
      endDate: new FormControl(''),
    });

    const form = this.batchForm.value;
  }

  getAllBatches() {
    this.batchService.loadBatches().subscribe((data: IBatch[]) => {
      if (data) {
        this.totalBatches = data;
      }
    });
  }

  openModal() {
    const modal = document.getElementById('studentModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('studentModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
