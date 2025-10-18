import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#23272f",
        color: "#f1f1f1",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "40px 0 20px",
      }}
    >
      <style>
        {`
          .footer-container {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 30px;
            max-width: 1200px;
            margin: auto;
          }

          .footer-col {
            flex: 1 1 220px;
            min-width: 220px;
          }

          .footer-col h6 {
            color: #ff4b2b;
            font-weight: 700;
            margin-bottom: 14px;
            text-transform: uppercase;
          }

          .footer-col a {
            display: block;
            color: #f1f1f1;
            font-size: 14px;
            text-decoration: none;
            margin-bottom: 8px;
            transition: color 0.2s ease;
          }

          .footer-col a:hover {
            color: #ff4b2b;
          }

          .footer-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 14px;
          }

          .footer-logo img {
            height: 45px;
          }

          .footer-logo span {
            color: #ff4b2b;
            font-weight: 700;
            font-size: 22px;
          }

          .footer-social {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-top: 14px;
          }

          .footer-social a img {
            width: 36px;
            height: 36px;
            object-fit: contain;
            opacity: 0.8;
            transition: opacity 0.2s ease, transform 0.2s ease;
          }

          .footer-social a img:hover {
            opacity: 1;
            transform: scale(1.08);
          }

          .footer-payment {
            text-align: center;
            margin-top: 40px;
          }

          .footer-payment h6 {
            color: #f1f1f1;
            margin-bottom: 12px;
            font-weight: 600;
          }

          .payment-icons img {
            height: 30px;
            margin: 0 8px;
            filter: brightness(0.9);
            transition: filter 0.2s;
          }

          .payment-icons img:hover {
            filter: brightness(1.2);
          }

          hr {
            border-color: rgba(255, 255, 255, 0.1);
            margin: 30px 0 15px;
          }

          .footer-bottom {
            text-align: center;
            color: #aaa;
            font-size: 13px;
            line-height: 1.6;
          }
        `}
      </style>

      <div className="footer-container">
        {/* Logo + Intro */}
        <div className="footer-col">
          <div className="footer-logo">
            <img src="/images/cinema_logo.png" alt="SUPERMOVIE" />
            <span>SUPERMOVIE</span>
          </div>
          <p>
            Hệ thống đặt vé xem phim trực tuyến hàng đầu tại Việt Nam,
            mang đến trải nghiệm điện ảnh hiện đại, tiện lợi và đẳng cấp.
          </p>
          <div className="footer-social">
            <a href="#" title="Facebook">
              <img src="/images/facebook.png" alt="Facebook" />
            </a>
            <a href="#" title="Twitter">
              <img src="/images/twittwe.png" alt="Twitter" />
            </a>
            <a href="#" title="Instagram">
              <img src="/images/intagram.png" alt="Instagram" />
            </a>
          </div>
        </div>

        {/* Phim */}
        <div className="footer-col">
          <h6>Phim</h6>
          <a href="#">Phim đang chiếu</a>
          <a href="#">Phim sắp chiếu</a>
          <a href="#">Suất chiếu đặc biệt</a>
        </div>

        {/* Rạp chiếu */}
        <div className="footer-col">
          <h6>Rạp chiếu</h6>
          <a href="#">Danh sách rạp</a>
          <a href="#">Rạp đặc biệt</a>
          <a href="#">Lịch chiếu</a>
        </div>

        {/* Hỗ trợ khách hàng */}
        <div className="footer-col">
          <h6>Hỗ trợ khách hàng</h6>
          <a href="#">Hướng dẫn đặt vé</a>
          <a href="#">Chính sách hoàn vé</a>
          <a href="#">Liên hệ</a>
          <div style={{ marginTop: "10px", fontSize: "14px" }}>
            <p>
              <i className="fas fa-phone-alt me-2"></i>
              <strong>Hotline:</strong> 1900 6066
            </p>
            <p>
              <i className="fas fa-envelope me-2"></i>
              <strong>Email:</strong> support@supermovie.vn
            </p>
            <p>
              <i className="fas fa-map-marker-alt me-2"></i>
              <strong>Địa chỉ:</strong> 24 Quang Trung, Gò Vấp, TP.HCM
            </p>
          </div>
        </div>
      </div>

      {/* Thanh toán */}
      <div className="footer-payment">
        <h6>Phương thức thanh toán</h6>
        <div className="payment-icons">
          <img src="/images/payments/visa.png" alt="Visa" />
          <img src="/images/payments/mastercard.png" alt="Mastercard" />
          <img src="/images/payments/jcb.png" alt="JCB" />
          <img src="/images/payments/momo.png" alt="MoMo" />
          <img src="/images/payments/OCB.png" alt="OCB" />
        </div>
      </div>

      <hr />
      <div className="footer-bottom">
        <p>Công ty TNHH SUPERMOVIE Việt Nam</p>
        <p>
          Giấy chứng nhận ĐKKD số 0319999999 do Sở KH&ĐT TP.HCM cấp ngày
          01/01/2024.
        </p>
        <p>
          &copy; {new Date().getFullYear()} SUPERMOVIE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
