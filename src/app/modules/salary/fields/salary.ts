import {DataAttr, DataField, DataType} from '@er/types';
import {OrgEmpRef} from '../../commons/refer';

export const Salary = {
  name: 'salaryEmployees',
  apiEntry: 'salary-employees',
  label: '工资数据',
  fields: {
    ...OrgEmpRef,
    incoming: <DataField>{
      key: 'incoming',
      label: '收入',
      dataAttr: DataAttr.CURRENCY,
      required: true
    },
    staffPosition: <DataField>{
      key: 'staffPosition',
      defaultKey: 'title',
      label: '职级',
      dataAttr: DataAttr.CURRENCY,
      required: true
    },
    team: <DataField>{
      key: 'staffPosition',
      defaultKey: 'team',
      label: '项目组',
      dataAttr: DataAttr.CURRENCY,
      required: true
    },
    breach: <DataField>{
      key: 'breach',
      label: '担责',
      dataAttr: DataAttr.CURRENCY,
      required: true
    },
    status: <DataField>{
      key: 'status',
      label: '状态',
      dataAttr: DataAttr.CURRENCY,
      required: true
    },
    start: <DataField>{
      key: 'start',
      label: '开始',
      dataType: DataType.DATE,
      required: true
    },
    end: <DataField>{
      key: 'end',
      label: '结束',
      dataType: DataType.DATE,
      required: true
    },
    recall: <DataField>{
      key: 'recall',
      label: '划回',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
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
    deduction: <DataField>{
      key: 'deduction',
      label: '扣款',
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
    managementDailyCost: <DataField>{
      key: 'managementDailyCost',
      label: '管理成本',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    deptDailyCost: <DataField>{
      key: 'deptDailyCost',
      label: '部门成本',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    resumeCost: <DataField>{
      key: 'resumeCost',
      label: '简历成本',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    commission: <DataField>{
      key: 'commission',
      label: '提成佣金',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    commissionRate: <DataField>{
      key: 'commissionRate',
      label: '提成比率',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    minMonthlySalary: <DataField>{
      key: 'minMonthlySalary',
      label: '月最低工资',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    minSalary: <DataField>{
      key: 'minSalary',
      label: '最低工资',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    should: <DataField>{
      key: 'attendance',
      defaultKey: 'should',
      label: '应出勤',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    acture: <DataField>{
      key: 'attendance',
      defaultKey: 'acture',
      label: '实出勤',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    fullSalary: <DataField>{
      key: 'fullSalary',
      label: '全勤工资',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
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
    },
    laborCost: <DataField>{
      key: 'laborCost',
      label: '人力成本',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    staffLaborCost: <DataField>{
      key: 'staffLaborCost',
      label: '下属员工成本',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    },
    staffSalary: <DataField>{
      key: 'staffSalary',
      label: '下属员工工资',
      dataType: DataType.NUMBER,
      required: true,
      min: 0
    }
  }
};
