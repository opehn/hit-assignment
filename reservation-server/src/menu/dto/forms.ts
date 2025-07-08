export interface IMenuCreateData {
  storeId: number;
  menuCategoryId: number;
  name: string;
  price: number;
  description: string;
}

export interface IMenuSearchData {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
}
