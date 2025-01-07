import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <main className="flex-grow pt-20 px-4"> {/* Added top padding to ensure it doesn’t hide under Navbar */}
        {/* Promotional Banner Section */}
        <section className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md mb-4 mx-auto">
  <div className="max-w-screen-lg mx-auto grid grid-cols-4 gap-4 items-center">
    <div className="col-span-4 flex flex-col items-center text-center">
      <h1 className="text-base font-semibold mb-1">Get free delivery on shopping $200</h1>
      <p className="text-xs mb-2">
        Get the freshest groceries delivered right to your home. Save time, stay safe, and enjoy the convenience of quick, efficient delivery.
      </p>
      <Link to="/shop">
        <button className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-medium text-xs px-3 py-1 rounded-md flex items-center justify-center gap-2 transition duration-300">
          Learn More
          <FaArrowRightLong />
        </button>
      </Link>
    </div>
  </div>
</section>








        {/* Categories Section */}
        <section className="mb-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-green-700 mb-4">All Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {["Vegetables", "Snacks", "Fruits", "Meat", "Dairy", "Drinks"].map(
                (category, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-md shadow-md p-3 text-center hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={`category-image-${index + 1}.png`} // Placeholder for category images
                      alt={category}
                      className="w-full h-24 object-cover mb-2 rounded"
                    />
                    <h3 className="text-sm font-semibold text-green-800">{category}</h3>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="mb-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-green-700 mb-4">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-md shadow-md p-3 text-center hover:shadow-lg transition-shadow"
                >
                  <img
                    src={`product-image-${index + 1}.png`} // Placeholder for product images
                    alt={`Product ${index + 1}`}
                    className="w-full h-28 object-cover mb-2 rounded"
                  />
                  <h3 className="text-sm font-semibold text-green-800">{`Product ${index + 1}`}</h3>
                  <p className="text-base text-green-600 mb-2">{`$${(index + 1) * 5}.00`}</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm transition duration-300">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default UserDashboard;
