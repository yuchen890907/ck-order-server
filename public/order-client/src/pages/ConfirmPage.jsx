import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Placeholder, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import fetchService from "../service/fetch.service";

function ConfirmPage() {
  const { saleInvoice } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    fetchService
      .findAll(`orders/${saleInvoice}`)
      .then((res) => {
        if (res.data.success) setOrder({ ...res.data.data, success: true });
        else setOrder({});
      })
      .catch((err) => {
        console.log(err);
        setOrder({});
      });
  }, []);
  return (
    <div>
      {order ? (
        order.success ? (
          <Card className="confirm-page p-2">
            <Card.Header>訂單編號：{saleInvoice}</Card.Header>
            <Card.Body>
              <Card.Title>訂購資訊</Card.Title>
              <Card.Text>
                訂購日期：<span>{order.saleDateTime} {order.orderTime}</span>
              </Card.Text>
              <Card.Text>
                訂單狀態：<span className="order-status">{order.status}</span>
              </Card.Text>
              <Card.Text>
                訂購人：<span>{order.orderInfo.name}</span>
              </Card.Text>
              <Card.Text>
                聯絡電話：<span>{order.orderInfo.phoneNumber}</span>
              </Card.Text>
              <Card.Text>
                人數：<span>{order.orderInfo.count}</span>
              </Card.Text>
              <Card.Text>
                內用/外帶：<span>{order.orderInfo.forHere}</span>
              </Card.Text>
              <Card.Text>
                總金額：<span className="order-total">{order.total}</span>
              </Card.Text>
              <hr />
              <Card.Title>訂單明細</Card.Title>
              <Row>
                <Col xs={1}></Col>
                <Col xs={4} className="order-item">
                  餐點
                  <hr />
                </Col>
                <Col xs={6} className="order-item">
                  備註
                  <hr />
                </Col>
              </Row>
              {order.cartList.map((item, i) => {
                return (
                  <Row key={`list-${i}`} className="mb-2">
                    <Col xs={1} className="order-item-num">
                      <Card.Text>{i + 1}</Card.Text>
                    </Col>
                    <Col xs={4} className="order-item-name">
                      <Card.Text>{item.product.productName}</Card.Text>
                    </Col>
                    <Col xs={6} className="order-item-custom">
                      <Card.Text>{item.custom}</Card.Text>
                    </Col>
                  </Row>
                );
              })}
            </Card.Body>
          </Card>
        ) : (
          "查無訂單"
        )
      ) : (
        <LoadingHolder />
      )}
    </div>
  );
  function LoadingHolder() {
    <Card className="p-4">
      <Card.Header>訂單載入中..</Card.Header>
      <Card.Body>
        <Placeholder xs={8} />
        <br />
        <Placeholder xs={8} />
        <br />
        <Placeholder xs={6} />
      </Card.Body>
    </Card>;
  }
}

export default ConfirmPage;
