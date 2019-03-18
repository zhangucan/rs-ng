import {RecruitmentRecall} from '@uranplus/cavalry-define';
import {ApiUtils} from '@er/core';
import {Recall as RecallFields} from 'src/app/modules/financial/fields/recall';
import esb = require('elastic-builder');
import moment = require('moment');

const debug = require('debug')('converter/recruitment-recall');

export async function getRecruitmentRecalls(start: string, end: string): Promise<RecruitmentRecall[]> {
  const month = moment(start)
    .startOf('month')
    .format('YYYY-MM-DD');

  return (await getRecallEntities(month)).map(getRecallFromEntity);
}
const maxSize = 99999;
export async function getRecallEntities(month: string): Promise<any[]> {
  return ApiUtils.getByQuery(RecallFields.apiEntry, {
    query: esb.termQuery('month', month),
    size: maxSize
  })
    .toPromise()
    .then(resp => {
      if (!!resp && resp.items instanceof Array) {
        return resp.items;
      } else {
        return [];
      }
    });
}

export function getRecallFromEntity(entity): RecruitmentRecall {
  return {
    jobSeeker: {
      name: entity.staff.name,
      phoneNumber: entity.staff.phone,
      gender: entity.staff.gender ? entity.staff.gender.name : null,
      idCardNo: entity.staff.idCard
    },
    createDate: entity.createdDate,
    leaveDate: entity.dismissDate,
    value: entity.amount,
    employee: entity.employee.name,
    leader: entity.leader ? entity.leader.name : null,
    month: entity.month
  };
}
