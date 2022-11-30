import React from "react";
import logo from "../img/logo/logo.png";
import logoH from "../img/logo/logo_horizon.svg";
import { Link } from "react-router-dom";
import photo from "../img/menu/breakfast-1.jpg";
import { FaShoppingCart, FaUtensils } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Badge, Container, Dropdown, Button, Navbar, Row, Col } from "react-bootstrap";
import { useStateContext } from "../context/ContextProvider";

export default function MenuNav() {
	const { cart, dropFromCart } = useStateContext();
	return (
		<Navbar className="menu-navbar" fixed="top">
			{/*className="nav-bg-color justify-content-center"> */}
			<Container>
				<Navbar.Collapse className="justify-content-center">
					{/* 手機端顯示的logo */}
					<Navbar.Brand className="d-flex  only-mobile">
						<Link to="/">
							<img src={logo} alt="logo" />
						</Link>
					</Navbar.Brand>
					{/* 平板電腦端顯示的logo */}
					<Navbar.Brand className="d-flex  mx-auto only-desktop ">
						<Link to="/">
							<img src={logoH} alt="logo" />
						</Link>
					</Navbar.Brand>
					{/* 回菜單介面 */}
					<Link to="/">
						<Button className="nav-btn-menu">
							<FaUtensils className="nav-menu-icon" />
						</Button>
					</Link>
					{/* 購物車 */}
					<Dropdown drop="start" className="nav-btn-cart">
						<Dropdown.Toggle>
							<FaShoppingCart className="nav-cart-icon" />
							<Badge className="nav-cart-num rounded-circle" bg="#cacc9b">
								{cart.length}
							</Badge>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{cart.length > 0 ? (
								<>
									<div className="go-cart">
										<Link to="/ShoppingCart">
											<Button variant="success">前往購物車</Button>
										</Link>
									</div>
									{cart.map((cartItem, index) => {
										return (
											<Row className="cart-item" key={`cartList-${index}`}>
												<Col xs="2" className="cart-item-img col-md-3">
													<img
														className="img-fluid"
														src={cartItem.product.img || photo}
														alt={cartItem.product.productName}
													/>
												</Col>
												<Col xs="6">
													<div className="cart-item-detail col-md-6">
														<p className="cart-detail-name">{cartItem.product.productName}</p>
														<p className="cart-detail-unitprice">
															${cartItem.product.unitPrice}
														</p>
														{Object.values(cartItem.customized).map((item) => {
															return item.contents.map((content, i) => {
																return (
																	<p key={`${i}`}>
																		{content.content}
																		+${content.price}
																	</p>
																);
															});
														})}
														<p className="cart-detail-qty">數量:{cartItem.product.quantity}</p>
													</div>
												</Col>

												<Col xs="4" className="cart-item-delete col-md-3">
													<span>單價:{cartItem.product.price}</span>
													<AiFillDelete
														className="cart-item-delete-icon"
														style={{ cursor: "pointer" }}
														onClick={() => dropFromCart(index)}
													/>
												</Col>
											</Row>
										);
									})}
									{/* <div className="go-cart">
                    <Link to="/ShoppingCart">
                      <Button variant="success">前往購物車</Button>
                    </Link>
                  </div> */}
								</>
							) : (
								<span style={{ padding: 10, backgroundColor: "#e6e6e6" }}>購物車是空的啦!別看了快點餐</span>
							)}
						</Dropdown.Menu>
					</Dropdown>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
