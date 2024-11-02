export interface Product {
  id: number;
  name: string;
  team: string;
  player?: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface SizeGuide {
  size: string;
  chest: string;
  length: string;
  shoulder: string;
}