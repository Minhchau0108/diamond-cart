import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import productOne from "../images/product1.gif";
import ReactJson from "react-json-view";
import { useSelector, useDispatch } from "react-redux";
import cartActions from "../redux/actions/cart.actions";

const RootComponent = (props) => {
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        RootComponent {`({`}
        <span className="text-warning">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <ProductPage />
          </Col>
          <Col>
            <CartPage />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const ProductPage = (props) => {
  const products = useSelector(state => state.product)
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        Product Page {`({`}
        <span className="text-warning">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <Row>
         {products.map(p => (
             <Col>
                    <Product product = {p} key={p.id}/>
             </Col>
         ))}
        </Row>
      </Container>
    </div>
  );
};

const CartPage = (props) => {
  const totalPrice = useSelector(state => state.cart.totalPrice)
  const products = useSelector(state => state.cart.products)
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        Cart Page {`({`}
        <span className="text-warning">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <Row>
            {products.map(p=>(
                <Col>
                    <CartProduct product={p}/>
                </Col>
            ))}

        </Row>
        <Row>
          <Col>
            <br />
            <h4>Total Price: 💵 {totalPrice}</h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Product = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        {props.product.title} {`({`}
        <span className="text-warning">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <img src={productOne} alt="Product One" width="100%" />
            <h5 className="text-success">💵 {props.product.price}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" size="sm" style={{ width: "5rem" }}
            onClick={()=>{
                dispatch(cartActions.addProduct(props.product));
              }}>
              Add
            </Button>
          </Col>
          <Col>
            <Button variant="danger" size="sm" style={{ width: "5rem" }}
             onClick={()=>{
                dispatch(cartActions.removeProduct(props.product));
              }}>
              Remove
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};



const CartProduct = (props) => {
  return (
    <div className="box text-center">
      <h4 className="box-title p-2">
        CartProduct 1 {`({`}
        <span className="text-warning">{Object.keys(props).join(", ")}</span>
        {`})`}
      </h4>
      <Container fluid>
        <h4>Quantity: {props.product.qty}</h4>
        <h4>Price: 💵 {props.product.price}</h4>
      </Container>
    </div>
  );
};



const Store = (props) => {
  const products = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);

  return (
    <div className="box text-center">
      <h4 className="box-title p-2">Store</h4>
      <p className="text-left">
        <ReactJson
          name="store"
          src={{products, cart}}
          theme="monokai"
          displayDataTypes={false}
          displayObjectSize={false}
        />
      </p>
    </div>
  );
};

const ReduxExercise = () => {
  return (
    <Container fluid>
      <br />
      <h5>How to add products to the cart using Redux?</h5>
      <br />
      <Row>
        <Col md={3}>
          <Store />
        </Col>
        <Col md={9}>
          <RootComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default ReduxExercise;
