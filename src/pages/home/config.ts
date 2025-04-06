export const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "MENSCLOTHING", label: "Men's clothing" },
      { value: "JEWELERY", label: "Jewelery" },
      { value: "ELECTRONICS", label: "Electronics" },
      { value: "WOMENSMENSCLOTHING", label: "Women's clothing" },
    ],
  },
];

export const sortOptions = [
  { label: "Best Rating", name: "rating", current: false },
  { label: "Price: Low to High", name: "price_low_high", current: false },
  { label: "Price: High to Low", name: "price_high_low", current: false },
];
