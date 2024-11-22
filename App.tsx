type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

class MenuApp {
  private menuItems: MenuItem[] = [];
  private currentId: number = 1;

  constructor() {
    this.initializeMenu();
  }

  // Initialize with sample data
  private initializeMenu() {
    this.menuItems = [
      { id: this.currentId++, name: 'Filet Mignon', description: 'Tender steak', price: 199.99, category: 'Main Course' },
      { id: this.currentId++, name: 'Black Forest Cake', description: 'Chocolate and cherry dessert', price: 69.99, category: 'Dessert' },
      { id: this.currentId++, name: 'Espresso Martini', description: 'Coffee-based cocktail', price: 59.99, category: 'Drink' },
    ];
  }

  // Add a new menu item
  addMenuItem(name: string, description: string, price: number, category: string) {
    const newItem: MenuItem = { id: this.currentId++, name, description, price, category };
    this.menuItems.push(newItem);
    console.log(`Added: ${name}`);
  }

  // Remove a menu item by ID
  removeMenuItem(id: number) {
    this.menuItems = this.menuItems.filter(item => item.id !== id);
    console.log(`Removed item with ID: ${id}`);
  }

  // Calculate the average price of items by category
  calculateAveragePriceByCategory(): { [category: string]: number } {
    const categorySums: { [key: string]: { sum: number; count: number } } = {};
    this.menuItems.forEach(item => {
      if (!categorySums[item.category]) {
        categorySums[item.category] = { sum: 0, count: 0 };
      }
      categorySums[item.category].sum += item.price;
      categorySums[item.category].count += 1;
    });

    const averages: { [category: string]: number } = {};
    for (const category in categorySums) {
      averages[category] = parseFloat((categorySums[category].sum / categorySums[category].count).toFixed(2));
    }
    return averages;
  }

  // Filter items by category
  filterItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter(item => item.category === category);
  }

  // Display all menu items
  displayMenu() {
    console.log('Menu Items:');
    this.menuItems.forEach(item => {
      console.log(`ID: ${item.id}, Name: ${item.name}, Category: ${item.category}, Price: ${item.price}`);
    });
  }
}

// Example usage
const menuApp = new MenuApp();

// Display initial menu
menuApp.displayMenu();

// Add a new item
menuApp.addMenuItem('Lobster Thermidor', 'Baked lobster in a creamy sauce', 399.99, 'Main Course');

// Remove an item
menuApp.removeMenuItem(2);

// Calculate average prices by category
console.log('Average Prices by Category:', menuApp.calculateAveragePriceByCategory());

// Filter items by category
console.log('Filtered Items (Desserts):', menuApp.filterItemsByCategory('Dessert'));

// Display updated menu
menuApp.displayMenu();
