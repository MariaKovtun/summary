import axios from 'axios';
import { useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {Row, Spinner, Table} from "react-bootstrap";
import {CartContext} from '../contexts/CartContext';
import { useNavigate } from 'react-router';

type CatalogItemCardFullProps = {
        "id":number,
        "category": number,
        "title": string,
        "images": string[],
        "sku": string,
        "manufacturer": string,
        "color": string,
        "material": string,
        "reason": string,
        "season": string,
        "heelSize": string,
        "price": number,
        "oldPrice": number,
        "sizes":{"size": string,"available": boolean}[]
}

const CatalogItemCardFull = () => {
    const {id} = useParams();

    const [item,setItem] = useState<CatalogItemCardFullProps>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [quantity, setQuantity] = useState<number>(1);
    const [size, setSize] = useState<string>();
    
    const {order,setOrder} = useContext(CartContext);
    
    const fetchItem = (id?: string) => {
        console.log("isFetching");
        setIsLoading(true);
        axios.get(`http://localhost:7070/api/items/${id}`)
        .then(res => res.data)
        .then(data => {
            setItem(data);
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
            setError(error);
        });
    }
    
    useEffect(() => fetchItem(id),[id]);

    const addToCart = (item: CatalogItemCardFullProps) => {
        let exists = order.find(elem => (elem.id == item.id) && (elem.price == item.price));
        let existsIndex;
        if (!!exists) {
            existsIndex = order.findIndex(elem => (elem.id == item.id) && (elem.price == item.price));
            order.splice(existsIndex,1);
            setOrder(order.concat([{id: item.id,title: item.title, size: size, price: item.price, quantity: quantity + exists.quantity}]));
        } else {
            setOrder(order.concat([{id: item.id,title: item.title, size: size, price: item.price, quantity: quantity}]));
        }
    }

    useEffect(() => window.localStorage.setItem('order',JSON.stringify(order)),[order]);

    const route = useNavigate();

   return (
       isLoading ? <>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
       </> :
       error ? <p>Произошла ошибка при загрузке элемента. Обновите страницу и повторите попытку</p> :
       <section className="catalog-item">
           <h2 className="text-center">{item?.title}</h2>
           <Row>
               <div className="col-5">
                   <img src={item?.images[0]} className="img-fluid" alt=""></img>
                </div>
                <div className="col-7">
                    <Table bordered={true} size="sm">
                        <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{item?.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{item?.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{item?.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{item?.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{item?.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{item?.reason}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="text-center">
                        <p>Размеры в наличии: 
                            {item?.sizes.filter((elem) => !!elem.available).map((elem, index) => 
                            <span 
                            key={index} 
                            className={`catalog-item-size ${(elem.size == size)? "selected": ""}`}
                            onClick={() => setSize(elem.size)}>{elem.size}</span> 
                            )}  
                        </p>
                        <p>Количество: 
                            <span className="btn-group btn-group-sm pl-2">
                                <button className="btn btn-secondary" disabled={quantity <= 1} onClick={() => setQuantity(quantity-1)}>-</button>
                                <span className="btn btn-outline-primary">{quantity}</span>
                                <button className="btn btn-secondary" disabled={quantity >=10} onClick={() => setQuantity(quantity+1)}>+</button>
                            </span>
                        </p>
                    </div>
                    <button 
                    className="btn btn-danger btn-block btn-lg" 
                    disabled={(typeof size === "undefined") || item?.sizes.filter((elem) => elem.available).length == 0} 
                    onClick={() => {
                        addToCart(item);
                        route("/cart");
                    }}>
                        В корзину
                    </button>
                    <p className="text-danger" hidden={typeof size !== "undefined"}>Не выбран размер</p>
                </div>
           </Row>
        </section>
   ); 
}

export default CatalogItemCardFull;

