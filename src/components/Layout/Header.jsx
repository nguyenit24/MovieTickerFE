import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Movies", href: "/movies" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <header className="container">
      <nav className="col">
        {/* Logo bên trái */}
        <div className="flex-shrink-0">
          <Link to="/" className="">
            SUPERMovie
          </Link>
        </div>

        {/* Menu căn giữa */}
        <div className="col">
          <div className="">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className=""
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Đăng nhập bên phải */}
        <div className="col">
          <Link
            to="/login"
            className=""
          >
            <User size={20} className="mr-1" />
            <span className="">Đăng nhập</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;  