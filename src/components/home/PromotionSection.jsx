import React, { useEffect, useState } from "react";
import settingService from "../../services/settingService.js";
import {movieService} from "../../services/index.js";
import serviceService from "../../services/serviceService.js";
import promotionService from "../../services/promotionService.js";
import { Gift } from "lucide-react";

const PromotionSection = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const res = await settingService.getAllKhuyenMaiBanner();
                if (res.success) {
                    const promotion = res.data || [];
                    console.log(promotion);
                    setPromotions(promotion);
                } else throw Error(res.data);
            } catch (err) {
                console.error("❌ Lỗi khi tải khuyến mãi:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPromotions();
    }, []);

    useEffect(() => {
        const fetchSlider = async () => {
            const result = await Promise.all(
                promotions.map(async (item) => {
                    const match = item.tenCauHinh.split('-');
                    const id = match ? match[1].trim() : null;
                    const service = (item.loai === 'Khuyến mãi') ? await promotionService.getPromotionById(id) : await serviceService.getServiceById(id)
                    return {
                        id: item.maCauHinh,
                        tieuDe: match[0].trim(),
                        hinhAnh: item.giaTri,
                        details: service?.data,
                        loai: item.loai,
                        moTa: service?.data?.moTa,
                        ngayBatDau: service?.data?.ngayBatDau,
                        ngayKetThuc: service?.data?.ngayKetThuc,
                    }
                })
            );
            setBanners(result);
        };
        fetchSlider()
    }, [promotions]);

  if (loading)
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );

  if (promotions.length === 0)
    return (
      <section className="mt-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="mb-0 fw-semibold" style={{ color: "#ff4b2b" }}>
            <i className="fas fa-gift me-2"></i>Khuyến mãi
          </h2>
        </div>

        <div className="row g-4">
          {[
            {
              tenKm: "Ưu đãi thành viên SuperMovie",
              moTa: "Giảm giá 30% cho tất cả suất chiếu vào Thứ 4 hàng tuần.",
              hinhAnh:
                "https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Promotions/HSSV-2.jpg",
              ngayBatDau: "01/10/2025",
              ngayKetThuc: "31/12/2025",
            },
            {
              tenKm: "Happy Day - Vé chỉ 45.000đ",
              moTa: "Áp dụng cho học sinh, sinh viên tại các rạp SuperMovie toàn quốc.",
              hinhAnh: "https://media.lottecinemavn.com/Media/Event/60cb72826642494ab62b80df02cbeb22.jpg",
              ngayBatDau: "05/10/2025",
              ngayKetThuc: "31/12/2025",
            },
            {
              tenKm: "Combo bắp nước chỉ 45.000đ",
              moTa: "Combo bắp nước chỉ 45.000đ",
              hinhAnh: "https://media.lottecinemavn.com/Media/Event/5bb61105185d44158c2e50326cdfa05e.jpg",
              ngayBatDau: "10/10/2025",
              ngayKetThuc: "31/12/2025",
            },
          ].map((km, i) => (
            <div key={i} className="col-md-4 col-sm-6">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{ background: "#20232a", color: "#fff" }}
              >
                <img
                  src={km.hinhAnh}
                  alt={km.tenKm}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "4px 4px 0 0",
                  }}
                />
                <div className="card-body">
                  <h5
                    className="card-title fw-semibold"
                    style={{ color: "#ff4b2b" }}
                  >
                    {km.tenKm}
                  </h5>
                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {km.moTa}
                  </p>
                </div>
                <div className="card-footer border-0 bg-transparent">
                  <small className="text-secondary">
                    ⏳ {km.ngayBatDau} → {km.ngayKetThuc}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );

  return (
    <section className="mt-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0 fw-semibold d-flex" style={{ color: "#ff4b2b" }}>
            <Gift size={36} className="me-2" />
            Khuyến mãi
        </h2>
      </div>

      <div className="row g-4">
        {banners.map((km) => (
          <div key={km.maCauHinh} className="col-md-4 col-sm-6">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ background: "#20232a", color: "#fff" }}
            >
              <img
                src={km.hinhAnh || "/default-promo.jpg"}
                alt={km.tieuDe}
                className="card-img-top"
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "4px 4px 0 0",
                }}
              />
              <div className="card-body">
                <h5
                  className="card-title fw-semibold"
                  style={{
                      color: "#ff4b2b",
                      textAlign: "center"
                  }}
                >
                  {km.tieuDe}
                </h5>
                <p
                  className="card-text text-secondary"
                  style={{
                      fontSize: "0.9rem",
                      textAlign: "center"
                  }}
                >
                  {km.moTa?.length > 100
                    ? km.moTa.substring(0, 100) + "..."
                    : km.moTa}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionSection;
