export interface CartProduct {
    id: number;
    user: number;
    product: {
      id: number;
      name: string;
      price: number;
    };
    option: number | null;
    quantity: number;
    total_amount: number;
    main_image: string;
  }
  