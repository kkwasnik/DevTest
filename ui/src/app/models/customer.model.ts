export interface Customer {
  customerId: Number;
  customer: string;
  type: any;
}

export enum CustomerType {
  Small = 1,
  Large = 2
}
