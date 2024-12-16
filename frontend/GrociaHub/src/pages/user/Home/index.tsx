import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header />
      <Categories/>
      <FeaturedProducts/>
    </div>
  );
};

export default Home;
