"use client";

import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Search, ChevronsUpDown } from "lucide-react";
import CustomSelect from "./CustomSelect";

interface PriceItem {
  thickness: string;
  price: number;
  price_formatted: string;
}

interface PriceTableProps {
  title: string;
  data: PriceItem[];
}

type SortField = "index" | "thickness" | "price";
type SortDirection = "asc" | "desc" | null;

const PriceTable: React.FC<PriceTableProps> = ({ title, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Parse thickness to number for sorting (e.g., "1.2mm" -> 1.2)
  const parseThickness = (thickness: string): number => {
    return parseFloat(thickness.replace(/[^0-9.]/g, "")) || 0;
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Filter by search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.thickness.toLowerCase().includes(lowerSearch) ||
          item.price_formatted.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    if (sortField && sortDirection) {
      result.sort((a, b) => {
        let comparison = 0;

        switch (sortField) {
          case "thickness":
            comparison =
              parseThickness(a.thickness) - parseThickness(b.thickness);
            break;
          case "price":
            comparison = a.price - b.price;
            break;
          default:
            comparison = 0;
        }

        return sortDirection === "desc" ? -comparison : comparison;
      });
    }

    return result;
  }, [data, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  // Render sort icon
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronsUpDown size={14} className="text-gray-400" />;
    }
    if (sortDirection === "asc") {
      return <ChevronUp size={14} className="text-[#D97706]" />;
    }
    return <ChevronDown size={14} className="text-[#D97706]" />;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] px-4 md:px-6 py-3 md:py-4">
        <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
      </div>

      {/* Controls */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {/* Items per page */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Xem</span>
          <CustomSelect
            options={[
              { value: "5", label: "5" },
              { value: "10", label: "10" },
              { value: "25", label: "25" },
              { value: "50", label: "50" },
            ]}
            value={String(itemsPerPage)}
            onChange={(val) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}
            className="w-20"
          />
          <span>mục</span>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-auto">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-56 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-gray-800 placeholder:text-gray-400 bg-white text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-3 md:px-6 py-3 md:py-4 text-left w-12 md:w-16">
                <button
                  type="button"
                  onClick={() => handleSort("index")}
                  className="flex items-center gap-1 font-semibold text-[#4A3B32] uppercase text-xs md:text-sm hover:text-[#D97706] transition-colors"
                >
                  STT
                  {renderSortIcon("index")}
                </button>
              </th>
              <th className="px-3 md:px-6 py-3 md:py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("thickness")}
                  className="flex items-center gap-1 font-semibold text-[#4A3B32] uppercase text-xs md:text-sm hover:text-[#D97706] transition-colors"
                >
                  Độ dày
                  {renderSortIcon("thickness")}
                </button>
              </th>
              <th className="px-3 md:px-6 py-3 md:py-4 text-left hidden md:table-cell">
                <span className="font-semibold text-[#4A3B32] uppercase text-sm">
                  ĐVT
                </span>
              </th>
              <th className="px-3 md:px-6 py-3 md:py-4 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("price")}
                  className="flex items-center gap-1 font-semibold text-[#4A3B32] uppercase text-xs md:text-sm hover:text-[#D97706] transition-colors"
                >
                  <span className="whitespace-nowrap">
                    <span className="hidden sm:inline">Đơn giá </span>(M<sup>2</sup>)
                  </span>
                  <span className="text-xs text-gray-500 ml-1 hidden lg:inline">
                    (Dưới 50M<sup>2</sup>) VND
                  </span>
                  {renderSortIcon("price")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => {
                const globalIndex = startIndex + index + 1;
                return (
                  <tr
                    key={item.thickness}
                    className={`border-b border-gray-100 hover:bg-orange-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600 font-medium text-sm md:text-base">
                      {globalIndex}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <span className="font-semibold text-[#4A3B32] text-sm md:text-base">
                        {item.thickness}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-gray-600 hidden md:table-cell">Mét vuông</td>
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <span className="font-bold text-[#D97706] text-sm md:text-base">
                        {item.price_formatted}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-4 md:px-6 py-6 md:py-8 text-center text-gray-500 text-sm">
                  Không tìm thấy kết quả
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
          <div className="text-xs md:text-sm text-gray-600 text-center sm:text-left">
            Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)}{" "}
            / {filteredAndSortedData.length} mục
          </div>
          <div className="flex items-center gap-1 md:gap-2 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#D97706] text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sau
            </button>
          </div>
        </div>
      )}

      {/* Note */}
      <div className="px-4 md:px-6 py-2 md:py-3 bg-orange-50 text-xs text-gray-600 border-t border-orange-100">
        * Giá trên là giá tham khảo, chưa bao gồm VAT. Liên hệ để được báo giá
        chính xác nhất.
      </div>
    </div>
  );
};

export default PriceTable;
