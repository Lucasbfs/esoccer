import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';

interface QuickViewProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function QuickView({ product, onClose, onAddToCart }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.team}</p>
            {product.player && (
              <p className="text-gray-600 mb-4">Player: {product.player}</p>
            )}
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Select Size:</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? 'border-blue-500 text-blue-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold">${product.price}</span>
              <button
                onClick={() => onAddToCart(product, selectedSize)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}