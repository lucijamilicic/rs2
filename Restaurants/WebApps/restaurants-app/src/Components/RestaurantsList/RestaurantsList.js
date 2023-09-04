import { useState, useEffect } from "react"
import RestaurantsListItem from "../RestaurantsListItem/RestaurantsListItem"
import { getAllRestaurants, getRestaurantsByName } from "./../../api/Service"
import { createRestaurants, deleteRestaurantById, updateRestaurantById } from "../../api/Service"


const RestaurantList = ({searchedRestaurant}) => {

	const [restaurants, setRestaurants] = useState([])
	useEffect(() => {
		if (searchedRestaurant === "") {
			getAllRestaurants().then((res) => setRestaurants(res.data));
		}
		else {
			getRestaurantsByName(searchedRestaurant).then((res) => setRestaurants(res.data));
		}

	}, [searchedRestaurant]);

	return (
		<div className="restaurant-list">
			{
				restaurants.map((restaurant) => {
					return (
						<RestaurantsListItem restaurantInfo={restaurant} menu={restaurant.menu}></RestaurantsListItem>
					)
				})

			}
		</div>
	)

	}

export default RestaurantList;