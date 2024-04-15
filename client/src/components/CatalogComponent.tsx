import { Container, Row, Col, Nav, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link,NavLink, useSearchParams, useLocation} from "react-router-dom";
import axios from "axios";
import CatalogItemProps from "./CatalogItemProps";
import CatalogItems from "./CatalogItems";

type CatalogProps = {
  children?: React.ReactNode;
  showSearchField?: boolean;
};

const CatalogComponent = ({
  children = [],
  showSearchField = true,
}: CatalogProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const q = searchParams.get("q");
  const selectedCategory = searchParams.get("categoryId");
  const offset = searchParams.get("offset");

  const basicFetchElementsUrl = "http://localhost:3000/api/items";
  const [items, setItems] = useState<CatalogItemProps[]>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [loadMoreBtnHidden, setLoadMoreBtnHidden] = useState<boolean>(true);

  const fetchData = () => {
    let url = new URL(basicFetchElementsUrl);
    if (q) url.searchParams.append("q", q);
    if (selectedCategory)
      url.searchParams.append("categoryId", selectedCategory.toString());
    if (offset) url.searchParams.append("offset", offset);

    setLoading(true);
    axios
      .get(decodeURI(url.toString()))
      .then((res) => res.data)
      .then((data) => {
        offset ? setItems(items?.concat(data)) : setItems(data);
        setLoading(false);
        setLoadMoreBtnHidden(data.length < 6);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  useEffect(fetchData, [q, selectedCategory, offset]);

  const [categories, setCategories] =
    useState<{ id: number; title: string }[]>();

  const fetchCategories = () => {
    axios
      .get("http://localhost:3000/api/categories")
      .then((res) => res.data)
      .then((data) => setCategories(data));
  };

  useEffect(fetchCategories, []);

  return (
    <Container>
      <Row>
        <Col>
          {children}
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {showSearchField && (
              <Form className="catalog-search-form form-inline">
                <Form.Control
                  placeholder="Поиск"
                  defaultValue={q || ""}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                      searchParams.set("q", e.target.value);
                      setSearchParams(searchParams);
                    }
                  }}
                ></Form.Control>
              </Form>
            )}
            <Nav className="catalog-categories justify-content-center">
              <Nav.Link 
              onClick={(e) => {
                e.preventDefault();
                searchParams.delete("offset");
                searchParams.delete("categoryId");
                setSearchParams(searchParams);
              }}
              className={(selectedCategory == null) ? "active" : ""}>
                Все
              </Nav.Link>
              {categories?.map((category) => (
                <Nav.Link
                  onClick={(e) => {
                    e.preventDefault();
                    searchParams.delete("offset");
                    searchParams.set("categoryId", category.id.toString());
                    setSearchParams(searchParams);
                  }}
                  className={(selectedCategory == category.id.toString()) ? "active" : ""}
                >
                  {category.title}
                </Nav.Link>
              ))}
            </Nav>
            <CatalogItems
              items={items}
              isLoading={isLoading}
              error={error}
              loadMoreBtnHidden={loadMoreBtnHidden}
              handleClick={() => {
                searchParams.set(
                  "offset",
                  offset ? (+offset + 6).toString() : "6"
                );
                setSearchParams(searchParams);
              }}
            />
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default CatalogComponent;
