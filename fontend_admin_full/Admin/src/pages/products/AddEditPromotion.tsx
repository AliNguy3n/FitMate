import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageBreadcrumb } from "../../components";
import { APICore } from "../../helpers/api/apiCore";
import Select from "react-select";
import { toast } from "react-hot-toast";
import config from "../../config";

const BASE_URL = config.API_URL;
const api = new APICore();

const initialState = {
  name: "",
  discount: "",
  startDate: "",
  endDate: "",
};

const AddEditPromotion = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, promoRes] = id
          ? await Promise.all([
              api.get("/api/product"),
              api.get(`/api/promotion/${id}`),
            ])
          : [await api.get("/api/product"), null];

        const allProducts = productRes.data.data || [];
        setProducts(allProducts);

        if (promoRes) {
          const data = promoRes.data.data;
          setForm({
            name: data.name || "",
            discount: data.discount?.toString() || "",
            startDate: toInputDate(data.startDate),
            endDate: toInputDate(data.endDate),
          });

          const productIds = Array.isArray(data.productIds)
            ? data.productIds.map(Number)
            : [];
          const selected = allProducts.filter((p: any) =>
            productIds.includes(p.id)
          );
          setSelectedProducts(selected);
          setIsEdit(true);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (selected: any) => {
    const ids = selected ? selected.map((opt: any) => opt.value) : [];
    const selectedItems = products.filter((p) => ids.includes(p.id));
    setSelectedProducts(selectedItems);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.discount) newErrors.discount = "Discount is required";
    if (!form.startDate) newErrors.startDate = "Start date is required";
    if (!form.endDate) newErrors.endDate = "End date is required";
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

    const formatDate = (dateStr: string) => {
      return dateStr ? `${dateStr}T00:00:00Z` : "";
    };

    const payload = {
      name: form.name,
      discount: Number(form.discount),
      startDate: formatDate(form.startDate),
      endDate: formatDate(form.endDate),
      productIds: Array.from(new Set(selectedProducts.map((p) => p.id))),
    };

    try {
      if (isEdit && id) {
        await api.update(`/api/promotion/${id}`, payload);
        toast.success("Promotion updated successfully!");
      } else {
        await api.create("/api/promotion/create", payload);
        toast.success("Promotion created successfully!");
      }
      navigate("/admin/product/promotions");
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ submit: err?.response?.data?.message || "Save failed" });
      }
      toast.error("Failed to save promotion!");
    } finally {
      setLoading(false);
    }
  };

  const productOptions = products.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  return (
    <>
      <PageBreadcrumb
        title={isEdit ? "Edit Promotion" : "Add Promotion"}
        name={isEdit ? "Edit Promotion" : "Add Promotion"}
        breadCrumbItems={["Fitmate", "Promotions", isEdit ? "Edit Promotion" : "Add Promotion"]}
      />
      <div className="col-span-12 mx-auto">
        <form className="card p-8 col-span-12 space-y-6" onSubmit={handleSubmit}>
          {errors.submit && <div className="text-red-500">{errors.submit}</div>}
          <div>
            <label className="block font-medium mb-1">Name</label>
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
            <label className="block font-medium mb-1">Discount (%)</label>
            <input
              type="number"
              name="discount"
              className="form-input w-full"
              value={form.discount}
              onChange={handleChange}
              min={0}
              max={1}
              step={0.01}
              placeholder="0.2 = 20%"
            />
            {errors.discount && <div className="text-red-500">{errors.discount}</div>}
          </div>
          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              className="form-input w-full"
              value={form.startDate}
              onChange={handleChange}
            />
            {errors.startDate && <div className="text-red-500">{errors.startDate}</div>}
          </div>
          <div>
            <label className="block font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              className="form-input w-full"
              value={form.endDate}
              onChange={handleChange}
            />
            {errors.endDate && <div className="text-red-500">{errors.endDate}</div>}
          </div>
          <div>
            <label className="block font-medium mb-1">Products</label>
            <Select
              options={productOptions}
              value={productOptions.filter((opt) =>
                selectedProducts.some((p) => p.id === opt.value)
              )}
              onChange={handleProductSelect}
              isMulti
              placeholder="Select products for this promotion"
            />
          </div>
          {selectedProducts.length > 0 && (
            <div className="mt-4">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Image</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((p) => (
                    <tr key={p.id}>
                      <td className="p-2 border">{p.id}</td>
                      <td className="p-2 border">
                        {p.image ? (
                          <img
                            src={
                              p.image.startsWith("http")
                                ? p.image
                                : `${BASE_URL}/resources/${p.image}`
                            }
                            alt={p.name}
                            style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>
                      <td className="p-2 border">{p.name}</td>
                      <td className="p-2 border">{p.price}</td>
                      <td className="p-2 border">{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn bg-gray-200 text-gray-700"
              onClick={() => navigate("/admin/product/promotions")}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-primary text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEditPromotion;

// Helper function
function toInputDate(epoch: number | string) {
  if (!epoch) return "";
  const d = new Date(Number(epoch) * 1000);
  return d.toISOString().slice(0, 10);
}
