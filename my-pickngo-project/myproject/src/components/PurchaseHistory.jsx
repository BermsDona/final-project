import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const PurchaseHistory = () => {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/transactions?filters[customer_name][$eq]=${userDetails.name}`
        );
        const data = await response.json();
        setTransactionData(data.data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">
          Purchase History
        </h2>
        <hr className="border-green-600 mb-4" />
        <table className="table-auto w-full border border-green-600">
          <thead className="bg-green-100">
            <tr>
              <th className="text-green-600 px-4 py-3 border border-green-600">Date</th>
              <th className="text-green-600 px-4 py-3 border border-green-600">Product Name</th>
              <th className="text-green-600 px-4 py-3 border border-green-600">Quantity</th>
              <th className="text-green-600 px-4 py-3 border border-green-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.length > 0 ? (
              transactionData.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-green-50">
                  <td className="border border-green-600 px-4 py-2">{purchase.date}</td>
                  <td className="border border-green-600 px-4 py-2">{purchase.product_name}</td>
                  <td className="border border-green-600 px-4 py-2">{purchase.quantity}</td>
                  <td className="border border-green-600 px-4 py-2">₱{purchase.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-600 py-4">
                  No purchase history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PurchaseHistory;