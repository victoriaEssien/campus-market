import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

// Create a store for selected Category and selected product
export const useCategoryStore = create(
    persist(
        (set) => ({
            // selected category
            selectedCategory: null,

            setSelectedCategory: (category) => set(produce(
                (state) => { state.selectedCategory = category }
            )),

            clearSelectedCategory: () => set(
                (state) => { state.selectedCategory = null }
            ),

            // selected product
            selectedProductId: null,
            setSelectedProductId: (productId) => set(produce(
                (state) => { state.selectedProductId = productId }
            )),
            clearSelectedProductId: () => set(
                (state) => { state.selectedProductId = null }
            )
        }),
        {
            name: 'selected-category-store'
        }
    )
)