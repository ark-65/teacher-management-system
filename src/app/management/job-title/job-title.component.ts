import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../management.service';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {Page} from '../../interface/page';
import {JobTitle} from '../../interface/vo/jobTitle';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit {

  constructor(private manageService: ManagementService, private notification: NzNotificationService, private message: NzMessageService) {
  }

  pageInfo: Page = {
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0
  };
  editCache: { [key: string]: { edit: boolean; data: JobTitle } } = {};

  jobTitleListOfData: JobTitle[] = [];
  isAddModelShow = false;
  isLoading = false;
  jobTitleFormData: JobTitle = {
    jobTitleName: ''
  };
  formStatus = {
    type: 'default',
    errorMsg: ''
  };
  ngOnInit(): void {
    this.getData(this.pageInfo);

  }

  getData(page: Page): void {
    this.manageService.getJobTitle(page).subscribe(res => {
      if (res.code === 0) {
        const data = res.data;
        this.pageInfo.size = data.size;
        this.pageInfo.number = data.number;
        this.pageInfo.totalElements = data.totalElements;
        this.pageInfo.totalPages = data.totalPages;
        this.jobTitleListOfData = data.content;
        this.pageInfo.numberOfElements = data.numberOfElements;
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
    const index = this.jobTitleListOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: {...this.jobTitleListOfData[index]},
      edit: false
    };
  }

  saveEdit(id: number): void {
    console.log(this.editCache[id]);
    this.manageService.updateJobTitle(this.editCache[id].data).subscribe(res => {
      if (res.code === 0) {
        const index = this.jobTitleListOfData.findIndex(item => item.id === id);
        Object.assign(this.jobTitleListOfData[index], this.editCache[id].data);
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
    this.jobTitleListOfData.forEach(item => {
      console.log(item);
      this.editCache[item.id] = {
        edit: false,
        data: {...item}
      };
    });
  }
  // 确认删除按钮
  deleteConfirm(id: number): void {
    this.manageService.deleteJobTitle(id).subscribe(res => {
      if (res.code === 0) {
        let newJobTitleList = [];
        this.jobTitleListOfData.forEach(item => {
          if (item.id !== id) {
            newJobTitleList = [...newJobTitleList, item];
          }
        });
        this.jobTitleListOfData = newJobTitleList;
        // 如果当前页删除的是最后一条数据,返回上一页
        if (this.pageInfo.numberOfElements === 1) {
          this.pageIndexChange(this.pageInfo.number - 1);
        } else {
          this.getData(this.pageInfo);
        }
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
  // 添加弹框
  showAddModal() {
    this.isAddModelShow = true;
  }
  // 提交数据
  handleOk() {
    if (this.jobTitleFormData.jobTitleName === '') {
      this.formStatus.type = 'error';
      this.formStatus.errorMsg = '职称名称不能为空';
      return;
    }
    this.isLoading = true;
    this.manageService.addJobTitle(this.jobTitleFormData).subscribe(res => {
      if (res.code === 0) {
        this.notification.create(
          'success',
          '成功',
          '添加成功'
        );
        this.isAddModelShow = false;
        this.jobTitleFormData.jobTitleName = '';
        this.getData(this.pageInfo);
        this.formStatus.type = 'default';
      } else {
        this.formStatus.type = 'error';
        this.formStatus.errorMsg = res.msg;
      }
      this.isLoading = false;
    });
    // setTimeout(() => {
    //   this.isLoading = false;
    //   this.isAddModelShow = false;
    // }, 1000);
  }

  handleCancel() {
    this.isAddModelShow = false;
    this.formStatus.type = 'default';
  }

}
