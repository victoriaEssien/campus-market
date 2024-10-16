import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

export const useUserStore = create(
    (set)=> ({
        // 
        user: {}
    })
)