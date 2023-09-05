import { useState, useEffect } from "react"
import RestaurantsListItem from "../RestaurantsListItem/RestaurantsListItem"
import { getAllRestaurants, getRecipes, getRestaurantsByName } from "./../../api/Service"
import { createRestaurants, deleteRestaurantById, updateRestaurantById } from "../../api/Service"
import { useNavigate } from 'react-router-dom'
import EditRestaurantModal from "../../modals/EditRestaurantModal";
import { getRole } from "../../common/helpers";


const RestaurantList = ({ searchedRestaurant }) => {

	const [restaurants, setRestaurants] = useState([])
	const [recipes, setRecipes] = useState([]);
	const [refreshFlag, setRefreshFlag] = useState(false);

	const [isAdmin, setIsAdmin] = useState(false);

	const [isAddRestaurantModalOpen, setIsAddRestaurantModalOpen] = useState(false);

	const navigate = useNavigate();
	const role = getRole();

	useEffect(() => {

		if (role === "Administrator") {
			setIsAdmin(true);
			const getAllRecipes = async () => {
				const recipes = await getRecipes();
				setRecipes(recipes.data.map((recipe) => ({ label: recipe.name, value: recipe.id })));
			}

			getAllRecipes();
		}

	}, []);

	const addCancelHandler = () => {
		setIsAddRestaurantModalOpen(false);
	};

	const addConfirmHandler = async (body) => {
		await createRestaurants(body);
		setIsAddRestaurantModalOpen(false);
		setRefreshFlag(true);
	};

	const addHandler = () => {
		setIsAddRestaurantModalOpen(true);
	};


	useEffect(() => {

		const getRestaurants = async () => {
			const restaurants = await getAllRestaurants();
			setRestaurants(restaurants.data);
		}

		const getRestaurantsByRName = async (name) => {
			const restaurants = await getRestaurantsByName(name);
			setRestaurants(restaurants.data);
		}

		if (searchedRestaurant === "" || refreshFlag) {
			getRestaurants();
		}
		else {
			getRestaurantsByRName(searchedRestaurant);
		}

	}, [searchedRestaurant, refreshFlag]);

	return (
		<>
			<div className="restaurant-list">
				{
					restaurants.map((restaurant) => {
						return (
							<RestaurantsListItem restaurantInfo={restaurant} menu={restaurant.menu} recipesOptions={recipes} setRefresh={setRefreshFlag} ></RestaurantsListItem>
						)
					})

				}
			</div>
			{ isAdmin && <buton className="add-recipe-button" onClick={addHandler}> Add new restaurant </buton>}
			<EditRestaurantModal isOpen={isAddRestaurantModalOpen} data={null} onCancel={addCancelHandler} onConfirm={addConfirmHandler} />
		</>
	)
}

export default RestaurantList;