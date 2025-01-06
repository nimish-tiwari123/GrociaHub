import { Container } from "react-bootstrap";
import { grocery } from "../../../assets";
const Search = () => {
  return (
    <Container>
      <img
        src={grocery}
        alt="Search img"
        style={{ maxWidth: "400px" }}
        className="m-auto d-block mt-5"
      />
      <h3 className="text-custom-primary text-center mb-5 fw-medium">
        Search Your Grocery Item
      </h3>
    </Container>
  );
};

export default Search;
