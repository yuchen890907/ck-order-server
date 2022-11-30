import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import photo from "../img/menu/breakfast-1.jpg";
import { useNavigate } from "react-router-dom";

const ShoppingCartPage = (props) => {
	const { cart, dropFromCart, shiftCartItemAmount } = useStateContext();
	const navigate = useNavigate();

	return (
		<div>
			<div className="shoppingcart-page">
				<div className="cart-nav">
					<Row>
						<Col xs={2}></Col>
						<Col xs={2}>名稱</Col>
						<Col xs={2}>單價</Col>
						<Col xs={3}></Col>
						<Col xs={2}>數量</Col>
						<Col xs={1}></Col>
					</Row>
				</div>
				<div className="product-container">
					<ListGroup>
						{cart.map((cartItem, index) => (
							<ListGroup.Item className="purchase-item" key={`ShoppingCartList-${index}`}>
								<Row>
									<Col xs={2}>
										<Image src={cartItem.product.img || photo} alt={cartItem.product.productName} />
									</Col>
									<Col xs={2} className="purchase-item-name">
										<p>{cartItem.product.productName}</p>
									</Col>
									<Col xs={2} className="purchase-item-price">
										<p>${cartItem.product.price}</p>
										{/* <p>總價 : ${cartItem.product.price}</p> */}
									</Col>
									<Col xs={3} className="purchase-item-qty-update">
										<Button
											className="col-1 btn-qty-increase"
											onClick={() => shiftCartItemAmount(index, 1)}>
											+
										</Button>
										<Button
											className="col-1 btn-qty-minus"
											onClick={() => shiftCartItemAmount(index, -1)}>
											-
										</Button>
									</Col>
									<Col xs={2} className="purchase-item-qty">
										<p>{cartItem.product.quantity}</p>
									</Col>
									<Col xs={1} className="purchase-item-delete">
										<Button
											type="button"
											onClick={() => {
												dropFromCart(index);
											}}>
											<AiFillDelete />
										</Button>
									</Col>
									<hr />
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
				{/* <div className="cart-footer">
          <Row>
            <Col xs={6} className="cart-footer-left">
              <h6>總共 {cart.length} 項</h6>
              <span>
                總金額 : $
                {cart.reduce(
                  (pre, item) =>
                    pre + item.product.price * item.product.quantity,
                  0
                )}
              </span>
            </Col>
            <Col xs={6} className="cart-footer-right">
              <Col className="text-center mx-auto mt-2">
                <Button
                  size="md"
                  variant="outline-primary"
                  disabled={cart.length === 0}
                  onClick={() => {
                    navigate("/Checkout");
                  }}
                >
                  前往結帳
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </div> */}
			</div>
			<div className="cart-footer">
				<Row>
					<Col xs={6} className="cart-footer-left">
						<h6>總共 {cart.length} 項</h6>
						<span>
							總金額 : ${cart.reduce((pre, item) => pre + item.product.price * item.product.quantity, 0)}
						</span>
					</Col>
					<Col xs={6} className="cart-footer-right">
						<Col>
							<Button
								size="md"
								variant="outline-primary"
								disabled={cart.length === 0}
								onClick={() => {
									navigate("/Checkout");
								}}>
								前往結帳
							</Button>
						</Col>
					</Col>
				</Row>
			</div>
		</div>
	);
};
export default ShoppingCartPage;
