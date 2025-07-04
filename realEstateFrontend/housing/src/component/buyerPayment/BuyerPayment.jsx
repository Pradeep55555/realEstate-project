import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BuyerPayment() {
  const { property_number } = useParams();
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const data = await fetch("http://localhost:4000/api/payment/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 50000 }) // ₹500.00
    });

    const order = await data.json();

    const options = {
      key: "rzp_test_B3DiCY6WgcFGWx",
      amount: order.amount,
      currency: order.currency,
      name: "RealEstate Portal",
      description: `Payment for property #${property_number}`,
      order_id: order.id,
      handler: async function (response) {
        alert("Payment Successful!");
        await fetch("http://localhost:4000/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response)
        });
        navigate("/buyer/dashboard");
      },
      prefill: {
        name: "Pradeep",
        email: "pradeepdhakad095@gmail.com",
        contact: "9302840287",
      },
      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    initiatePayment();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Processing payment for property #{property_number}...</h2>
    </div>
  );
}

export default BuyerPayment;
