import {Component, OnInit} from '@angular/core';
import {ManagementService} from '../management.service';
import {Page} from '../../interface/page';
import {DepartmentItem} from '../../interface/departmentItem';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  constructor(private manageService: ManagementService, private notification: NzNotificationService, private message: NzMessageService) {
  }

  pageInfo: Page = {
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0
  };
  editCache: { [key: string]: { edit: boolean; data: DepartmentItem } } = {};

  departmentListOfData: DepartmentItem[] = [];

  ngOnInit(): void {
    this.getData(this.pageInfo);

  }

  getData(page: Page): void {
    this.manageService.getDepartment(page).subscribe(res => {
      if (res.code === 0) {
        const data = res.data;
        this.pageInfo.size = data.size;
        this.pageInfo.number = data.number;
        this.pageInfo.totalElements = data.totalElements;
        this.pageInfo.totalPages = data.totalPages;
        this.departmentListOfData = data.content;
        console.log(this.pageInfo);
        this.updateEditCache();
      }
    });
  }

  // 当前页码改变时的回调函数
  pageIndexChange(e): void {
    this.pageInfo.number = e - 1;
    this.getData(this.pageInfo);
  }

  // 页数改变时的回调函数
  pageSizeChange(e): void {
    this.pageInfo.size = e;
    this.pageInfo.number = 0;
    this.getData(this.pageInfo);
  }

  // 编辑
  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.departmentListOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: {...this.departmentListOfData[index]},
      edit: false
    };
  }

  saveEdit(id: number): void {
    console.log(this.editCache[id]);
    this.manageService.updateDepartment(this.editCache[id].data).subscribe(res => {
      if (res.code === 0) {
        const index = this.departmentListOfData.findIndex(item => item.id === id);
        Object.assign(this.departmentListOfData[index], this.editCache[id].data);
        this.editCache[id].edit = false;
        this.notification.create(
          'success',
          '成功',
          '保存成功'
        );
      } else {
        this.notification.create(
          'error',
          '保存失败',
          res.msg
        );
      }
    });
  }

  updateEditCache(): void {
    this.departmentListOfData.forEach(item => {
      console.log(item);
      this.editCache[item.id] = {
        edit: false,
        data: {...item}
      };
    });
  }
  // 确认删除按钮
  deleteConfirm(id: number): void {
    this.manageService.deleteDepartment(id).subscribe(res => {
      if (res.code === 0) {
        let newDepartmentList = [];
        this.departmentListOfData.forEach(item => {
          if (item.id !== id) {
            newDepartmentList = [...newDepartmentList, item];
          }
        });
        this.departmentListOfData = newDepartmentList;
        this.message.info('删除成功!');
      } else {
        this.notification.create(
          'error',
          '删除失败',
          res.msg
        );
      }
    });
  }

}
