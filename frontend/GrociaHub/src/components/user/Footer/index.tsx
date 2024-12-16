import { Container, Row, Col } from "react-bootstrap";
import { logo } from "../../../assets";
import { SlLocationPin } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { payment } from "../../../assets";
import { TiSocialFacebook } from "react-icons/ti";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import "./style.css";

const Footer = () => {
  return (
    <Container className="footer-container px-4 px-md-5">
      <hr />
      <Row className="py-5">
        <Col md={6} lg={4} className="d-flex flex-column gap-4 mb-4 mb-lg-0">
          <img src={logo} alt="logo" style={{ width: "45%" }} />
          <div>
            <SlLocationPin size={20} className="text-custom-primary fw-medium" />
            <span className="fw-bold"> Address: </span>1762 School House Road
          </div>
          <div>
            <IoCallOutline size={20} className="text-custom-primary fw-medium" />
            <span className="fw-bold"> Call Us: </span>1233-777
          </div>
          <div>
            <MdOutlineMailOutline size={20} className="text-custom-primary fw-medium" />
            <span className="fw-bold"> Email: </span>groceyish@contact.com
          </div>
          <div>
            <IoMdTime size={20} className="text-custom-primary fw-medium" />
            <span className="fw-bold"> Work hours: </span>8:00 - 20:00, Sunday - Thursday
          </div>
        </Col>
        <Col md={6} lg={3} className="mb-4 mb-lg-0">
          <div className="d-flex flex-column gap-4">
            <h3 className="fs-4">Account</h3>
            <div className="d-flex flex-column gap-2">
              <div>Cart</div>
              <div>Track Order</div>
              <div>Shipping Details</div>
            </div>
          </div>
        </Col>
        <Col md={6} lg={2} className="mb-4 mb-lg-0">
          <div className="d-flex flex-column gap-4">
            <h3 className="fs-4">Useful links</h3>
            <div className="d-flex flex-column gap-2">
              <div>About Us</div>
              <div>Contact</div>
              <div>Hot Deals</div>
              <div>Promotions</div>
              <div>New Products</div>
            </div>
          </div>
        </Col>
        <Col md={6} lg={3}>
          <div className="d-flex flex-column gap-4 ps-0 ps-md-5">
            <h3 className="fs-4">Help Center</h3>
            <div className="d-flex flex-column gap-2">
              <div>Payments</div>
              <div>Track Order</div>
              <div>Shipping Details</div>
              <div>Refund</div>
              <div>Checkout</div>
              <div>Shipping</div>
              <div>Q&A</div>
              <div>Privacy Policy</div>
            </div>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="pb-3 pt-2 align-items-cente">
        <Col md={4} className="opacity-75 text-center text-md-start mt-2">
          &copy; 2025, All rights reserved
        </Col>
        <Col md={4} className="text-center mt-2">
          <img src={payment} alt="payment" className="w-50 d-block mx-auto" />
        </Col>
        <Col md={4} className="d-flex gap-3 align-items-center justify-content-center justify-content-md-end mt-2">
          <div className="icon-circle">
            <TiSocialFacebook size={24} />
          </div>
          <div className="icon-circle">
            <FaLinkedinIn size={20} />
          </div>
          <div className="icon-circle">
            <FaInstagram size={20} />
          </div>
          <div className="icon-circle">
            <FaXTwitter size={20} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
