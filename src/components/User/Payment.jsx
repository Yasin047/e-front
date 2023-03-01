import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { MdLibraryAddCheck, MdLocalShipping, MdPayment } from "react-icons/md";
import {
  useClientSecretIntentMutation,
  useGetPublishableKeyQuery,
} from "../../features/paymentSlice";
import Loading from "../utils/Loading";
import CheckoutForm from "./CheckOutForm";

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const amount =
    JSON.parse(localStorage.getItem("cartTotalAmount")) +
    JSON.parse(localStorage.getItem("shippingCharge"));
  const {
    isLoading: getKeyIsLoading,
    data: getKey,
    isError: getKeyIsError,
    error: getKeyError,
  } = useGetPublishableKeyQuery();
  const [clientSecretIntent, { isLoading, data, isError, error }] =
    useClientSecretIntentMutation();
  const { publishableKey } = getKey || {};
  const { clientSecret } = data || {};
  useEffect(() => {
    if (publishableKey) {
      setStripePromise(loadStripe(publishableKey));
    }
  }, [publishableKey]);
  useEffect(() => {
    clientSecretIntent({ amount });
  }, [clientSecretIntent, amount]);

  let content;
  if (getKeyIsLoading || isLoading) {
    content = <Loading />;
  } else if (getKeyIsError || isError) {
    content = (
      <p>{getKeyIsError ? getKeyError?.data.message : error?.data.message}</p>
    );
  }
  return (
    <div style={{ margin: "0 10%" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          color: "gray",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 3%",
          paddingTop: "30px",
        }}
      >
        <div>
          <MdLocalShipping color="orangered" size={25} />
        </div>
        <div
          style={{
            width: "45%",
            borderBottom: "2px solid gray",
          }}
        ></div>
        <div>
          <MdLibraryAddCheck color="orangered" size={25} />
        </div>
        <div style={{ width: "45%", borderBottom: "2px solid gray" }}></div>
        <div>
          <MdPayment color="orangered" size={25} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          color: "gray",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        <div>Shipping Details</div>
        <div style={{ marginRight: "30px" }}>Confirm Order</div>
        <div style={{ marginRight: "15px" }}>Payment</div>
      </div>

      <Row justify="center">
        <Col xs={24} sm={18} md={16}>
          <div style={{ margin: "50px 0", color: "gray" }}>
            <h2
              style={{
                width: "100%",
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              Payment Card Info
            </h2>
          </div>
          <div>
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </Col>
      </Row>
      <div>
        {content && (
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <h3>{content}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
