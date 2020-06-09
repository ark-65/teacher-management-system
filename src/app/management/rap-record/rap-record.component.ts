import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../management.service';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {Page} from '../../interface/page';
import {TeacherFamilyMember} from '../../interface/vo/teacherFamilyMember';
import {TeacherInfo} from '../../interface/vo/teacherInfo';
import {RapRecord} from '../../interface/vo/rapRecord';
import {format} from "date-fns";

@Component({
  selector: 'app-rap-record',
  templateUrl: './rap-record.component.html',
  styleUrls: ['./rap-record.component.scss']
})
export class RapRecordComponent implements OnInit {

  constructor(private manageService: ManagementService,
              private notification: NzNotificationService,
              private message: NzMessageService) {
  }
  // form control
  pageInfo: Page = {
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0
  };
  rapRecordListOfData: RapRecord[] = [];
  isLoading = false;
  // 教师信息,用于保存和编辑
  rapRecordFormData: RapRecord = {
    rapType: '',
    teacherId: null,
    remarks: ''
  };
  familyEdit = false;
  formStatus = {
    type: 'default',
    errorMsg: ''
  };
  // 全部教师
  teacherList: TeacherInfo[];
  // 添加弹框
  isShowAddModel = false;
  ngOnInit(): void {
    this.getData(this.pageInfo);

  }

  getData(page: Page): void {
    this.manageService.getRapRecord(page).subscribe(res => {
      if (res.code === 0) {
        const data = res.data;
        this.pageInfo.size = data.rapRecordPage.size;
        this.pageInfo.number = data.rapRecordPage.number;
        this.pageInfo.totalElements = data.rapRecordPage.totalElements;
        this.pageInfo.totalPages = data.rapRecordPage.totalPages;
        this.rapRecordListOfData = data.rapRecordPage.content;
        this.pageInfo.numberOfElements = data.rapRecordPage.numberOfElements;
        this.teacherList = data.teachers;
        this.rapRecordFormData.teacherId = this.teacherList[0].id;
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

  // 确认删除按钮
  deleteConfirm(id: number): void {
    this.manageService.deleteRapRecord(id).subscribe(res => {
      if (res.code === 0) {
        let newRapRecordList = [];
        this.rapRecordListOfData.forEach(item => {
          if (item.id !== id) {
            newRapRecordList = [...newRapRecordList, item];
          }
        });
        this.rapRecordListOfData = newRapRecordList;
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
    this.isShowAddModel = true;
  }
  // 确认提交
  handleOk() {
    if (this.rapRecordFormData.teacherId === null) {
      this.notification.create(
        'error',
        '失败',
        '教师姓名不能为空'
      );
      return;
    }
    if (this.rapRecordFormData.rapType === '') {
      this.notification.create(
        'error',
        '失败',
        '奖惩类型不能为空'
      );
      return;
    }
    if (this.rapRecordFormData.remarks === '') {
      this.notification.create(
        'error',
        '失败',
        '奖惩备注不能为空'
      );
      return;
    }
    this.rapRecordFormData.createTime = format(new Date(), 'yyyy-MM-dd');
    this.isLoading = true;
    this.familyEdit = false;
    if (this.familyEdit) {
      this.updateTeacher();
    } else {
      this.addRapRecord();
    }
  }
  addRapRecord() {
    this.manageService.addRapRecord(this.rapRecordFormData).subscribe(res => {
      this.isLoading = false;
      if (res.code === 0) {
        this.notification.create(
          'success',
          '成功',
          '添加成功'
        );
        this.isShowAddModel = false;
        this.rapRecordFormData = {
          remarks: '',
          rapType: '奖励',
          teacherId: this.teacherList[0].id,
          createTime: ''
        };
        this.getData(this.pageInfo);
      } else {
        this.notification.create(
          'error',
          '添加失败',
          res.msg
        );
      }
    });
  }

  updateTeacher() {
    this.manageService.updateRapRecord(this.rapRecordFormData).subscribe(res => {
      this.isLoading = false;
      if (res.code === 0) {
        this.notification.create(
          'success',
          '成功',
          '修改成功'
        );
        this.isShowAddModel = false;
        this.rapRecordFormData = {
          remarks: '',
          rapType: '奖励',
          teacherId: this.teacherList[0].id,
          createTime: ''
        };
        this.getData(this.pageInfo);
      } else {
        this.notification.create(
          'error',
          '修改失败',
          res.msg
        );
      }
    });
  }
  handleCancel() {
    this.isShowAddModel = false;
    this.formStatus.type = 'default';
  }

}
