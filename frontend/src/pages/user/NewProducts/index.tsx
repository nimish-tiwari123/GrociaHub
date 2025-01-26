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

// Component
const NewProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]); // Price range state
  const [activeCategories, setActiveCategories] = useState<string[]>([]); // Active category IDs
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10;

  // Fetch categories
  const { data: categoryData, isLoading: categoryLoading } =
    useViewUserCategoryQuery("");

  // Fetch products with applied filters
  const {
    data: productData,
    isLoading: productLoading,
    isFetching: productFetching,
  } = useViewUserProductsQuery({
    searchTerm: debouncedSearchTerm,
    currentPage,
    totalPages,
    category: activeCategories.join("&"),
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

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    console.log(categoryId);
    setActiveCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Remove if already active
          : [...prev, categoryId] // Add if not active
    );
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Filter products by price and active status on the frontend
  const filteredProducts = productData?.products
    ?.filter((product: Product) => product.isActive)
    ?.filter(
      (product: Product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

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
          <Col md={9}>
            <Row className="mt-3">
              <Col md={6}>
                <span className="fw-bold fs-3">
                  Products ({filteredProducts?.length || 0})
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
              ) : filteredProducts?.length > 0 ? (
                filteredProducts.map((item: any, index: React.Key | null | undefined) => (
                  <Col xl={3} lg={4} md={6} sm={6} key={index} className="mb-4">
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
