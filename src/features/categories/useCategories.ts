import { useEffect, useState } from 'react';
import type { Category } from '../../types';
import { defaultCategories } from './categoryData';

const STORAGE_KEY = 'categories';

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>(() => {
        try {
            const savedCategories = localStorage.getItem(STORAGE_KEY);

            if (savedCategories) {
                return JSON.parse(savedCategories) as Category[];
            }

            return defaultCategories;
        } catch {
            return defaultCategories;
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    }, [categories]);

    function addCategory(category: Omit<Category, 'id'>) {
        const newCategory: Category = {
            ...category,
            id: crypto.randomUUID(),
        };

        setCategories((prev) => [...prev, newCategory]);
    }

    return {
        categories,
        setCategories,
        addCategory,
    };
}
