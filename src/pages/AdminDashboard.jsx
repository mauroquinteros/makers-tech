import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Layout/Sidebar";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const AdminDashboard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/chat" replace />;
  }

  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/inventory`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const inventoryData = await response.json();

      // The response is directly an array of products, not wrapped in a 'products' key
      setProducts(inventoryData);
    } catch (err) {
      setError("Failed to load inventory data");
      console.error("Error fetching inventory data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const categories = [...new Set(products.map((p) => p.category))];
  const totalCategories = categories.length;
  const avgStockPerProduct =
    totalProducts > 0 ? (totalStock / totalProducts).toFixed(1) : 0;

  // Process data for charts
  const stockByCategory = categories.map((category) => {
    const categoryProducts = products.filter((p) => p.category === category);
    const stockCount = categoryProducts.reduce((sum, p) => sum + p.stock, 0);
    const percentage =
      totalStock > 0 ? ((stockCount / totalStock) * 100).toFixed(1) : 0;
    return {
      category,
      stock: stockCount,
      percentage: parseFloat(percentage),
    };
  });

  const stockByBrand = Object.entries(
    products.reduce((acc, product) => {
      acc[product.brand] = (acc[product.brand] || 0) + product.stock;
      return acc;
    }, {})
  )
    .map(([brand, stock]) => ({ brand, stock }))
    .sort((a, b) => b.stock - a.stock);

  // Chart colors - keeping diverse colors for pie chart
  const COLORS = [
    "#3b82f6",
    "#f59e0b",
    "#10b981",
    "#ef4444",
    "#8b5cf6",
    "#f97316",
    "#06b6d4",
    "#84cc16",
    "#ec4899",
    "#6366f1",
  ];

  const handleNewChat = () => {
    console.log("New chat requested from dashboard");
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <Sidebar onNewChat={handleNewChat} />
        <div className="dashboard-content loading">
          <div className="loading-spinner">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <Sidebar onNewChat={handleNewChat} />
        <div className="dashboard-content error">
          <div className="error-message">
            <h2>Error Loading Dashboard</h2>
            <p>{error}</p>
            <button onClick={fetchInventoryData} className="retry-btn">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <Sidebar onNewChat={handleNewChat} />

      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <div className="status-indicator">
              <span className="status-dot online"></span>
              <span className="status-text">Inventory Metrics</span>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="overview-cards">
          <div className="metric-card">
            <h3>Total Products</h3>
            <div className="metric-value">{totalProducts}</div>
            <div className="metric-label">Unique Items</div>
          </div>
          <div className="metric-card">
            <h3>Total Stock Units</h3>
            <div className="metric-value">{totalStock}</div>
            <div className="metric-label">Total Inventory</div>
          </div>
          <div className="metric-card">
            <h3>Product Categories</h3>
            <div className="metric-value">{totalCategories}</div>
            <div className="metric-label">Categories</div>
          </div>
          <div className="metric-card">
            <h3>Avg Stock per Product</h3>
            <div className="metric-value">{avgStockPerProduct}</div>
            <div className="metric-label">Units per Product</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-container">
            <h3 className="chart-title">Stock Distribution by Category</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) =>
                      `${category} (${percentage}%)`
                    }
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="stock"
                  >
                    {stockByCategory.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-white)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-text)",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    labelStyle={{ color: "var(--color-text)" }}
                  />
                  <Legend wrapperStyle={{ color: "var(--color-text)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Stock Levels by Brand</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stockByBrand}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="brand"
                    stroke="var(--color-text-secondary)"
                    fontSize={11}
                    tick={{ fill: "var(--color-text-secondary)" }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis
                    stroke="var(--color-text-secondary)"
                    fontSize={11}
                    tick={{ fill: "var(--color-text-secondary)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-white)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-text)",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    labelStyle={{ color: "var(--color-text)" }}
                    formatter={(value) => [value, "Stock Units"]}
                  />
                  <Bar
                    dataKey="stock"
                    fill="var(--color-primary-dark)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-dashboard {
          display: flex;
          height: 100vh;
          background-color: var(--color-white);
        }

        .dashboard-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow-x: hidden;
        }

        .dashboard-content.loading,
        .dashboard-content.error {
          justify-content: center;
          align-items: center;
        }

        .loading-spinner {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
        }

        .error-message {
          text-align: center;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          max-width: 400px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .error-message h2 {
          color: #ef4444;
          margin-bottom: var(--spacing-md);
        }

        .error-message p {
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-lg);
        }

        .dashboard-header {
          background: var(--color-white);
          border-bottom: 1px solid var(--color-border);
          padding: var(--spacing-lg) var(--spacing-xl);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--color-text);
          margin: 0;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary-dark);
        }

        .status-text {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        .overview-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
          padding: var(--spacing-lg);
          flex-shrink: 0;
        }

        .metric-card {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          text-align: center;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .metric-card:hover {
          border-color: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px 0 rgba(163, 255, 18, 0.15);
        }

        .metric-card h3 {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin: 0 0 var(--spacing-sm) 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-bottom: var(--spacing-xs);
        }

        .metric-label {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .charts-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          gap: var(--spacing-lg);
          padding: 0 var(--spacing-lg) var(--spacing-lg);
          flex: 1;
          min-height: 0;
          overflow-y: hidden;
          height: 100%;
        }

        .chart-container {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }

        .chart-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text);
          margin: 0 0 var(--spacing-lg) 0;
          text-align: center;
          flex-shrink: 0;
        }

        .chart-wrapper {
          flex: 1;
          min-height: 0;
        }

        @media (max-width: 1200px) {
          .charts-section {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
          }

          .chart-container {
            min-height: 450px;
          }
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            position: relative;
          }

          .dashboard-header {
            padding: var(--spacing-lg);
          }

          .header-content {
            flex-direction: column;
            gap: var(--spacing-md);
            text-align: center;
          }

          .overview-cards {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            padding: var(--spacing-lg);
            gap: var(--spacing-md);
          }

          .charts-section {
            padding: 0 var(--spacing-lg) var(--spacing-lg);
            gap: var(--spacing-lg);
          }

          .chart-container {
            min-height: 400px;
          }

          .dashboard-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .overview-cards {
            grid-template-columns: 1fr;
          }

          .chart-container {
            padding: var(--spacing-md);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
