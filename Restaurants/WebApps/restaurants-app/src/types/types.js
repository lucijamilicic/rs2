
export interface BasketCheckoutType {
    buyerUsername: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
    emailAddress: string;
    buyerId: string;
    orderItems: OrderItem[];
    totalPrice: number;
}

export interface OrderItem {
    restaurantName: string;
    restaurantId: string;
    foodOrder: FoodOrder[];
    street: string;
    city: string;
    country: string;
    zipCode: string;
    emailAddress: string;
    totalPrice: number;
}

export interface FoodOrder {
    dishName: string;
    dishId: string;
    extraNote: string;
    quantity: number;
    price: number;
}

export interface MenuItem {
    id: string;
    mealName: string;
    price: number;
}