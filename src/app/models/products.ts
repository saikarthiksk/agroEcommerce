export interface Products {
  id?:number;
  category?:string;
  price?:number;
  image?:string;
  title?:string;
  rating?:Rate
}

export interface Rate {
  count?:number;
  rate?:number;
}
