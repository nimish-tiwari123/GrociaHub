import { Container, Row, Col } from "react-bootstrap";
import { grocery } from "../../../assets";
import { ProductCard, ProductSkeleton } from "../../../components/user"; 
import { useLocation } from "react-router-dom";
import { useViewSearchProductsQuery } from "../../../api/userService";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");
  const { data: productData, isLoading, isError } = useViewSearchProductsQuery(searchTerm);

  return (
    <Container>
      
      {/* Loading State */}
      {isLoading && (
        <Row>
          {Array.from({ length: 12 }).map((_, index) => (
            <Col
              xl={2}
              lg={3}
              md={4}
              sm={6}
              className="col-6 p-2 p-md-auto py-0"
              key={index}
            >
              <ProductSkeleton />
            </Col>
          ))}
        </Row>
      )}

      {/* Error Handling */}
      {isError && (
        <p className="text-danger text-center mt-3">
   
          Failed to fetch search results. Please try again later.
        </p>
      )}

      {/* No Data Found */}
      {!isLoading && productData?.products?.length === 0 && (
        <p className="text-muted text-center mt-3">
                 <img
        src={grocery}
        alt="Search img"
        style={{ maxWidth: "400px" }}
        className="m-auto d-block mt-5"
      />
      <h3 className="text-custom-primary text-center fw-medium">
        Search Your Grocery Item
      </h3>
          No products found matching "{searchTerm}". Try searching for something else!
        </p>
      )}

      {/* Display Product Cards */}
      <Row>
        {productData?.products?.map((item :any) => (
          <Col
            xl={2}
            lg={3}
            md={4}
            sm={6}
            className="col-6 p-2 p-md-auto py-0"
            key={item._id}
          >
            <ProductCard productData={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Search;
