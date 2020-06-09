import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../management.service';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {Page} from '../../interface/page';
import {TeacherFamilyMember} from '../../interface/vo/teacherFamilyMember';
import {TeacherInfo} from '../../interface/vo/teacherInfo';

@Component({
  selector: 'app-teacher-family-info',
  templateUrl: './teacher-family-info.component.html',
  styleUrls: ['./teacher-family-info.component.scss']
})
export class TeacherFamilyInfoComponent implements OnInit {

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
  teacherFamilyListOfData: TeacherFamilyMember[] = [];
  isLoading = false;
  // 教师信息,用于保存和编辑
  teacherFamilyFormData: TeacherFamilyMember = {
    relationship: '',
    teacherId: null,
    memberName: '',
    contact: ''
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
    this.manageService.getTeacherFamily(page).subscribe(res => {
      console.log(res);
      if (res.code === 0) {
        const data = res.data;
        console.log(res);
        this.pageInfo.size = data.familyPage.size;
        this.pageInfo.number = data.familyPage.number;
        this.pageInfo.totalElements = data.familyPage.totalElements;
        this.pageInfo.totalPages = data.familyPage.totalPages;
        this.teacherFamilyListOfData = data.familyPage.content;
        this.pageInfo.numberOfElements = data.familyPage.numberOfElements;
        this.teacherList = data.teachers;
        this.teacherFamilyFormData.teacherId = this.teacherList[0].id;
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
    this.manageService.deleteTeacherFamily(id).subscribe(res => {
      if (res.code === 0) {
        let newTeacherFamilyMemberList = [];
        this.teacherFamilyListOfData.forEach(item => {
          if (item.id !== id) {
            newTeacherFamilyMemberList = [...newTeacherFamilyMemberList, item];
          }
        });
        this.teacherFamilyListOfData = newTeacherFamilyMemberList;
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
    // 手机号正则
    const phoneReg = /^1[3-9]\d{9}$/;
    if (this.teacherFamilyFormData.teacherId === null) {
      this.notification.create(
        'error',
        '失败',
        '教师姓名不能为空'
      );
      return;
    }
    if (this.teacherFamilyFormData.relationship === '') {
        this.notification.create(
          'error',
          '失败',
          '与教师关系不能为空'
        );
        return;
    }
    if (this.teacherFamilyFormData.memberName === '') {
      this.notification.create(
        'error',
        '失败',
        '家庭成员姓名不能为空'
      );
      return;
    }
    if (this.teacherFamilyFormData.contact === '') {
      this.notification.create(
        'error',
        '失败',
        '联系方式(手机号)不能为空'
      );
      return;
    } else if (!phoneReg.test(this.teacherFamilyFormData.contact)) {
      this.notification.create(
        'error',
        '失败',
        '请输入正确的手机号'
      );
      return;
    }
    this.isLoading = true;
    this.familyEdit = false;
    if (this.familyEdit) {
      this.updateTeacher();
    } else {
      this.addFamily();
    }
  }
  addFamily() {
    this.manageService.addTeacherFamily(this.teacherFamilyFormData).subscribe(res => {
      this.isLoading = false;
      if (res.code === 0) {
        this.notification.create(
          'success',
          '成功',
          '添加成功'
        );
        this.isShowAddModel = false;
        this.teacherFamilyFormData = {
          memberName: '',
          relationship: '',
          teacherId: this.teacherList[0].id,
          contact: ''
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
    this.manageService.updateTeacherFamily(this.teacherFamilyFormData).subscribe(res => {
      this.isLoading = false;
      if (res.code === 0) {
        this.notification.create(
          'success',
          '成功',
          '修改成功'
        );
        this.isShowAddModel = false;
        this.teacherFamilyFormData = {
          memberName: '',
          relationship: '',
          teacherId: this.teacherList[0].id,
          contact: ''
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
  editFamily(id: number) {
    this.familyEdit = true;
    const index = this.teacherFamilyListOfData.findIndex(item => item.id === id);
    console.log(index);
    console.log(this.teacherFamilyListOfData[index]);
    // 取消双向数据绑定
    const str = JSON.stringify(this.teacherFamilyListOfData[index]);
    this.teacherFamilyFormData = JSON.parse(str);
    this.isShowAddModel = true;
  }
  handleCancel() {
    this.isShowAddModel = false;
    this.formStatus.type = 'default';
  }

}
