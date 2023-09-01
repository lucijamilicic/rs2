import RestaurantsListItem from "../RestaurantsListItem/RestaurantsListItem"


const RestaurantList = () => {

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

	return (
		<>
			{
				restaurants.map((restaurant) => {
					return (
						<RestaurantsListItem restaurantInfo={restaurant}></RestaurantsListItem>
					)
				})

			}
		</>
	)

	}

export default RestaurantList;