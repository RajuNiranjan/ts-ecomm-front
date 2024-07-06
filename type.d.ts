import { type } from "os";

type Billboard = {
  id: string;
  label: string;
  content: string;
  imageUrl: string;
  btnUrl: string;
};
type Category = {
  id: string;
  name: string;
  gender: string;
  imageUrl: string;
  billboard: Billboard;
};
type ProductResponse = {
  products: Product[];
  pagination: pagination;
};

type pagination = {
  total: number;
  per_page: number;
  page: number;
  total_pages: number;
};
type Image = {
  id: string;
  url: string;
};
type ProductSize = {
  id: string;
  value: string;
};
type ProductColor = {
  id: string;
  value: string;
  name: string;
};
type Review = {
  id: string;
  rating: number;
  comment: string;
  averageRating: number;
  createdAt: Date;
  images: Image[];
  product: ReviewProduct;
  user: User;
};

type User = {
  id: string;
  displayName: string;
  avatarUrl: string;
};

type ReviewProduct = {
  id: string;
  name: string;
  price: number;
  Images: Image[];
};
type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
};
type Order = {
  id: string;
  orderItems: orderItem[];
  createdAt: Date;
  deliveredAt: Date;
};
type orderItem = {
  id: string;
  product: {
    id: string;
    name: string;
    Images: Image[];
  };
  quantity: number;
  size: string;
  color: string;
};

type Address = {
  id: string;
  address: string;
  country?: string;
  state?: string;
  city: string;
  zipcode: string;
  email: string;
  phone: string;
  fullName: string;
  isDefault: number;
  comment: string;
};

type Reason = {
  id: string;
  reason: string;
};
interface State {
  name: string;
}

interface Country {
  name: string;
  states: State[];
}

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  isFeatured: boolean;
  category: Category;
  Images: Image[];
  Sizes: ProductSize[];
  Colors: ProductColor[];
  rewiews: Review[];
};

interface RelatedProducts {
  id: string;
  name: string;
  price: number;
  description: string;
  isFeatured: boolean;
  category: Category;
  Images: Image[];
  Sizes: ProductSize[];
  Colors: ProductColor[];
  rewiews: Review[];
  linkedProduct: {
    id: string;
    storeId: string;
    categoryId: string;
    name: string;
    sku: string;
    productType: string | null;
    price: string;
    salePrice: string;
    shortDescription: string;
    description: string;
    isFeatured: boolean;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    category: {
      id: string;
      storeId: string;
      billboardId: string;
      name: string;
      imageUrl: string;
      description: string | null;
      gender: string;
      parentId: string | null;
      createdAt: string;
      updatedAt: string;
    };
    Colors: {
      id: string;
      productId: string;
      value: string;
      createdAt: string;
      updatedAt: string;
    }[];
    Images: {
      id: string;
      productId: string;
      url: string;
      createdAt: string;
      updatedAt: string;
    }[];
    UserWishlists: {
      id: string;
      userId: string;
      productId: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
}
