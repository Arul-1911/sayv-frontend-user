import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Image, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import LoginCard from "../../components/layout/LoginCard";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import FormField from "../../components/layout/FormField";
import { getError } from "../../utils/error";
import { useGetAddNewBankAccountMutation } from "../../features/apiSlice";

export default function InternetBanking({ goBack, next, containerDiv }) {
  const [getUserConsent, {isLoading}] = useGetAddNewBankAccountMutation()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getUserConsent()
      if(response?.data?.success){
        window.location.href = response?.data?.consentUrl;
      }
    } catch (error) {
      getError(error);
    }
  };

  // const handleCancel = () => {
  //   if (infoNext) {
  //     infoNext();
  //   } else {
  //     navigate("/");
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("bankToken");
  //   }
  // };

  return (
    <LoginCard
      height={"auto"}
      width={"450px"}
      containerDiv={containerDiv}
      bankDetails={true}
    >
      <div className="d-flex align-items-center justify-content-between">
        {/* <div>
          <IoArrowBackCircleOutline
            color="rgba(92, 182, 249, 1)"
            cursor={"pointer"}
            size={23}
            onClick={() => (goBack ? goBack() : navigate("/user/choose-bank"))}
          />
        </div> */}

        <div>
          <Image
            height={"35px"}
            width={"35px"}
            src="/logo/LoginLogo.png"
            alt="..."
          />
        </div>

        <div>
          <RxCrossCircled
            color="rgba(92, 182, 249, 1)"
            cursor={"pointer"}
            size={23}
            onClick={() => (goBack ? goBack() : navigate("/"))}
          />
        </div>
      </div>

      <div className="consumer-right-text mt-2">
        <div className="consumer-right-img">
          <Image
            height={"15px"}
            width={"15px"}
            src="/images/Subtract.png"
            alt="..."
          />
        </div>
        <div
          className="px-5"
          style={{
            color: "var(--primary-color)",
            fontSize: "10px",
            padding: "10px",
          }}
        >
          Your Internet Banking username will not be shared with Basiq Pty Ltd.
          One time passwords are used to share Consumer Data Right data. You
          will never be asked to provide your Internet Banking password to share
          Consumer Data Right data.
        </div>
      </div>
      {/* <div
        className="my-2 mb-3"
        style={{
          color: "rgba(55, 73, 87, 1)",
          fontSize: "10px",
          fontWeight: 400,
        }}
      >
        Please read the{" "}
        <span
          style={{
            textDecoration: "underline",
            color: "rgba(92, 182, 249, 1)",
          }}
        >
          Consumer Data Right
        </span>{" "}
        for more information.
      </div> */}

      {/* <Card> */}
      {/* <CardBody> */}
      <div className="d-flex align-items-center flex-column mb-2">
        {/* <div
              style={{
                color: "var(--primary-color)",
                fontWeight: 800,
                fontSize: "16px",
              }}
            >
              Login
            </div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "rgba(55, 73, 87, 1)",
                textAlign: "center",
              }}
            >
              You have requested to share your data with Basiq Pty Ltd. Please
              input your Internet Banking username to continue.
            </div> */}
      </div>
      {/* <Form className="px-5" onSubmit={handleSubmit}>
            <FormField
              placeholder={"Internet banking username"}
              type={"text"}
              //   onChange={(e) => setEmail(e.target.value)}
              //   value={email}
            />
            <p
              style={{
                fontSize: "10px",
                fontWeight: 400,
                color: "rgba(55, 73, 87, 0.7)",
                textAlign: "center",
              }}
            >
              Forgot your Internet Banking username? Please contact us at{" "}
              <span
                style={{
                  textDecoration: "underline",
                  color: "rgba(92, 182, 249, 1)",
                }}
              >
                13 95 00
              </span>{" "}
              to retrieve it
            </p>

            </Form> */}
      <Row className=" w-100 mt-3">
        <Col className="d-flex justify-content-center">
          <Button
            type="submit"
            className="float-sm-end w-auto "
            style={{
              background: "var(--primary-color)",
              fontWeight: 700,
              fontSize: "12px",
              padding: "10px",
              opacity: isLoading ? 0.7 : 1,
              border:'none',
              marginLeft:'20px'
            }}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Redirecting..." : "Continue"}
          </Button>
        </Col>
      </Row>
      {/* <Row>
            <Col>
              <Button
                className="float-sm-end w-100 "
                style={{
                  border: "none",
                  backgroundColor: "white",
                  color: "var(--primary-color)",
                  fontWeight: 700,
                  fontSize: "12px",
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row> */}
      {/* </CardBody> */}
      {/* </Card> */}
      <ToastContainer />
    </LoginCard>
  );
}
