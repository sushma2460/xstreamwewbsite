import { Link } from "wouter";
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo2 from "../components/logo3.png"; // Update the path to your logo image

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              {/* <span className="text-primary">Xstream</span> Minds */}
              <img
    src={logo2} // <-- update path to match your project
    alt="Xstream Minds Logo"
    className="h-16 w-auto cursor-pointer"
  />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
             Empowering businesses to accelerate digital transformation by leveraging cutting-edge data streaming, cloud computing, and AI technologies. Our solutions enable seamless data flow, real-time analytics, and intelligent automation, helping organizations innovate faster, scale efficiently, and stay competitive in today’s fast-paced digital landscape.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/xstream-minds-pvt-ltd/posts/?feedView=all"
                target="_blank"
  rel="noopener noreferrer"

                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://x.com/i/flow/login?redirect_after_login=%2FXstream_Minds"
                target="_blank"
  rel="noopener noreferrer"

                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
        
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-primary transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-primary transition-colors">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-primary transition-colors">About Us</a>
                </Link>
              </li>
              
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-primary transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Mail size={16} className="mr-2 text-primary" />
                sales@xstreamminds.com
              </p>
              <p className="flex items-center">
                <Phone size={16} className="mr-2 text-primary" />
                +1 513 342 1033
              </p>
              <div className="flex">
  <div className="flex items-start">
  <MapPin size={24} className="text-primary mt-1 mr-2" />
  <p className="text-left leading-relaxed">
    402, Sri Geetanjali Towers,<br />
    Beside Nexus Mall,<br />
    Kukatpally Housing Board Colony,<br />
    Hyderabad, Telangana, India 500072.
  </p>
</div>
</div>


            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        {/* <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest insights and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-secondary"
              />
              <Button type="submit" className="cta-button">
                Subscribe
              </Button>
            </form>
          </div>
        </div> */}

        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
  <p>
    <Link href="/privacy-policy">
      <a className="text-white hover:text-primary transition-colors">Privacy Policy</a>
    </Link>{" "}
    - Terms of Services - Web Accessibility
  </p>
  <p>
    Copyright &copy; 2025 Xstream Minds Pvt Ltd. All rights Reserved
    by Xstream Minds Pvt Ltd.
  </p>
</div>

      </div>
    </footer>
  );
}
