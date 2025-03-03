import { createContext, useState, useEffect } from 'react';

export const DonationCartContext = createContext();

export const DonationCartProvider = ({ children }) => {
  // Initialize state from localStorage or as an empty array
  const [donationCartItems, setDonationCartItems] = useState(
    localStorage.getItem('donationItems') 
      ? JSON.parse(localStorage.getItem('donationItems')) 
      : []
  );

  // Add an item to the donation cart
  const addToDonationCart = (item) => {
    setDonationCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.variations) === JSON.stringify(item.variations) // Ensure variations match
      );

      if (existingItemIndex !== -1) {
        // If item exists, increase its quantity
        return prevCartItems.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add the new item with quantity 1
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove an item from the donation cart
  const removeFromDonationCart = (item) => {
    const isItemInCart = donationCartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      // If quantity is 1, remove the item entirely
      setDonationCartItems(donationCartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      // Decrease the item's quantity
      setDonationCartItems(
        donationCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const deleteItemFromCart = (item) => {
    setDonationCartItems((prevItems) => prevItems.filter(cartItem => cartItem.id !== item.id));
};

  // Clear the entire donation cart
  const clearDonationCart = () => {
    setDonationCartItems([]);
  };

  // Calculate the total donation amount
  const getDonationCartTotal = () => {
    return donationCartItems.reduce((total, item) => total + item.amount * item.quantity, 0);
  };

  // Save donation cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('donationItems', JSON.stringify(donationCartItems));
  }, [donationCartItems]);

  // Load donation cart items from localStorage on initial render
  useEffect(() => {
    const storedItems = localStorage.getItem('donationItems');
    if (storedItems) {
      setDonationCartItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <DonationCartContext.Provider
      value={{
        donationCartItems,
        addToDonationCart,
        removeFromDonationCart,
        clearDonationCart,
        getDonationCartTotal,
        deleteItemFromCart
      }}
    >
      {children}
    </DonationCartContext.Provider>
  );
};