import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  description: string;
  brand: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const mockReviews: Review[] = [
  { id: 1, author: "Алексей К.", rating: 5, text: "Отличное качество! Превзошло ожидания.", date: "15 сен 2024" },
  { id: 2, author: "Мария С.", rating: 4, text: "Хороший товар, быстрая доставка.", date: "12 сен 2024" },
  { id: 3, author: "Дмитрий П.", rating: 5, text: "Рекомендую! Стильный дизайн и отличная функциональность.", date: "8 сен 2024" },
];

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
    discount: 31,
    description: "Наушники с активным шумоподавлением и высоким качеством звука",
    brand: "AudioTech"
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
    discount: 10,
    description: "Флагманский смартфон с тройной камерой и быстрой зарядкой",
    brand: "TechMax"
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
    discount: 20,
    description: "Удобные кроссовки для бега и активного отдыха",
    brand: "SportLife"
  },
  {
    id: 4,
    name: "Игровой ноутбук Gaming Pro",
    price: 129999,
    originalPrice: 149999,
    rating: 4.9,
    reviews: 567,
    image: "/img/d02587f5-58b3-4cb3-889f-cd209e75614f.jpg",
    category: "Компьютеры",
    discount: 13,
    description: "Мощный игровой ноутбук с RTX 4060 и 32GB RAM",
    brand: "GameTech"
  },
  {
    id: 5,
    name: "Умные часы Fitness Pro",
    price: 24999,
    originalPrice: 29999,
    rating: 4.6,
    reviews: 1890,
    image: "/img/9cd0ce61-0788-4eb4-a603-08be99d7a963.jpg",
    category: "Гаджеты",
    discount: 17,
    description: "Фитнес-трекер с GPS и мониторингом здоровья",
    brand: "HealthWatch"
  },
  {
    id: 6,
    name: "Беспроводная зарядка Fast Charge",
    price: 3999,
    originalPrice: 5999,
    rating: 4.4,
    reviews: 340,
    image: "/img/cf718cc2-de29-4c3c-864f-e30a647ec094.jpg",
    category: "Аксессуары",
    discount: 33,
    description: "Быстрая беспроводная зарядка 15W для всех устройств",
    brand: "PowerTech"
  },
  {
    id: 7,
    name: "Профессиональная камера DSLR",
    price: 78999,
    originalPrice: 89999,
    rating: 4.8,
    reviews: 234,
    image: "/img/69de6990-91cb-4482-a28b-e898ce12f233.jpg",
    category: "Фототехника",
    discount: 12,
    description: "Профессиональная зеркальная камера с объективом 18-55mm",
    brand: "PhotoPro"
  },
  {
    id: 8,
    name: "Дизайнерская сумка Luxury",
    price: 35999,
    originalPrice: 45999,
    rating: 4.5,
    reviews: 156,
    image: "/img/e457f01e-846c-410d-8e23-35fdba0bc9b9.jpg",
    category: "Аксессуары",
    discount: 22,
    description: "Стильная кожаная сумка от известного дизайнера",
    brand: "LuxStyle"
  },
  {
    id: 9,
    name: "Блендер кухонный PowerMix",
    price: 12999,
    rating: 4.7,
    reviews: 678,
    image: "/img/0030822c-1007-4757-85f5-b0d27be9850e.jpg",
    category: "Бытовая техника",
    description: "Мощный блендер 1500W для приготовления смузи и коктейлей",
    brand: "KitchenPro"
  },
  {
    id: 10,
    name: "Беспроводные наушники Studio",
    price: 12999,
    rating: 4.6,
    reviews: 567,
    image: "/img/d0fe5d89-f245-405a-b3a0-72bec5715d52.jpg",
    category: "Электроника",
    description: "Студийные наушники с превосходным качеством звука",
    brand: "AudioStudio"
  },
  {
    id: 11,
    name: "Смартфон Galaxy Pro",
    price: 79999,
    originalPrice: 89999,
    rating: 4.8,
    reviews: 2100,
    image: "/img/5ffba3fe-e040-46f8-8914-adf5eb85b3b3.jpg",
    category: "Смартфоны",
    discount: 11,
    description: "Современный смартфон с AMOLED дисплеем и 5G",
    brand: "GalaxyTech"
  },
  {
    id: 12,
    name: "Кроссовки для бега Ultra",
    price: 18999,
    rating: 4.9,
    reviews: 1340,
    image: "/img/8c6c5eae-1009-4795-a316-6f3e7877d337.jpg",
    category: "Обувь",
    description: "Профессиональные беговые кроссовки с амортизацией",
    brand: "RunPro"
  }
];

const categories = ["Все", "Электроника", "Смартфоны", "Обувь", "Компьютеры", "Гаджеты", "Аксессуары", "Фототехника", "Бытовая техника"];

