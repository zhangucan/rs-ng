import * as _ from 'lodash';
import {assert} from 'chai';
import {StaffPosition} from '@uranplus/cavalry-define';
import {getStaffPositionSlice} from './dao/staff-position';

const start = '2018-11-01';
const end = '2018-12-01';
describe('StaffPosition', () => {
  it('getStaffPositionSlice(）1 should work', () => {
    const staffPositions = getStaffPositionSlice(start, end, require('./staff-list.1.json'));
    const staffPositionMap = _.groupBy(staffPositions, staffPosition => staffPosition.name);
    console.log('staffPositionMap-> 丁四海', staffPositionMap['丁四海']);
    assert.equal(staffPositionMap['张亮'].length, 1);
    assert.equal(staffPositionMap['丁四海'].length, 3);

    // 确认连续的任职周期
    assert.equal(staffPositionMap['丁四海'][1].end, staffPositionMap['丁四海'][0].start);
    assert.equal(staffPositionMap['丁四海'][0].end, staffPositionMap['丁四海'][2].start);
  });

  it('getStaffPositionSlice(）2 should work', () => {
    const staffPositions = getStaffPositionSlice(start, end, require('./staff-list.2.json'));
    const staffPositionMap = _.groupBy(staffPositions, staffPosition => staffPosition.name);
    console.log('staffPositionMap-> 谢小丽', staffPositionMap['谢小丽']);
    assert.equal(staffPositionMap['谢小丽'].length, 3);
    assert.equal(staffPositionMap['谢毛毛'].length, 1);
    assert.equal(staffPositionMap['小红'].length, 2);
    // 确认连续的任职周期
    assert.equal(staffPositionMap['谢小丽'][2].end, staffPositionMap['谢小丽'][0].start);
    assert.equal(staffPositionMap['谢小丽'][0].end, staffPositionMap['谢小丽'][1].start);
    // 确认leader
    assert.equal(staffPositionMap['谢小丽'][2].title, '员工');
    assert.equal(staffPositionMap['谢小丽'][0].title, '员工');
    assert.equal(staffPositionMap['谢小丽'][1].title, '主管');

    assert.equal(staffPositionMap['小红'][0].title, '员工');
    assert.equal(staffPositionMap['小红'][1].title, '主管');
  });

  it('getStaffPositionSlice(）when 员工->主管 should work', () => {
    const staffPositions: StaffPosition[] = getStaffPositionSlice(start, end, require('./staff-list.3.json'));
    console.log('staffPositions=', JSON.stringify(staffPositions, null, 2));
    assert.isTrue(staffPositions.every(staffPosition => staffPosition.teamCode === '001001015050'));
    assert.isTrue(staffPositions.every(staffPosition => staffPosition.manager === '谢毛毛'));
    const staffPositionMap: Map<string, StaffPosition[]> = _.groupBy(
      staffPositions,
      staffPosition => staffPosition.name
    );
    assert.equal(staffPositionMap['谢毛毛'].length, 1);
    expect(staffPositionMap['小红'].length).toEqual(1);
    assert.equal(staffPositionMap['小张'].length, 2);
    assert.deepEqual(staffPositions, require('./staff-positions.3.json'));
  });

  it('getStaffPositionSlice() of 泰康项目组 should work', () => {
    const staffPositions: StaffPosition[] = getStaffPositionSlice(start, end, require('./staff-list.tk.json'));
    assert.deepEqual(staffPositions, require('./staff-positions.tk.json'));
  });
});
