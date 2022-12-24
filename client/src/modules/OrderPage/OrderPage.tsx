import React from 'react';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import { getOrder } from '../../api/ordersRequests';
import { useAuth } from '../../contexts/useAuth';
import OrderTable from './OrderTable';
import { useHeaderImage } from '../RestaurantPage/helpers';
import * as P from './parts';
import AddressTable from './AddressTable';
import { Loader } from 'semantic-ui-react';

const OrderPage = () => {
   const { orderId } = useParams();
   const { token } = useAuth();

   // prettier-ignore
   const { data: order, isLoading } = useQuery(['order', token], () => getOrder(orderId!, token));
   const headerImageSrc = useHeaderImage(order?.restaurantId || '');

   if (isLoading || order === undefined) {
      return <Loader />;
   }

   if (order === null) {
      return <Navigate to='/' />;
   }

   return (
      <P.OrderPageWrapper>
         <P.HeaderImageContainer>
            <img src={headerImageSrc} alt={order.restaurantId} />
         </P.HeaderImageContainer>
         <P.OrderContentContainer>
            <P.RestaurantName>Twoje zamówienie z {order.restaurantName}</P.RestaurantName>

            <OrderTable
               basket={order?.basket!}
               basketValue={order?.priceInfo.basketValue!}
               deliveryPrice={order?.priceInfo.deliveryPrice!}
               orderTotalValue={order?.priceInfo.orderTotalValue!}
            />

            <AddressTable
               streetAndNr={order?.address.streetAndNr!}
               city={order?.address.city!}
               postalCode={order?.address.postalCode!}
               phoneNr={order?.address.phoneNr!}
            />
         </P.OrderContentContainer>
      </P.OrderPageWrapper>
   );
};

export default OrderPage;
