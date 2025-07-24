import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageBreadcrumb } from "../../components";
import { APICore } from "../../helpers/api/apiCore";
import config from "../../config";

const api = new APICore();

type Promotion = {
  id: number;
  name: string;
  discount: number;
  startDate: number;
  endDate: number;
  productIds: number[];
};

const PAGE_SIZE = 5;

function formatDate(epoch: number) {
  if (!epoch) return "";
  const d = new Date(epoch * 1000);
  return d.toLocaleDateString();
}

const Promotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await api.get("/api/promotion");
      setPromotions(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(promotions.length / PAGE_SIZE);
  const pagedPromotions = promotions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <>
      <PageBreadcrumb
        name="Promotions"
        title="Promotions"
        breadCrumbItems={["Fitmate", "Promotions"]}
      />
      <div className="flex flex-col gap-6">
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h4 className="card-title">Promotion List</h4>
            <Link
              to="/admin/product/promotion/add"
              className="btn bg-primary/20 text-sm font-medium text-primary hover:text-white hover:bg-primary"
            >
              <i className="mgc_add_circle_line me-2"></i> Add New Promotion
            </Link>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <>
                <table className="min-w-full table-auto border">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 border">ID</th>
                      <th className="px-2 py-2 border">Name</th>
                      <th className="px-2 py-2 border">Discount (%)</th>
                      <th className="px-2 py-2 border">Start Date</th>
                      <th className="px-2 py-2 border">End Date</th>
                      <th className="px-2 py-2 border">Products</th>
                      <th className="px-2 py-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedPromotions.map((p) => (
                      <tr key={p.id}>
                        <td className="px-2 py-2 border">{p.id}</td>
                        <td className="px-2 py-2 border">{p.name}</td>
                        <td className="px-2 py-2 border">{(p.discount * 100).toFixed(2)}</td>
                        <td className="px-2 py-2 border">{formatDate(p.startDate)}</td>
                        <td className="px-2 py-2 border">{formatDate(p.endDate)}</td>
                        <td className="px-2 py-2 border">
                          {p.productIds && p.productIds.length > 0
                            ? `${p.productIds.length} Product${p.productIds.length > 1 ? "s" : ""}`
                            : "No products"}
                        </td>
                        <td className="px-2 py-2 border">
                          <Link
                            to={`/admin/product/promotion/edit/${p.id}`}
                            className="me-2 text-blue-600"
                            title="Edit"
                          >
                            <i className="mgc_edit_line text-lg"></i>
                          </Link>
                          <a
                            href={`/admin/product/promotion/delete/${p.id}`}
                            className="ms-2 text-red-600 disabled"
                            title="Delete"
                            tabIndex={-1}
                            aria-disabled="true"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="mgc_delete_line text-lg"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                    {pagedPromotions.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          No promotions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* Pagination controls */}
                <div className="flex justify-end items-center gap-2 mt-4">
                  <button
                    className="btn btn-sm bg-gray-200"
                    onClick={handlePrev}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="btn btn-sm bg-gray-200"
                    onClick={handleNext}
                    disabled={page === totalPages || totalPages === 0}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Promotions;