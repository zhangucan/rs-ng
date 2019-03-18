export interface DailyPersonalResumeCost {
  name: string;
  date: string;
  value: number;
}

export interface UserResumeCost {
  name?: string; // 员工姓名
  start?: string; // 开始日期
  end?: string; // 结束日期
  count: number; // 使用量
  amount: number; //金额
  warn?: string;
}
