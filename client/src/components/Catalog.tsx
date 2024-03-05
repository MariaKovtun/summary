import {Container, Row, Col, Nav, Spinner, Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import CatalogItemCard from './CatalogItemCard';
import useData from "../hooks/useData";

type CatalogProps = {
    children?: React.ReactNode;
}

const Catalog = (props: CatalogProps) => {
    const [categories, setCategories] = useState<{id:number,title:string}[]>();
    const [selectedCategory,setSelectedCategory] = useState<number>();
    const [currentOffset,setCurrentOffset] = useState<number>(0);
    const [url, setUrl] = useState<string>('http://localhost:7070/api/items');

    const fetchCategories = () => {
        axios.get('http://localhost:7070/api/categories')
        .then(res => res.data)
        .then(data => setCategories(data))
    }

    const fetchElements = (selectedCategory?:number, offset: boolean = false) => {
        let url = `http://localhost:7070/api/items${!!selectedCategory ? `?categoryId=${selectedCategory}` : ""}${offset ? `${!!selectedCategory ? "&" : "?"}offset=${currentOffset+6}` : ""}`;
        setUrl(url);
        if (offset) setCurrentOffset(currentOffset+6);
    }

    const [{data,isLoading,error}] = useData(url);

    useEffect(fetchCategories,[]);
    
    useEffect(() => {
        fetchElements(selectedCategory);
        setCurrentOffset(0);
    },[selectedCategory]);

    return (
        <Container>
            <Row>
              <Col>
                {props.children}
                <section className="catalog">
                    <h2 className="text-center">Каталог</h2>
                    <form className="catalog-search-form form-inline">
                        <input className="form-control" placeholder="Поиск"></input>
                    </form>
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
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" variant="primary" />
                        <Spinner animation="border" variant="secondary" />
                        <Spinner animation="border" variant="success" />
                        <Spinner animation="border" variant="danger" />
                        <Spinner animation="border" variant="warning" />
                        <Spinner animation="border" variant="info" />
                        <Spinner animation="border" variant="light" />
                        <Spinner animation="border" variant="dark" />
                    </div> :
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
                        <Button variant="outline-primary" onClick={() => fetchElements(selectedCategory,true)}>Загрузить ещё</Button>
                    </div> : null}
                    </>
                    }
                </section>
              </Col>
            </Row>
        </Container>
    )
}

export default Catalog;