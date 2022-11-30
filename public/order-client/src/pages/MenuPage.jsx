import React from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useStateContext } from "../context/ContextProvider";
import photo from "../img/menu/breakfast-1.jpg";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import { EffectCards, Pagination, Scrollbar } from "swiper";
// import "swiper/css/pagination";
// import "swiper/css/effect-cards";

export default function MenuPage() {
  const emptyModalState = { show: true, customized: {} };
  const { menuState, customizedState, pushToCart } = useStateContext();
  const [modalState, setModelState] = useState({});
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const closeHandler = () => {
    setModelState({});
  };
  return (
    <div className="menu-page p-4 pb-5 pt-6">
      <div className="menu-tab-nav">
        {menuState &&
          Object.values(menuState).map((productClass) => {
            var prod = "#" + productClass.classNo;
            return (
              <a key={productClass.classNo} href={prod}>
                {productClass.className}
              </a>
            );
          })}
      </div>
      <hr />
      <Swiper className="mySwiper">
        <div>
          {menuState &&
            Object.values(menuState).map((productClass) => {
              return (
                <>
                  <SwiperSlide
                    id={productClass.classNo}
                    key={productClass.classNo}
                  >
                    {productClass.className}
                    <Row>
                      {Object.values(productClass.products).map((product) => {
                        return (
                          <Col
                            key={product.productNo}
                            md={4}
                            className="col-12"
                          >
                            <br />
                            <a
                              className="menus d-flex align-items-center flex-md-row"
                              onClick={() => {
                                setModelState({
                                  ...emptyModalState,
                                  product: { ...product, quantity: 1 },
                                });
                              }}
                            >
                              <div className="product-img rounded-circle">
                                <img
                                  className="img-fluid"
                                  src={product.img || photo}
                                  alt="cook assistant"
                                />
                              </div>
                              <div className="text-wrap">
                                <Row className="align-items-start">
                                  <Col className="col-8 product-name">
                                    <p>{product.productName}</p>
                                  </Col>
                                  <Col className="col-4">
                                    <p className="text-muted product-price">
                                      ${product.unitPrice}
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </a>
                          </Col>
                        );
                      })}
                    </Row>
                    {/* </div> */}
                  </SwiperSlide>
                  {/* </Tab> */}
                </>
              );
            })}
        </div>
      </Swiper>

      <Modal show={Object.keys(modalState).length > 0} onHide={closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{modalState.product?.productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert show={message.length > 0} variant="danger">
            {message}
          </Alert>
          <Form className="modal-custom">
            {modalState.product?.items.map((item) => {
              return (
                <CustomizedGroup
                  key={item}
                  item={item}
                  type={customizedState[item].type}
                />
              );
            })}
          </Form>
          <InputGroup className="mb-3 modal-qty-update" variant="secondary">
            <Button
              className="cart-item-qty-minus"
              onClick={() => {
                setModelState((pre) => {
                  const state = JSON.parse(JSON.stringify(pre));
                  if (modalState.product.quantity - 1 > 99)
                    state.product.quantity = 99;
                  else if (modalState.product.quantity - 1 < 1)
                    state.product.quantity = 1;
                  else
                    state.product.quantity = Math.round(
                      modalState.product.quantity - 1
                    );
                  return state;
                });
              }}
            >
              -
            </Button>
            {modalState.product?.quantity !== undefined && (
              <Form.Control
                className="cart-item-qty-input"
                type="number"
                placeholder="數量"
                value={modalState.product?.quantity}
                min={1}
                max={99}
                step={1}
                onChange={(e) => {
                  setModelState((pre) => {
                    const state = JSON.parse(JSON.stringify(pre));
                    if (e.target.value > 99) state.product.quantity = 99;
                    else if (e.target.value < 1) state.product.quantity = 1;
                    else state.product.quantity = Math.round(e.target.value);
                    return state;
                  });
                }}
              />
            )}
            <Button
              className="cart-item-qty-increase"
              onClick={() => {
                setModelState((pre) => {
                  const state = JSON.parse(JSON.stringify(pre));
                  if (modalState.product.quantity + 1 > 99)
                    state.product.quantity = 99;
                  else if (modalState.product.quantity + 1 < 0)
                    state.product.quantity = 0;
                  else
                    state.product.quantity = Math.round(
                      modalState.product.quantity + 1
                    );
                  return state;
                });
              }}
            >
              +
            </Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="add-to-cart"
            onClick={() => {
              let price = modalState.product.unitPrice;
              Object.values(modalState.customized).forEach((item) => {
                item.contents.forEach((content) => {
                  price += content.price;
                });
              });
              pushToCart({
                product: { ...modalState.product, price },
                customized: modalState.customized,
              });
              setModelState({});
            }}
          >
            加入購物車
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
  function CustomizedGroup({ item: itemName, type }) {
    const radioClickHandler = (content) => {
      if (type === "radio") {
        setModelState((pre) => {
          const state = JSON.parse(JSON.stringify(pre));
          const item = state.customized[itemName] || {
            item: itemName,
            contents: [],
          };
          item.contents = [{ content: content.content, price: content.price }];
          state.customized[itemName] = item;
          return state;
        });
      }
    };
    const checkboxChangeHandler = (content) => {
      if (type === "checkbox") {
        setModelState((pre) => {
          const state = JSON.parse(JSON.stringify(pre));
          const item = state.customized[itemName] || {
            item: itemName,
            contents: [],
          };
          let pos = item.contents.findIndex(
            (c) => c.content === content.content
          );
          if (pos > -1) item.contents.splice(pos, 1);
          else
            item.contents.push({
              content: content.content,
              price: content.price,
            });
          state.customized[itemName] = item;
          return state;
        });
      }
    };
    return (
      <Form.Group className="mb-3">
        <Form.Label>{itemName}</Form.Label>
        {customizedState[itemName].contents.map((content) => {
          return (
            <div
              key={`${itemName}-${content.content}`}
              className="mb-3 custom-detail"
            >
              <Row>
                <Col xs={1}>
                  <Form.Check
                    name={itemName}
                    type={type}
                    // label={`${content.content} $${content.price}`}
                    checked={
                      modalState.customized?.[itemName]?.contents.findIndex(
                        (c) => c.content === content.content
                      ) > -1
                    }
                    onChange={() => checkboxChangeHandler(content)}
                    onClick={() => radioClickHandler(content)}
                  ></Form.Check>
                </Col>
                <Col xs={8}>
                  <span className="cutom-item">{content.content}</span>
                </Col>
                <Col xs={3}>
                  <span className="custom-price">+${content.price}</span>
                </Col>
              </Row>
            </div>
          );
        })}
      </Form.Group>
    );
  }
}
