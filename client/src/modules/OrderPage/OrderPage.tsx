import React from 'react'
import { useParams } from 'react-router-dom';

const OrderPage = () => {
    const { orderId } = useParams();

  return (
    <div>Strona zamówienia o id {orderId}</div>
  )
}

export default OrderPage;