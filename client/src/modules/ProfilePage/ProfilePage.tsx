import React from 'react';
import { useQuery } from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import { Icon, Loader, Statistic, Table } from 'semantic-ui-react';
import { getBasicData } from '../../api/authRequests';
import { useAuth } from '../../contexts/useAuth';
import { formatPhoneNr } from '../OrderPage/helpers';
import * as P from './parts';

const ProfilePage = () => {
	const { isLoggedIn, token } = useAuth();
	const { data: profileData, isLoading } = useQuery(['profileData', token], () =>
		getBasicData(token)
	);

	if (isLoading) {
		return <Loader />;
	}

	if (!isLoggedIn) {
		return <Navigate to='/' />;
	}

	return (
		<P.ProfilePageWrapper>
			<P.HeaderContainer>
				<Icon name='user' size='huge' />
				<h1>Twoje konto - {profileData?.email}</h1>
			</P.HeaderContainer>

			<P.StatisticsContainer>
				<Statistic
					value={profileData?.accountAgeInDays}
					label='Tyle dni jesteś już z nami'
				/>
				<Statistic>
					<Statistic.Value>{profileData?.ordersCount}</Statistic.Value>
					<Statistic.Label>
						Tyle <Link to='/zamowienia'>zamówień</Link> zrealizowałeś
					</Statistic.Label>
				</Statistic>

				{profileData?.ordersCount! > 0 && (
					<Statistic
						value={profileData?.lastOrderRestaurantName}
						label='Z tej restauracji ostatnio zamawiałeś'
					/>
				)}
			</P.StatisticsContainer>

			{profileData?.address && (
				<Table celled stackable striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell colSpan={2}>
								Twój ostatni adres dostawy
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Ulica i numer</Table.Cell>
							<Table.Cell>{profileData?.address?.streetAndNr}</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Miasto i kod pocztowy</Table.Cell>
							<Table.Cell>
								{profileData?.address?.postalCode} {profileData?.address?.city}
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Numer telefonu</Table.Cell>
							<Table.Cell>
								{formatPhoneNr(profileData?.address?.phoneNr || '')}
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			)}
		</P.ProfilePageWrapper>
	);
};

export default ProfilePage;
