import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

export const useUserStore = create(
    (set) => ({
        // 
        user: { avatar: null, avatarType: null, email: null, firstname: null, lastname: null, seller: null, phone: null, userId: null },
        setUser: (field, val) => set(
            produce(
                (state) => { state.user[field] = val }
            )
        ),
        clearUser: () => set(
            (state) => { state.user = { avatar: null, avatarType: null, email: null, firstName: null, lastName: null, isSeller: null, phoneNumber: null, userId: null } }
        )
    })
)