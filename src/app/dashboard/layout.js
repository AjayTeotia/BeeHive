import { Header } from "@/components/Header";
import { SideNav } from "@/components/SideNav";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="hidden md:block md:w-[250px] fixed top-0 left-0 h-screen">
        <SideNav />
      </div>

      <div className="md:ml-[250px]">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
