import {StaffFruit} from './staff-fruit';
import {TeamFruit, visitFruitTree} from './team-fruit';

export async function flatTeamFruits(teamFruits: TeamFruit[]): Promise<Map<string, StaffFruit[]>> {
  const employeeFruitMap = new Map<string, StaffFruit[]>();
  await visitFruitTree(teamFruits, async (fruit: StaffFruit) => {
    if (employeeFruitMap.has(fruit.employee)) {
      employeeFruitMap.get(fruit.employee).push(fruit);
    } else {
      employeeFruitMap.set(fruit.employee, [fruit]);
    }
  });
  return employeeFruitMap;
}
