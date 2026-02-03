'use client';

import { useCart } from './CartContext';

export default function CartButton({ onClick }: { onClick: () => void }) {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    return (
        <button
            onClick={onClick}
            className="relative w-11 h-11 rounded-full bg-primary-light text-primary-dark flex items-center justify-center text-xl transition-all hover:bg-primary hover:text-white hover:scale-110"
        >
            <i className="fas fa-shopping-cart"></i>
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </button>
    );
}
