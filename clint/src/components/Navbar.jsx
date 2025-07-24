// import React from "react";
// import { NavLink, Link, Navigate } from "react-router-dom";
// import { useAuth } from "../context/auth";
// import SearchInput from "./form/SearchInput";
// import useCategory from "../hooks/useCategory";
// import { useCart } from "../context/Cart";
// import logo from "../assets/logo.png";
// import s from "../AllCssFile/Navbar.module.css";

// const Navbar = () => {
//   const categories = useCategory();
//   const [auth, setAuth] = useAuth();
//   const [cart] = useCart();
//   const handleLogout = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//   };

//   return (
//     <>
//       <nav
//         className={`navbar navbar-expand-lg bg-body-tertiary sticky-top ${s.navbar}`}
//       >
//         <div className="container-fluid">
//           <button
//             className={`navbar-toggler ${s.customToggler}`}
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarTogglerDemo01"
//             aria-controls="navbarTogglerDemo01"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className={`navbar-toggler-icon ${s.HamIcon}`} />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//             <div className={s.LogoContainer}>
//               <Link to="/" className="navbar-brand">
//                 <img src={logo} alt="" className={s.Logo} />
//               </Link>
//             </div>
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <SearchInput />
//               <li className="nav-item">
//                 <NavLink to="/" className="nav-link " aria-current="page">
//                   Home
//                 </NavLink>
//               </li>

//               <li className="nav-item dropdown nav-item">
//                 <Link
//                   className="nav-link dropdown-toggle"
//                   data-bs-toggle="dropdown"
//                 >
//                   Category
//                 </Link>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link className="dropdown-item" to="/categories">
//                       <h6>All Categories</h6>
//                     </Link>
//                   </li>
//                   {categories?.map((c) => (
//                     <li key={c._id}>
//                       <Link
//                         className="dropdown-item"
//                         to={`/category/${c.slug}`}
//                       >
//                         {c?.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </li>

//               {!auth.user ? (
//                 <>
//                   <li className="nav-item">
//                     <NavLink
//                       to="/register"
//                       className="nav-link "
//                       aria-current="page"
//                     >
//                       Register
//                     </NavLink>
//                   </li>
//                   <li className="nav-item">
//                     <NavLink
//                       to="/login"
//                       className="nav-link "
//                       aria-current="page"
//                     >
//                       Login
//                     </NavLink>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li className="nav-item dropdown">
//                     <NavLink
//                       className="nav-link dropdown-toggle"
//                       href="#"
//                       role="button"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={28}
//                         height={28}
//                         fill="currentColor"
//                         className="bi bi-person-circle"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//                         <path
//                           fillRule="evenodd"
//                           d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
//                         />
//                       </svg>
//                     </NavLink>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <b>Mr.{auth?.user?.name}</b>
//                       </li>
//                       <hr />

//                       <NavLink
//                         to={`/dashboard${
//                           auth?.user?.role == 1 ? "/admin" : "/user"
//                         }`}
//                         className="dropdown-item"
//                         href="#"
//                       >
//                         Dashboard
//                       </NavLink>

//                       <li className="nav-item">
//                         <NavLink
//                           onClick={handleLogout}
//                           to="/login"
//                           className="nav-link "
//                           aria-current="page"
//                         >
//                           Logout
//                         </NavLink>
//                       </li>
//                     </ul>
//                   </li>
//                 </>
//               )}

//               <li className="nav-item">
//                 <NavLink to="/cart" className="nav-link " aria-current="page">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width={25}
//                     height={25}
//                     fill="currentColor"
//                     className="bi bi-cart"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
//                   </svg>{" "}
//                   ({cart?.length})
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import SearchInput from "./form/SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/Cart";
import logo from "../assets/logo.png";
import s from "../AllCssFile/Navbar.module.css";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const categories = useCategory();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <nav className={s.navbar}>
      {/* Mobile Navbar */}
      <div className={`${s.mobileNav} ${s.navfix}`}>
        <div className={s.mobileLeft}>
          <button onClick={toggleSidebar} className={s.hamburger}>
            <span className={`${s.HamIcon} ${sidebarOpen ? s.open : ""}`} />
          </button>
          <Link to="/" className={s.logoContainer}>
            <img
              src={logo}
              alt="Logo"
              className={`${s.Logo} ${s.mobilelogo}`}
            />
          </Link>
        </div>

        <div className={`${s.mobileSearchCart} ${s.saerchdiv}`}>
          <div className={`${s.searchGroup}`}>
            <SearchInput />
          </div>

          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h4
              style={{
                margin: 0,
                fontSize: "1.2rem",
                color: "black",
                marginRight: "10px",
                textDecoration: "none",
              }}
            >
              <b>HOME</b>
            </h4>
          </Link>

          <NavLink to="/cart" className={s.cartIcon}>
            <div className={`${s.cartdiv}`}>
              {" "}
              <FaCartShopping className={`${s.carticonmobile}`} />(
              {cart?.length}){" "}
            </div>
          </NavLink>
        </div>
      </div>

      <div className={`$ ${s.mobileNavsearch}`}>
        <SearchInput />
      </div>

      {/* Desktop Navbar */}
      <div className={s.desktopNav}>
        <Link to="/" className={s.logoContainer}>
          <img src={logo} alt="Logo" className={s.Logo} />
        </Link>
        <div className={s.searchGroup}>
          <SearchInput />
        </div>
        <div className={s.links}>
          <NavLink to="/">Home</NavLink>
          <div className={s.dropdown}>
            <span>Category</span>
            <div className={s.dropdownMenu}>
              <Link to="/categories">All Categories</Link>
              {categories?.map((c) => (
                <Link key={c._id} to={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          {!auth.user ? (
            <>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          ) : (
            <>
              <div className={s.dropdown}>
                <span>👤 {auth.user.name}</span>
                <div className={s.dropdownMenu}>
                  <NavLink
                    to={`/dashboard${
                      auth.user.role === 1 ? "/admin" : "/user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </div>
              </div>
              <NavLink onClick={handleLogout} to="/login">
                Logout
              </NavLink>
            </>
          )}
          <NavLink to="/cart">
            <FaCartShopping />({cart?.length})
          </NavLink>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className={s.sidebarOverlay}>
          <div className={s.sidebar} ref={sidebarRef}>
            <button onClick={closeSidebar} className={s.closeSidebar}>
              ✖
            </button>
            <NavLink to="/" onClick={closeSidebar}>
              Home
            </NavLink>




              {!auth.user ? (
            <>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          ) : (
            <>
              <div className={s.dropdown}>
                <span>👤 {auth.user.name}</span>
                <div className={s.dropdownMenu}>
                  <NavLink
                    to={`/dashboard${
                      auth.user.role === 1 ? "/admin" : "/user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </div>
              </div>
              <NavLink onClick={handleLogout} to="/login">
                Logout
              </NavLink>
            </>
          )}
            
            

            <div className={s.dropdownMenu}>
              <NavLink
                to={`/dashboard${auth.user.role === 1 ? "/admin" : "/user"}`}
              >
                Dashboard
              </NavLink>
            </div>
            <NavLink to="/about" onClick={closeSidebar}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={closeSidebar}>
              Contact
            </NavLink>
            <NavLink to="/policy" onClick={closeSidebar}>
              privacy Policy
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
