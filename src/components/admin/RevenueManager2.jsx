import React, {useEffect, useState} from 'react';
import { TrendingUp, DollarSign, Users, Film, Calendar, Download, Filter, ChevronUp, ChevronDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {InvalidTokenError} from "jwt-decode";
import invoiceService from "../../services/invoiceService.js";
import {useToast} from "../common/Toast.jsx";

const RevenueManager2 = () => {
    const [dateRange, setDateRange] = useState('week');
    const [selectedRoom, setSelectedRoom] = useState('all');
    const [invoice, setInvoice] = useState([]);
    const [roomRevenue, setRoomRevenue] = useState([]);
    const {showSuccess, showError} = useToast();

    useEffect(() => {
        fetchInvoice()
    }, [dateRange]);

    useEffect(() => {
        fetchInvoice();
    }, [dateRange]);

    useEffect(() => {
        if (invoice.length > 0) {
            const roomGroup = invoice.reduce((acc, curr) => {
                const room = curr.tenPhong;
                if (!acc[room]) acc[room] = { name: room, revenue: 0, tickets: 0 };
                acc[room].revenue += curr.tongTien;
                acc[room].tickets += curr.soLuongVe;
                return acc;
            }, {});

            const totalRevenue = Object.values(roomGroup).reduce((sum, r) => sum + r.revenue, 0);
            const roomRevenueResult = Object.values(roomGroup).map(r => ({
                ...r,
                percentage: ((r.revenue / totalRevenue) * 100).toFixed(1),
            }));

            setRoomRevenue(roomRevenueResult);
            console.log("✅ Room revenue:", roomRevenueResult);
        }
    }, [invoice]);


    const fetchInvoice = async () => {
        const result = await invoiceService.getAllInvoice();
        console.log(result)
        if (result.success) {
            showSuccess('Lấy dữ liệu hóa đơn thành công');
            console.log(result.data);
            setInvoice(result.data);
        }
        else showError(result.data)
    }


    // Mock data - Doanh thu theo ngày
    const dailyRevenue = [
        { date: '15/10', revenue: 45000000, tickets: 450, avgPrice: 100000 },
        { date: '16/10', revenue: 52000000, tickets: 520, avgPrice: 100000 },
        { date: '17/10', revenue: 38000000, tickets: 380, avgPrice: 100000 },
        { date: '18/10', revenue: 61000000, tickets: 610, avgPrice: 100000 },
        { date: '19/10', revenue: 72000000, tickets: 720, avgPrice: 100000 },
        { date: '20/10', revenue: 85000000, tickets: 850, avgPrice: 100000 },
        { date: '21/10', revenue: 95000000, tickets: 950, avgPrice: 100000 },
    ];




    // Top phim doanh thu cao
    const topMovies = [
        {
            id: 1,
            title: 'Avengers: Endgame',
            revenue: 185000000,
            tickets: 1850,
            showtimes: 42,
            trend: 'up',
            change: 12.5
        },
        {
            id: 2,
            title: 'Spider-Man: No Way Home',
            revenue: 156000000,
            tickets: 1560,
            showtimes: 38,
            trend: 'up',
            change: 8.3
        },
        {
            id: 3,
            title: 'Bố Già',
            revenue: 123000000,
            tickets: 1230,
            showtimes: 35,
            trend: 'down',
            change: -3.2
        },
        {
            id: 4,
            title: 'Avatar: The Way of Water',
            revenue: 98000000,
            tickets: 980,
            showtimes: 28,
            trend: 'up',
            change: 15.7
        },
        {
            id: 5,
            title: 'Doraemon: Nobita',
            revenue: 67000000,
            tickets: 670,
            showtimes: 24,
            trend: 'down',
            change: -1.5
        },
    ];

    // Doanh thu theo khung giờ
    const timeSlotRevenue = [
        { time: '08-10h', revenue: 25000000, percentage: 8 },
        { time: '10-12h', revenue: 42000000, percentage: 13 },
        { time: '12-14h', revenue: 58000000, percentage: 18 },
        { time: '14-16h', revenue: 45000000, percentage: 14 },
        { time: '16-18h', revenue: 38000000, percentage: 12 },
        { time: '18-20h', revenue: 72000000, percentage: 22 },
        { time: '20-22h', revenue: 68000000, percentage: 21 },
        { time: '22-24h', revenue: 32000000, percentage: 10 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };


    const totalRevenue = invoice.reduce((sum, day) => sum + day.tongTien, 0);
    const totalTickets = invoice.reduce((sum, day) => sum + day.soLuongVe, 0);
    const avgTicketPrice = totalRevenue / totalTickets;
    const totalSchedule = new Set(
        invoice.map(item => item.thoiGianBatDau)
    ).size;



    return (
        <>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

            <div className="bg-light min-vh-100 py-4">
                <div className="container-fluid" style={{ maxWidth: '1800px' }}>
                    {/* Header */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-success text-white p-3 rounded">
                                        <TrendingUp size={32} />
                                    </div>
                                    <div>
                                        <h1 className="mb-0 h3">Thống Kê Doanh Thu</h1>
                                        <p className="text-muted mb-0">Báo cáo tổng quan và phân tích</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <select
                                        className="form-select"
                                        value={dateRange}
                                        onChange={(e) => setDateRange(e.target.value)}
                                    >
                                        <option value="today">Hôm nay</option>
                                        <option value="week">Tuần này</option>
                                        <option value="month">Tháng này</option>
                                        <option value="year">Năm nay</option>
                                    </select>
                                    <button className="btn btn-primary">
                                        <Download size={20} className="me-2" style={{ verticalAlign: 'middle' }} />
                                        Xuất Excel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="row g-3 mb-4">
                        <div className="col-lg-3 col-md-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <div>
                                            <p className="text-muted mb-1 small">Tổng Doanh Thu</p>
                                            <h3 className="mb-0 text-success fw-bold">{formatCurrency(totalRevenue)}</h3>
                                        </div>
                                        <div className="bg-success bg-opacity-10 p-3 rounded">
                                            <DollarSign size={32} className="text-success" />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-1 mt-2">
                    <span className="badge bg-success bg-opacity-25 text-success">
                      <ChevronUp size={14} style={{ verticalAlign: 'middle' }} />
                      12.5%
                    </span>
                                        <small className="text-muted">so với tuần trước</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <div>
                                            <p className="text-muted mb-1 small">Vé Đã Bán</p>
                                            <h3 className="mb-0 text-primary fw-bold">{formatNumber(totalTickets)}</h3>
                                        </div>
                                        <div className="bg-primary bg-opacity-10 p-3 rounded">
                                            <Users size={32} className="text-primary" />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-1 mt-2">
                    <span className="badge bg-success bg-opacity-25 text-success">
                      <ChevronUp size={14} style={{ verticalAlign: 'middle' }} />
                      8.3%
                    </span>
                                        <small className="text-muted">so với tuần trước</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <div>
                                            <p className="text-muted mb-1 small">Giá Vé Trung Bình</p>
                                            <h3 className="mb-0 text-info fw-bold">{formatCurrency(avgTicketPrice)}</h3>
                                        </div>
                                        <div className="bg-info bg-opacity-10 p-3 rounded">
                                            <DollarSign size={32} className="text-info" />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-1 mt-2">
                    <span className="badge bg-danger bg-opacity-25 text-danger">
                      <ChevronDown size={14} style={{ verticalAlign: 'middle' }} />
                      2.1%
                    </span>
                                        <small className="text-muted">so với tuần trước</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <div>
                                            <p className="text-muted mb-1 small">Suất Chiếu</p>
                                            <h3 className="mb-0 text-warning fw-bold">{totalSchedule}</h3>
                                        </div>
                                        <div className="bg-warning bg-opacity-10 p-3 rounded">
                                            <Film size={32} className="text-warning" />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-1 mt-2">
                    <span className="badge bg-success bg-opacity-25 text-success">
                      <ChevronUp size={14} style={{ verticalAlign: 'middle' }} />
                      5.2%
                    </span>
                                        <small className="text-muted">so với tuần trước</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4 mb-4">
                        {/* Biểu đồ doanh thu theo ngày */}
                        <div className="col-lg-8">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-white">
                                    <h5 className="mb-0">Doanh Thu Theo Ngày</h5>
                                </div>
                                <div className="card-body">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={dailyRevenue}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip
                                                formatter={(value) => formatCurrency(value)}
                                                labelStyle={{ color: '#000' }}
                                            />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="#0d6efd"
                                                strokeWidth={3}
                                                name="Doanh thu"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Doanh thu theo phòng */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-white">
                                    <h5 className="mb-0">Doanh Thu Theo Phòng</h5>
                                </div>
                                <div className="card-body">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={roomRevenue}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percentage }) => `${name}: ${percentage}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="revenue"
                                            >
                                                {roomRevenue.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => formatCurrency(value)} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4 mb-4">
                        {/* Top phim */}
                        <div className="col-lg-7">
                            <div className="card shadow-sm">
                                <div className="card-header bg-white d-flex align-items-center justify-content-between">
                                    <h5 className="mb-0">Top Phim Doanh Thu Cao</h5>
                                    <span className="badge bg-primary">Tuần này</span>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="table-light">
                                            <tr>
                                                <th className="ps-3">#</th>
                                                <th>Tên Phim</th>
                                                <th className="text-end">Doanh Thu</th>
                                                <th className="text-center">Vé Bán</th>
                                                <th className="text-center">Suất Chiếu</th>
                                                <th className="text-center">Xu Hướng</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {topMovies.map((movie, index) => (
                                                <tr key={movie.id}>
                                                    <td className="ps-3 fw-bold">{index + 1}</td>
                                                    <td>
                                                        <div className="fw-semibold">{movie.title}</div>
                                                    </td>
                                                    <td className="text-end">
                              <span className="fw-bold text-success">
                                {formatCurrency(movie.revenue)}
                              </span>
                                                    </td>
                                                    <td className="text-center">{formatNumber(movie.tickets)}</td>
                                                    <td className="text-center">
                                                        <span className="badge bg-info">{movie.showtimes}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        {movie.trend === 'up' ? (
                                                            <span className="badge bg-success bg-opacity-25 text-success">
                                  <ChevronUp size={14} style={{ verticalAlign: 'middle' }} />
                                                                {movie.change}%
                                </span>
                                                        ) : (
                                                            <span className="badge bg-danger bg-opacity-25 text-danger">
                                  <ChevronDown size={14} style={{ verticalAlign: 'middle' }} />
                                                                {Math.abs(movie.change)}%
                                </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Doanh thu theo khung giờ */}
                        <div className="col-lg-5">
                            <div className="card shadow-sm">
                                <div className="card-header bg-white">
                                    <h5 className="mb-0">Doanh Thu Theo Khung Giờ</h5>
                                </div>
                                <div className="card-body">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={timeSlotRevenue}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => formatCurrency(value)} />
                                            <Bar dataKey="revenue" fill="#198754" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chi tiết theo phòng */}
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-header bg-white">
                                    <h5 className="mb-0">Chi Tiết Doanh Thu Theo Phòng</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        {roomRevenue.map((room, index) => (
                                            <div key={room.name} className="col-md-4">
                                                <div className="card border-start border-4" style={{ borderColor: COLORS[index % COLORS.length] }}>
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                                            <h5 className="mb-0">{room.name}</h5>
                                                            <span className="badge" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                                {room.percentage}%
                              </span>
                                                        </div>
                                                        <div className="mb-2">
                                                            <small className="text-muted d-block">Doanh thu</small>
                                                            <h4 className="mb-0 text-success">{formatCurrency(room.revenue)}</h4>
                                                        </div>
                                                        <div className="row g-2">
                                                            <div className="col-6">
                                                                <small className="text-muted d-block">Vé bán</small>
                                                                <strong>{formatNumber(room.tickets)}</strong>
                                                            </div>
                                                            <div className="col-6">
                                                                <small className="text-muted d-block">TB/vé</small>
                                                                <strong>{formatCurrency(room.revenue / room.tickets)}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RevenueManager2;