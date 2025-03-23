import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { title, price, tourLocation } = location.state || {}; 

  useEffect(() => {
    // منع تكرار الدفع عند إعادة تحميل الصفحة
    const hasPaid = sessionStorage.getItem("hasPaid");

    if (!hasPaid && title && price && tourLocation) {
      sessionStorage.setItem("hasPaid", "true");
      handlePayment();
    } else {
      navigate("/payment-failed"); // إعادة التوجيه في حالة البيانات غير متوفرة
    }
  }, []);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // إرسال طلب للباك إند لإنشاء رابط الدفع
      const response = await fetch("https://your-backend-api.com/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price, 
          currency: "EGP", 
          userId: "1234", 
        }),
      });

      const data = await response.json();

      if (data.payment_url) {
        window.location.href = data.payment_url; // توجيه المستخدم لصفحة الدفع
      } else {
        navigate("/payment-failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      navigate("/payment-failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
        <p className="text-gray-600 mb-6">
          You are booking: <span className="font-bold">{title}</span>
        </p>
        <p className="text-gray-600 mb-6">
          Location: <span className="font-bold">{tourLocation}</span>
        </p>
        <p className="text-gray-600 mb-6">
          Total Amount: <span className="font-bold">${price}</span>
        </p>

        {loading && <p className="text-gray-600">Please wait while we process your payment...</p>}
      </div>
    </div>
  );
};

export default PaymentPage;
