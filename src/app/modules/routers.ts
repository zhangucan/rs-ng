import {ErRoutes} from '@er/types';

export const ModulesRouters = <ErRoutes>[
  {path: 'sys', loadChildren: '../modules/sys/module#SysModule'},
  {path: 'org', loadChildren: '../modules/org/module#OrgModule'},
  {path: 'employee', loadChildren: '../modules/employee/module#EmployeeModule'},
  {path: 'dispatch', loadChildren: '../modules/dispatch/module#DispatchModule'},
  {path: 'recruit', loadChildren: '../modules/recruit/module#RecruitModule'},
  {path: 'financial', loadChildren: '../modules/financial/module#FinancialModule'},
  {path: 'performance', loadChildren: '../modules/performance/module#PerformanceModule'},
  {path: 'salary', loadChildren: '../modules/salary/module#SalaryModule'},
  {path: '', loadChildren: '../modules/dashboard/module#DashboardModule'},
];
