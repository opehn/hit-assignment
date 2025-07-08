export interface IReservationCreateData {
  storeId: number;
  date: string;
  startTime: string;
  endTime: string;
  mobile: string;
  guestCount: number;
  menuIds: number[];
}

export interface IReservationUpdateData {
  guestCount?: number;
  menuIds?: number[];
}
