import Banner from "../components/Banner";
import {Container, Row,Col, ListGroup} from 'react-bootstrap';
import Footer from "../components/Footer";
import Header from "../components/Header";

const About = () => {
    return (
        <>
        <Header/>
        <Container>
            <Row>
                <Col>
                <Banner/>
                <section className="top-sales">
                    <h2 className="text-center">О магазине</h2>
                    <p>В Интернете можно встретить немало магазинов, предлагающих аксессуары. Но именно к нам хочется возвращаться снова и снова.</p>
                    <p className="h4 text-center">Мы предлагаем вам особые условия:</p>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item as="li">
                            Индивидуальный подход специалиста. 
                            Когда поступает новая коллекция обуви весна-лето или же коллекция обуви осень-зима – покупателям бывает трудно сориентироваться во всем многообразии новинок. 
                            Наш менеджер по телефону поможет вам определиться с товарами,подходящими именно вам.
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                          Мы периодически проводим распродажи как женских и мужских, так и детских моделей. Вы будете приятно удивлены ценами на аксессуары в магазине BosaNoga.
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                          У нас всегда есть из чего выбрать. 
                          Неважно, какую категорию вы просматриваете:осень-зима, или же весна-лето – вы всегда сможете найти варианты, подходящие вам по внешнему виду и цене.
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                          Мы несем ответственность за все товары.
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                          Молодые мамы будут рады обширному ассортименту детских моделей.
                        </ListGroup.Item>
                    </ListGroup>
                    <p> Если вы ищете место, где представлены обувные новинки от самых известных брендов, то вы зашли по верному адресу. </p>
                    <p>
                      У нас представлены модели для мужчин, женщин, а также детские сапоги, босоножки, ботинки и туфли. 
                      Сделав заказ в нашем интернет-магазине, вы сможете быть модным и стильным как осенью-зимой, так и весной-летом. 
                      Просто наберите номер нашего телефона, и мы поможем вам определиться с покупкой. 
                    </p>
                </section>
              </Col>
            </Row>
        </Container>
        <Footer/>
        </>
    )
}

export default About;