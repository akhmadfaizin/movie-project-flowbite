import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { ImageUrl } from "../assets";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export const NavbarComponent = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate("/search", { state: { searchText } });
    }
  };

  return (
    <Navbar fluid rounded>
      <NavbarBrand>
        <img src={ImageUrl.webLogo} className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Movieflix
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <div className="flex flex-row items-center gap-4">
          <NavbarLink className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </NavbarLink>
          <NavbarLink>
            <TextInput
              type="text"
              rightIcon={FaSearch}
              placeholder="Search Movie"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearchEnter}
              required
            />
          </NavbarLink>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
};
