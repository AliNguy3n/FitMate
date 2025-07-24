import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageBreadcrumb } from "../../components";
import { APICore } from "../../helpers/api/apiCore";

const api = new APICore();

const initialState = {
  name: "",
  discount: "",
  startDate: "",
  endDate: "",
};

function toInputDate(epoch: number | string) {
  if (!epoch) return "";
  const d = new Date(Number(epoch) * 1000);
  return d.toISOString().slice(0, 10);
}

function toEpoch(dateStr: string) {
  return dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : "";
}

const AddEditPromotion = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      api.get(`/api/promotion/${id}`).then((res: any) => {
        const data = res.data.data;
        setForm({
          name: data.name || "",
          discount: data.discount?.toString() || "",
          startDate: toInputDate(data.startDate),
          endDate: toInputDate(data.endDate),
        });
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    const payload = {
      name: form.name,
      discount: Number(form.discount),
      startDate: toEpoch(form.startDate),
      endDate: toEpoch(form.endDate),
    };

    try {
      if (isEdit && id) {
        await api.update(`/api/promotion/${id}`, payload);
      } else {
        await api.create("/api/promotion/create", payload);
      }
      navigate("/product/promotion");
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

  return (
    <>
      <PageBreadcrumb
        title={isEdit ? "Edit Promotion" : "Add Promotion"}
        name={isEdit ? "Edit Promotion" : "Add Promotion"}
        breadCrumbItems={["Fitmate", "Promotions", isEdit ? "Edit Promotion" : "Add Promotion"]}
      />
      <div className="col-span-12 mx-auto">
        <form
          className="card p-8 col-span-12 space-y-6"
          onSubmit={handleSubmit}
        >
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
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn bg-gray-200 text-gray-700"
              onClick={() => navigate("/admin/product/promotion")}
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

export default AddEditPromotion;