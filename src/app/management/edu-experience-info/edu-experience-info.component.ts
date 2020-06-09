import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../management.service';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {Page} from '../../interface/page';
import {TeacherInfo} from '../../interface/vo/teacherInfo';
import {EduExperienceInfo} from '../../interface/vo/eduExperienceInfo';
import {format} from 'date-fns';

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
  EduExperienceListOfData: EduExperienceInfo[] = [];
  isLoading = false;
  // 开始时间
  startTime: Date;
  // 结束时间
  endTime: Date;
  // 教师信息,用于保存和编辑
  eduExperienceFormData: EduExperienceInfo = {
    startTime: '',
    endTime: '',
    teacherId: null,
    schoolName: '',
    education: '',
    eduType: ''
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
  // 时间改变时获取
  onChangeForStartTime(result: Date): void {
    console.log('onChange: ', result, format(result, 'yyyy-MM-dd'));
  }
  onChangeForEndTime(result: Date): void {
    console.log('onChange: ', result, format(result, 'yyyy-MM-dd'));
  }
  getData(page: Page): void {
    this.manageService.getEduExperience(page).subscribe(res => {
      if (res.code === 0) {
        const data = res.data;
        this.pageInfo.size = data.eduPage.size;
        this.pageInfo.number = data.eduPage.number;
        this.pageInfo.totalElements = data.eduPage.totalElements;
        this.pageInfo.totalPages = data.eduPage.totalPages;
        this.EduExperienceListOfData = data.eduPage.content;
        this.pageInfo.numberOfElements = data.eduPage.numberOfElements;
        this.teacherList = data.teachers;
        this.eduExperienceFormData.teacherId = this.teacherList[0].id;
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
    this.manageService.deleteEduExperience(id).subscribe(res => {
      if (res.code === 0) {
        let newEduExperienceInfoList = [];
        this.EduExperienceListOfData.forEach(item => {
          if (item.id !== id) {
            newEduExperienceInfoList = [...newEduExperienceInfoList, item];
          }
        });
        this.EduExperienceListOfData = newEduExperienceInfoList;
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
    if (this.eduExperienceFormData.teacherId === null) {
      this.notification.create(
        'error',
        '失败',
        '教师姓名不能为空'
      );
      return;
    }
    if (this.startTime === null) {
      this.notification.create(
        'error',
        '失败',
        '学校入学时间不能为空'
      );
      return;
    } else {
      this.eduExperienceFormData.startTime = format(this.startTime, 'yyyy-MM-dd');
    }
    if (this.endTime === null) {
      this.notification.create(
        'error',
        '失败',
        '学校毕业时间不能为空'
      );
      return;
    } else {
      this.eduExperienceFormData.endTime = format(this.endTime, 'yyyy-MM-dd');
    }
    if (this.eduExperienceFormData.schoolName === '') {
      this.notification.create(
        'error',
        '失败',
        '学校名称不能为空'
      );
      return;
    }
    if (this.eduExperienceFormData.education === '') {
      this.notification.create(
        'error',
        '失败',
        '教育学历不能为空'
      );
      return;
    }
    if (this.eduExperienceFormData.eduType === '') {
      this.notification.create(
        'error',
        '失败',
        '学历类型不能为空'
      );
      return;
    }
    console.log(this.eduExperienceFormData);
    this.isLoading = true;
    this.familyEdit = false;
    if (this.familyEdit) {
      this.updateTeacher();
    } else {
      this.addFamily();
    }
  }
  addFamily() {
    this.manageService.addEduExperience(this.eduExperienceFormData).subscribe(res => {
      this.isLoading = false;
      if (res.code === 0) {
        this.notification.create(
          'success',
          '成功',
          '添加成功'
        );
        this.isShowAddModel = false;
        this.eduExperienceFormData = {
          startTime: '',
          endTime: '',
          schoolName: '',
          education: '',
          eduType: '',
          teacherId: this.teacherList[0].id
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
    this.manageService.updateEduExperience(this.eduExperienceFormData).subscribe(res => {
      this.isLoading = false;
      if (res.code === 0) {
        this.notification.create(
          'success',
          '成功',
          '修改成功'
        );
        this.isShowAddModel = false;
        this.eduExperienceFormData = {
          startTime: '',
          endTime: '',
          schoolName: '',
          education: '',
          eduType: '',
          teacherId: this.teacherList[0].id
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
    const index = this.EduExperienceListOfData.findIndex(item => item.id === id);
    console.log(index);
    console.log(this.EduExperienceListOfData[index]);
    // 取消双向数据绑定
    const str = JSON.stringify(this.EduExperienceListOfData[index]);
    this.eduExperienceFormData = JSON.parse(str);
    this.isShowAddModel = true;
  }
  handleCancel() {
    this.isShowAddModel = false;
    this.formStatus.type = 'default';
  }

}
