import React, { useState } from 'react';
import { Search, ShoppingCart, Ruler } from 'lucide-react';
import { Product, CartItem } from './types';
import { products, sizeGuide } from './data/products';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import QuickView from './components/QuickView';
import SizeGuideModal from './components/SizeGuideModal';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.player && product.player.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, size, quantity: 1 }];
    });
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (item: CartItem, quantity: number) => {
    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem === item ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const removeCartItem = (item: CartItem) => {
    setCartItems((prev) => prev.filter((cartItem) => cartItem !== item));
  };

  const handleCheckout = () => {
    const message = cartItems
      .map(
        (item) =>
          `${item.quantity}x ${item.product.name} (${item.size}) - $${(
            item.product.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const whatsappMessage = encodeURIComponent(
      `Hi! I would like to order:\n\n${message}\n\nTotal: $${total.toFixed(2)}`
    );

    window.open(`https://wa.me/1234567890?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Soccer Shop</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Ruler className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(product) => addToCart(product, product.sizes[0])}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </main>

      {isCartOpen && (
        <Cart
          items={cartItems}
          onUpdateQuantity={updateCartItemQuantity}
          onRemoveItem={removeCartItem}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
      )}

      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {isSizeGuideOpen && (
        <SizeGuideModal
          sizeGuide={sizeGuide}
          onClose={() => setIsSizeGuideOpen(false)}
        />
      )}
    </div>
  );
}

export default App;