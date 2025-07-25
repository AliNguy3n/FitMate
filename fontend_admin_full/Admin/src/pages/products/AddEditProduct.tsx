import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageBreadcrumb, FormInput } from "../../components";
import { APICore } from "../../helpers/api/apiCore";
import config from "../../config";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";

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

  useEffect(() => {
    api.get("/api/supplier").then((res: any) => setSuppliers(res.data.data || []));
    api.get("/api/promotion").then((res: any) => setPromotions(res.data.data || []));
    api.get("/api/equipment").then((res: any) => setEquipments(res.data.data || []));
    api.get("/api/supplement").then((res: any) => setSupplements(res.data.data || []));
  }, []);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      api.get(`/api/product/id/${id}`).then(async (res: any) => {
        const data = res.data.data;
        setForm({
          name: data.name || "",
          description: data.description || "",
          price: data.price?.toString() || "",
          stock: data.stock?.toString() || "",
          rating: data.rating?.toString() || "5",
          image: null,
          supplierId: data.supplierId?.toString() || "",
          promotionId: data.promotion?.toString() || "",
          equipmentId: data.equipmentId?.toString() || "",
          supplementId: data.supplementId?.toString() || "",
        });
        if (data.image) {
          setPreview(`${BASE_URL}/resources/${data.image}`);
        }
        if (data.promotion) {
          const promoRes = await api.get(`/api/promotion/${data.promotion}`);
          const promoData = promoRes.data.data;
          setPromotions((prev) => {
            if (prev.some((p) => String(p.id) === String(promoData.id))) return prev;
            return [...prev, promoData];
          });
        }
      });
    }
  }, [id]);

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
    formData.append("rating", form.rating || "5");
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
        toast.success("Product updated successfully!");
      } else {
        await api.create("/api/product/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product created successfully!");
      }
      navigate("/admin/product/products");
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ submit: err?.response?.data?.message || "Save failed" });
      }
      toast.error("Failed to save product!");
    } finally {
      setLoading(false);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setForm((prev) => ({ ...prev, image: file }));
        setPreview(URL.createObjectURL(file));
      }
    },
  });

  const supplierOptions = suppliers.map((s) => ({ value: s.id, label: s.name }));
  const promotionOptions = promotions.map((p) => ({ value: p.id, label: p.name }));
  const equipmentOptions = equipments.map((e) => ({ value: e.id, label: e.name }));
  const supplementOptions = supplements.map((s) => ({ value: s.id, label: s.name }));

  return (
    <>
      <PageBreadcrumb
        title={isEdit ? "Edit Product" : "Add Product"}
        name={isEdit ? "Edit Product" : "Add Product"}
        breadCrumbItems={["Fitmate", "Products", isEdit ? "Edit Product" : "Add Product"]}
      />
      <div className="col-span-12 mx-auto">
        <form
          className="card p-8 col-span-12 space-y-6"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="text-xl font-semibold mb-4">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          {errors.submit && <div className="text-red-500">{errors.submit}</div>}
          <div>
            <label className="block font-medium mb-1">
              Product Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-input w-full"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              className="form-input w-full"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
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
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
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
                onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
                min={0}
              />
              {errors.stock && <div className="text-red-500">{errors.stock}</div>}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Image</label>
            <div {...getRootProps()} className="border border-dashed border-gray-400 p-4 rounded cursor-pointer hover:bg-gray-100">
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop the image here ...</p> : <p>Drag 'n' drop an image here, or click to select one</p>}
              {preview && <img src={preview} alt="Preview" className="mt-2 rounded w-32 h-32 object-cover" />}
            </div>
          </div>
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
            {form.promotionId ? (
              (() => {
                const promo = promotions.find((p) => String(p.id) === String(form.promotionId));
                const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" });
                const price = Number(form.price) || 0;
                const discount = Number(promo?.discount) || 0;
                const finalPrice = price * (1 - discount);
                return promo ? (
                  <div className="border rounded p-3 bg-gray-50">
                    <div className="font-semibold text-primary">{promo.name}</div>
                    <div className="text-sm">Discount: <span className="font-medium">{discount * 100}%</span></div>
                    <div className="text-sm">Start: {formatDate(promo.startDate)}</div>
                    <div className="text-sm">End: {formatDate(promo.endDate)}</div>
                    <div className="text-sm mt-2">
                      <span className="font-medium">Final Price: </span>
                      <span className="text-green-600 font-semibold">{finalPrice.toLocaleString()} $</span>
                    </div>
                  </div>
                ) : <div className="text-gray-400">No promotion info</div>;
              })()
            ) : <div className="text-gray-400">No promotion applied</div>}
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn bg-gray-200 text-gray-700" onClick={() => navigate("/admin/product/products")} disabled={loading}>Cancel</button>
            <button type="submit" className="btn bg-primary text-white" disabled={loading}>
              {loading ? (isEdit ? "Saving..." : "Saving...") : (isEdit ? "Update" : "Save")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEditProduct;
