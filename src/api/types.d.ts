export interface IPerformance {
  url: string;
  dnst: number;
  tcpt: number;
  wit: number;
  domt: number;
  lodt: number;
  radt: number;
  rdit: number;
  uodt: number;
  reqt: number;
  andt: number;
}

export interface IRoleData {
  key: string;
  name: string;
  description: string;
  routes: any;
}

export interface ITransactionData {
  orderId: string;
  timestamp: string | number;
  username: string;
  price: number;
  status: string;
}

export interface IUserData {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  introduction: string;
  roles: string[];
}
