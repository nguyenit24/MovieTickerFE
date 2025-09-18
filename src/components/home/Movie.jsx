import React from 'react';

const Movie = ({ movie, onClick }) => {
  const getRatingBadge = (rating) => {
    if (rating === '18+') {
      return { class: 'bg-danger', text: '18+' };
    }
    return { class: 'bg-primary', text: '13+' };
  };

  const ratingInfo = getRatingBadge(movie.rating);

  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4">
      <div className="card movie-card h-100 shadow-sm p-0" style={{ border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }}>
        <div className="movie-img-wrapper position-relative" style={{ width: '100%', height: '340px', overflow: 'hidden', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', padding: 0 }}>
          <img
            src={movie.img}
            alt={movie.title}
            className="movie-poster w-100 h-100"
            style={{ objectFit: 'cover', transition: 'transform 0.3s', display: 'block' }}
          />
          <div className="position-absolute top-0 start-0 m-2">
            <span className={`badge ${ratingInfo.class} fw-bold`}>
              {ratingInfo.text}
            </span>
          </div>
        </div>
        <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: 120, padding: '1rem' }}>
          <h5 className="card-title fw-bold mb-2 text-truncate" title={movie.title} style={{ fontSize: '1.1rem' }}>{movie.title}</h5>
          <div className="d-flex justify-content-between text-muted small mb-2">
            <div className="d-flex align-items-center">
              <i className="far fa-clock me-1"></i>
              <span>{movie.duration}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="far fa-calendar me-1"></i>
              <span>{movie.releaseDate}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <button className="btn btn-primary btn-sm w-50 me-2" onClick={e => { e.stopPropagation(); alert('Chức năng mua vé sẽ sớm có!'); }}>Mua vé</button>
            <button className="btn btn-outline-light btn-sm w-50" onClick={e => { e.stopPropagation(); onClick(movie); }}>Xem chi tiết</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .movie-card {
          border-radius: 16px;
          background: #fff;
          padding: 0 !important;
        }
        .movie-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0,0,0,0.12) !important;
        }
        .movie-card:hover .movie-poster {
          transform: scale(1.05);
        }
        .movie-img-wrapper {
          background: #eee;
          padding: 0 !important;
        }
        .btn-primary {
          background: #ff4b2b;
          border: none;
        }
        .btn-primary:hover {
          background: #ff6f3c;
        }
        .btn-outline-light {
          border-color: #ff4b2b;
          color: #ff4b2b;
        }
        .btn-outline-light:hover {
          background: #ff4b2b;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Movie;