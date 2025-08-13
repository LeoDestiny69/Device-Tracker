// src/components/DeviceFormUI.jsx
import { motion } from "framer-motion";

export default function DeviceFormUI({
  form,
  errors,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.form
        onSubmit={onSubmit}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h2
          className="text-2xl font-bold text-gray-800 text-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
        Add Device
        </motion.h2>

        {/* Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code
          </label>
          <input
            name="code"
            value={form.code}
            onChange={onChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
              errors.code
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.code && (
            <p className="text-red-500 text-xs mt-1">{errors.code}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={onChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
              errors.type
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          >
            <option value="">-- Select Type --</option>
            <option value="laptop">Laptop</option>
            <option value="printer">Printer</option>
            <option value="monitor">Monitor</option>
            <option value="other">Other</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-xs mt-1">{errors.type}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Purchase Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purchase Date
          </label>
          <input
            type="datetime-local"
            name="purchase_date"
            value={form.purchase_date}
            onChange={onChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
              errors.purchase_date
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.purchase_date && (
            <p className="text-red-500 text-xs mt-1">{errors.purchase_date}</p>
          )}
        </div>

        {/* Detail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Detail
          </label>
          <textarea
            name="detail"
            value={form.detail}
            onChange={onChange}
            rows="3"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
              errors.detail
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          ></textarea>
          {errors.detail && (
            <p className="text-red-500 text-xs mt-1">{errors.detail}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
              errors.status
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          >
            <option value="">-- Select Status --</option>
            <option value="available">Available</option>
            <option value="in_use">In Use</option>
            <option value="repair">Repair</option>
            <option value="retired">Retired</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <motion.button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
          Add Device
          </motion.button>
          <motion.button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
          Cancel
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
