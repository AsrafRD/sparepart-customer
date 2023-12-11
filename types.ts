export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  stock: string;
  weight: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  vehicleBrand: VehicleBrand;
  vehicleType: VehicleType;
  productBrand: ProductBrand;
  images: Image[];
  quantity?:  number;
  
}

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: { url: string }[];
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface VehicleBrand {
  id: string;
  name: string;
}

export interface VehicleType {
  id: string;
  name: string;
}

export interface ProductBrand {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Order {
  id: String;
  isPaid: Boolean;
  buyerName: String;
  phone: String;
  address: String;
  Email: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface orderItem {
  id:       String;
  orderId:   String;
  order:     Order[];   
  productId: String;
  product:   Product[]; 
  quantity?:  number;
}

export interface Indication {
  id: string;
  kode: string;
  name: string;
}

export interface Problem {
  id: string;
  kode: string;
  name: string;
}