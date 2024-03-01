import {Container, Row, Col, Nav} from "react-bootstrap";
import {CatalogItemProps} from './CatalogItemsProps';
import { useEffect, useState } from "react";
import axios from "axios";
import CatalogItemCard from './CatalogItemCard';

type CatalogProps = {
    children?: React.ReactNode;
}

const Catalog = (props: CatalogProps) => {
    const [categories, setCategories] = useState<{id:number,title:string}[]>();
    const [selectedCategory,setSelectedCategory] = useState<number>();
    const [elements, setElements] = useState<CatalogItemProps[]>();
    const [currentOffset,setCurrentOffset] = useState<number>(0);

    const fetchCategories = () => {
        axios.get('http://localhost:7070/api/categories')
        .then(res => res.data)
        .then(data => setCategories(data))
    }

    const fetchElements = (selectedCategory?:number, offset: boolean = false) => {
        if (offset) setCurrentOffset(currentOffset+6);
        let url = `http://localhost:7070/api/items${!!selectedCategory ? `?categoryId=${selectedCategory}` : ""}${offset ? `${!!selectedCategory ? "&" : "?"}offset=${currentOffset}` : ""}`
        axios.get(url)
        .then(res => res.data)
        .then(data => setElements(data));
    }

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
                    <Nav className="catalog-categories justify-content-center" as="ul">
                        <Nav.Item as="li">
                          <Nav.Link key={0} onClick={() => setSelectedCategory()} className={!!selectedCategory ? "" : "active"}>Все</Nav.Link>
                        </Nav.Item>
                        {categories?.map((category) => 
                          <Nav.Item as="li" key={category.id}>
                              <Nav.Link onClick={() => setSelectedCategory(category.id)}>{category.title}</Nav.Link>
                          </Nav.Item>
                        )}
                    </Nav>
                    <Row>
                    {elements?.map((item) => <CatalogItemCard key={item.id} {...item}></CatalogItemCard>)}
                    </Row>
                    <div className="text-center">
                        <button className="btn btn-outline-primary" onClick={() => fetchElements(selectedCategory,true)}>Загрузить ещё</button>
                    </div>
                </section>
              </Col>
            </Row>
        </Container>
    )
}

export default Catalog;