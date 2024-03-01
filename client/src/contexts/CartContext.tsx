import {Dispatch, SetStateAction, createContext} from "react";

export type CartContextElementType = {
        id: number,
        title: string,
        size: string,
        price: number,
        quantity: number
}

type CartContextType = {
    order: CartContextElementType[],
    setOrder:Dispatch<SetStateAction<CartContextElementType[]>> 
}

export const CartContext = createContext<CartContextType>({order:{} as CartContextElementType[], setOrder: () => {}});

