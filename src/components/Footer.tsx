import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import footerImage from "../assets/images/Footerimg.png";

const Footer = () => {
  return (
    <div className="flex flex-col relative">
      {/* Footer */}
      <footer className="text-center text-lg-start bg-transparent pl-20">
        <div className="container p-4">
          <div className="row flex justify-between gap-8">
            {/* Travel Section */}
            <div className="col-lg-3 col-md-6 mb-4 flex-1 px-4 text-left">
              <h5 className="text-uppercase text-black text-2xl mb-4">Travel</h5>
              <p className="text-base text-[#4a4a4a] mb-4">
                Travel helps companies manage payments easily.
              </p>
              <div className="flex gap-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#DF6951]">
                  <i className="fab fa-twitter fa-lg"></i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#DF6951]">
                  <i className="fab fa-facebook-f fa-lg"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#DF6951]">
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
                <a href="https://wa.me/+201091640114" target="_blank" rel="noopener noreferrer" className="text-[#DF6951]">
                  <i className="fab fa-whatsapp fa-lg"></i>
                </a>
              </div>
            </div>

            {/* Company Section */}
            <div className="col-lg-3 col-md-6 mb-4 flex-1 px-4 text-left">
              <h5 className="text-uppercase text-black text-2xl mb-4">Company</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/about-us" className="text-dark no-underline text-base" aria-label="About Us">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-dark no-underline text-base" aria-label="Careers">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-dark no-underline text-base" aria-label="Blog">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-dark no-underline text-base" aria-label="Pricing">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="col-lg-3 col-md-6 mb-4 flex-1 px-4 text-left">
              <h5 className="text-uppercase text-black text-2xl mb-4">Join Our Newsletter</h5>
              <form className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control border-0 rounded-none h-12 bg-[#f5f5f5] w-64 p-3"
                />
                <button
                  type="submit"
                  className="btn bg-[#DF6951] text-white rounded-none h-12 rounded-r-md px-6"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-sm text-[#6c757d] mt-2">
                *Receive weekly updates and exclusive tour packages.
              </p>
            </div>

            {/* Contact Section */}
            <div className="col-lg-3 col-md-6 mb-4 flex-1 px-4 text-left">
              <h5 className="text-uppercase text-black text-2xl mb-4">Contact</h5>
              <p className="text-base">
                <i className="fas fa-envelope text-[#DF6951] mr-2"></i>
                Email: <a href="mailto:info@travelwebsite.com" className="text-dark">info@travelwebsite.com</a>
                <br />
                <i className="fas fa-phone text-[#DF6951] mr-2"></i>
                Phone: <a href="tel:+1234567890" className="text-dark">+1 234 567 890</a>
              </p>
            </div>
          </div>
        </div>

        {/* Line */}
        <div className="container px-4">
          <hr className="border-t border-black my-0" />
        </div>

        {/* Footer Bottom */}
        <div className="text-center p-3 bg-transparent px-8 text-base">
          © 2025 Travel Website | All Rights Reserved
        </div>
      </footer>

      {/* Image */}
      <div className="absolute bottom-0 right-0 w-[577px] h-[300px] overflow-hidden z-0">
        <img
          src={footerImage}
          alt="Footer Decoration"
          
        />
      </div>
    </div>
  );
};

export default Footer;