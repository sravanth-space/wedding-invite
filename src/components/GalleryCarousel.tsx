type GalleryCarouselProps = {
  id: string;
  images: string[];
};

export default function GalleryCarousel({ id, images }: GalleryCarouselProps) {
  return (
    <div id={id} className="carousel slide mt-4" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={`${id}-indicator-${index + 1}`}
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner rounded-4">
        {images.map((image, index) => (
          <div
            key={`${id}-image-${index + 1}`}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img src={image} alt={`Moment ${index + 1}`} className="d-block w-100" />
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}