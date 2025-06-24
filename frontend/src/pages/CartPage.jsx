import React from "react";
import useCartStore from "../stores/useCartStore";
import MainLayout from "../layouts/MainLayout";

function CartPage() {
  const { cart, removeFromCart } = useCartStore();
  return (
    <MainLayout>
      <div>
        <h1>Your Cart</h1>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.r_id}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
}

export default CartPage;
