import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faBox } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";
import Footer from "./Footer";

function Branches() {
  const navigate = useNavigate();
  const branches = [
    {
      id: 1,
      name: "Ampayon",
      image: "path/to/ampayon-logo.png",
      address: "123 Ampayon St, Butuan City",
      contact: "(123) 456-7890",
      email: "ampayon@example.com"
    },
    {
      id: 2,
      name: "Libertad",
      image: "path/to/libertad-logo.png",
      address: "456 Libertad St, Butuan City",
      contact: "(123) 456-7891",
      email: "libertad@example.com"
    },
    {
      id: 3,
      name: "Bancasi",
      image: "path/to/bancasi-logo.png",
      address: "789 Bancasi St, Butuan City",
      contact: "(123) 456-7892",
      email: "bancasi@example.com"
    },
    {
      id: 4,
      name: "Masao",
      image: "path/to/masao-logo.png",
      address: "101 Masao St, Butuan City",
      contact: "(123) 456-7893",
      email: "masao@example.com"
    },
    {
      id: 5,
      name: "San Vicente",
      image: "path/to/san-vicente-logo.png",
      address: "202 San Vicente St, Butuan City",
      contact: "(123) 456-7894",
      email: "sanvicente@example.com"
    },
    {
      id: 6,
      name: "Ambago",
      image: "path/to/ambago-logo.png",
      address: "303 Ambago St, Butuan City",
      contact: "(123) 456-7895",
      email: "ambago@example.com"
    },
    {
      id: 7,
      name: "Doongan",
      image: "path/to/doongan-logo.png",
      address: "404 Doongan St, Butuan City",
      contact: "(123) 456-7896",
      email: "doongan@example.com"
    },
    {
      id: 8,
      name: "Dumalagan",
      image: "path/to/dumalagan-logo.png",
      address: "505 Dumalagan St, Butuan City",
      contact: "(123) 456-7897",
      email: "dumalagan@example.com"
    },
    {
      id: 9,
      name: "Golden Ribbon",
      image: "path/to/golden-ribbon-logo.png",
      address: "606 Golden Ribbon St, Butuan City",
      contact: "(123) 456-7898",
      email: "goldenribbon@example.com"
    },
    {
      id: 10,
      name: "Baan",
      image: "path/to/tungao-logo.png",
      address: "707 Tungao St, Butuan City",
      contact: "(123) 456-7899",
      email: "tungao@example.com"
    },
  ];

  const handleBranchClick = (branchName) => {
    sessionStorage.setItem("selectedBranch", branchName);
    navigate("/products");
  };

  return (
    <>
      <Navbar />
      <section className="bg-white py-16">
        <div className="container mx-auto px-8">
          <div className="flex justify-center mb-8">
            <div className="bg-green-200 rounded-full py-2 px-4 flex items-center shadow-md">
              <FontAwesomeIcon icon={faStore} className="text-green-700 text-3xl" />
              <h2 className="text-3xl font-bold text-green-700">BRANCHES ALL OVER BUTUAN CITY</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
            {branches.map((branch) => (
              <div key={branch.id} className="flex flex-col justify-between items-center p-6 bg-green-200 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full cursor-pointer" onClick={() => handleBranchClick(branch.name)}>
                <img
                  src={branch.image}
                  alt={`${branch.name} Logo`}
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-2xl font-semibold text-green-900 mb-4 text-center">{branch.name}</h3>
                <p className="text-sm text-gray-600 mb-2 text-left w-full">{branch.address}</p>
                <p className="text-sm text-gray-600 mb-2 text-left w-full">{branch.contact}</p>
                <p className="text-sm text-gray-600 mb-4 text-left w-full">{branch.email}</p>
                <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md mt-auto">
                  <FontAwesomeIcon icon={faBox} className="mr-2" /> View Products
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Branches;