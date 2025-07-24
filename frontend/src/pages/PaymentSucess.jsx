import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { executePaypalPayment } from "../services/paypalService";
import useCartStore from "../stores/useCartStore"; 

function PaypalSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    const payerID = searchParams.get("payerID") || searchParams.get("PayerID");
    const orderId = searchParams.get("orderId");

    console.log("🧾 paymentId:", paymentId);
console.log("🧾 payerID:", payerID);
console.log("🧾 orderId:", orderId);

    if (paymentId && payerID && orderId) {
      executePaypalPayment(paymentId, payerID, orderId)
        .then(() => {
          clearCart();
          setTimeout(() => {
            navigate("/orders"); 
          }, 1000);
        })
        .catch((err) => {
          console.error(" Execute PayPal error:", err);
          navigate("/cart");
        })
        .finally(() => setLoading(false));
    } else {

      navigate("/cart");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        Đang xác nhận thanh toán...
      </h1>
      {loading && <div className="text-gray-500">Vui lòng đợi trong giây lát...</div>}
    </div>
  );
}

export default PaypalSuccessPage;
