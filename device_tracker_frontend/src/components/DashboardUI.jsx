import { Link } from "react-router-dom";

export default function DashboardUI({ devices, filters, setFilters, onDelete }) {
  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
        Device Inventory
        </h1>
        <Link
          to="/devices/new"
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-5 py-2 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 text-sm sm:text-base"
        >
        Add Device
        </Link>
      </div>

      {/* Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <input
          placeholder="Filter by Type"
          className="border border-gray-300 rounded-lg p-2 sm:p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        />
        <input
          placeholder="Filter by Code"
          className="border border-gray-300 rounded-lg p-2 sm:p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
          value={filters.code}
          onChange={(e) => setFilters({ ...filters, code: e.target.value })}
        />
        <input
          placeholder="Filter by Name"
          className="border border-gray-300 rounded-lg p-2 sm:p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="p-3">Code</th>
              <th className="p-3">Type</th>
              <th className="p-3">Name</th>
              <th className="p-3">Purchase Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d, idx) => (
              <tr
                key={d.id}
                className={`border-b transition-colors duration-200 hover:bg-blue-50 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3">{d.code}</td>
                <td className="p-3">{d.type}</td>
                <td className="p-3">{d.name}</td>
                <td className="p-3">{d.purchase_date}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <Link
                    to={`/devices/${d.id}/edit`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm shadow transition transform hover:scale-105 active:scale-95"
                  >
                  Edit
                  </Link>
                  <button
                    onClick={() => onDelete(d.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm shadow transition transform hover:scale-105 active:scale-95"
                  >
                  Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {devices.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-lg shadow p-4 space-y-2 transition hover:shadow-md"
          >
            <div><span className="font-semibold">Code:</span> {d.code}</div>
            <div><span className="font-semibold">Type:</span> {d.type}</div>
            <div><span className="font-semibold">Name:</span> {d.name}</div>
            <div><span className="font-semibold">Purchase Date:</span> {d.purchase_date}</div>
            <div className="flex gap-2 pt-2">
              <Link
                to={`/devices/${d.id}/edit`}
                className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm shadow transition transform hover:scale-105 active:scale-95"
              >
              Edit
              </Link>
              <button
                onClick={() => onDelete(d.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm shadow transition transform hover:scale-105 active:scale-95"
              >
              Delete
              </button>
            </div>
          </div>
        ))}
        {devices.length === 0 && (
          <div className="text-center text-gray-500 py-6">❌ ไม่พบข้อมูล</div>
        )}
      </div>
    </div>
  );
}
