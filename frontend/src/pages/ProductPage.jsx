import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../layouts/MainLayout";
import useProductStore from "../stores/useProductStore";
import LinkCard from "../components/products/LinkCard";

function ProductPage() {
  // product: (type, id, name, image, price, discount, rate, categories)
  const { products } = useProductStore();
  const [activeTab, setActiveTab] = useState("tab-e"); // tab-e (equipment) | tab-s (supplement)
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [name, setName] = useState("");

  // get categories
  const getUnitCategories = (productList) => {
    const categoriesSet = new Set();
    productList.forEach((product) => {
      if (product.categories && Array.isArray(product.categories)) {
        product.categories.forEach((category) => categoriesSet.add(category));
      }
    });

    return [...categoriesSet];
  };

  // search by Name
  const searchByName = (products, name) => {
    if (name === "") {
      return products;
    }

    return products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const handleSearchChange = (e) => {
    setName(e.target.value);
  };

  const clearSearch = () => {
    setName("");
  };

  // selected Categories
  const addSelectedCategory = (category) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  const removeSelectedCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      removeSelectedCategory(category);
    } else {
      addSelectedCategory(category);
    }
  };

  // filter products
  const filterProducts = (products, categories, name = "") => {
    let filtered = products;

    if (name !== "") {
      filtered = searchByName(filtered, name);
    }

    if (categories.length > 0) {
      filtered = filtered.filter(
        (p) =>
          p.categories &&
          p.categories.some((category) => categories.includes(category))
      );
    }

    return filtered;
  };

  useEffect(() => {
    if (activeTab === "tab-e") {
      const equipments = products.filter((p) => p.type === "equipment");
      setCategories(getUnitCategories(equipments));
      setFilteredProducts(filterProducts(equipments, selectedCategories, name));
    } else {
      const supplements = products.filter((p) => p.type === "supplement");
      setCategories(getUnitCategories(supplements));
      setFilteredProducts(
        filterProducts(supplements, selectedCategories, name)
      );
    }
  }, [activeTab, products, selectedCategories, name]);

  return (
    <MainLayout>
      <div className="bg-white p-6 m-3 space-y-10 md:p-5">
        {/* Tab Switch */}
        <div className="flex flex-col justify-between space-y-5 md:flex-row md:space-y-0">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-2 text-center font-bold ${
                activeTab === "tab-e"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("tab-e")}
            >
              <FontAwesomeIcon
                icon={["fas", "toolbox"]}
                size="2x"
                className="mx-1"
              />
              Equipment
            </button>
            <button
              className={`flex-1 py-2 text-center font-bold ${
                activeTab === "tab-s"
                  ? "text-rose-700 border-b-2 border-rose-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("tab-s")}
            >
              <FontAwesomeIcon
                icon={["fas", "pills"]}
                size="2x"
                className="mx-1"
              />
              Dietary Supplement
            </button>
          </div>
        </div>

        {/* Search box */}
        <div className="flex flex-col justify-between space-y-5 md:flex-row md:space-y-0">
          <div className="flex justify-between border-b">
            <input
              value={name}
              onChange={handleSearchChange}
              type="text"
              className="ml-6 border-none md:w-80 placeholder:font-thin focus:outline-none"
              placeholder="Search by name"
            />
            <div className="flex items-center space-x-2">
              {name && (
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-gray-600"
                >
                 <FontAwesomeIcon icon={["fas", "xmark"]} size="2x"/>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
          <button
            type="button"
            onClick={clearCategories}
            className={`border rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 focus:ring-4 focus:outline-none ${
              selectedCategories.length === 0
                ? "text-white bg-blue-700 border-blue-600 hover:bg-blue-800"
                : "text-blue-700 hover:text-white border-blue-600 bg-white hover:bg-blue-700"
            }`}
          >
            All categories
          </button>
          {categories &&
            categories.map((category, index) => (
              <button
                key={index}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`border rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 focus:ring-4 focus:outline-none ${
                  selectedCategories.includes(category)
                    ? "text-white bg-gray-800 border-gray-800 hover:bg-gray-900"
                    : "text-gray-900 border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {category.charAt(0).toUpperCase() +
                  category.slice(1).replace("-", " ")}
              </button>
            ))}
        </div>

        {/* Selected Categories Display */}
        {selectedCategories.length > 0 && (
          <div className="flex items-center space-x-2 py-2">
            <span className="text-sm font-medium text-gray-700">
              Active filters:
            </span>
            {selectedCategories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {category.charAt(0).toUpperCase() +
                  category.slice(1).replace("-", " ")}
                <button
                  type="button"
                  onClick={() => removeSelectedCategory(category)}
                  className="ml-1 text-blue-400 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* List Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p, index) => (
              <LinkCard
                key={p.id || index}
                type={p.type}
                id={p.id}
                name={p.name}
                image={p.image}
                price={p.price}
                discount={p.discount}
                stock={p.stock}
                rating={p.rating}
                categories={p.categories}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                {name || selectedCategories.length > 0
                  ? "No products found matching your criteria"
                  : "No products found"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-xl">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </MainLayout>
  );
}

export default ProductPage;
