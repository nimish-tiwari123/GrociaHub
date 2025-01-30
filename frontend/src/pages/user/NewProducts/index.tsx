import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Accordion } from "react-bootstrap";
import {  NoData } from "../../../components/common";
import { ProductCard, ProductSkeleton } from "../../../components/user";
import {
  useViewUserCategoryQuery,
  useViewUserProductsQuery,
} from "../../../api/userService";
import Header from "./Header";

// Define types
interface Category {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  category: Category;
  discount: number;
  images: [string];
  quantity: number;
  rating: number;
  stockStatus: string;
  unit: string;
}

const NewProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]); 
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const { data: categoryData, isLoading: categoryLoading } =
    useViewUserCategoryQuery("");

  const {
    data: productData,
    isLoading: productLoading,
    isFetching: productFetching,
  } = useViewUserProductsQuery({
    searchTerm: debouncedSearchTerm,
    category: activeCategories.join(","),
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
  });

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Handle price range change
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setPriceRange([0, value]);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) 
          : [...prev, categoryId] 
    );
  };

  
  const filteredProducts = productData?.products
    ?.filter((product: Product) => product.isActive)
    ?.filter(
      (product: Product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

  return (
    <div>
      <Header />
      <Container >
        <Row className="pt-5 pb-4">
          {/* Filters Section */}
          <Col md={3} className="mt-3 d-none d-md-block">
            <div className="border p-2 rounded h-100 mb-3">
              <h2 className="fw-bold fs-4 mt-3 ms-2">Filters</h2>

              {/* Categories Filter */}
              <div>
                {categoryLoading ? (
                  <p>Loading categories...</p>
                ) : (
                  categoryData?.categories?.map((category: Category) => (
                    <button
                      key={category._id}
                      onClick={() => handleCategoryClick(category._id)}
                      className={`m-2 p-2 btn-sm btn border rounded-pill ${
                        activeCategories.includes(category._id)
                          ? "bg-primary text-white"
                          : ""
                      }`}
                    >
                      {category.name}
                    </button>
                  ))
                )}
              </div>

              {/* Price Range Filter */}
              <div className="mt-4 px-2">
                <h5 className="fw-semibold">Price Range</h5>
                <Form>
                  <Form.Group>
                    <Form.Label>Up to &#8377;{priceRange[1]}</Form.Label>
                    <Form.Range
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>

          {/* Accordion for Filters on Small Screens */}
          <Col xs={12} className="d-block d-md-none mb-3 ">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Filters</Accordion.Header>
                <Accordion.Body>
                  <div>
                    <h2 className="fw-bold fs-4 mt-3 ms-2">Filters</h2>

                    {/* Categories Filter */}
                    <div>
                      {categoryLoading ? (
                        <p>Loading categories...</p>
                      ) : (
                        categoryData?.categories?.map((category: Category) => (
                          <button
                            key={category._id}
                            onClick={() => handleCategoryClick(category._id)}
                            className={`m-2 p-2 btn-sm btn border rounded-pill ${
                              activeCategories.includes(category._id)
                                ? "bg-primary text-white"
                                : ""
                            }`}
                          >
                            {category.name}
                          </button>
                        ))
                      )}
                    </div>

                    {/* Price Range Filter */}
                    <div className="mt-4 px-2">
                      <h5 className="fw-semibold">Price Range</h5>
                      <Form>
                        <Form.Group>
                          <Form.Label>Up to &#8377;{priceRange[1]}</Form.Label>
                          <Form.Range
                            min="0"
                            max="500"
                            step="10"
                            value={priceRange[1]}
                            onChange={handlePriceChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          {/* Products Section */}
          <Col md={9} className="vh-100 overflow-auto">
            <Row className="mt-3">
              <Col md={6}>
                <span className="fw-bold fs-3">
                  Products ({filteredProducts?.length || 0})
                </span>
              </Col>
              <Col md={6}>
              {filteredProducts?.length !== 0 &&
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              }
              </Col>
            </Row>
            <Row className="pt-0">
              {productLoading || productFetching ? (
                <Row>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <Col xl={3} lg={4} md={6} sm={6} key={index}>
                      <ProductSkeleton />
                    </Col>
                  ))}
                </Row>
              ) : filteredProducts?.length > 0 ? (
                filteredProducts.map((item: any, index: React.Key | null | undefined) => (
                  <Col xl={3} lg={4} md={6} sm={6} key={index} className="mb-4 col-6">
                    <ProductCard productData={item} />
                  </Col>
                ))
              ) : (
                <NoData/>
              )}
            </Row>
          </Col>
        </Row>

    
      </Container>
    </div>
  );
};

export default NewProducts;
