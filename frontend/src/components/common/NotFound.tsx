import { notFound } from "../../assets";
import { Button } from "../../components/common";
import { useNavigate } from "react-router-dom";
import { userRoutesConstants } from "../../routes/user/userRoutesConstants";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="notFound-img-bg">
        <div className="notFound-bg d-flex align-items-center justify-content-center flex-column">
          <img src={notFound} alt="Not Found" className="notfound-img" />
          <Button
            btnLabel="Go to Home"
            btnStyle="bg-custom-primary border-0 text-light fw-medium rounded p-2 px-4 mt-minus"
            onClick={() => navigate(userRoutesConstants.home)}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
