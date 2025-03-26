import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="previous"
        type="button"
        className="flex items-center justify-center w-8 h-8 p-0 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronLeft className="w-3 h-3 text-gray-700 dark:text-gray-300" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          type="button"
          title={`Page ${page}`}
          className={`flex items-center justify-center w-8 h-8 text-sm border rounded shadow-sm transition-colors ${
            page === currentPage
              ? "font-semibold border-violet-600 bg-white dark:bg-gray-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-gray-700"
              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="next"
        type="button"
        className="flex items-center justify-center w-8 h-8 p-0 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronRight className="w-3 h-3 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default Pagination;