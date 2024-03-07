import Bestsellers from "./BestSellers";
import Catalog from "./Catalog";


const MainPage = () => {
    return (
        <div>
            <Bestsellers/>
            <Catalog showSearchField={false}/>
        </div>
    )
}

export default MainPage;