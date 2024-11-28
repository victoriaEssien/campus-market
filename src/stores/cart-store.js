import { create } from "zustand";
import { produce } from 'immer';

export const useCartStore = create(
    (set) => ({

        cartItems: null,

        setCartItems: (items) => set(
            produce(
                (state) => { state.cartItems = items}
            )
        ),
    })
)