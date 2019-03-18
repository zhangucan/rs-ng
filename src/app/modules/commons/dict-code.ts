export const DICT_CODES = {
  DATA_CODE_TYPE: {
    catCode: '001',
    codes: {
      SYS: '001',
      USER: '002'
    }
  },
  ORG_TYPE: {
    catCode: '002',
    code: {
      CORP: 2,
      DEPT: 3,
      TEAM: 4,
      GROUP: 5
    }
  },
  DEPT: {
    catCode: '',
    code: {
      DISPATCH: '',  // 派遣部
      HR: '',  // 人事部
      FINANCE: '', // 财务部
      RECRUIT: '', // 招聘部
      TECH: '' // 技术部
    }
  },
  USER_ROLE: {
    catCode: '002',
    codes: {
      SENIOR: '001', // 公司高管 => corp
      DIRECTOR: '002', // 项目总监 => teams?
      MANAGER: '003', // 部门经理 => dept
      LEADER: '004',  // 项目组长 => team
      HEADER: '005',  // 小组长 => group
      EMPLOYEE: '006'  // 员工 => self
    },
    names: {
      '001': '公司高管',
      '002': '项目总监',
      '003': '部门经理',
      '004': '项目组长',
      '005': '小组长',
      '006': '员工'
    }
  },
  GENDER: {
    catCode: '091'
  },
  ORG_CHANGE_TYPE: {
    catCode: '008'
  },
  EMPLOYEE_STATUS: {
    catCode: '007',
    codes: {
      current: {
        name: '在职',
        code: '002'
      }
    }
  },
  EMPLOYEE_POST: {
    catCode: '005'
  },
  EMPLOYEE_LEVEL: {
    catCode: '004',
    employee: {
      name: '员工',
      code: '006'
    }
  },
  KPI_TYPE: {
    catCode: '009'
  },
  ACHIEVEMENT_TYPE: {
    catCode: '010'
  }
};