function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
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

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => {
      const product = mockProducts.find(p => p.id === item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartProducts = () => {
    return cart.map(item => ({
      ...mockProducts.find(p => p.id === item.id)!,
      quantity: item.quantity
    }));
  };

  return (
    <div className="min-h-screen bg-marketplace-dark-bg text-marketplace-dark-text">
      {/* Header */}
      <header className="bg-marketplace-dark-surface shadow-lg border-b border-marketplace-dark-border sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PriceGo
              </h1>
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-marketplace-dark-muted h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-marketplace-dark-card border-marketplace-dark-border focus:border-primary focus:ring-primary rounded-xl text-marketplace-dark-text"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative hover:bg-marketplace-dark-card rounded-xl">
                    <Icon name="Heart" className="h-6 w-6 text-marketplace-dark-muted" />
                    {favorites.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
                        {favorites.length}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-marketplace-dark-surface border-marketplace-dark-border text-marketplace-dark-text">
                  <DialogHeader>
                    <DialogTitle className="text-primary">Избранные товары</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-96">
                    {favorites.length === 0 ? (
                      <p className="text-marketplace-dark-muted text-center py-8">Список избранного пуст</p>
                    ) : (
                      <div className="space-y-4">
                        {favorites.map(id => {
                          const product = mockProducts.find(p => p.id === id);
                          if (!product) return null;
                          return (
                            <div key={id} className="flex items-center space-x-4 p-4 bg-marketplace-dark-card rounded-lg">
                              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-primary font-bold">{formatPrice(product.price)}</p>
                              </div>
                              <Button
                                onClick={() => toggleFavorite(id)}
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:bg-marketplace-dark-bg"
                              >
                                <Icon name="Trash2" className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative hover:bg-marketplace-dark-card rounded-xl">
                    <Icon name="ShoppingCart" className="h-6 w-6 text-marketplace-dark-muted" />
                    {getTotalCartItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
                        {getTotalCartItems()}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-marketplace-dark-surface border-marketplace-dark-border text-marketplace-dark-text max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-primary">Корзина</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-96">
                    {cart.length === 0 ? (
                      <p className="text-marketplace-dark-muted text-center py-8">Корзина пуста</p>
                    ) : (
                      <div className="space-y-4">
                        {getCartProducts().map(product => (
                          <div key={product.id} className="flex items-center space-x-4 p-4 bg-marketplace-dark-card rounded-lg">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-primary font-bold">{formatPrice(product.price)}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Button
                                  onClick={() => updateCartQuantity(product.id, product.quantity - 1)}
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 border-marketplace-dark-border hover:bg-marketplace-dark-bg"
                                >
                                  <Icon name="Minus" className="h-4 w-4" />
                                </Button>
                                <span className="text-marketplace-dark-text font-medium px-2">{product.quantity}</span>
                                <Button
                                  onClick={() => updateCartQuantity(product.id, product.quantity + 1)}
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 border-marketplace-dark-border hover:bg-marketplace-dark-bg"
                                >
                                  <Icon name="Plus" className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <Button
                              onClick={() => removeFromCart(product.id)}
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-marketplace-dark-bg"
                            >
                              <Icon name="Trash2" className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Separator className="bg-marketplace-dark-border" />
                        <div className="flex justify-between items-center p-4 bg-marketplace-dark-card rounded-lg">
                          <span className="text-lg font-bold">Итого:</span>
                          <span className="text-xl font-bold text-primary">{formatPrice(getTotalCartPrice())}</span>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary-light text-white rounded-xl py-3 font-semibold">
                          Оформить заказ
                        </Button>
                      </div>
                    )}
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-marketplace-dark-card rounded-xl">
                    <Icon name="User" className="h-6 w-6 text-marketplace-dark-muted" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-marketplace-dark-surface border-marketplace-dark-border text-marketplace-dark-text">
                  <DialogHeader>
                    <DialogTitle className="text-primary">Личный кабинет</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="User" className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold">Александр Петров</h3>
                      <p className="text-marketplace-dark-muted">alex.petrov@email.com</p>
                    </div>
                    <Separator className="bg-marketplace-dark-border" />
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-marketplace-dark-text hover:bg-marketplace-dark-card">
                        <Icon name="Package" className="h-4 w-4 mr-2" />
                        Мои заказы
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-marketplace-dark-text hover:bg-marketplace-dark-card">
                        <Icon name="Settings" className="h-4 w-4 mr-2" />
                        Настройки
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-marketplace-dark-text hover:bg-marketplace-dark-card">
                        <Icon name="HelpCircle" className="h-4 w-4 mr-2" />
                        Поддержка
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-marketplace-dark-card">
                        <Icon name="LogOut" className="h-4 w-4 mr-2" />
                        Выйти
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-marketplace-dark-surface border-b border-marketplace-dark-border">
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
                    : 'text-marketplace-dark-muted hover:bg-marketplace-dark-card hover:text-marketplace-dark-text'
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
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">🚀 Космические скидки до 50%</h2>
            <p className="text-xl opacity-90 mb-6">На технику и гаджеты. Улетай в мир выгодных покупок!</p>
            <Button className="bg-white text-primary hover:bg-marketplace-cosmic-100 rounded-xl px-8 py-3 font-semibold">
              Смотреть все акции
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 border-marketplace-dark-border rounded-2xl overflow-hidden animate-fade-in bg-marketplace-dark-card">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
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
                  className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-xl p-2"
                >
                  <Icon 
                    name="Heart" 
                    className={`h-5 w-5 ${
                      favorites.includes(product.id) 
                        ? 'text-destructive fill-current' 
                        : 'text-white'
                    }`}
                  />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs bg-marketplace-dark-bg text-marketplace-dark-muted rounded-lg">
                    {product.category}
                  </Badge>
                </div>
                
                <h3 
                  className="font-semibold text-marketplace-dark-text mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
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
                            : 'text-marketplace-dark-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-marketplace-dark-muted ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-xl text-primary">
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-marketplace-dark-muted line-through">
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
            <Icon name="Package" className="h-16 w-16 text-marketplace-dark-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-marketplace-dark-text mb-2">Товары не найдены</h3>
            <p className="text-marketplace-dark-muted">Попробуйте изменить критерии поиска</p>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="bg-marketplace-dark-surface border-marketplace-dark-border text-marketplace-dark-text max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="space-y-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="text-xs bg-marketplace-dark-bg text-marketplace-dark-muted rounded-lg mb-2">
                    {selectedProduct.category} • {selectedProduct.brand}
                  </Badge>
                  <h1 className="text-2xl font-bold text-marketplace-dark-text mb-2">
                    {selectedProduct.name}
                  </h1>
                  <p className="text-marketplace-dark-muted">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        className={`h-5 w-5 ${
                          i < Math.floor(selectedProduct.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-marketplace-dark-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-marketplace-dark-muted">
                    {selectedProduct.rating} ({selectedProduct.reviews} отзывов)
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="font-bold text-3xl text-primary">
                      {formatPrice(selectedProduct.price)}
                    </div>
                    {selectedProduct.originalPrice && (
                      <div className="text-lg text-marketplace-dark-muted line-through">
                        {formatPrice(selectedProduct.originalPrice)}
                      </div>
                    )}
                  </div>
                  {selectedProduct.discount && (
                    <Badge className="bg-destructive text-white">
                      Скидка {selectedProduct.discount}%
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={() => addToCart(selectedProduct.id)}
                    className="flex-1 bg-primary hover:bg-primary-light text-white rounded-xl py-3 font-semibold"
                  >
                    <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
                    Добавить в корзину
                  </Button>
                  <Button
                    onClick={() => toggleFavorite(selectedProduct.id)}
                    variant="outline"
                    className="border-marketplace-dark-border hover:bg-marketplace-dark-card rounded-xl p-3"
                  >
                    <Icon 
                      name="Heart" 
                      className={`h-5 w-5 ${
                        favorites.includes(selectedProduct.id) 
                          ? 'text-destructive fill-current' 
                          : 'text-marketplace-dark-muted'
                      }`}
                    />
                  </Button>
                </div>

                {/* Reviews */}
                <Tabs defaultValue="reviews" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-marketplace-dark-bg">
                    <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      Отзывы
                    </TabsTrigger>
                    <TabsTrigger value="specs" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      Характеристики
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="reviews" className="space-y-4 mt-4">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="p-4 bg-marketplace-dark-card rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-marketplace-dark-text">{review.author}</span>
                          <span className="text-sm text-marketplace-dark-muted">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-marketplace-dark-border'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-marketplace-dark-muted">{review.text}</p>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="specs" className="mt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-marketplace-dark-border">
                        <span className="text-marketplace-dark-muted">Бренд</span>
                        <span className="text-marketplace-dark-text">{selectedProduct.brand}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-marketplace-dark-border">
                        <span className="text-marketplace-dark-muted">Категория</span>
                        <span className="text-marketplace-dark-text">{selectedProduct.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-marketplace-dark-border">
                        <span className="text-marketplace-dark-muted">Рейтинг</span>
                        <span className="text-marketplace-dark-text">{selectedProduct.rating}/5</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-marketplace-dark-muted">Отзывы</span>
                        <span className="text-marketplace-dark-text">{selectedProduct.reviews}</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <footer className="bg-marketplace-dark-surface text-marketplace-dark-text mt-16 border-t border-marketplace-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PriceGo
              </h3>
              <p className="text-marketplace-dark-muted">
                Космические цены на земные товары 🚀
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-marketplace-dark-text">Покупателям</h4>
              <ul className="space-y-2 text-marketplace-dark-muted">
                <li className="hover:text-primary cursor-pointer transition-colors">Как сделать заказ</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Способы оплаты</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Доставка</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Возврат товара</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-marketplace-dark-text">Компания</h4>
              <ul className="space-y-2 text-marketplace-dark-muted">
                <li className="hover:text-primary cursor-pointer transition-colors">О нас</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Вакансии</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Пресс-центр</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-marketplace-dark-text">Поддержка</h4>
              <ul className="space-y-2 text-marketplace-dark-muted">
                <li className="hover:text-primary cursor-pointer transition-colors">Служба поддержки</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Частые вопросы</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Отзывы</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Пользовательское соглашение</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;