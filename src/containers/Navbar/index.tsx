import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icons, Switch } from "components";
import { Sizes } from "themes";
import { useNavbar } from "./useNavbar";

export const Navbar = () => {
  const { navItems, isAllEnabled, onChange } = useNavbar();

  return (
    <Nav>
      <BrandLogo to="/">
        <span>Data</span>
        <span>Guard</span>
      </BrandLogo>
      <NavLinks>
        {navItems?.map(({ id, title }, key) => (
          <NavLinkItem key={id}>
            <NavLinkStyled to={`plugins/${id.toLowerCase()}`}>
              <Icons title={title} />
              <span>{title}</span>
            </NavLinkStyled>
          </NavLinkItem>
        ))}
      </NavLinks>
      <Control $isAllEnabled={isAllEnabled}>
        <SwitchStyled
          size={Sizes.lg}
          value={isAllEnabled}
          onChange={onChange}
          activeText={<SwitchLabel>All plugins enabled</SwitchLabel>}
          inActiveText={<SwitchLabel>All plugins disabled</SwitchLabel>}
        />
      </Control>
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
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NavLinkItem = styled.li`
  display: flex;
`;

const NavLinkStyled = styled(NavLink)`
  padding: ${({ theme }) => theme.spacing(5)};
  flex: 1;
  display: flex;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing(4)};
  border-left: 4px solid transparent;
  background-color: ${({ theme }) => theme.palette.navbar.link.main};
  transition: all 0.2s ease-in-out;

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

const Control = styled.div<{ $isAllEnabled: boolean }>`
  padding: ${({ theme }) => theme.spacing(5)};
  padding-bottom: ${({ theme }) => theme.spacing(8)};
  background: linear-gradient(
    to top,
    ${({ $isAllEnabled, theme }) =>
        $isAllEnabled
          ? theme.palette.success.main
          : theme.palette.error.main} -50%,
    ${({ theme }) => theme.palette.navbar.background} 45%
  );
`;

const SwitchStyled = styled(Switch)`
  flex-direction: row-reverse;
  justify-content: space-evenly;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing(5)};
`;

const SwitchLabel = styled.span`
  font-size: 16px;
  color: black;
`;
