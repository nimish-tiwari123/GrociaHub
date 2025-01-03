import { Container, Row, Col } from "react-bootstrap";
import React, { ReactNode, useState } from "react";
import { SearchField, Pagination } from "../../../components/admin";
import { Button, CustomTable, TableSkeleton } from "../../../components/common";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal, ProductModal } from "../../../Modals";
import { userRoutesConstants } from "../../../routes/user/userRoutesConstants";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine, RiDeleteBin5Fill } from "react-icons/ri";
import { redirectAdminRoutes } from "../../../routes/admin/adminRoutesConstants";
import {
  useViewProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../../api/adminService";
import { toast } from "react-toastify";
import "./style.css";

const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useViewProductsQuery(searchTerm);
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const totalPages = 10; // Assuming static pagination for now

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddProduct = () => {
    navigate(redirectAdminRoutes.productManagement.add);
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      const response = await deleteProduct(id).unwrap();
      toast.success(response?.message || "Product deleted successfully");
      setShowDeleteModal(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete product");
    }
  };

  const toggleStatus = async (row: DataType, status: boolean) => {
    try {
      const updatedRow = { ...row, isActive: status };
      await updateProduct({ id: row.id, productData: updatedRow }).unwrap();
      toast.success("Product status updated successfully");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update product status");
    }
  };

  const convertProductsToCustomFormat = (products: DataType[]) => {
    return products?.map((product, index) => ({
      id: product._id,
      index: String(index + 1).padStart(2, "0"),
      product: product.name || "Unknown Product",
      category: product.category?.name || "Unknown Category",
      images: product.images[0] || "https://via.placeholder.com/50",
      price: `₹${product.price}`,
      stock: String(product.quantity),
      status: product.isActive,
      created: new Date(product.createdAt).toLocaleDateString("en-GB"),
    }));
  };
  type ColumnType = {
    key: string;
    header: string;
    type: "checkbox" | "text" | "product" | "toggler";
    togglerHandler?: (value: boolean, row: DataType) => void;
  };

  type DataType = {
    _id: string;
    id: string;
    name: string;
    category: {
      name: string;
    };
    index: string;
    product: string;
    images: string;
    price: string;
    stock: string;
    isActive: Boolean;
    createdAt: string;
    quantity: string;
    status: Boolean;
  };

  type ActionType = {
    label: string;
    onClick: (row: DataType) => void;
    icon: ReactNode;
  };
  const columns: ColumnType[] = [
    { key: "checkbox", header: "", type: "checkbox" },
    { key: "index", header: "S. No.", type: "text" },
    { key: "product", header: "Product", type: "product" },
    { key: "price", header: "Price", type: "text" },
    { key: "stock", header: "Stock", type: "text" },
    {
      key: "status",
      header: "Status",
      type: "toggler",
      togglerHandler: (value, row) => toggleStatus(row, value),
    },
    { key: "created", header: "Created", type: "text" },
  ];

  const actions: ActionType[] = [
    {
      label: "View",
      onClick: () => setShowModal(true),
      icon: <MdOutlineRemoveRedEye />,
    },
    {
      label: "Edit",
      onClick: () => navigate(redirectAdminRoutes.productManagement.edit),
      icon: <MdOutlineEdit />,
    },
    {
      label: "Delete",
      onClick: (row) => {
        setSelectedProduct(row);
        setShowDeleteModal(true);
      },
      icon: <RiDeleteBinLine />,
    },
  ];

  const convertedData = convertProductsToCustomFormat(
    productData?.products || []
  );

  return (
    <Container
      fluid
      className="main-ProductManagement-container dash-container px-2 px-md-4"
    >
      <Row className="my-2">
        <Col md={5}>
          <h1 className="fw-bold fs-3">Manage Product</h1>
        </Col>
        <Col md={7} className="d-flex justify-content-end">
          <Button
            btnLabel="+ Add Product"
            btnStyle="bg-custom-primary border-0 text-light fw-medium rounded p-2"
            onClick={handleAddProduct}
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={4}>
          <SearchField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to search..."
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <div className="bg-white p-3 custom-shadow rounded border table-conainer-common position-relative">
            {isLoading || isFetching || deleteLoading ? (
              <TableSkeleton />
            ) : (
              <CustomTable
                columns={columns}
                data={convertedData}
                actions={actions}
              />
            )}
            <div className="pagination-container position-absolute bottom-0 mb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </Col>
      </Row>

      <DeleteModal
        show={showDeleteModal}
        heading="Delete Product"
        subheading={`Are you sure you want to delete the product "${selectedProduct?.product}"?`}
        onDelete={() => handleDeleteConfirm(selectedProduct?.id || "")}
        onCancel={() => setShowDeleteModal(false)}
      />

      <ProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        product={selectedProduct}
      />
    </Container>
  );
};

export default ProductManagement;
