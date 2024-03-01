import axios from "axios";
import { useEffect, useState } from "react";
import Bestsellers from "./BestSellers";
import { CatalogItemProps } from "./CatalogItemsProps";
import Catalog from "./Catalog";


const MainPage = () => {
    const [bestsellers, setBestsellers] = useState<CatalogItemProps[]>();

    const fetchBestsellers = () => {
        axios.get('http://localhost:7070/api/top-sales')
        .then(res => res.data)
        .then(data => setBestsellers(data))
    }
    
    useEffect(fetchBestsellers,[]);

    return (
        <div>
            <Bestsellers items={bestsellers}/>
            <Catalog/>
          </div>
         
    )
}

export default MainPage;