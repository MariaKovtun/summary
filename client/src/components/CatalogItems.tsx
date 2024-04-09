import CatalogItemProps from "./CatalogItemProps";
import CatalogItemCard from "./CatalogItemCard";
import { Row, Button} from "react-bootstrap";
import Loader from "./Loader";

type CatalogItemsProps = {
  items?: CatalogItemProps[];
  isLoading: boolean;
  error?: string;
  loadMoreBtnHidden: boolean;
  handleClick: () => void;
};

const CatalogItems = ({
  items,
  isLoading,
  error,
  loadMoreBtnHidden,
  handleClick,
}: CatalogItemsProps) => {
  if (isLoading) {
    return (<Loader/>);
  } else {
    return error ? (
      <p>
        Произошла ошибка при загрузке элементов каталога. Обновите страницу и
        попробуйте еще раз.
      </p>
    ) : (
      <>
        <Row>              
          {items?.map((item) => (
            <CatalogItemCard key={item.id} {...item}></CatalogItemCard>
          ))}             
        </Row>
        <div className="text-center">            
          <Button
            variant="outline-primary"
            onClick={handleClick}
            hidden={loadMoreBtnHidden}
          >
                              Загрузить ещё                
          </Button>            
        </div>
      </>
    );
  }
};

export default CatalogItems;
