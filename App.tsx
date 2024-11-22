import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';


interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Grilled Salmon',
      description: 'Fresh salmon grilled to perfection with a lemon butter sauce.',
      price: 180.00,
      category: 'Main Course',
      image: 'https://th.bing.com/th/id/OIP.Ap6iEGbolwm_UjeHXNNIWAHaK-?w=205&h=304&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '2',
      name: 'Beef Wellington',
      description: 'Tender beef fillet wrapped in puff pastry with mushrooms.',
      price: 350.00,
      category: 'Main Course',
      image: 'https://th.bing.com/th/id/OIP.U40yArh6AYhyUF2L2UvqGQHaE8?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '3',
      name: 'Lamb Shank',
      description: 'Slow-cooked lamb shank served with mashed potatoes.',
      price: 220.00,
      category: 'Main Course',
      image: 'https://th.bing.com/th/id/OIP.iOr2i0gvDGf-nEMJP5t1DAHaE8?w=256&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '4',
      name: 'Chicken Parmesan',
      description: 'Breaded chicken breast topped with marinara sauce and melted cheese.',
      price: 150.00,
      category: 'Main Course',
      image: 'https://th.bing.com/th/id/OIP.m5ghpXycdWOUBtOn4Rio9wHaLH?w=204&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '5',
      name: 'Vegetable Stir Fry',
      description: 'A medley of seasonal vegetables stir-fried in a savory sauce.',
      price: 130.00,
      category: 'Main Course',
      image: 'https://th.bing.com/th/id/OIP.opc9FweKNEJrx3649wt3-AAAAA?w=206&h=305&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '6',
      name: 'Stuffed Mushrooms',
      description: 'Mushrooms filled with a rich cream cheese mixture.',
      price: 80.00,
      category: 'Starters',
      image: 'https://th.bing.com/th/id/OIP.dZaprI-3a_Veio9r8hPoxwHaLH?w=204&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '7',
      name: 'Garlic Bread',
      description: 'Freshly baked bread topped with garlic butter and herbs.',
      price: 40.00,
      category: 'Starters',
      image: 'https://i0.wp.com/fromthehorsesmouth.org.uk/wp-content/uploads/2020/01/Garlic-Bread-LEAD-2b.jpg?fit=1600%2C2240&ssl=1',
    },
    {
      id: '8',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with creamy Caesar dressing and croutons.',
      price: 90.00,
      category: 'Starters',
      image: 'https://th.bing.com/th/id/OIP.w4r5rpVWHIRAdJ4u1skaIgHaLH?w=206&h=305&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '9',
      name: 'Bruschetta',
      description: 'Toasted bread topped with tomatoes, garlic, and basil.',
      price: 60.00,
      category: 'Starters',
      image: 'https://th.bing.com/th/id/OIP.BtN9aPt7J8dmHEjq_XdQEQAAAA?w=125&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '10',
      name: 'Crispy Calamari',
      description: 'Fried calamari served with a zesty dipping sauce.',
      price: 110.00,
      category: 'Starters',
      image: 'https://th.bing.com/th/id/OIP.ENRtUT4hwWt2V1cu_dlF8QHaE8?w=273&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '11',
      name: 'Fresh Lemonade',
      description: 'A refreshing blend of fresh lemon juice, sugar, and water.',
      price: 45.00,
      category: 'Drinks',
      image: 'https://th.bing.com/th/id/OIP.su3UJCszBBJzLR574vkaJQAAAA?rs=1&pid=ImgDetMain',
    },
    {
      id: '12',
      name: 'Iced Tea',
      description: 'Chilled tea served with lemon slices and ice.',
      price: 35.00,
      category: 'Drinks',
      image: 'https://th.bing.com/th/id/R.45e8cfd6d59002e5a0c8fde81b193e71?rik=t0v1OofbqOGs8w&pid=ImgRaw&r=0',
    },
    {
      id: '13',
      name: 'Pina Colada',
      description: 'A tropical blend of pineapple and coconut.',
      price: 120.00,
      category: 'Drinks',
      image: 'https://www.everyday-delicious.com/wp-content/uploads/2019/07/pina-colada-everyday-delicious.jpg',
    },
    {
      id: '14',
      name: 'Espresso Martini',
      description: 'A cocktail made with espresso, vodka, and coffee liqueur.',
      price: 150.00,
      category: 'Drinks',
      image: 'https://th.bing.com/th/id/OIP.EBILMYbgIYBMikQ5_NChAgHaLk?w=200&h=312&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '15',
      name: 'Mango Smoothie',
      description: 'Fresh mango blended with yogurt and ice.',
      price: 80.00,
      category: 'Drinks',
      image: 'https://www.eatingbirdfood.com/wp-content/uploads/2021/05/mango-smoothie-angle.jpg',
    },
    {
      id: '16',
      name: 'Chocolate Lava Cake',
      description: 'A warm chocolate cake with a gooey center.',
      price: 95.00,
      category: 'Desserts',
      image: 'https://www.yourhomebasedmom.com/wp-content/uploads/2020/02/chocoalte-lava-cake-for-two-1023x1536.jpg',
    },
    {
      id: '17',
      name: 'Tiramisu',
      description: 'A rich Italian dessert made with coffee-soaked ladyfingers.',
      price: 120.00,
      category: 'Desserts',
      image: 'https://www.alsothecrumbsplease.com/wp-content/uploads/2019/05/Authentic-Tiramisu-Recipe-18.jpg',
    },
    {
      id: '18',
      name: 'Creme Brulee',
      description: 'A creamy custard topped with a crisp sugar layer.',
      price: 130.00,
      category: 'Desserts',
      image: 'https://th.bing.com/th/id/OIP.oTw3tUQEr5g5FvOD1u3QFwHaKX?rs=1&pid=ImgDetMain',
    },
    {
      id: '19',
      name: 'Vanilla Cheesecake',
      description: 'Smooth and creamy cheesecake with a graham cracker crust.',
      price: 100.00,
      category: 'Desserts',
      image: 'https://www.modernhoney.com/wp-content/uploads/2020/12/Vanilla-Cheesecake-Recipe-2-scaled.jpg',
    },
    {
      id: '20',
      name: 'Fruit Tart',
      description: 'A crisp pastry shell filled with custard and topped with fresh fruit.',
      price: 110.00,
      category: 'Desserts',
      image: 'https://www.thespruceeats.com/thmb/aEBv9n8MINfRj1HT00IxsqWcjq4=/5110x3407/filters:fill(auto,1)/vanilla-custard-fruit-tart-recipe-101342-hero-01-d911d9c04f914432bbc4700c3e678b2c.jpg',
    },
  ]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentScreen, setCurrentScreen] = useState<'Home' | 'Menu' | 'Cart'>('Home');
  const [filter, setFilter] = useState<string>('All');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateCategoryAverages = () => {
    const categories = [...new Set(menuItems.map((item) => item.category))];
    const averages: { [key: string]: number } = {};

    categories.forEach((category) => {
      const categoryItems = menuItems.filter((item) => item.category === category);
      const averagePrice =
        categoryItems.reduce((sum, item) => sum + item.price, 0) / categoryItems.length;
      averages[category] = categoryItems.length > 0 ? averagePrice : 0;
    });

    return averages;
  };

  const calculateCartSummary = () => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return { totalPrice, totalItems };
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const renderHomeScreen = () => {
    const averages = calculateCategoryAverages();
    const popularItem = menuItems[0];

    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Image source={{ uri: 'data:image/jpeg;base64,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' }} style={styles.logo} />
        <Text style={styles.title}>Welcome to Gourmet Dining</Text>
        <Text style={styles.subtitle}>
          Experience the finest culinary delights right here.
        </Text>
        <Text style={styles.subtitle}>Category Averages:</Text>
        {Object.keys(averages).map((category) => (
          <Text key={category} style={styles.averageText}>
            {category}: R{averages[category].toFixed(2)}
          </Text>
        ))}
        <View style={styles.popularItem}>
          <Text style={styles.popularText}>Popular Item:</Text>
          <Text style={styles.popularText}>{popularItem.name}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Menu')}>
          <Text style={styles.buttonText}>View Menu</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderMenuScreen = () => {
    const filteredMenu = filter === 'All' ? menuItems : menuItems.filter((item) => item.category === filter);

    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.filterContainer}>
          {['All', 'Main Course', 'Starters', 'Drinks', 'Desserts'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.filterButton, filter === category && styles.filterButtonActive]}
              onPress={() => setFilter(category)}
            >
              <Text style={styles.filterText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filteredMenu}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Image source={{ uri: item.image }} style={styles.menuImage} />
              <View style={styles.menuDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </Animated.View>
    );
  };

  const renderCartScreen = () => {
    const { totalPrice, totalItems } = calculateCartSummary();

    return (
      <View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Your Cart</Text>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text>{item.name} x {item.quantity}</Text>
            <Text>R{(item.price * item.quantity).toFixed(2)}</Text>
            <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={styles.summaryText}>
          Total Items: {totalItems} | Total: R{totalPrice.toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'Home' && renderHomeScreen()}
      {currentScreen === 'Menu' && renderMenuScreen()}
      {currentScreen === 'Cart' && renderCartScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  averageText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  popularItem: {
    marginTop: 20,
    alignItems: 'center',
  },
  popularText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f88',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  menuDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  removeText: {
    color: '#f88',
    fontSize: 14,
  },
  summaryText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 5,
  },
  filterButtonActive: {
    backgroundColor: '#f88',
  },
  filterText: {
    color: '#fff',
  },
});

export default App;
