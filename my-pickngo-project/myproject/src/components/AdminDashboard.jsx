import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [topSales, setTopSales] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        const result = data.data;

        const uniqueBranches = [
          ...new Set(result.map((transaction) => transaction.branch_name)),
        ];
        setBranches(uniqueBranches);

        setTransactions(result);

        const filteredData = selectedBranch
          ? result.filter(
              (transaction) => transaction.branch_name === selectedBranch
            )
          : result;

        const aggregatedData = filteredData.reduce((acc, transaction) => {
          const { product_name, quantity } = transaction;
          if (!acc[product_name]) {
            acc[product_name] = { product_name, quantity: 0 };
          }
          acc[product_name].quantity += quantity;
          return acc;
        }, {});

        const topSalesData = Object.values(aggregatedData)
          .filter((sale) => sale.quantity > 0)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 20);

        setTopSales(topSalesData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [selectedBranch]);

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-gradient-to-br from-[#FFE4E1] to-[#FFC0CB]">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-[#4B3D8F]">
            REGALO
            <span className="block text-xs text-center">GIFT SHOP</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button
                  onClick={logout}
                  className="text-[#4B3D8F] font-bold hover:underline"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Transactions Section */}
          <section className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#4B3D8F]">
              Transactions
            </h2>
            <div className="overflow-y-auto max-h-96">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Order ID</th>
                    <th className="py-2 px-4 border-b">Customer Name</th>
                    <th className="py-2 px-4 border-b">Product Name</th>
                    <th className="py-2 px-4 border-b">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="py-2 px-4 border-b">{transaction.id}</td>
                        <td className="py-2 px-4 border-b">
                          {transaction.customer_name}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {transaction.product_name}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {transaction.quantity}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No transactions available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Top Sales Section */}
          <section className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#4B3D8F]">Top Sales</h2>
            <select
              className="w-full px-4 py-2 mb-4 border rounded"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <div className="overflow-y-auto max-h-96">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Product Name</th>
                    <th className="py-2 px-4 border-b">Total Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {topSales.length > 0 ? (
                    topSales.map((sale, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">
                          {sale.product_name}
                        </td>
                        <td className="py-2 px-4 border-b">{sale.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4">
                        No sales data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
