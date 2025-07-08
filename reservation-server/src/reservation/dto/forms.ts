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

export interface IReservationSearchData {
  mobile?: string;
  from?: string;
  to?: string;
  minGuest?: number;
  maxGuest?: number;
  menuId?: number;
}
