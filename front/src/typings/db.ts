export interface IProduct {               
  product_id: number;
  product_name: string;
  product_image: string;
  product_colour: string;
  product_size: string;
  price_uk: string;
  price_kr: string;
  quantity: string;
  barcode: string;
  link: string;
  product_date: string;
  brand_name: string;
  brand_abbre: string;
  categories_name: string;
  active: number;
  status: number;
}

export interface IBrand {
  brand_id: number;
  brand_name: string;
  brand_abbre: string;
  brand_active: number;
  brand_status: number;
}

export interface ICate {
  categories_id: number;
  categories_name: string;
  categories_active: number;
  categories_status: number;
}
export interface IExcel {
  brand_id: number;
  categories_id: number;
  link: string;
  price_uk: string;
  price_kr: string;
  product_colour: string;
  product_size: string;
  product_name: string;
  quantity: string;
}