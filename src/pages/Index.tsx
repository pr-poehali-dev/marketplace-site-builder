import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  discount?: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Беспроводные наушники Premium",
    price: 8999,
    originalPrice: 12999,
    rating: 4.8,
    reviews: 1250,
    image: "/img/d0fe5d89-f245-405a-b3a0-72bec5715d52.jpg",
    category: "Электроника",
    discount: 31
  },
  {
    id: 2,
    name: "Смартфон ProMax 256GB",
    price: 89999,
    originalPrice: 99999,
    rating: 4.9,
    reviews: 3420,
    image: "/img/5ffba3fe-e040-46f8-8914-adf5eb85b3b3.jpg",
    category: "Смартфоны",
    discount: 10
  },
  {
    id: 3,
    name: "Кроссовки спортивные Air",
    price: 15999,
    originalPrice: 19999,
    rating: 4.7,
    reviews: 890,
    image: "/img/8c6c5eae-1009-4795-a316-6f3e7877d337.jpg",
    category: "Обувь",
    discount: 20
  },
  {
    id: 4,
    name: "Беспроводные наушники Studio",
    price: 12999,
    rating: 4.6,
    reviews: 567,
    image: "/img/d0fe5d89-f245-405a-b3a0-72bec5715d52.jpg",
    category: "Электроника"
  },
  {
    id: 5,
    name: "Смартфон Galaxy Pro",
    price: 79999,
    originalPrice: 89999,
    rating: 4.8,
    reviews: 2100,
    image: "/img/5ffba3fe-e040-46f8-8914-adf5eb85b3b3.jpg",
    category: "Смартфоны",
    discount: 11
  },
  {
    id: 6,
    name: "Кроссовки для бега Ultra",
    price: 18999,
    rating: 4.9,
    reviews: 1340,
    image: "/img/8c6c5eae-1009-4795-a316-6f3e7877d337.jpg",
    category: "Обувь"
  }
];

const categories = ["Все", "Электроника", "Смартфоны", "Обувь", "Одежда", "Дом"];

function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-marketplace-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-marketplace-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Marketplace
              </h1>
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-marketplace-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-marketplace-gray-50 border-marketplace-gray-200 focus:border-primary focus:ring-primary rounded-xl"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative hover:bg-marketplace-gray-100 rounded-xl">
                <Icon name="Heart" className="h-6 w-6 text-marketplace-gray-600" />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="relative hover:bg-marketplace-gray-100 rounded-xl">
                <Icon name="ShoppingCart" className="h-6 w-6 text-marketplace-gray-600" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-marketplace-gray-100 rounded-xl">
                <Icon name="User" className="h-6 w-6 text-marketplace-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white border-b border-marketplace-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-xl transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-white hover:bg-primary-light shadow-lg'
                    : 'text-marketplace-gray-600 hover:bg-marketplace-gray-100 hover:text-marketplace-gray-900'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Супер скидки до 50%</h2>
            <p className="text-xl opacity-90 mb-6">На электронику и гаджеты. Успей купить по лучшей цене!</p>
            <Button className="bg-white text-primary hover:bg-marketplace-gray-100 rounded-xl px-8 py-3 font-semibold">
              Смотреть все акции
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-marketplace-gray-200 rounded-2xl overflow-hidden animate-fade-in">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {product.discount && (
                  <Badge className="absolute top-3 left-3 bg-destructive text-white rounded-lg px-2 py-1">
                    -{product.discount}%
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white rounded-xl p-2"
                >
                  <Icon 
                    name="Heart" 
                    className={`h-5 w-5 ${
                      favorites.includes(product.id) 
                        ? 'text-destructive fill-current' 
                        : 'text-marketplace-gray-600'
                    }`}
                  />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs bg-marketplace-gray-100 text-marketplace-gray-600 rounded-lg">
                    {product.category}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-marketplace-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-marketplace-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-marketplace-gray-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-xl text-marketplace-gray-900">
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-marketplace-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-primary hover:bg-primary-light text-white rounded-xl py-2.5 font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                  В корзину
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" className="h-16 w-16 text-marketplace-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-marketplace-gray-900 mb-2">Товары не найдены</h3>
            <p className="text-marketplace-gray-600">Попробуйте изменить критерии поиска</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-marketplace-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Marketplace</h3>
              <p className="text-marketplace-gray-400">
                Ваш надежный партнер в мире онлайн-покупок
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-marketplace-gray-400">
                <li>Как сделать заказ</li>
                <li>Способы оплаты</li>
                <li>Доставка</li>
                <li>Возврат товара</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-marketplace-gray-400">
                <li>О нас</li>
                <li>Вакансии</li>
                <li>Пресс-центр</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-marketplace-gray-400">
                <li>Служба поддержки</li>
                <li>Частые вопросы</li>
                <li>Отзывы</li>
                <li>Пользовательское соглашение</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;