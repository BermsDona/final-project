import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = ({ onClose }) => {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  // Fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart items from the API
  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/carts?filters[user_name][$eq]=${encodeURIComponent(
          userDetails.name
        )}&_limit=1000`
      );
      if (response.ok) {
        const data = await response.json();
        setCart(data.data); // Ensure the response matches your backend format
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Toggle selection of individual items
  const toggleSelection = (productId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId]
    );
  };

  // Handle "Select All" functionality
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Remove an item from the cart
  const removeFromCart = async (item) => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/carts/${item.id}`, // Changed documentId to id
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id));
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((id) => id !== item.id)
        );
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Handle checkout process
  const handleCheckout = async (e) => {
    e.preventDefault();

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const selectedCartItems = cart.filter((item) =>
      selectedItems.includes(item.id)
    );

    if (selectedCartItems.length === 0) {
      alert("Please select items to checkout.");
      return;
    }

    for (const item of selectedCartItems) {
      const cartData = {
        data: {
          product_name: item.product_name,
          quantity: item.quantity,
          total: item.price * item.quantity,
          customer_name: item?.user_name || "Guest",
          date: formattedDate,
          branch_name: item.branch_name,
        },
      };

      try {
        const response = await fetch("http://localhost:1337/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartData),
        });

        if (response.ok) {
          console.log("Item processed:", await response.json());
        } else {
          console.error("Failed to add item:", await response.text());
          alert("Failed to process an item. Please try again.");
          return; // Exit on failure
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during checkout. Please try again.");
        return; // Exit on error
      }
    }

    await handleDelete(selectedCartItems);
    alert("Checkout successful");
  };

  // Delete items from the cart after checkout
  const handleDelete = async (items) => {
    for (const item of items) {
      try {
        const response = await fetch(
          `http://localhost:1337/api/carts/${item.id}`, // Changed documentId to id
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id));
          setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((id) => id !== item.id)
          );
          console.log(`Item with id ${item.id} deleted`);
        } else {
          console.error(`Failed to delete item with id ${item.id}:`, await response.text());
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchCartItems(); // Reload the cart
  };

  // Calculate the total price of selected items
  const totalPrice = cart.reduce(
    (acc, item) =>
      selectedItems.includes(item.id) ? acc + item.price * item.quantity : acc,
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#4B3D8F] mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <span>Select All</span>
            </div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gradient-to-br from-[#FFE4E1] to-[#FFC0CB] p-4 rounded-md shadow"
              >
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                />
                <div>
                  <h4 className="text-lg font-semibold text-[#4B3D8F]">
                    {item.product_name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <p className="text-lg font-bold text-[#4B3D8F]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="text-right mt-6">
        <p className="text-xl font-bold mb-4">
          Total: ${totalPrice.toFixed(2)}
        </p>
        <button
          className="bg-[#4B3D8F] hover:bg-[#3D2F7F] text-white px-6 py-2 rounded-md mt-4"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
