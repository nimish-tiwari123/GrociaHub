import AppShowCase from "./AppShowCase";
import Banner from "./Banner";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import Header from "./Header";
import Services from "./Services";

const Home = () => {
  return (
    <div>
      <Header />
      <Categories/>
      <FeaturedProducts/>
      <Banner/>
      <AppShowCase/>
      <Services/>
    </div>
  );
};

export default Home;
