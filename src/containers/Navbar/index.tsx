import { useNavbar } from "./useNavbar";

export const Navbar = () => {
  const { navItems, error, status } = useNavbar();

  return (
    <div>
      <div>Navbar</div>
      {navItems.length > 0
        ? navItems.map((navItem) => (
            <div key={navItem.title}>
              <span>{navItem.icon}</span>
              <span>{navItem.title}</span>
            </div>
          ))
        : null}
    </div>
  );
};
