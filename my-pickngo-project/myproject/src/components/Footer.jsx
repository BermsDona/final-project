function Footer() {
  return (
    <footer className="bg-green-700 text-white py-8" style={{ fontFamily: 'Cambria, "Times New Roman", serif' }}> {/* Set font family */}
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">
            Pick 'N Go is your one-stop convenience store offering a wide range of essentials, snacks, and beverages, ensuring you can grab what you need quickly and easily.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-5">Contact</h3>
            <p className="text-sm">Email: pickngo@gmail.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>
            <p className="text-sm">Main Address: Libertad, Butuan City, Agusan Del Norte</p>
          </div>
        </div>

        <hr className="my-8 border-gray-500" />

        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;