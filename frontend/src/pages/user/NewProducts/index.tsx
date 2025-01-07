import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Accordion } from "react-bootstrap";
import { RiLoader4Fill } from "react-icons/ri";
import { Button } from "../../../components/common";
import { ProductCard, ProductSkeleton } from "../../../components/user";
import {
  useViewUserCategoryQuery,
  useViewUserProductsQuery,
} from "../../../api/userService";
import Header from "./Header";

// Define types
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isActive: boolean; // Add isActive field to product type
}

interface CategoryResponse {
  categories: Category[];
}

interface ProductResponse {
  products: Product[];
  totalPages: number;
}

// Component
const NewProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10; // Adjust this based on your requirements

  // Fetch categories
  const { data: categoryData, isLoading: categoryLoading } =
    useViewUserCategoryQuery("");

  // Fetch products with applied filters
  const { data: productData, isLoading: productLoading, isFetching:productFetching } =
    useViewUserProductsQuery({
      searchTerm: debouncedSearchTerm,
      currentPage,
      totalPages,
      categories: activeCategories.join(","), // Pass active categories as comma-separated string
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const handleCategoryClick = (categoryName: string) => {};

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Filter products to show only active ones
  const activeProducts = productData?.products?.filter((product) => product.isActive);

  return (
    <div>
      <Header />
      <Container>
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
                  categoryData?.categories?.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`m-2 p-2 btn-sm btn border rounded-pill ${
                        activeCategories.includes(category.name)
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
                    <Form.Label>Up to ${priceRange[1]}</Form.Label>
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
          <Col xs={12} className="d-block d-md-none mb-3">
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
                        categoryData?.categories?.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`m-2 p-2 btn-sm btn border rounded-pill ${
                              activeCategories.includes(category.name)
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
                          <Form.Label>Up to ${priceRange[1]}</Form.Label>
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
          <Col md={9}>
            <Row className="mt-3">
              <Col md={6}>
                <span className="fw-bold fs-3">
                  Products ({activeProducts?.length})
                </span>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
              ) : activeProducts?.length > 0 ? (
                activeProducts.map((item) => (
                  <Col
                    xl={3}
                    lg={4}
                    md={6}
                    sm={6}
                    key={item.id}
                    className="mb-4"
                  >
                    <ProductCard productData={item} />
                  </Col>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </Row>
          </Col>
        </Row>

        {/* Load More Button */}
        <div className="d-flex justify-content-center">
          <Button
            btnLabel="Load More"
            onClick={handleLoadMore}
            btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 my-5 fs-7 rounded"
            rightIcon={<RiLoader4Fill />}
          />
        </div>
      </Container>
    </div>
  );
};

export default NewProducts;
