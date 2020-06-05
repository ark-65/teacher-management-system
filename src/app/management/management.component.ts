import { Component, OnInit } from '@angular/core';
import {Page} from '../interface/page';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  pageInfo: Page = {
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

}
