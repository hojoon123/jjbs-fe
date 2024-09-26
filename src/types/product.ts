export interface Product {
    id: number;
    name: string;
    price: number;
    main_image_url: string;
    description?: string;
    category?: {
      id: number;
      name: string;
    };
  }