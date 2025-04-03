export interface ICartItem {
  id: number;
  title: string; // Changed from "productName" to match consistency
  price: number;
  quantity: number;
  subTotal: number;
  imageUrl: string;
}

export interface ICart {
  cartId: number;
  name: string;
  cartItemDtoList: ICartItem[];
  totalPrice: number;
}
