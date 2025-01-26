import { useFormik } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import { AuthTextInput, Button } from "../../../components/common";
import { Link } from "react-router-dom";
import { profileSchema } from "../../../schema/user/Profile";
import { useState } from "react";
import { FaCamera } from "react-icons/fa"; // Import Camera Icon
import profileImgDefault from "../../../assets/profile.jpg";
import "./style.css";

const Profile = () => {
  const [profileImg, setProfileImg] = useState(profileImgDefault);

  const handleImageChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "Ramzi Cherif",
      email: "ramziCherif2022@gmail.com",
      phone: "9988776655",
      date: "22/07/2004",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  return (
    <div>
      <Container className="my-5">
        <div className="custom-breadcrumb d-flex my-3">
          <Link to="/" className="breadcrumb-link text-decoration-none">
            Home
          </Link>
          <span className="breadcrumb-separator mx-2">/</span>
          <span className="breadcrumb-active">Profile</span>
        </div>
        <Row className="justify-content-center p-2">
          <Col md={12} lg={6} className="shadow-sm rounded border p-0">
            <div className="profile-bg w-100"></div>
            <form onSubmit={formik.handleSubmit} className="p-3 p-md-4">
              <div className="text-center profile-img-container position-relative w-100">
                <img
                  src={profileImg}
                  alt="profile"
                  className="profile-img-user rounded-circle border"
                />
                <div className="camera-icon-container position-absolute rounded-circle ">
                <label htmlFor="imageUpload" className="camera-icon-label d-flex align-items-center justify-content-center w-100 h-100 cursor-pointer">
                  <FaCamera className="camera-icon text-custom-primary" />
                </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
            
                <h5 className="fw-bold m-0 mt-3">Ramzi Cherif</h5>
                <p className="opacity-50">Admin</p>
              </div>
              <Row>
                <Col md={6}>
                  <AuthTextInput
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    formik={formik}
                  />
                </Col>
                <Col md={6}>
                  <AuthTextInput
                    type="email"
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    formik={formik}
                  />
                </Col>
                <Col md={6}>
                  <AuthTextInput
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    formik={formik}
                  />
                </Col>
                <Col md={6}>
                  <AuthTextInput
                    name="date"
                    label="Date Joined"
                    placeholder="Enter date"
                    formik={formik}
                  />
                </Col>
                <Col md={6}>
                  <AuthTextInput
                    name="address"
                    label="Street Address"
                    placeholder="Enter your street address"
                    formik={formik}
                  />
                </Col>
                <Col md={6}>
                  <AuthTextInput
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    formik={formik}
                  />
                </Col>
                <Col md={6}>
                  <AuthTextInput
                    name="state"
                    label="State"
                    placeholder="Enter your state"
                    formik={formik}
                  />
                </Col>

                <Col md={6}>
                  <AuthTextInput
                    name="zipCode"
                    label="Zip Code"
                    placeholder="Enter your zip code"
                    formik={formik}
                  />
                </Col>
              </Row>

              <div className="text-center mt-5 d-flex justify-content-end">
                <Button
                  btnLabel="Save Changes"
                  btnStyle="bg-custom-primary border-0 text-light px-3 fw-medium py-2 rounded"
                />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
