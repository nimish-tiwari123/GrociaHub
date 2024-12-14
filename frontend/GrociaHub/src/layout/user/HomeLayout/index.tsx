import { Navbar, Footer } from "../../../components/user";
const HomeLayout = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
