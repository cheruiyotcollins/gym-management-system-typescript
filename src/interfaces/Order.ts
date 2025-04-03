export interface IOrderProductDto {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: number;
  userId: number;
  productId: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentProvider: string | null;
  createdOn: string; // This can remain as a string, or you can convert it to a Date if needed
  shippedOn: string;
}

export interface IOrderResponse {
  status: string;
  description: string;
  payload: IOrder[];
}
