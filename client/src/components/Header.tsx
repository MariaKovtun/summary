import logo from '../assets/img/header-logo.png'
import {Navbar, Container, Nav, Form, Row,Col} from 'react-bootstrap';
import {useState, useContext} from 'react';
import {CartContext} from '../contexts/CartContext';

const HeaderControlPics = () => {
    const {order} = useContext(CartContext);
    
    const [searchFieldVisible,setSearchFieldVisible] = useState<boolean>(false);
   
    let formClassName = `header-controls-search-form form-inline ${searchFieldVisible ? "" : "invisible"}`;

    return (
    <>
        <div className="header-controls-pics">
            <div data-id="search-expander" className="header-controls-pic header-controls-search" 
            onClick={() => setSearchFieldVisible(!searchFieldVisible)}></div>
            <a className="header-controls-pic header-controls-cart" href="/cart">
                {(order.length > 0) && <div className="header-controls-cart-full">{order.length}</div>}
                <div className="header-controls-cart-menu"></div>
            </a>
        </div>
        <Form className={formClassName} data-id="search-form">
            <Form.Control
              type="text"
              placeholder="Поиск"
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
                <Navbar.Brand href="/"><img src={logo} alt="Bosa Noga"></img></Navbar.Brand>
                <Navbar.Collapse id="navbarMain">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Главная</Nav.Link>
                    <Nav.Link href="/catalog">Каталог</Nav.Link>
                    <Nav.Link href="/about">О магазине</Nav.Link>
                    <Nav.Link href="/contacts">Контакты</Nav.Link>
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