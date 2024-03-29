import {Container, Row, Col, Nav, Button, Form, Spinner} from "react-bootstrap";
import {useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import {debounce} from 'lodash';
import axios from "axios";
import { CatalogItemProps } from "./CatalogItemsProps";
import CatalogItemCard from "./CatalogItemCard";

type CatalogProps = {
    children?: React.ReactNode,
    showSearchField?: boolean
}

const CatalogComponent = ({children = [], showSearchField = true}: CatalogProps) => {
    const {search} = useLocation();
    const q = new URLSearchParams(search).get('q');

    const basicFetchElementsUrl = 'http://localhost:7070/api/items'
    const [data,setData] = useState<CatalogItemProps[]>();
    

    const fetchData = () => {
        let url = new URL(basicFetchElementsUrl);
        if (!!q) url.searchParams.append("q",q);
        //if (!!selectedCategory) url.searchParams.append("categoryId",selectedCategory.toString());
        //if (offset) url.searchParams.append("offset",(currentOffset+6).toString());
        
        axios.get(decodeURI(url.toString()))
        .then(res => res.data)
        .then(data => setData(data))
    }

    useEffect(fetchData,[q]);
    
    const route = useNavigate();
    const handleDebounceFn = (value: string) => {
        route(`/catalog?q=${value}`)
    }
    const debounceFn = useCallback(debounce(handleDebounceFn, 500), []);

    return (
        <Container>
            <Row>
              <Col>
                {children}
                <section className="catalog">
                    <h2 className="text-center">Каталог</h2>
                    {showSearchField && 
                    <Form className="catalog-search-form form-inline">
                        <Form.Control 
                        placeholder="Поиск" 
                        defaultValue={q}
                        onChange={(e) => debounceFn(e.target.value)}
                        onKeyDown={(e) => { 
                            if (e.key == "Enter") {
                                e.preventDefault();
                                debounceFn(e.target.value);
                            }
                        }
                        }></Form.Control>
                    </Form>}
                    <Row>
                    {(data?.length > 0) ? 
                        data?.map((item) => <CatalogItemCard key={item.id} {...item}></CatalogItemCard>) : null
                    }
                    </Row>
                    
                </section>
              </Col>
            </Row>
        </Container>
    )
}

export default CatalogComponent;