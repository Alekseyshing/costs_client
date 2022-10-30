export interface IAlert {
  alertText: string;
  alertStatus: string;
}

export interface IAlertProps {
  props: IAlert
}

export interface ISpinnerProps {
  top: number;
  left: number;
}

export interface ICost {
  text: string;
  price: number;
  date: Date | string;
  _id?: number | string;
}