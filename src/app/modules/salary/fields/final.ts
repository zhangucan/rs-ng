import {DataAttr, DataField, DataType} from '@er/types';
import {OrgEmpRef} from '../../commons/refer';

export const final = {
  name: 'salaryMonthly',
  apiEntry: 'salary-monthly',
  label: '工资数据',
  fields: {
    ...OrgEmpRef,
    incoming: <DataField>{
      key: 'incoming',
      label: '收入',
      dataAttr: DataAttr.CURRENCY,
      required: true
    },
    // position: <DataField>{
    //   key: 'position',
    //   label: '岗位',
    //   dataAttr: DataAttr.CURRENCY,
    //   required: true
    // },
    // breach: <DataField>{
    //   key: 'breach',
    //   label: '担责',
    //   dataAttr: DataAttr.CURRENCY,
    //   required: true
    // },
    // status: <DataField>{
    //   key: 'status',
    //   label: '状态',
    //   dataAttr: DataAttr.CURRENCY,
    //   required: true
    // },
    // start: <DataField>{
    //   key: 'start',
    //   label: '开始',
    //   dataType: DataType.DATE,
    //   required: true
    // },
    // to: <DataField>{
    //   key: 'to',
    //   label: '结束',
    //   dataType: DataType.DATE,
    //   required: true
    // },
    // recall: <DataField>{
    //   key: 'recall',
    //   label: '划回',
    //   dataType: DataType.NUMBER,
    //   required: true,
    //   min: 0
    // },
    cost: <DataField>{
      key: 'cost',
      label: '支出',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    profit: <DataField>{
      key: 'profit',
      label: '利润',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    deductionInCash: <DataField>{
      key: 'deductionInCash',
      label: '现金扣款',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    should: <DataField>{
      key: 'should',
      label: '应出勤',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    acture: <DataField>{
      key: 'acture',
      label: '实出勤',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    // deductionInCash: <DataField>{
    //   key: 'deductionInCash',
    //   label: '现金扣款',
    //   dataType: DataType.NUMBER,
    //   required: true,
    //   min: 0
    // },
    // managementDailyCost: <DataField>{
    //   key: 'managementDailyCost',
    //   label: '管理成本',
    //   dataType: DataType.NUMBER,
    //   required: true,
    //   min: 0
    // },
    // deptDailyCost: <DataField>{
    //   key: 'deptDailyCost',
    //   label: '部门成本',
    //   dataType: DataType.NUMBER,
    //   required: true,
    //   min: 0
    // },
    // resumeCost: <DataField>{
    //   key: 'resumeCost',
    //   label: '简历成本',
    //   dataType: DataType.NUMBER,
    //   required: true,
    //   min: 0
    // },
    commission: <DataField>{
      key: 'commission',
      label: '提成佣金',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    // commissionRate: <DataField>{
    //   key: 'commissionRate',
    //   label: '提成比率',
    //   dataType: DataType.NUMBER,
    //   required: true,
    //   min: 0
    // },
    // minMonthlySalary: <DataField>{
    //   key: 'minMonthlySalary',
    //   label: '月最低工资',
    //   dataType: DataType.NUMBER,
    //   required: true,
    //   min: 0
    // },
    // minSalary: <DataField>{
    //   key: 'minSalary',
    //   label: '最低工资',
    //   dataType: DataType.NUMBER,
    //   required: true,
    //   min: 0
    // },
    // fullSalary: <DataField>{
    //   key: 'fullSalary',
    //   label: '全勤工资',
    //   dataType: DataType.NUMBER,
    //   required: true,
    //   min: 0
    // },
    salary: <DataField>{
      key: 'salary',
      label: '税前工资(虚拟)',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    loss: <DataField>{
      key: 'loss',
      label: '亏损',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    }
    // laborCost: <DataField>{
    //   key: 'laborCost',
    //   label: '人力成本',
    //   dataType: DataType.NUMBER,
    //   required: true,
    //   min: 0
    // }
  }
};
