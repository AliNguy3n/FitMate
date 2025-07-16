import React, { useEffect, useState } from "react";
import HeartImg from "../../assets/images/heart.png";
import WeightImg from "../../assets/images/weight.png";
import useEquipmentStore from "../../stores/useEquipmentStore";
import useSupplementStore from "../../stores/useSupplementStore";
import Rating from "../ui/Rating";
import useCartStore from "../../stores/useCartStore";

// id = productId
function ProductModal({ type, id }) {
  const [detail, setDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { getDetail: getEquipmentDetail } = useEquipmentStore();
  const { getDetail: getSupplementDetail } = useSupplementStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (type === "equipment") {
      setDetail(getEquipmentDetail(id));
    }

    if(type === "supplement"){
      setDetail(getSupplementDetail(id));
    }
  }, [type, id, getEquipmentDetail, getSupplementDetail]);

  // Calculate discounted price
  const discountedPrice = detail.promotion
    ? detail.price - (detail.price * detail.promotion.discount / 100)
    : null;

  // Check if promotion is active
  const isPromotionActive = detail.promotion
    ? new Date() >= new Date(detail.promotion.startDate) && new Date() <= new Date(detail.promotion.endDate)
    : false;

  // Get current price (discounted or regular)
  const currentPrice = isPromotionActive && discountedPrice ? discountedPrice : detail.price;

  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= detail.stock) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (detail.stock > 0) {
      const cartItem = {
        id: detail.id,
        name: detail.name,
        price: currentPrice,
        quantity: quantity,
        image: detail.image,
        type: type,
        stock: detail.stock,
        // Add any additional properties you need
        originalPrice: detail.price,
        discount: detail.promotion?.discount || 0
      };

      addToCart(cartItem, quantity);
    }
  };

  return (
    <>
      {/* Card Container */}
      <div className="flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16 max-w-4xl">
        {/* Image Div */}
        <div className="flex-shrink-0">
          <img
            src={detail.image || "https://via.placeholder.com/320x320?text=No+Image"}
            alt={detail.name}
            className="mx-auto duration-200 w-80 h-80 object-cover rounded-lg hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col space-y-6 flex-1">
          {/* Label & Title Container */}
          <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
            {/* Title */}
            <div className="max-w-lg text-2xl font-medium text-gray-800">
              {detail.name}
            </div>

            {/* Product ID */}
            <div className="text-sm text-gray-500">
              Product ID: {detail.productId}
            </div>

            {/* Description */}
            <div className="text-gray-600 text-sm max-w-lg">
              {detail.description}
            </div>

            {/* Equipment Details */}
            {detail.equipment && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700">Size:</span>
                  <p className="text-sm text-gray-600">{detail.equipment.size}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Color:</span>
                  <p className="text-sm text-gray-600">{detail.equipment.color}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Gender:</span>
                  <p className="text-sm text-gray-600">{detail.equipment.gender}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Equipment ID:</span>
                  <p className="text-sm text-gray-600">{detail.equipment.equipmentId}</p>
                </div>
              </div>
            )}

            {/* Supplement Details */}
            {detail.supplement && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-purple-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700">Size:</span>
                  <p className="text-sm text-gray-600">{detail.supplement.size}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Flavor:</span>
                  <p className="text-sm text-gray-600">{detail.supplement.flavor}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-gray-700">Ingredients:</span>
                  <p className="text-sm text-gray-600">{detail.supplement.ingredient}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Supplement ID:</span>
                  <p className="text-sm text-gray-600">{detail.supplement.supplementId}</p>
                </div>
              </div>
            )}

            {/* Categories */}
            {detail.equipment?.categories && (
              <div className="flex flex-wrap gap-2">
                {detail.equipment.categories.map((category) => (
                  <span
                    key={category.categoryId}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    title={category.description}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Supplement Categories */}
            {detail.supplement?.categories && (
              <div className="flex flex-wrap gap-2">
                {detail.supplement.categories.map((category) => (
                  <span
                    key={category.categoryId}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                    title={category.description}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <Rating rating={detail.rating}/>
            </div>

            {/* Price Container */}
            <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
              {isPromotionActive && discountedPrice ? (
                <>
                  <div className="flex items-center space-x-2">
                    <p className="line-through text-gray-500 text-lg">${detail.price}</p>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                      -{detail.promotion.discount}%
                    </span>
                  </div>
                  <p className="text-4xl font-bold text-green-600">${discountedPrice.toFixed(2)}</p>
                  <p className="text-sm font-light text-gray-400">
                    {detail.promotion.name} - Valid until {new Date(detail.promotion.endDate).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <p className="text-4xl font-bold text-gray-800">${detail.price}</p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= detail.stock}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Max: {detail.stock}
              </div>
            </div>

            {/* Total Price */}
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
              <span className="text-lg font-medium text-gray-700">Total:</span>
              <span className="text-2xl font-bold text-gray-800">
                ${(currentPrice * quantity).toFixed(2)}
              </span>
            </div>

            {/* Supplier Info */}
            {detail.supplier && (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg space-x-3">
                {detail.supplier.image && (
                  <img
                    src={detail.supplier.image}
                    alt={detail.supplier.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Supplier:</span> {detail.supplier.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Contact: {detail.supplier.contact}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    Type: {detail.supplier.type}
                  </p>
                </div>
              </div>
            )}

            {/* Button Group */}
            <div className="group">
              <button
                onClick={handleAddToCart}
                className={`w-full transition-all duration-150 text-white border-b-8 rounded-lg group-hover:border-t-8 group-hover:border-b-0 group-hover:shadow-lg ${
                  type === "supplement"
                    ? "bg-purple-700 border-b-purple-700 group-hover:bg-purple-700 group-hover:border-t-purple-700"
                    : "bg-blue-700 border-b-blue-700 group-hover:bg-blue-700 group-hover:border-t-blue-700"
                }`}
                disabled={!detail.stock || detail.stock === 0}
              >
                <div className={`px-8 py-4 duration-150 rounded-lg ${
                  type === "supplement"
                    ? "bg-purple-500 group-hover:bg-purple-700"
                    : "bg-blue-500 group-hover:bg-blue-700"
                }`}>
                  {detail.stock > 0 ? `Add ${quantity} to cart` : "Out of Stock"}
                </div>
              </button>
            </div>

            {/* Stock */}
            <div className="flex items-center space-x-3 group">
              <div className={`w-3 h-3 rounded-full group-hover:animate-ping ${
                detail.stock > 0 ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
              <div className="text-sm">
                {detail.stock > 0 ? `${detail.stock}+ pcs. in stock` : 'Out of stock'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;