
import { Icon , IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/AdminNavbar.scss"
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";



const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const style = getComputedStyle(document.documentElement);
  const pinkred = style.getPropertyValue("--pinkred");
  const darkgrey = style.getPropertyValue("--darkgrey");

  return (
    <div className="adminnavbar">
      <a href="/admin">
        <img src="/assets/logo.jpg" alt="logo" />
      </a>
        <div className="wa">
          <h1>Admin panel</h1>
        </div>
       {/* <div className="navbar_search">
          <input
            type="text"
            placeholder='Search ...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton disabled={search === ""}>
            <Search
              //sx={{ color: variables.pinkred }}
              onClick={() => {navigate(`/properties/search/${search}`)}}
            />
          </IconButton>
        </div>  */}

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Add Your Property
          </a>
        ) : (
          <a href="/login" className="host">
            
          </a>
          
        )}
        <a href="/users" className="host">UserDetail</a>
        

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          {/* //sx={{ color: variables.darkgrey }} */}
          <Menu />
          {!user ? (
            <Person />//sx={{ color: variables.darkgrey }}
          ) : (
            //   <img
            //     src={`http://localhost:3001/${user.profileImagePath.replace(
            //       "public",
            //       ""
            <h4>MENU</h4>
            //     )}`}
            //     alt="profile photo"
            //     style={{ objectFit: "cover", borderRadius: "50%" }}
            //   />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
           {/* <Link to={`/${user._id}/trips`}>Trip List</Link> */}
              {/*<Link to={`/${user._id}/wishList`}>Wish List</Link> */}
              <Link to={`/${user._id}/properties`}>Property List</Link>
              {/* <Link to={`/${user._id}/reservations`}>Reservation List</Link>  */}
            <Link to="/create-listing">Edit property</Link>
            {/* //<Link to="/users">Edit User</Link> */}


            <Link to="/history">audit</Link>
            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
                localStorage.clear();
              }}
            >
              Log Out
            </Link>
            
          </div>
        )}
      </div>
    </div>
  );
};






export default Navbar;






