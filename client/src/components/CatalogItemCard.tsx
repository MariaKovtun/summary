import { CatalogItemProps } from "./CatalogItemsProps";

const CatalogItemCard = ({id,title,images,price}: CatalogItemProps) => {
    let link = `/catalog/${id}`;

    return (
        <div className="col-4">
            <div className="card catalog-item-card">
                <img src={images[0]} className="card-img-top img-fluid" alt={title}></img>
                <div className="card-body">
                    <p className="card-text">{title}</p>
                    <p className="card-text">{price} руб.</p>
                    <a className="btn btn-outline-primary" href={link}>Заказать</a>
                </div>
            </div>
        </div>  
    )
}

export default CatalogItemCard;

