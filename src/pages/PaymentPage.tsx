import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type {
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
  CreateOrderData
} from "@paypal/paypal-js";

// Type definitions for environment variables
interface ProcessEnv {
  REACT_APP_PAYPAL_CLIENT_ID: string;
}

declare let process: {
  env: ProcessEnv;
};

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { title, price, tourLocation } = location.state || {};

  // PayPal client ID with fallback
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 
                        process.env.REACT_APP_PAYPAL_CLIENT_ID || 
                        "YOUR_PAYPAL_CLIENT_ID";

  useEffect(() => {
    if (!title || !price || !tourLocation) {
      navigate("/payment-failed");
    }
  }, [title, price, tourLocation, navigate]);

  const createOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: `Tour Booking: ${title}`,
          amount: {
            value: price.toString(),
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    try {
      setLoading(true);
      
      if (!actions.order) {
        throw new Error("Order actions not available");
      }
      
      const details = await actions.order.capture();
      
      const response = await fetch("https://your-backend-api.com/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
          tourDetails: {
            title,
            price,
            tourLocation
          }
        }),
      });

      if (response.ok) {
        setPaid(true);
        setTimeout(() => navigate("/payment-success"), 2000);
      } else {
        navigate("/payment-failed");
      }
    } catch (error) {
      console.error("Payment capture error:", error);
      navigate("/payment-failed");
    } finally {
      setLoading(false);
    }
  };

  const onError = (err: Record<string, unknown>) => {
    console.error("PayPal error:", err);
    navigate("/payment-failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
        <p className="text-gray-600 mb-6">
          You are booking: <span className="font-bold">{title}</span>
        </p>
        <p className="text-gray-600 mb-6">
          Location: <span className="font-bold">{tourLocation}</span>
        </p>
        <p className="text-gray-600 mb-6">
          Total Amount: <span className="font-bold">${price}</span>
        </p>

        {loading && (
          <p className="text-gray-600 mb-6">Processing your payment...</p>
        )}

        {paid ? (
          <div className="text-green-600 font-bold mb-6">
            Payment successful! Redirecting...
          </div>
        ) : (
          <div className="paypal-button-container">
            <PayPalScriptProvider 
              options={{ 
                clientId: paypalClientId,
                currency: "USD",
                intent: "capture",
                components: "buttons",
              }}
            >
              <PayPalButtons
                style={{ 
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  label: "paypal"
                }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            </PayPalScriptProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;