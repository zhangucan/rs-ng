import {ApiDataProps, DataAttr, DataField, DataItemProps, DataType} from '@er/types';
import {ORG_FIELD} from '@shares';
import {Employer} from './employer';

export const EnrollDetail = {
  name: 'enrollDetail',
  apiEntry: 'dispatch-enroll-detail',
  label: '派遣入职员工明细',
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
    self: {
      key: 'self',
      label: '自招',
      dataType: DataType.NUMBER,
      defaultValue: 0
    },
    agent: {
      key: 'agent',
      label: '代招',
      dataType: DataType.NUMBER,
      defaultValue: 0
    },
    inner: {
      key: 'inner',
      label: '内招',
      dataType: DataType.NUMBER,
      defaultValue: 0
    },
    competitor: {
      key: 'competitor',
      label: '竞争对手',
      dataType: DataType.List,
      defaultValue: [],
      name: {
        key: 'name',
        label: '对手名称'
      },
      amount: {
        key: 'amount',
        label: '入职人数',
        dataType: DataType.NUMBER,
        defaultValue: 0
      }
    },
    brand: {
      key: 'brand',
      label: '品牌',
      customer: {
        key: 'customer',
        label: '客户'
      },
      staff: {
        key: 'staff',
        label: '员工'
      },
      competitor: {
        key: 'competitor',
        label: '对手'
      }
    },
    portion: {
      key: 'portion',
      label: '份额',
      suggestion: {
        key: 'suggestion',
        label: '建议意见',
        placeholder: '请就如何提高公司市场份额，提出你的建议和意见',
        dataAttr: DataAttr.TEXT
      }
    },
    staff: {
      key: 'staff',
      label: '员工',
      absence: {
        key: 'absence',
        label: '缺勤率',
        dataAttr: DataAttr.PERCENT
      },
      leave: {
        key: 'leave',
        label: '离职率',
        dataAttr: DataAttr.PERCENT
      },
      contribution: {
        key: 'contribution',
        label: '贡献率',
        dataAttr: DataAttr.PERCENT
      }
    }
  }
};
