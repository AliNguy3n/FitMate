import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageBreadcrumb } from "../../components";
import { APICore } from "../../helpers/api/apiCore";
import config from "../../config";

const BASE_URL = config.API_URL;

type OrderResponse = {
  id: number;
  orderDate: string;
  totalAmount: number;
  status: boolean;
  delivered: boolean;
  user: string; // userId
  payment?: number;
};

type UserResponse = {
  id: string;
  username: string;
  address?: string;
  deliveryAddress?: string;
  email?: string;
  phone?: string;
};

type ProductImage = {
  storedName: string;
  relativePath: string;
};

type Supplier = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  image?: ProductImage;
  supplier?: Supplier;
};

type OrderDetailResponse = {
  id: number;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  product?: Product;
};

const api = new APICore();

const OrderDetailOverview = ({
  order,
  user,
}: {
  order: OrderResponse;
  user: UserResponse | null;
}) => (
  <div className="lg:col-span-3">
    <div className="card">
      <div className="card-header">
        <h6 className="card-title">Order Overview</h6>
      </div>
      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <h5 className="font-medium text-gray-700">{user?.username || order.user}</h5>
          </div>
          <div>
            <p className="text-sm text-gray-500">Delivery Address</p>
            <h5 className="font-medium text-gray-700">{user?.deliveryAddress || user?.address || "N/A"}</h5>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <h5 className="font-medium text-gray-700">{order.orderDate ? new Date(order.orderDate).toLocaleString() : "N/A"}</h5>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <h5 className="font-medium text-gray-700">{order.totalAmount?.toLocaleString()} $</h5>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment ID</p>
            <h5 className="font-medium text-gray-700">{order.payment ?? "N/A"}</h5>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <h5 className="font-medium text-gray-700">
              {order.status
                ? <span className="px-3 py-1 rounded bg-green-500 text-white text-xs font-semibold">Completed</span>
                : <span className="px-3 py-1 rounded bg-yellow-400 text-white text-xs font-semibold">Pending</span>
              }
            </h5>
          </div>
          <div>
            <p className="text-sm text-gray-500">Delivery Status</p>
            <h5 className="font-medium text-gray-700">
              {order.delivered
                ? <span className="px-3 py-1 rounded bg-green-500 text-white text-xs font-semibold">Delivered</span>
                : <span className="px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold">Not Delivered</span>
              }
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const OrderDetailTable = ({
  details,
}: {
  details: OrderDetailResponse[];
}) => (
  <div className="card mt-6">
    <div className="card-header">
      <h6 className="card-title">Order Items</h6>
    </div>
    <div className="p-6">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Product Name</th>
            <th className="p-2 border">Supplier</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Unit Price</th>
            <th className="p-2 border">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(details) && details.length > 0 ? (
            details.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border text-center">
                  {item.product?.image?.storedName ? (
                    <img
                      src={`${BASE_URL}/resources/${item.product.image.storedName}`}
                      alt={item.product.name}
                      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="p-2 border">{item.product?.name}</td>
                <td className="p-2 border">{item.product?.supplier?.name || "N/A"}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{item.unitPrice?.toLocaleString()} $</td>
                <td className="p-2 border">{item.subTotal?.toLocaleString()} $</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-2 border text-center text-gray-400">No items</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [details, setDetails] = useState<OrderDetailResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/api/order/${id}`).then((orderRes: any) => {
        const orderData = orderRes.data.data;
        setOrder(orderData);


        api.get(`/identity/user/id/${orderData.user}`).then((userRes: any) => {
          setUser(userRes.data.data);
        });

        api.get(`/api/order-detail/${id}`).then((detailsRes: any) => {
          const detailsData = Array.isArray(detailsRes.data.data) ? detailsRes.data.data : [detailsRes.data.data].filter(Boolean);
          setDetails(detailsData);
          console.log("Order Details:", detailsData);
        });
      }).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!order) return <div className="text-center py-10 text-red-500">Order not found</div>;

  return (
    <>
      <PageBreadcrumb
        name="Order Detail"
        title="Order Detail"
        breadCrumbItems={["Fitmate", "Orders", "Order Detail"]}
      />
      <div className="grid lg:grid-cols-3 gap-6">
        <OrderDetailOverview order={order} user={user} />
      </div>
      <OrderDetailTable details={details} />
      <div className="mt-6">
        <Link
          to="/admin/order/orders"
          className="btn bg-primary/20 text-sm font-medium text-primary hover:text-white hover:bg-primary"
        >
          <i className="mgc_arrow_left_line me-2"></i> Back to Orders
        </Link>
      </div>
    </>
  );
};

export default OrderDetail;