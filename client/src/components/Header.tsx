import logo from '../assets/img/header-logo.png'
import {Navbar, Container, Nav, Form, Row,Col} from 'react-bootstrap';
import {useState, useContext} from 'react';
import {CartContext} from '../contexts/CartContext';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router';
import { NavLink } from "react-router-dom";

const HeaderControlPics = () => {
    const {order} = useContext(CartContext);
    //const {searchStr, setSearchStr} = useContext(SearchContext);
    
    const [searchFieldVisible,setSearchFieldVisible] = useState<boolean>(false);
    
    const searchInput = useInput();

    const route = useNavigate();

    let formClassName = `header-controls-search-form form-inline ${searchFieldVisible ? "" : "invisible"}`;

    const onSearchStrChanged = (newStr: string) => {
        route(`/catalog?q=${newStr}`);
    }

    return (
    <>
        <div className="header-controls-pics">
            <div data-id="search-expander" className="header-controls-pic header-controls-search" 
            onClick={() => !!searchInput.value ? onSearchStrChanged(searchInput.value) : setSearchFieldVisible(!searchFieldVisible)}>
            </div>
            <a className="header-controls-pic header-controls-cart" href="/cart">
                {(order.length > 0) && <div className="header-controls-cart-full">{order.length}</div>}
                <div className="header-controls-cart-menu"></div>
            </a>
        </div>
        <Form className={formClassName} data-id="search-form">
            <Form.Control
              type="text"
              placeholder="Поиск"
              onChange={searchInput.onChange}
            />
        </Form>
    </>
    )
}

const Header = () => {
    return (
    <header className="container">
      <Row>
        <Col>
            <Navbar expand="sm" className="bg-light">
            <Container>
                <Navbar.Brand>
                    <Nav.Link as={NavLink} to="/">
                        <img src={logo} alt="Bosa Noga"></img>
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Collapse id="navbarMain">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/">Главная</Nav.Link>
                    <Nav.Link as={NavLink} to="/catalog">Каталог</Nav.Link>
                    <Nav.Link as={NavLink} to="/about">О магазине</Nav.Link>
                    <Nav.Link as={NavLink} to="/contacts">Контакты</Nav.Link>
                    <HeaderControlPics/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </Col>   
      </Row>     
    </header>
    )
}

export default Header;