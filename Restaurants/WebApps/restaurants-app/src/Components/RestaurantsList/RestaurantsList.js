import { useState, useEffect } from "react"
import RestaurantsListItem from "../RestaurantsListItem/RestaurantsListItem"
import { getAllRestaurants, getRestaurantsByName } from "./../../api/Service"


const RestaurantList = ({searchText}) => {

	/*
	const restaurants = [
		{
			"name": "Restoran1",
			"address": "Adresa 11"
		},
		{
			"name": "Restoran2",
			"address": "Adresa 22"
		},
		{
			"name": "Restoran3",
			"address": "Adresa 33"
		}
	]
	*/

	const [restaurants, setRestaurants] = useState([])
	useEffect(() => {
		if (searchText === "") {
			getAllRestaurants().then((res) => setRestaurants(res.data));
		}
		else {
			getRestaurantsByName(searchText).then((res) => setRestaurants(res.data));
		}

	}, [searchText]);

	return (
		<>
			{
				restaurants.map((restaurant) => {
					return (
						<RestaurantsListItem restaurantInfo={restaurant} menu={restaurant.menu}></RestaurantsListItem>
					)
				})

			}
		</>
	)

	}

export default RestaurantList;