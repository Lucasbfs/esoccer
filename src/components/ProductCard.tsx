import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button
            onClick={() => onQuickView(product)}
            className="p-2 bg-white rounded-full hover:bg-gray-100"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2 bg-white rounded-full hover:bg-gray-100"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.team}</p>
        {product.player && (
          <p className="text-sm text-gray-500 mb-2">Player: {product.player}</p>
        )}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <div className="text-sm text-gray-600">
            {product.sizes.join(" · ")}
          </div>
        </div>
      </div>
    </div>
  );
}