import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import { Nav, NavItem, NavLink, NavSection } from "../Nav";
import { useContext } from "react";

export const NavBar = () => {
  const theme = useContext(ThemeContext); // When the context Provider changes in App.jsx, this component will rerender
  return (
    <Nav backgroundColor={theme.backgroundColor} color={theme.color}>
      <h3 className="Navbar-logo">United America Airlines</h3>
      <NavSection jc="flex-start">
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/add">Add Flights</NavLink>
        </NavItem>
      </NavSection>
    </Nav>
  );
};
