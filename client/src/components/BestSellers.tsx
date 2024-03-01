import {Row} from 'react-bootstrap';
import CatalogItemCard from './CatalogItemCard';
import CatalogItemsProps from './CatalogItemsProps';

const Bestsellers = (props: CatalogItemsProps) => {
        //div className="preloader"
        return (
          !!props?.items ?    
          <section className="top-sales">
                  <h2 className="text-center">Хиты продаж!</h2>
                  <Row>
                  {props.items?.map((item) => <CatalogItemCard {...item}></CatalogItemCard>)}
                  </Row>
          </section> :
          null      
        )
        
}

export default Bestsellers;