import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../features/orderSlice";

export default function CheckoutForm() {
  const Navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cartItem = JSON.parse(localStorage.getItem("cartItem"));
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const shippingCharge = JSON.parse(localStorage.getItem("shippingCharge"));
  const cartTotalAmount = JSON.parse(localStorage.getItem("cartTotalAmount"));
  const cartTotalQuantity = JSON.parse(
    localStorage.getItem("cartTotalQuantity")
  );
  const amount =
    JSON.parse(localStorage.getItem("cartTotalAmount")) +
    JSON.parse(localStorage.getItem("shippingCharge"));
  const [createOrder, { data, isSuccess, error }] = useCreateOrderMutation();

  console.log(data);
  console.log(error);
  const { newOrder } = data || {};
  const { _id } = newOrder || {};
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   return_url: `${window.location.origin}/user/confirm-order`,
      // },
    });
    if (
      result.error?.type === "card_error" ||
      result.error?.type === "validation_error"
    ) {
      setMessage(result?.error.message);
    } else if (result?.paymentIntent?.status === "succeeded") {
      const order = {
        orderItems: cartItem,
        shippingInfo: shippingInfo,
        shippingCharge: shippingCharge,
        totalAmount: cartTotalAmount,
        totalQuantity: cartTotalQuantity,
        totalPrice: amount,
        paymentInfo: {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        },
      };
      await createOrder({ order });
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsProcessing(false);
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("cartItem");
      localStorage.removeItem("shippingCharge");
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("cartTotalAmount");
      localStorage.removeItem("cartTotalQuantity");
    }
  }, [isSuccess]);

  return (
    <>
      <div className="form-container" onClick={handleSubmit}>
        <PaymentElement />
        <Button
          style={{ width: "100%", marginTop: "10px" }}
          type="primary"
          disabled={isProcessing || !stripe || !elements}
        >
          <span>{isProcessing ? "Processing ... " : `Pay now $${amount}`}</span>
        </Button>
        {/* Show any error or success messages */}
        {message && (
          <div
            style={{
              background: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
              color: "white",
              minHeight: "35px",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            {message}
          </div>
        )}
        {isSuccess && (
          <div
            style={{
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            <AiFillCheckCircle size={60} color="orangered" />
            <h2>Your Order has been Placed successfully</h2>
            <Button
              style={{
                width: "100%",
                background: "#3DB67E",
                borderRadius: "0",
                color: "white",
              }}
              onClick={() => Navigate(`/user/order/${_id}`)}
            >
              View Order
            </Button>
            <div style={{ textAlign: "center", paddingTop: "5px" }}>
              <h3>OR</h3>
            </div>
            <Button
              style={{
                width: "100%",
                borderRadius: "0",
                color: "white",
              }}
              type="primary"
              onClick={() => Navigate("/")}
            >
              Back To Home
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
