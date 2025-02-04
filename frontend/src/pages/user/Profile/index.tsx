import { useFormik } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import { AuthTextInput, Button, Loader } from "../../../components/common";
import { Link } from "react-router-dom";
import { profileSchema } from "../../../schema/user/Profile";
import { useEffect, useState } from "react";
import { FaCamera, FaUserCircle } from "react-icons/fa";
import {
  useViewUserByIdQuery,
  useUpdateUserMutation,
} from "../../../api/userService.ts";
import "./style.css";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const { data: userData, isLoading: isGetLoading } =
    useViewUserByIdQuery(userId);
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const [profileImg, setProfileImg] = useState<any>(null
  );
  console.log(userData)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file)); // Preview the image
      formik.setFieldValue("profileImage", file); // Update Formik value
    }
  };
  useEffect(() => {
    if(userData?.user?.profileImage){
      setProfileImg(userData?.user?.profileImage);

    }
  }, [userData]);
  
  const formik = useFormik({
    initialValues: {
      fullName: userData?.user?.name || "",
      email: userData?.user?.email || "",
      phone: userData?.user?.phoneNumber || "",
      date:
        new Date(userData?.user?.createdAt).toLocaleDateString("en-GB") || "",
      address: userData?.user?.address || "",
      city: userData?.user?.city || "",
      state: userData?.user?.state || "",
      zipCode: userData?.user?.zipCode || "",
      profileImage: null,
    },
    enableReinitialize: true,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.fullName);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phone);
        formData.append("date", values.date);
        formData.append("address", values.address);
        formData.append("city", values.city);
        formData.append("state", values.state);
        formData.append("zipCode", values.zipCode);
        if (values.profileImage) {
          formData.append("image", values.profileImage); // Add the image
        }

        const response = await updateUser({ id: userId, formData });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div>
      {isGetLoading || isUpdateLoading && <Loader />}
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
                {profileImg ? (
                  <img
                    src={profileImg}
                    alt="profile"
                    className="profile-img-user rounded-circle border"
                  />
                ) : (
                  <FaUserCircle
                    size={100}
                    className="text-secondary opacity-50"
                  />
                )}
                <div className="camera-icon-container position-absolute rounded-circle">
                  <label
                    htmlFor="imageUpload"
                    className="camera-icon-label d-flex align-items-center justify-content-center w-100 h-100 cursor-pointer"
                  >
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

                <h5 className="fw-bold m-0 mt-3">{formik.values.fullName}</h5>
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
                    disabled={true}
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
