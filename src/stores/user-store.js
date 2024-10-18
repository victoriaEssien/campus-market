import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

export const useUserStore = create(
    (set) => ({
        // 
        user: null,
        setUser: (user) => set(
            produce(
                (state) => { state.user = user }
            )
        ),
        clearUser: () => set(
            produce(
                (state) => { state.user = null }
            )
        )
    })
)