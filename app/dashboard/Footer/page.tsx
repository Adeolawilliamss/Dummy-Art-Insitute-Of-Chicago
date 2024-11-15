import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer id="footer" className="bg-slate-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="footer_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="px-4 relative py-3 flex justify-center sm:justify-start">
            <img
              className="w-32 md:w-40 h-auto"
              src="/images/ArtInstitutelogo.png"
              alt="Art Institute Of Chicago Logo"
            />
          </div>

          {/* Links Section 1 */}
          <div>
            <h1 className="footer-header">Learn With Us</h1>
            <ul className="footer-links">
              <li><a href="#">Families</a></li>
              <li><a href="#">Teens</a></li>
              <li><a href="#">Educators</a></li>
              <li><a href="#">Ryan Learning Center</a></li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div>
            <h1 className="footer-header">Information</h1>
            <ul className="footer-links">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Orders and Returns</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Links Section 3 */}
          <div>
            <h1 className="footer-header">About Us</h1>
            <p className="mb-4 hover:underline underline-offset-4">Mission & History</p>
            <ul className="flex flex-col">
              <li className="mb-4 hover:underline underline-offset-4"><a href="#">Leadership</a></li>
              <li className="mb-4 hover:underline underline-offset-4"><a href="#">Departments</a></li>
              <li className="mb-4 hover:underline underline-offset-4"><a href="#">Financial Reporting</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

