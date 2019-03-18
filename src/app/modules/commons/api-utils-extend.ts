import {ApiUtils} from '@er/core';

export async function saveJsonToDb(json, _index, _type = 'type') {
  while (json.length > 0) {
    const entities = json.splice(0, 200);
    const prologue = {index: {_index, _type}};
    const bulkBody = entities.reduce((body, salary) => {
      return body + JSON.stringify(prologue) + '\n' + JSON.stringify(salary) + '\n';
    }, '');
    await ApiUtils.batch(_index, bulkBody).toPromise();
  }
}
