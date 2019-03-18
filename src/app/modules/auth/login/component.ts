import {Component, OnInit} from '@angular/core';
import {AbstractLoginComponent} from '@er/core';
import {PngAutoCompleteProps} from '@er/primeng';
import {CommonsUtils, ConfigUtils} from '@er/utils';
import {EMPLOYEE_NAME_DROPDOWN_PROPS} from '@shares';
import {interval, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  templateUrl: 'tpl.html',
  styleUrls: ['styles.scss']
})
export class LoginComponent extends AbstractLoginComponent implements OnInit {
  slogans = [
    '化人力为资本，人均能效最高之一',
    '成为持续发展100年以上的企业 ',
    '成为全国三大人力资源公司之一 ',
    '只要求职，就一定首选纳杰',
    '谁失责、谁买单 谁用权、谁担责 ',
    '功劳归于团队，问题归于自己 ',
    '不让实在人吃亏，不让取巧者得利 ',
    '小改进，大奖励 大建议，只鼓励 ',
    '拥抱变化 让听得见炮声的人做决策',
    '员工亏损、主管买单 主管亏损、经理买单 ',
    '经理亏损、相关职能部门买单',
    '任务分解到每一天、每个人、每件事，失责考核1.5R ',
    '千斤重担大家挑，一把手手上没指标',
    '话出一孔、力出一孔、利出一孔，三大纪律八项注意',
    '人才、品牌、份额、风险、利润',
    '忠诚、坚韧、担当、奉献、汗水、好学、自省 苦干实干梦想成真',
    '政府、客户、公司、员工、主管、经理多赢'
  ];
  appName = '';
  slogan$: Observable<string>;
  userSelector: {};

  ngOnInit() {
    super.ngOnInit();
    this.appName = ConfigUtils.getConfig().appName;
    this.slogan$ = interval(10000).pipe(
      startWith(CommonsUtils.getRandomNumber(this.slogans.length)),
      map(i => this.slogans[i % this.slogans.length])
    );
    this.userSelector = <PngAutoCompleteProps>{
      ...EMPLOYEE_NAME_DROPDOWN_PROPS,
      dropdown: false,
      placeholder: '输入您的姓名拼音首字母'
    };
  }

  getSubmitData(data) {
    return {
      [this.userToken]: data[this.userToken].name,
      [this.password]: data[this.password]
    };
  }
}
