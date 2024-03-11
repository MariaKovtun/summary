import {Row} from 'react-bootstrap';
import CatalogItemCard from './CatalogItemCard';
import {Spinner} from "react-bootstrap";
import useData from '../hooks/useData.tsx';

const Bestsellers = () => {
        const [{data,isLoading,error}] = useData('http://localhost:7070/api/top-sales');

        return (
                <section className="top-sales">
                  <h2 className="text-center">Хиты продаж!</h2>
                  <Row>
                  {!!isLoading ? 
                  <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                  </div> : 
                  error ? <p>Ошибка загрузки данных</p> :   
                  data?.map((item) => <CatalogItemCard key={item.id} {...item}></CatalogItemCard>)}
                  </Row>
                </section>
        )
        
}

export default Bestsellers;