import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="absolute w-screen overflow-hidden bg-dark">
      <Outlet />
    </main>
  );
};

export default Layout;
