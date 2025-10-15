import React, { useEffect, useState } from 'react';
import paymentService from '../../services/paymentService';
import { useToast } from '../common/Toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueManager = () => {
  const { showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [totals, setTotals] = useState({ totalRevenue: 0, totalPaidInvoices: 0 });
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    setLoading(true);
    try {
      // fetch paid invoices (large size to aggregate client-side if backend doesn't provide aggregations)
      const res = await paymentService.searchInvoices({ trangThai: 'PAID', page: 1, size: 1000 });
      if (res.success) {
        const items = res.data.items || [];
        setInvoices(items);

        // total revenue
        const totalRevenue = items.reduce((s, it) => s + (it.tongTien || 0), 0);
        const totalPaidInvoices = items.length;
        setTotals({ totalRevenue, totalPaidInvoices });

        // aggregate by month-year
        const months = {};
        items.forEach(it => {
          const date = new Date(it.ngayLap);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}`;
          months[key] = (months[key] || 0) + (it.tongTien || 0);
        });

        const monthly = Object.keys(months).sort().map(k => ({ month: k, revenue: months[k] }));
        setMonthlyData(monthly);
      } else {
        showError(res.message);
      }
    } catch (err) {
      console.error(err);
      showError('Lỗi khi tải dữ liệu doanh thu');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header giống MovieManagement */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-success text-white p-3 rounded">
              <i className="bi bi-currency-dollar" style={{ fontSize: '32px' }}></i>
            </div>
            <div>
              <h1 className="mb-0 h3">Báo Cáo Doanh Thu</h1>
              <p className="text-muted mb-0">Hệ thống quản lý rạp chiếu phim</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 rounded p-3">
                  <i className="bi bi-cash-stack text-success" style={{ fontSize: '2rem' }}></i>
                </div>
                <div>
                  <div className="text-muted small">Tổng doanh thu</div>
                  <h3 className="mb-0 text-success fw-bold">
                    {totals.totalRevenue?.toLocaleString() || 0} VND
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 rounded p-3">
                  <i className="bi bi-receipt text-primary" style={{ fontSize: '2rem' }}></i>
                </div>
                <div>
                  <div className="text-muted small">Số hóa đơn đã thanh toán</div>
                  <h3 className="mb-0 text-primary fw-bold">{totals.totalPaidInvoices || 0}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h6 className="mb-0">
            <i className="bi bi-bar-chart me-2"></i>
            Biểu đồ doanh thu theo tháng
          </h6>
        </div>
        <div className="card-body">
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value?.toLocaleString()} VND`} />
                <Bar dataKey="revenue" fill="#198754" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-bar-chart display-1 text-muted"></i>
              <p className="text-muted mt-3">Chưa có dữ liệu doanh thu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueManager;

