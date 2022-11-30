import React from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Button,
  ListGroup,
  FormControl,
  Form,
  Card,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import fetchService from "../service/fetch.service";

export default function CheckoutPage(props) {
  const navigate = useNavigate();
  const { cart, setCart } = useStateContext();
  const emptyOrderInfo = {
    forHere: "",
    count: 1,
    payment: "",
    name: "",
    phoneNumber: "",
  };
  const [orderInfo, setOrderInfo] = useState(emptyOrderInfo);
  const [message, setMessage] = useState("");
  function HandleSubmit(e) {
    e.preventDefault();
    fetchService
      .insertOne("orders", {
        order: { cartList: cart, orderInfo },
      })
      .then((res) => {
        setOrderInfo(emptyOrderInfo);
        setMessage("");
        setCart([]);
        navigate(`/Confirm/${res.data.data.saleInvoice}`);
      })
      .catch((err) =>
        console.log("err", setMessage(err.response.data.message))
      );
  }
  const forHereChangeHandler = (content) => {
    setOrderInfo((pre) => {
      return { ...pre, forHere: content };
    });
  };
  const paymentChangeHandler = (content) => {
    setOrderInfo((pre) => {
      return { ...pre, payment: content };
    });
  };
  return (
    <div className="checkout-page">
      <Alert show={message.length > 0}>{message}</Alert>
      <Card className="cart-info">
        <Card.Body>
          <Card.Header as="h5" className="text-center">
            餐點資訊
          </Card.Header>
          <Row>
            {cart.map((cartItem, index) => (
              <ListGroup.Item key={`check-${index}`}>
                <Row className="cart-item">
                  <Col xs={3}>
                    <span>{cartItem.product.productName}</span>
                  </Col>
                  <Col xs={2}>價格 : ${cartItem.product.price}</Col>
                  <Col xs={2}>數量 : {cartItem.product.quantity}</Col>
                  <Col xs={5}>備註 : {cartItem.custom}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </Row>
          <Row className="text-end">
            <span className="total-price">
              總金額: $
              {cart.reduce(
                (pre, item) => pre + item.product.price * item.product.quantity,
                0
              )}
            </span>
          </Row>
        </Card.Body>
      </Card>
      <Card className="take-away">
        <Card.Body>
          <Card.Header as="h5" className="text-center">
            用餐方式
          </Card.Header>
          <Form>
            <Form.Group>
              <Form.Check
                inline
                type="radio"
                name="forHere"
                label="內用"
                onChange={() => forHereChangeHandler("內用")}
              />
              <Form.Check
                inline
                type="radio"
                name="forHere"
                label="外帶"
                onChange={() => forHereChangeHandler("外帶")}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <Card className="payment">
        <Card.Body>
          <Card.Header as="h5" className="text-center">
            付款方式
          </Card.Header>
          <Form>
            <Form.Group>
              <Form.Check
                inline
                type="radio"
                name="forHere"
                label="現金"
                onChange={() => paymentChangeHandler("現金")}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <Card className="guest-info">
        <Card.Body>
          <Card.Header as="h5" className="mr-5 text-center">
            訂購人資訊
          </Card.Header>
          <InputGroup>
            <InputGroup.Text>姓名</InputGroup.Text>
            <FormControl
              placeholder="ex:王小美"
              value={orderInfo.name}
              onChange={(e) =>
                setOrderInfo((pre) => {
                  return { ...pre, name: e.target.value };
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>電話</InputGroup.Text>
            <FormControl
              placeholder="ex:0912345678"
              value={orderInfo.phoneNumber}
              maxLength="10"
              onChange={(e) =>
                setOrderInfo((pre) => {
                  return { ...pre, phoneNumber: e.target.value };
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>用餐人數</InputGroup.Text>
            <FormControl
              value={orderInfo.count}
              type="number"
              min={1}
              step={1}
              max={99}
              onChange={(e) => {
                if (
                  Math.floor(e.target.value) > 0 &&
                  Math.floor(e.target.value) < 100
                )
                  setOrderInfo((pre) => {
                    return { ...pre, count: Math.floor(e.target.value) };
                  });
              }}
            />
          </InputGroup>
        </Card.Body>
      </Card>
      {/*菜單type3*/}
      {/* <Card className="mb-2">
				<Card.Body>
					<Card.Header as="h5" className="mr-5 text-center">
						取餐時間
					</Card.Header>
					<FormControl type="date" />
				</Card.Body>
			</Card> */}
      <div className="btn-checkout-submit">
        <Button href="/menu" onClick={HandleSubmit}>
          送出訂單
        </Button>
      </div>
    </div>
  );
}
