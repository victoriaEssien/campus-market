import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

// Create a store for selected Category and selected product
export const useCategoryStore = create(
    persist(
        (set) => ({
            selectedCategory: null,
    
            setSelectedCategory: (category) => set(produce(
                (state) => { state.selectedCategory = category }
            )),
    
            clearSelectedCategory: () => set(
                (state) => { state.selectedCategory = null }
            )
        }),
        {
            name: 'selected-category-store'
        }
    )
)