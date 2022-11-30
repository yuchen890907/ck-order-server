import { MenuPage, ShoppingCartPage, CheckoutPage, ConfirmPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import MenuNav from "./components/MenuNav";
import "./css/orderStyle.css";
import { Container } from "react-bootstrap";
import { useStateContext } from "./context/ContextProvider";
import logoH from "./img/logo/logo_vertical.svg";

function App() {
  const { auth } = useStateContext();
  return auth ? (
    <>
      <MenuNav />
      <Container className="my-5">
        <Routes>
          <Route path="/ShoppingCart" element={<ShoppingCartPage />} />
          <Route path="/Checkout" element={<CheckoutPage />} />
          <Route path="/Confirm/:saleInvoice" element={<ConfirmPage />} />
          <Route path="/*" element={<MenuPage />} />
        </Routes>
      </Container>
    </>
  ) : (
    <div className="loading-page d-flex justify-content-center algin-items-center">
      <Container>
        <h1>系統載入中...</h1>
        <hr />
        <img src={logoH} alt="" />
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </Container>
    </div>
  );
}

export default App;
