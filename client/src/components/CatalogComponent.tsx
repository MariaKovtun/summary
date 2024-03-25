import {Container, Row, Col, Nav, Button, Form, Spinner} from "react-bootstrap";
import {useEffect, useState } from "react";
import axios from "axios";
import CatalogItemCard from './CatalogItemCard';
import useData from "../hooks/useData";
import Loader from './Loader';
import { useLocation} from "react-router-dom";

type CatalogProps = {
    children?: React.ReactNode,
    showSearchField?: boolean
}

const CatalogComponent = ({children = [], showSearchField = true}: CatalogProps) => {
    const [categories, setCategories] = useState<{id:number,title:string}[]>();
    const [selectedCategory,setSelectedCategory] = useState<number>();
    const [currentOffset,setCurrentOffset] = useState<number>(0);
    
    const {search} = useLocation();
    const [searchStr, setSearchStr] = useState<string>(new URLSearchParams(search).get('q'));

    const fetchCategories = () => {
        axios.get('http://localhost:7070/api/categories')
        .then(res => res.data)
        .then(data => setCategories(data))
    }

    const updateFetchElementsUrl = (selectedCategory?:number, offset: boolean = false) => {
        let url = new URL(basicFetchElementsUrl);
        
        if (!!selectedCategory) url.searchParams.append("categoryId",selectedCategory.toString());
        if (offset) url.searchParams.append("offset",(currentOffset+6).toString());
        
        if (!!searchStr) {
            url.searchParams.append("q",searchStr);
        }
        setFetchElementsUrl(decodeURI(url.toString()));
        
        if (offset) setCurrentOffset(currentOffset+6);
    }
    const basicFetchElementsUrl = 'http://localhost:7070/api/items';
    const [fetchElementsUrl, setFetchElementsUrl] = useState<string>(basicFetchElementsUrl);

    useEffect(fetchCategories,[]);

    useEffect(() => {
        console.log("произошло изменение параметра search");
        const q = new URLSearchParams(search).get('q');
        if (!!q) {
            setSearchStr(q);
            updateFetchElementsUrl();
        }
    },[search]);

    useEffect(() => {
        updateFetchElementsUrl(selectedCategory);
        setCurrentOffset(0);
    },[selectedCategory]);

    const [{data,isLoading,error}] = useData(fetchElementsUrl);

    return (
        <Container>
            <Row>
              <Col>
                {children}
                <section className="catalog">
                    <h2 className="text-center">Каталог</h2>
                    {showSearchField && <Form className="catalog-search-form form-inline">
                        <Form.Control 
                        placeholder="Поиск" 
                        defaultValue={searchStr}
                        value={searchStr} 
                        onChange={(e) => setSearchStr(e.target.value)}
                        onKeyDown={(e) => { 
                            if (e.key == "Enter") {
                                e.preventDefault();
                                updateFetchElementsUrl(selectedCategory);
                            }
                        }
                        }></Form.Control>
                    </Form>}
                    {!!categories ?
                    <Nav className="catalog-categories justify-content-center" as="ul">
                        <Nav.Item as="li">
                            <Nav.Link key={0} onClick={() => setSelectedCategory()} className={!!selectedCategory ? "" : "active"}>Все</Nav.Link>
                        </Nav.Item>
                        {categories?.map((category) => 
                        <Nav.Item as="li" key={category.id}>
                            <Nav.Link onClick={() => setSelectedCategory(category.id)}>{category.title}</Nav.Link>
                        </Nav.Item>)}
                    </Nav> :  null}
                    {isLoading ? 
                    (currentOffset == 0) ?
                    <Loader/> :
                    <Button variant="outline-primary" disabled>
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                        Загрузка
                    </Button> : 
                    error ? <p>Произошла ошибка при загрузке элементов каталога. Обновите страницу и попробуйте еще раз.</p> :
                    <>
                    <Row>
                        {(data?.length > 0) ? 
                        data?.map((item) => <CatalogItemCard key={item.id} {...item}></CatalogItemCard>) :
                        <p>В списке больше нет элементов</p>
                        }
                    </Row>
                    {!!data && (data.length >= 6) ? 
                    <div className="text-center">
                        <Button variant="outline-primary" onClick={() => updateFetchElementsUrl(selectedCategory,true)}>Загрузить ещё</Button>
                    </div> : null}
                    </>
                    }
                </section>
              </Col>
            </Row>
        </Container>
    )
}

export default CatalogComponent;