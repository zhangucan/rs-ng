import {ApiDataProps, DataAttr, DataField, DataItemProps, DataType} from '@er/types';
import {ORG_FIELD} from '@shares';
import {Employer} from './employer';
import {Staff} from './staff';

export const Enroll = {
  name: 'enroll',
  apiEntry: 'dispatch-enroll',
  label: '派遣入职员工',
  fields: {
    org: ORG_FIELD,
    bizDate: <DataField>{
      key: 'bizDate',
      label: '业绩获取日期',
      dataType: DataType.DATE,
      dataAttr: DataAttr.DATE,
      required: true
    },
    employer: {
      key: 'employer',
      label: '入职单位',
      defaultKey: Employer.fields.name.key,
      refer: {
        id: {key: 'id'},
        name: {key: Employer.fields.name.key}
      },
      apiDataProps: <ApiDataProps>{
        apiEntry: Employer.apiEntry,
        searchFields: Employer.fields.name.key,
        returnFields: [Employer.fields.name.key, 'id']
      },
      dataItemProps: <DataItemProps>{
        labelKey: Employer.fields.name.key,
        valueKey: ['id', Employer.fields.name.key]
      },
      required: true
    },
    isAgent: {
      key: 'isAgent',
      label: '代招',
      dataType: DataType.BOOLEAN,
      defaultValue: false
    },
    agent: {
      // ...TeamRef,
      key: 'agent',
      label: '代招项目组',
      description: '此项为负责相应客户的项目组名称'
    },
    amount: <DataField>{
      key: 'amount',
      label: '业绩金额',
      dataAttr: DataAttr.CURRENCY,
      required: true
    },
    staff: Staff,
    createdDate: <DataField>{
      key: 'createdDate',
      label: '填写日期',
      dataType: DataType.DATE,
      required: true
    }
  }
};
