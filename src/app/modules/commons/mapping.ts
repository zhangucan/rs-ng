export const DIC_CAT_MAPPING = {
  GW: {
    code: '005',
    name: '岗位'
  },
  ZJ: {
    code: '004',
    name: '职级',
    YG: {
      code: '006'
    },
    ZG: {
      name: '主管'
    },
    JL: {
      name: '经理'
    },
  },
  KPI: {
    code: '009',
    name: '考核指标'
  },
  YJ: {
    code: '010',
    name: '业绩类型'
  },
  STATE: {
    code: '003',
    name: '使用状态'
  },
  EMP_STATUS: {
    code: '007',
    name: '员工异动状态',
    children: {
      RZ: {
        code: '001',
        name: '入职'
      },
      ZZ: {
        code: '002',
        name: '在职'
      },
      ZL: {
        code: '003',
        name: '自离'
      },
      LZ: {
        code: '004',
        name: '离职'
      },
    },
  },
  ORG_STATUS: {
    code: '008',
    name: '机构异动状态',
    children: {
      CL: {
        code: '001',
        name: '成立'
      },
      JS: {
        code: '002',
        name: '撤销'
      },
    },
  },
  SALARY_STATUS: {
    code: '006',
    name: '业绩审核状态',
    children: {
      DSH: {
        code: '001',
        name: '待审核'
      },
      TG: {
        code: '002',
        name: '通过'
      },
      BTG: {
        code: '003',
        name: '不通过'
      },
      BH: {
        code: '004',
        name: '驳回'
      },
      HH: {
        code: '005',
        name: '划回'
      },
    },
  },
};
