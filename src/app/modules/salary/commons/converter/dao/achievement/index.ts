import {Achievement, AchievementType, Recruitment} from '@uranplus/cavalry-define';
import * as esb from 'elastic-builder';
import {Enroll as EnrollFields} from 'src/app/modules/dispatch/fields/enroll';
import {Achievement as AchievementFields} from 'src/app/modules/performance/fields/achievement';
import {ApiUtils} from '@er/core';

const debug = require('debug')('converter/achievement');

const maxSize = 99999;

function getEsQuery(start, end, teamCodePrefix, dateKey) {
  if (teamCodePrefix) {
    return esb
      .boolQuery()
      .must(esb.prefixQuery('team.code', teamCodePrefix))
      .filter(
        esb
          .rangeQuery(dateKey)
          .lt(end)
          .gte(start)
      );
  } else {
    return esb
      .rangeQuery(dateKey)
      .lt(end)
      .gte(start);
  }
}

export async function getAchievements(
  start: string,
  end?: string,
  teamCodePrefix: string = null
): Promise<Achievement[]> {
  const achievementEntities = await ApiUtils.getByQuery(AchievementFields.apiEntry, {
    query: getEsQuery(start, end, teamCodePrefix, 'occurDate'),
    size: maxSize
  }).toPromise();
  let achievements = [];
  if (!!achievementEntities && achievementEntities.items instanceof Array) {
    achievements = achievementEntities.items.map(achievement => {
      achievement.type = achievement.achievementType.name;
      return getAchievementFromEntity(achievement);
    });
  }
  const recruitEntities = await ApiUtils.getByQuery(EnrollFields.apiEntry, {
    query: getEsQuery(start, end, teamCodePrefix, 'bizDate'),
    size: maxSize
  }).toPromise();
  let recruits = [];
  if (!!recruitEntities && recruitEntities.items instanceof Array) {
    recruits = recruitEntities.items.map(achievement => {
      achievement.type = AchievementType.RECRUITMENT;
      return getRecruitmentFromEntity(achievement);
    });
  }

  debug('recruits=', recruits, ' achievements=', achievements);
  return achievements.concat(recruits);
}

export function getAchievementFromEntity(entity): Achievement {
  return {
    date: entity.occurDate,
    value: entity.amount,
    employee: entity.emp.name,
    employeeId: entity.emp.empId,
    teamCode: entity.team.code,
    team: entity.team.name,
    type: entity.type
  };
}

export function getRecruitmentFromEntity(entity): Recruitment {
  let teamIn = null;
  let teamInCode = null;
  if (entity.isAgent) {
    if (entity.agent) {
      teamIn = entity.agent.name;
      teamInCode = entity.agent.code;
    } else {
      // TODO getRecruitmentFromEntity() agent is missing
      // console.warn('getRecruitmentFromEntity() agent is missing, entity=', entity);
    }
  } else {
    teamIn = entity.team.name;
    teamInCode = entity.team.code;
  }
  return Object.assign(getAchievementFromEntity(entity), {
    date: entity.bizDate,
    jobSeeker: {
      name: entity.staff.name,
      phoneNumber: entity.staff.phone
    },
    teamIn,
    teamInCode
  });
}
