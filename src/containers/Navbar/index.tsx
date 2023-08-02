import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icons } from "components";
import { useNavbar } from "./useNavbar";

export const Navbar = () => {
  const { navItems, error, status } = useNavbar();

  return (
    <Nav>
      <BrandLogo to="/">
        <span>Data</span>
        <span>Guard</span>
      </BrandLogo>
      {navItems.length > 0 ? (
        <NavLinks>
          {navItems.map(({ id, title }, key) => (
            <NavLinkItem key={id}>
              <NavLinkStyled to={`plugins/${id.toLowerCase()}`}>
                <Icons title={title} />
                <span>{title}</span>
              </NavLinkStyled>
            </NavLinkItem>
          ))}
        </NavLinks>
      ) : null}
    </Nav>
  );
};

const Nav = styled.nav`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.navbar.background};
  border-right: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const BrandLogo = styled(NavLink)`
  font-size: 32px;
  padding: 20px;

  > span:last-child {
    font-weight: bold;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
`;

const NavLinkItem = styled.li`
  flex: 1;
  display: flex;
`;

const NavLinkStyled = styled(NavLink)`
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing(4)};
  border-left: 4px solid transparent;
  background-color: ${({ theme }) => theme.palette.navbar.link.main};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.palette.navbar.link.dark};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.navbar.link.light};
  }

  &.active {
    border-color: #c62f40;
    background-color: ${({ theme }) => theme.palette.navbar.link.light};
  }
`;
