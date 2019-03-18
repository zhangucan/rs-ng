import {DataField, DataType, RegPatterns} from '@er/types';
import {PHONE_FIELD} from '@shares';

export const User = {
  key: 'user',
  label: '用户',
  apiEntry: 'sys-user',
  fields: {
    empId: <DataField>{
      key: 'empId',
      label: '员工ID'
    },
    phone: PHONE_FIELD,
    userName: <DataField>{
      key: 'userName',
      label: '用户名'
    },
    roles: <DataField>{
      key: 'roles',
      label: '角色',
      dataType: DataType.List
    },
    permissions: <DataField>{
      key: 'permissions',
      label: '权限',
      pattern: RegPatterns.permission
    },
    isAdmin: <DataField>{
      key: 'isAdmin',
      label: '系统管理员',
      dataType: DataType.BOOLEAN,
      description: '拥有系统管理菜单操作权限'
    },
    isSu: <DataField>{
      key: 'isSu',
      label: '超级用户',
      dataType: DataType.BOOLEAN,
      description: '拥有系统数据删除操作权限'
    },
    state: <DataField>{
      key: 'state',
      label: '启用',
      dataType: DataType.BOOLEAN,
      description: '设置该用户的是否激活'
    },
    status: <DataField>{
      key: 'status',
      label: '当前状态',
      description: '显示用户的当前活动状态'
    },
    loginDate: <DataField>{
      key: 'loginDate',
      label: '最后登录',
      dataType: DataType.DATE
    },
    ip: <DataField>{
      key: 'ip',
      label: '登录ip'
    }
  }
};
