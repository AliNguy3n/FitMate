import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { html } from "gridjs";
import "gridjs/dist/theme/mermaid.min.css";
import { PageBreadcrumb } from "../../components";
import { fetchProducts, Product } from "./data";
import config from "../../config";
import { Link } from "react-router-dom";
import { APICore } from "../../helpers/api/apiCore";
const BASE_URL = config.API_URL;
const IMAGE_BASE_URL = BASE_URL + "/resources/";

const api = new APICore();
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [supplierMap, setSupplierMap] = useState<{ [key: number]: string }>(
    {}
  );
  const [promotionMap, setPromotionMap] = useState<{ [key: number]: string }>(
    {}
  );
  const [equipmentMap, setEquipmentMap] = useState<{ [key: number]: string }>(
    {}
  );
  const [supplementMap, setSupplementMap] = useState<{ [key: number]: string }>(
    {}
  );
 
  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    Promise.all([
      fetchSuppliers(),
      fetchPromotions(),
      fetchEquipments(),
    ]).then(([suppliers, promotions, equipments]) => {
      setSupplierMap(
        Object.fromEntries(suppliers.map((s: any) => [s.id, s.name]))
      );
      setPromotionMap(
        Object.fromEntries(promotions.map((p: any) => [p.id, p.name]))
      );
      setEquipmentMap(
        Object.fromEntries(equipments.map((e: any) => [e.id, e.name]))
      );
      
    });
  }, []);

  const fetchSuppliers = async () => {
    const res = await api.get("/api/supplier");
    return res.data.data || [];
  };

  const fetchPromotions = async () => {
    const res = await api.get("/api/promotion");
    return res.data.data || [];
  };

  const fetchEquipments = async () => {
    const res = await api.get("/api/equipment");
    return res.data.data || [];
  };

  const fetchSupplements = async () => {
    const res = await api.get("/api/supplement");
    return res.data.data || [];
  };



  return (
    <>
      <PageBreadcrumb
        name="Data Table"
        title="Data Table"
        breadCrumbItems={["Fitmate", "Table", "Data Table"]}
      />
      <div className="flex flex-col gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Product List</h4>
              <Link
                to="/admin/product/add"
                className="btn bg-primary/20 text-sm font-medium text-primary hover:text-white hover:bg-primary"
              >
                <i className="mgc_add_circle_line me-2"></i> Add New Product
              </Link>
            </div>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <Grid
                data={products.map((p) => [
                  p.id,
                  p.image
                    ? html(
                        `<img src="${IMAGE_BASE_URL + p.image}" alt="${p.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;" />`
                      )
                    : "",
                  p.name,
                  p.description,
                  p.price,
                  p.stock,
                  p.rating,
                  supplierMap[Number(p.supplier)] || "",
                  promotionMap[Number(p.promotion)] || "",
                  equipmentMap[Number(p.equipment)] || "",
                  supplementMap[Number(p.supplement)] || "",
                  
                  html(`
      <span class="inline-flex" style="min-width:70px;max-width:140px;">
        <a href="/admin/product/edit/${p.id}" class="me-2" title="Edit">
          <i class="mgc_edit_line text-lg"></i>
        </a>
        <a href="/admin/product/delete/${p.id}" class="ms-2 disabled" title="Delete" tabindex="-1" aria-disabled="true" onclick="event.preventDefault();">
          <i class="mgc_delete_line text-lg"></i>
        </a>
      </span>
    `),
                ])}
                columns={[
                  { name: "ID", width: "4%" },
                  { name: "Image", width: "8%" },
                  "Name",
                  "Description",
                  { name: "Price", width: "6%" },
                  { name: "Stock", width: "6%" },
                  { name: "Rating", width: "6%" },
                  { name: "Supplier", width: "10%" },
                  { name: "Promotion", width: "10%" },
                  { name: "Equipment", width: "10%" },
                  { name: "Supplement", width: "10%" },
                  { name: "Action", width: "6%" },
                ]}
                pagination={{ enabled: true, limit: 5 }}
                search={true}
                sort={true}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
