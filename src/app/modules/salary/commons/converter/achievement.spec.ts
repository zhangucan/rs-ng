import {assert} from 'chai';
import {StaffPosition} from '@uranplus/cavalry-define';
import {getStaffPositionSlice} from './dao/staff-position';
import {getAchievementSlice, getRecruitSlice} from './dao/achievement';

const start = '2018-11-01';
const end = '2018-12-01';
describe('achievement', () => {
  it('getAchievementSlice(） should work', () => {
    const staffPositions = getStaffPositionSlice(start, end, require('./staff-list.2.json'));
    const staffPositionMap = new Map<string, StaffPosition>();
    staffPositions.forEach(staffPosition => {
      staffPositionMap.set(staffPosition.id, staffPosition);
    });
    const achievements = getAchievementSlice(require('./achievement-list.2.json'), staffPositionMap);
    const recruits = getRecruitSlice(require('./achievement-list.1.json'), staffPositionMap);
    assert.isTrue(achievements.every(achievement => achievement.employee === '谢小丽'));
    assert.isTrue(recruits.every(recruit => recruit.employee === '谢小丽'));
    assert.isTrue(achievements.every(recruit => recruit.manager === '谢毛毛'));
    assert.isTrue(recruits.every(recruit => recruit.manager === '谢毛毛'));
    assert.equal(achievements.length, 2);
    assert.equal(recruits.length, 2);

    console.log('achievement', JSON.stringify(achievements));
    console.log('recruits', JSON.stringify(recruits));
  });
});
