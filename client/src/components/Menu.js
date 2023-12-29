import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
  import AdminDashboard from './AdminDashboard';
  import './Menu.css';
  import axios from 'axios';
  import pizzagrillit from "../images/pizzagrillit.png"
  import paneertikkagrillit from "../images/pizzagrillit.png"
  import burgergrillit from "../images/burger.png"
  import CheeseBallgrillit from "../images/CheeseBallgrillit.png"
  import noodlegrillit from "../images/noodlegrillit.png"
  import pastagrillit from "../images/pastagrillit.png"
  import pulaogrillit from "../images/pulaogrillit.png"
  import tea from "../images/teagrillit.png"
  import coffee from "../images/coffeegrillit.png"
  import masalachai from "../images/Masalachaigrillit.png"
  import gulabjamun from "../images/GulabJamungrillit.png"
  import momogrillit from "../images/momogrillit.png"
  import manchurian from "../images/Manchuriangrillit.png"
  import smoothiegrillit from "../images/smoothiegrillit.png"
  import vanillaicecream from "../images/VanillaIceCreamgrillit.png"
  import rabri from "../images/rabrigrillit.png"
  import baklavagrillit from "../images/Baklavagrillit.png"
  import cheesecake from "../images/Cheesecakegrillit.png"
  import chocolatecake from "../images/ChocolateCakegrillit.png"
  import grillspecial from "../images/GrillSpecialgrillit.png"
  import mojito from "../images/Mojitogrillit.png"
  import cocacola from "../images/Coca-Colagrillit.png"
  import EggplantParmesangrillit from "../images/EggplantParmesangrillit.png"
  import EtonMessgrillit from "../images/EtonMessgrillit.png"
  import VeggieStirFrygrillit from "../images/pizzagrillit.png"
  import VeggieKormagrillit from "../images/VeggieKormagrillit.png"
  import Spanakopitagrillit from "../images/Spanakopitagrillit.png"
  import lemonade from "../images/Lemonadegrillit.png"

  const Menu = ({ tableNumber }) => {

    
      const [starters, setStarters] = useState([
      { id: 1, name: 'Noodles', price: 100, Calorie: 400, img: noodlegrillit, quantity: 0 },
      { id: 2, name: 'Manchurian', price: 150, Calorie: 300, img: manchurian, quantity: 0 },
      { id: 3, name: 'Momos', price: 150, Calorie: 500, img: momogrillit, quantity: 0 },
      { id: 4, name: 'Pasta', price: 150, Calorie: 600, img: pastagrillit, quantity: 0 },
      { id: 5, name: 'Cheese Ball', price: 150, Calorie: 400, img: CheeseBallgrillit, quantity: 0 },
      { id: 6, name: 'Grill Special', price: 150, Calorie: 600, img: grillspecial, quantity: 0 },
      { id: 7, name: 'Paneer Tikka', price: 120, Calorie: 350, img: paneertikkagrillit, quantity: 0 },
      // Add more starters here
    ]);

    const [mainCourse, setMainCourse] = useState([
      { id: 8, name: 'Pizza', price: 120, Calorie: 700, img: pizzagrillit, quantity: 0 },
      { id: 9, name: 'Burger', price: 200, Calorie: 500, img: burgergrillit, quantity: 0 },
      { id: 10, name: 'Veggie Stir-Fry', price: 200, Calorie: 300, img: VeggieStirFrygrillit, quantity: 0 },
      { id: 11, name: 'Spanakopita ', price: 200, Calorie: 700, img: Spanakopitagrillit, quantity: 0 },
      { id: 12, name: 'Eggplant Parmesan', price: 200, Calorie: 500, img: EggplantParmesangrillit, quantity: 0 },
      { id: 13, name: 'Veggie Korma', price: 200, Calorie: 600, img: VeggieKormagrillit, quantity: 0 },
      { id: 14, name: 'Pulao', price: 150, Calorie: 800, img: pulaogrillit, quantity: 0 },
      // Add more main course dishes here
    ]);


    const [beverages, setBeverages] = useState([
      { id: 15, name: 'Lemonade', price: 50, Calorie: 400, img: lemonade, quantity: 0 },
      { id: 16, name: 'Coffee', price: 80, Calorie: 300, img: coffee, quantity: 0 },
      { id: 17, name: 'Tea', price: 80, Calorie: 200, img: tea, quantity: 0 },
      { id: 18, name: 'Mojito', price: 80, Calorie: 200, img: mojito, quantity: 0 },
      { id: 19, name: 'Smoothies', price: 80, Calorie: 700, img: smoothiegrillit, quantity: 0 },
      { id: 20, name: 'Coca-Cola', price: 80, Calorie: 200, img: cocacola, quantity: 0 },
      { id: 21, name: 'Masala Chai', price: 50, Calorie: 200, img: masalachai, quantity: 0 },
      // Add more beverage options here
    ]);

    const [dessert, setDessert] = useState([
      { id: 22, name: 'Chocolate Cake', price: 60, Calorie: 600, img: chocolatecake, quantity: 0 },
      { id: 23, name: 'Cheesecake', price: 60, Calorie: 700, img: cheesecake, quantity: 0 },
      { id: 24, name: 'Gulab Jamun', price: 60, Calorie: 300, img: gulabjamun, quantity: 0 },
      { id: 25, name: 'Eton Mess', price: 60, Calorie: 300, img: EtonMessgrillit, quantity: 0 },
      { id: 26, name: 'Baklava', price: 60, Calorie: 400, img: baklavagrillit, quantity: 0 },
      { id: 27, name: 'Vanilla Ice Cream', Calorie: 300, img: vanillaicecream, price: 90, quantity: 0 },
      { id: 28, name: 'Rabri', price: 50, Calorie: 300, img: rabri, quantity: 0 },
      // Add more dessert options here
    ]);

    const [orderItems, setOrderItems] = useState([]);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const addToOrder = (item) => {
      const itemCategory = getCategory(item);
      const updatedItems = itemCategory.map((categoryItem) => {
        if (categoryItem.id === item.id) {
          return { ...categoryItem, quantity: categoryItem.quantity + 1 };
        }
        return categoryItem;
      });

      updateCategory(itemCategory, updatedItems);
      updateOrderItems(item, 1);
    };

  const removeFromOrder = (item) => {
    const itemCategory = getCategory(item);
    const updatedItems = itemCategory.map((categoryItem) => {
      if (categoryItem.id === item.id && categoryItem.quantity > 0) {
        return { ...categoryItem, quantity: categoryItem.quantity - 1 };
      }
      return categoryItem;
    });

    updateCategory(itemCategory, updatedItems);

    // Remove the item from the orderItems array if its quantity becomes 0
    if (item.quantity === 1) {
      const updatedOrderItems = orderItems.filter((orderItem) => orderItem.id !== item.id);
      setOrderItems(updatedOrderItems);
    } else {
      updateOrderItems(item, -1);
    }
  };


    const updateCategory = (itemCategory, updatedItems) => {
      switch (itemCategory) {
        case starters:
          setStarters(updatedItems);
          break;
        case mainCourse:
          setMainCourse(updatedItems);
          break;
        case beverages:
          setBeverages(updatedItems);
          break;
        case dessert:
          setDessert(updatedItems);
          break;
        default:
          break;
      }
    };

    const updateOrderItems = (item, quantity) => {
      const existingItem = orderItems.find((orderItem) => orderItem.id === item.id);
      if (existingItem) {
        const updatedOrderItems = orderItems.map((orderItem) => {
          if (orderItem.id === item.id) {
            return { ...orderItem, quantity: orderItem.quantity + quantity };
          }
          return orderItem;
        });
        setOrderItems(updatedOrderItems);
      } else {
        const updatedOrderItems = [...orderItems, { ...item, quantity: 1 }];
        setOrderItems(updatedOrderItems);
      }
    };

    const getCategory = (item) => {
      if (starters.find((categoryItem) => categoryItem.id === item.id)) {
        return starters;
      }
      if (mainCourse.find((categoryItem) => categoryItem.id === item.id)) {
        return mainCourse;
      }
      if (beverages.find((categoryItem) => categoryItem.id === item.id)) {
        return beverages;
      }
      if (dessert.find((categoryItem) => categoryItem.id === item.id)) {
        return dessert;
      }
      return null;
    };

    const calculateTotalBill = () => {
      let totalBill = 0;
      orderItems.forEach((item) => {
        totalBill += item.price * item.quantity;
      });
      return totalBill;
    };

    const placeOrder = () => {
  setIsOrderPlaced(true);
  const totalBill = calculateTotalBill();
  console.log('Order placed successfully');
  console.log('Total Bill (in Rupees):', totalBill);

  // Convert orderItems to JSON format
  const orderItemsJson = JSON.stringify(orderItems);
  console.log('orderItemsJson:', orderItemsJson); // Add this line to check the value

  axios.post('http://localhost:5000/api/orders', {
      tableNumber: tableNumber, // Add the table number here
      orderItemsJson: orderItemsJson, // Make sure the key name is correct
      totalBill: totalBill,
    })
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.error('Error placing order:', error);
    });
};

      
//     const [allOrders, setAllOrders] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/orders')
//       .then((response) => {
//         setAllOrders(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching orders:', error);
//       });
//   }, []);


    const startNewOrder = () => {
      setIsOrderPlaced(false);
      setOrderItems([]);
      resetQuantities();
    };

    const resetQuantities = () => {
      setStarters(
        starters.map((item) => {
          return { ...item, quantity: 0 };
        })
      );
      setMainCourse(
        mainCourse.map((item) => {
          return { ...item, quantity: 0 };
        })
      );
      setBeverages(
        beverages.map((item) => {
          return { ...item, quantity: 0 };
        })
      );
      setDessert(
        dessert.map((item) => {
          return { ...item, quantity: 0 };
        })
      );
    };

      const [selectedCategory, setSelectedCategory] = useState('starters');
  const [activeCategory, setActiveCategory] = useState('starters'); // New state for active category

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category);
  };

  const renderMenuSection = (items, sectionName, category) => {
    const isActive = category === activeCategory;

    return (
      <div className={`menu-section ${isActive ? 'active' : ''}`}>
      {items.map((item) => (
        <div key={item.id} className="menu-item">
          <img src={item.img} alt={`grillit${item.img}`} style={{borderRadius:"30px", height:"30px", width:"50px"}}></img>
          <span style={{width:"50%",textAlign:"left"}}>{item.name}</span>
          <span className='txt-calorie'>kacls{item.Calorie}</span>
          <span>₹{item.price}</span>
          <div className="quantity-controls">
            <button className='button-add-sub' onClick={() => removeFromOrder(item)} disabled={item.quantity <= 0}>-</button>
            <span>{item.quantity || 0}</span>
            <button className='button-add-sub' onClick={() => addToOrder(item)}>+</button>
          </div>
        </div>  
      ))}
    </div>
  );
};

    return (
         <div>
      {isOrderPlaced ? (
        <div>
          <h2 className='txt-menu3 clr-txt-s'>Order Placed Successfully</h2>
          <p className='txt-menu2'>Total Bill (in Rupees): {calculateTotalBill()}</p>
          <button className='order-btn txt-menu4' onClick={startNewOrder}>New Order</button>
        </div>
      ) : (
        <div>
          <h1 className='top-head txt-menu2'>Menu - Table {tableNumber}</h1>
          <div className="menu-buttons">
            <button className={`head-btn txt-menu4 ${activeCategory === 'starters' ? 'active' : ''}`} onClick={() => handleCategoryChange('starters')}>Starters</button>
            <button className={`head-btn txt-menu4 ${activeCategory === 'mainCourse' ? 'active' : ''}`} onClick={() => handleCategoryChange('mainCourse')}>Main Course</button>
            <button className={`head-btn txt-menu4 ${activeCategory === 'beverages' ? 'active' : ''}`} onClick={() => handleCategoryChange('beverages')}>Beverages</button>
            <button className={`head-btn txt-menu4 ${activeCategory === 'dessert' ? 'active' : ''}`} onClick={() => handleCategoryChange('dessert')}>Dessert</button>
          </div>
          <div className="menu-container">
            <div className="menu-column txt-menu4">
              {selectedCategory === 'starters' && renderMenuSection(starters, 'Starters')}
              {selectedCategory === 'mainCourse' && renderMenuSection(mainCourse, 'Main Course')}
            </div>
            <div className="menu-column txt-menu4">
              {selectedCategory === 'beverages' && renderMenuSection(beverages, 'Beverages')}
              {selectedCategory === 'dessert' && renderMenuSection(dessert, 'Dessert')}
            </div>
          </div>
          <div>
            <h2 className='txt-menu2'>Order Summary</h2>
            <div className="order-summary txt-menu2">
              {orderItems.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                  <button className='button-big-rmv txt-menu2' onClick={() => removeFromOrder(item)}>Remove</button>
                  <span>Quantity: {item.quantity}</span>
                </div>
              ))}
            </div>
            {orderItems.length > 0 ? (
              <button className="order-btn txt-menu4" onClick={placeOrder}>
                Place Order
              </button>
            ) : (
              <p className='txt-menu2'>Please add items to place order</p>
            )}
          </div>
        </div>
      )}
    </div>
    );
  };

  const App = () => {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <h1>Welcome to the Restaurant</h1>
          </Route>
          <Route path="/1" exact>
            <Menu tableNumber="1" />
          </Route>
          <Route path="/2" exact>
            <Menu tableNumber="2" />
          </Route>
          <Route path="/3" exact>
            <Menu tableNumber="3" />
          </Route>
          <Route path="/4" exact>
            <Menu tableNumber="4" />
          </Route>
          <Route path="/5" exact>
            <Menu tableNumber="5" />
          </Route>
          <Route path="/6" exact>
            <Menu tableNumber="6" />
          </Route>
          <Route path="/7" exact>
            <Menu tableNumber="7" />
          </Route>
          <Route path="/8" exact>
            <Menu tableNumber="8" />
          </Route>
          <Route path="/9" exact>
            <Menu tableNumber="9" />
          </Route>
          <Route path="/10" exact>
            <Menu tableNumber="10" />
        </Route>
        <Route path="/admin" exact>
          <AdminDashboard />
        </Route>    
        </Switch>
      </Router>
    );
  };

  export default App;
