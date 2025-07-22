import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageBreadcrumb, FormInput } from "../../components";
import { APICore } from "../../helpers/api/apiCore";
import config from "../../config";
import Select from "react-select";

const BASE_URL = config.API_URL;
const api = new APICore();

const initialState = {
  name: "",
  description: "",
  price: "",
  stock: "",
  rating: "",
  image: null as File | null,
  supplierId: "",
  promotionId: "",
  equipmentId: "",
  supplementId: "",
};
 
const AddEditProduct = () => {
  const [form, setForm] = useState(initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [equipments, setEquipments] = useState<any[]>([]);
  const [supplements, setSupplements] = useState<any[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch select options
  useEffect(() => {
    api.get("/api/supplier").then((res: any) => setSuppliers(res.data.data || []));
    api.get("/api/promotion").then((res: any) => setPromotions(res.data.data || []));
    api.get("/api/equipment").then((res: any) => setEquipments(res.data.data || []));
    api.get("/api/supplement").then((res: any) => setSupplements(res.data.data || []));
  }, []);

  // Fetch product data if editing
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      api.get(`/api/product/id/${id}`).then((res: any) => {
        const data = res.data.data;
        setForm({
          name: data.name || "",
          description: data.description || "",
          price: data.price?.toString() || "",
          stock: data.stock?.toString() || "",
          rating: data.rating?.toString() || "",
          image: null,
          supplierId: data.supplierId?.toString() || "",
          promotionId: data.promotionId?.toString() || "",
          equipmentId: data.equipmentId?.toString() || "",
          supplementId: data.supplementId?.toString() || "",
        });
        if (data.image) {
          setPreview(`${BASE_URL}/resources/${data.image}`);
        }
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm((prev) => ({ ...prev, image: file }));
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Product name is required";
    if (!form.price) newErrors.price = "Price is required";
    else if (Number(form.price) <= 0) newErrors.price = "Price must be greater than 0";
    if (!form.stock) newErrors.stock = "Stock is required";
    else if (Number(form.stock) < 0) newErrors.stock = "Stock cannot be negative";
    if (form.rating && Number(form.rating) < 0) newErrors.rating = "Rating must be zero or more";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("rating", form.rating || "0");
    if (form.image) formData.append("image", form.image);
    if (form.supplierId) formData.append("supplierId", form.supplierId);
    if (form.promotionId) formData.append("promotionId", form.promotionId);
    if (form.equipmentId) formData.append("equipmentId", form.equipmentId);
    if (form.supplementId) formData.append("supplementId", form.supplementId);

    try {
      if (isEdit && id) {
        await api.update(`/api/product/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.create("/api/product/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/product");
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ submit: err?.response?.data?.message || "Save failed" });
      }
    } finally {
      setLoading(false);
    }
  };

  const supplierOptions = suppliers.map((s) => ({
    value: s.id,
    label: s.name,
  }));
  const promotionOptions = promotions.map((p) => ({
    value: p.id,
    label: p.name,
  }));
  const equipmentOptions = equipments.map((e) => ({
    value: e.id,
    label: e.name,
  }));
  const supplementOptions = supplements.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  return (
    <>
      <PageBreadcrumb
        title={isEdit ? "Edit Product" : "Add Product"}
        name={isEdit ? "Edit Product" : "Add Product"}
        breadCrumbItems={["Fitmate", "Products", isEdit ? "Edit Product" : "Add Product"]}
      />
      <div className="col-span-12 mx-auto">
        <form className="card p-8 col-span-12 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="text-xl font-semibold mb-4">{isEdit ? "Edit Product" : "Add New Product"}</h2>
          {errors.submit && <div className="text-red-500">{errors.submit}</div>}
          <div>
            <label className="block font-medium mb-1">Product Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              className="form-input w-full"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              className="form-input w-full"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Price<span className="text-red-500">*</span></label>
              <input
                type="number"
                name="price"
                className="form-input w-full"
                value={form.price}
                onChange={handleChange}
                min={0}
                step="0.01"
              />
              {errors.price && <div className="text-red-500">{errors.price}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Stock<span className="text-red-500">*</span></label>
              <input
                type="number"
                name="stock"
                className="form-input w-full"
                value={form.stock}
                onChange={handleChange}
                min={0}
              />
              {errors.stock && <div className="text-red-500">{errors.stock}</div>}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Rating</label>
            <input
              type="number"
              name="rating"
              className="form-input w-full"
              value={form.rating}
              onChange={handleChange}
              min={0}
              max={5}
              step="0.1"
            />
            {errors.rating && <div className="text-red-500">{errors.rating}</div>}
          </div>
          <div>
            <label className="block font-medium mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="form-input w-full"
              ref={fileInputRef}
              onChange={handleChange}
            />
            {preview && (
              <img src={preview} alt="Preview" className="mt-2 rounded w-32 h-32 object-cover" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Supplier</label>
              <Select
                name="supplierId"
                className="basic-single"
                classNamePrefix="select"
                options={supplierOptions}
                onChange={(option) => setForm((prev) => ({ ...prev, supplierId: option?.value || "" }))}
                isClearable
              />
              {errors.supplierId && <div className="text-red-500">{errors.supplierId}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Promotion</label>
              <Select
                name="promotionId"
                className="basic-single"
                classNamePrefix="select"
                options={promotionOptions}
                onChange={(option) => setForm((prev) => ({ ...prev, promotionId: option?.value || "" }))}
                isClearable
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Equipment</label>
              <Select
                name="equipmentId"
                className="basic-single"
                classNamePrefix="select"
                options={equipmentOptions}
                onChange={(option) => setForm((prev) => ({ ...prev, equipmentId: option?.value || "" }))}
                isClearable
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Supplement</label>
              <Select
                name="supplementId"
                className="basic-single"
                classNamePrefix="select"
                options={supplementOptions}
                onChange={(option) => setForm((prev) => ({ ...prev, supplementId: option?.value || "" }))}
                isClearable
              />
              
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn bg-gray-200 text-gray-700"
              onClick={() => navigate("/products")}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-primary text-white"
              disabled={loading}
            >
              {loading ? (isEdit ? "Saving..." : "Saving...") : (isEdit ? "Update" : "Save")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEditProduct;