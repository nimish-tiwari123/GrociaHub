import { Container, Row } from "react-bootstrap";
import { notification } from "../../../assets";
const Notifications = () => {
  return (
    <Container fluid className="dash-container">
        <Row className="align-items-center justify-content-center h-100">
    <div>
    <img src={notification} alt="Notification" className="d-block m-auto" style={{maxWidth:"300px"}} />
    <h2 className="fw-bold text-center text-custom-primary">No Notification Yet</h2>
    </div>

        </Row>
    </Container>
  );
};

export default Notifications;
