import { useState, useEffect } from "react"
import RestaurantsListItem from "../RestaurantsListItem/RestaurantsListItem"
import { getAllRestaurants, getRecipes, getRestaurantsByName } from "./../../api/Service"
import { createRestaurants, deleteRestaurantById, updateRestaurantById } from "../../api/Service"
import EditRestaurantModal from "../../modals/EditRestaurantModal";
import { getRole } from "../../common/helpers";
import { PulseLoader } from 'react-spinners';
import AddToMenuModal from "../../modals/AddToMenuModal"


const RestaurantList = ({ searchedRestaurant }) => {

	const [restaurants, setRestaurants] = useState([])
	const [recipes, setRecipes] = useState([]);
	const [refreshFlag, setRefreshFlag] = useState(false);
	const [showLoader, setShowLoader] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAddRestaurantModalOpen, setIsAddRestaurantModalOpen] = useState(false);

	const role = getRole();

	useEffect(() => {

		if (role === "Administrator") {
			setIsAdmin(true);
			const getAllRecipes = async () => {
				await getRecipes().then((recipes) => {
					setRecipes(recipes.data.map((recipe) => ({ label: recipe.name, value: recipe.id })));
				}).catch((e) => { console.log(e) });
			}

			getAllRecipes();
		}

	}, []);

	const addCancelHandler = () => {
		setIsAddRestaurantModalOpen(false);
	};

	const addConfirmHandler = async (body) => {
		await createRestaurants(body).catch((e) => { console.log(e) });
		setIsAddRestaurantModalOpen(false);
		setRefreshFlag(true);
	};

	const addHandler = () => {
		setIsAddRestaurantModalOpen(true);
	};


	useEffect(() => {

		const getRestaurants = async () => {
			setShowLoader(true);
			await getAllRestaurants().then(response => {
				setShowLoader(false);
				setRestaurants(response.data);
			}).catch((e) => { console.log(e) });
		}

		const getRestaurantsByRName = async (name) => {
			setShowLoader(true);
			await getRestaurantsByName(name).then(response => {
				setShowLoader(false);
				setRestaurants(response.data);
			}).catch((e) => { console.log(e) });
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
			{
				showLoader ? (
					<div className="page-loader-overlay">
						<PulseLoader className="loader" />
					</div>
				) : (
					<>
						{
							restaurants?.length === 0 ? (
								<div className="message-wrap">There are no results for this search.</div>
							) : (
								<div className="restaurant-list">
									{
										restaurants?.map((restaurant) => {
											return (
												<RestaurantsListItem restaurantInfo={restaurant} menu={restaurant.menu} recipesOptions={recipes} setRefresh={setRefreshFlag} ></RestaurantsListItem>
											)
										})

									}
								</div>
							)
						}
					</>
				)}
			{isAdmin && <button className="add-recipe-button" onClick={addHandler}> Add new restaurant </button>}
			<EditRestaurantModal isOpen={isAddRestaurantModalOpen} data={null} onCancel={addCancelHandler} onConfirm={addConfirmHandler} />
		</>
	)
}

export default RestaurantList;