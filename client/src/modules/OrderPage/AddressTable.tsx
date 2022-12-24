import React from 'react';
import { Table } from 'semantic-ui-react';
import { Address } from '../../api/apiModels';
import { formatPhoneNr } from './helpers';

type AddressTableProps = Address;

const AddressTable = ({ streetAndNr, city, postalCode, phoneNr }: AddressTableProps) => {
   return (
      <Table celled striped>
         <Table.Header>
            <Table.Row>
               <Table.HeaderCell colSpan='3'>
                  Zamówienie dostarczymy na adres
               </Table.HeaderCell>
            </Table.Row>
         </Table.Header>
         <Table.Body>
            <Table.Row>
               <Table.Cell>
                  Ulica i numer
               </Table.Cell>
               <Table.Cell>
                  {streetAndNr}
               </Table.Cell>
            </Table.Row>
            <Table.Row>
               <Table.Cell>
                  Miasto i kod pocztowy
               </Table.Cell>
               <Table.Cell>
                  {postalCode} {city}
               </Table.Cell>
            </Table.Row>
            <Table.Row>
               <Table.Cell>
                  Telefon kontaktowy
               </Table.Cell>
               <Table.Cell>
                  {formatPhoneNr(phoneNr)}
               </Table.Cell>
            </Table.Row>
         </Table.Body>
      </Table>
   );
};

export default AddressTable;
