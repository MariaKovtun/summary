import CatalogItemProps from "./CatalogItemProps";

const CatalogItemCard = ({ id, title, images, price }: CatalogItemProps) => {
  return (
    <div className="col-4 flex-cards">
      <div className="card catalog-item-card">
        <img
          src={images[0]}
          className="card-img-top img-fluid"
          alt={title}
        ></img>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price} руб.</p>
          <a className="btn btn-outline-primary" href={`/catalog/${id}`}>
            Заказать
          </a>
        </div>
      </div>
    </div>
  );
};

export default CatalogItemCard;
