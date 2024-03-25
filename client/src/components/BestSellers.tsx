import {Row} from 'react-bootstrap';
import CatalogItemCard from './CatalogItemCard';
import useData from '../hooks/useData';
import Loader from './Loader';

const Bestsellers = () => {
        const [{data,isLoading,error}] = useData('http://localhost:7070/api/top-sales');

        return (
                <section className="top-sales">
                  <h2 className="text-center">Хиты продаж!</h2>
                  {!!isLoading ? 
                  <Loader/> : 
                  error ? <p>Ошибка загрузки данных</p> : 
                  <Row>  
                  {data?.map((item) => <CatalogItemCard key={item.id} {...item}></CatalogItemCard>)}
                  </Row>}
                </section>
        )
        
}

export default Bestsellers;