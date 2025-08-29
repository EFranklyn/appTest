export interface TablePOS {
    id: number;
    number: number;
    status: 'open' | 'closed' | 'reserved' | 'blocked' | 'cleaning';
    isOccupied?: boolean;
    lastOccupiedAt?: string;
    openedAt?: string;
    durationOccupiedMinutes?: number;

    waiterId?: number;
    waiterName?: string;

    isReserved?: boolean;
    reservedAt?: string;
    reservedFor?: string;
    reservationNotes?: string;

    seatsOccupied? :number;

    isGrouped?: boolean;
    groupId?: number;

    order?: any;
    totalOrderValue?: number;
    pendingItems?: number;

    table: {
        id: number;
        name: string;
        x: number;
        y: number;
        number: number;
        seats?: number;
        fontColor?: string;
        bgColor1?: string;
        bgColor2?: string;
        shape?: 'rectangle' | 'circle' | 'square';
        rotation?: number;
        width?: number;
        height?: number;
    };
}

export interface Product {
    name: string;
    price: number;
}

export interface Items {
    Product: Product
    status: 'prepared' | 'preparing'| 'served'
    quantity: number
    requestedAt: string
    servedAt?: string
}

export interface Order {
    items: Items[]
    totalOrder: number
    lastOrderTime: string
    isPaid: boolean
}

export interface Table {
    id: string;
    name: string;
    x: number;
    y: number;
    number: number;
    seats?: number;
    fontColor?: string;
    bgColor1?: string;
    bgColor2?: string;
    shape?: 'rectangle' | 'circle' | 'square';
    width?: number;
    height?: number;
    status: 'open' | 'closed' ;
    openedAt?: string | null;
    waiterName?: string;
    isReserved?: boolean;
    reservedAt?: string;
    reservedFor?: string;
    reservationNotes?: string;
    seatsOccupied? :number;
    order?: Order;
    pendingItems?: number;
    isOccupied?: boolean;
    isCleaning?: boolean;
}