import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../management.service';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {Page} from '../../interface/page';
import {TeacherInfo} from '../../interface/vo/teacherInfo';
import {Department} from '../../interface/vo/department';
import {JobTitle} from '../../interface/vo/jobTitle';
import {Job} from '../../interface/vo/job';

@Component({
  selector: 'app-edu-experience-info',
  templateUrl: './edu-experience-info.component.html',
  styleUrls: ['./edu-experience-info.component.scss']
})
export class EduExperienceInfoComponent implements OnInit {

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
  teacherInfoListOfData: TeacherInfo[] = [];
  isLoading = false;
  // 教师信息,用于保存和编辑
  teacherInfoFormData: TeacherInfo = {
    teacherName: '',
    deptId: null,
    jobId: null,
    jobTitleId: null,
    email: '',
    contact: ''
  };
  teacherEdit = false;
  formStatus = {
    type: 'default',
    errorMsg: ''
  };
  // 全部部门
  departmentList: Department[];
  // 全部职称
  jobTitleList: JobTitle[];
  // 全部职务
  jobList: Job[];
  // 添加弹框
  isShowAddModel = false;
  ngOnInit(): void {
    this.getData(this.pageInfo);

  }

  getData(page: Page): void {
    this.manageService.getTeacherInfo(page).subscribe(res => {
      console.log(res);
      if (res.code === 0) {
        const data = res.data;
        this.pageInfo.size = data.teacherPage.size;
        this.pageInfo.number = data.teacherPage.number;
        this.pageInfo.totalElements = data.teacherPage.totalElements;
        this.pageInfo.totalPages = data.teacherPage.totalPages;
        this.teacherInfoListOfData = data.teacherPage.content;
        this.pageInfo.numberOfElements = data.teacherPage.numberOfElements;
        this.departmentList = res.data.department;
        this.jobTitleList = res.data.jobTitle;
        this.jobList = res.data.job;
        this.teacherInfoFormData = {
          deptId: this.departmentList[0].id,
          jobTitleId: this.jobTitleList[0].id,
          jobId: this.jobList[0].id
        };
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
    this.manageService.deleteTeacherInfo(id).subscribe(res => {
      if (res.code === 0) {
        let newTeacherInfoList = [];
        this.teacherInfoListOfData.forEach(item => {
          if (item.id !== id) {
            newTeacherInfoList = [...newTeacherInfoList, item];
          }
        });
        this.teacherInfoListOfData = newTeacherInfoList;
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
    // 邮箱正则
    const emailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
    // 手机号正则
    const phoneReg = /^1[3-9]\d{9}$/;
    if (this.teacherInfoFormData.teacherName === '') {
      this.notification.create(
        'error',
        '添加失败',
        '教师姓名不能为空'
      );
      return;
    }
    if (this.teacherInfoFormData.deptId === null) {
      this.notification.create(
        'error',
        '添加失败',
        '请选择该教师所属部门'
      );
      return;
    }
    if (this.teacherInfoFormData.jobTitleId === null) {
      this.notification.create(
        'error',
        '添加失败',
        '请选择该教师职称'
      );
      return;
    }
    if (this.teacherInfoFormData.jobId === null) {
      this.notification.create(
        'error',
        '添加失败',
        '请选择该教师职务'
      );
      return;
    }
    if (this.teacherInfoFormData.email === '') {
      this.notification.create(
        'error',
        '添加失败',
        '电子邮箱不能为空'
      );
      return;
    } else if (!emailReg.test(this.teacherInfoFormData.email)) {
      this.notification.create(
        'error',
        '添加失败',
        '电子邮箱格式不正确'
      );
      return;
    }
    if (this.teacherInfoFormData.contact === '') {
      this.notification.create(
        'error',
        '添加失败',
        '联系方式(手机号)不能为空'
      );
      return;
    } else if (!phoneReg.test(this.teacherInfoFormData.contact)) {
      this.notification.create(
        'error',
        '添加失败',
        '请输入正确的手机号'
      );
      return;
    }
    this.isLoading = true;
    this.teacherEdit = false;
    if (this.teacherEdit) {
      this.updateTeacher();
    } else {
      this.addTeacher();
    }
  }
  addTeacher() {
    this.manageService.addTeacherInfo(this.teacherInfoFormData).subscribe(res => {
      this.isLoading = false;
      if (res.code === 0) {
        this.notification.create(
          'success',
          '成功',
          '添加成功'
        );
        this.isShowAddModel = false;
        this.teacherInfoFormData = {
          deptId: this.departmentList[0].id,
          jobTitleId: this.jobTitleList[0].id,
          jobId: this.jobList[0].id,
          teacherName: '',
          email: '',
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
    this.manageService.updateTeacherInfo(this.teacherInfoFormData).subscribe(res => {
      this.isLoading = false;
      if (res.code === 0) {
        this.notification.create(
          'success',
          '成功',
          '修改成功'
        );
        this.isShowAddModel = false;
        this.teacherInfoFormData = {
          deptId: this.departmentList[0].id,
          jobTitleId: this.jobTitleList[0].id,
          jobId: this.jobList[0].id,
          teacherName: '',
          email: '',
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
  editTeacher(id: number) {
    this.teacherEdit = true;
    const index = this.teacherInfoListOfData.findIndex(item => item.id === id);
    console.log(index);
    console.log(this.teacherInfoListOfData[index]);
    // 取消双向数据绑定
    const str = JSON.stringify(this.teacherInfoListOfData[index]);
    this.teacherInfoFormData = JSON.parse(str);
    this.isShowAddModel = true;
  }
  handleCancel() {
    this.isShowAddModel = false;
    this.formStatus.type = 'default';
  }

}
