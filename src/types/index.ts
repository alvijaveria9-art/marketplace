export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: string;
  color: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  images?: string[];
  priceRange: string;
  moq: string;
  supplier: string;
  country: string;
  rating: number;
  reviewCount: number;
  badge: string;
  verified: boolean;
  category: string;
  tags?: string[];
  description?: string;
  features?: string[];
}

export interface Supplier {
  id: string;
  name: string;
  logo: string;
  verified: boolean;
  yearsInBusiness: number;
  country: string;
  rating: number;
  responseTime: string;
  productsCount: number;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  country: string;
  company: string;
  review: string;
  rating: number;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  author: string;
}
