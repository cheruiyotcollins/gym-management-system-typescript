export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  ratingDto: {
    rate: number;
    count: number;
  };
}

export interface IFilterParams {
  q: string;
  category: string[];
  sortBy: string;
}
