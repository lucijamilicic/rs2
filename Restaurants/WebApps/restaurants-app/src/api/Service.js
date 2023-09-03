import axios from "axios";

const BASKET = "http://localhost:8001";
const RECIPE = "http://localhost:5009";
const RESTAURANT = "http://localhost:5183";
const USER = "http://localhost:4000";

export const getRecipes = async () => {
  return await axios.get(`${RECIPE}/api/v1/Recipes`);
};

export const getRecipesById = (id) => {
  return axios.get(`${RECIPE}/api/v1/Recipes/GetRecipesById/${id}`);
};

export const getRecipesByCategory = (category) => {
  return axios.get(`${RECIPE}/api/v1/Recipes/GetRecipesByCategory/${category}`);
};

export const GetRecipesByName = (name) => {
  return axios.get(`${RECIPE}/api/v1/Recipes/GetRecipesByName/${name}`);
};

export const getRestaurants = (name) => {
  return axios.get(`${RESTAURANT}/api/v1/Restaurants/${name}`);
};

export const createRestaurants = (body) => {
  return axios.post(`${RESTAURANT}/api/v1/Restaurants`, body);
};

export const deleteRestaurantById = (id) => {
  return axios.delete(`${RESTAURANT}/api/v1/Restaurants/${id}`);
};

export const updateRestaurantById = (body) => {
  return axios.put(`${RESTAURANT}/api/v1/Restaurants`, body);
};

export const addToMenu = (restaurantId, body) => {
  return axios.post(
    `${RESTAURANT}/api/v1/Restaurants/menu/${restaurantId}`,
    body
  );
};

export const deleteFromMenu = (restaurantId, mealId) => {
  return axios.delete(
    `${RESTAURANT}/api/v1/Restaurants/menu/${restaurantId}/${mealId}`
  );
};

export const updateMealInMenu = (restaurantId, body) => {
  return axios.put(
    `${RESTAURANT}/api/v1/Restaurants/menu/${restaurantId}`,
    body
  );
};

export const getBasket = (username) => {
  return axios.get(`${BASKET}/api/v1/Basket/${username}`);
};

export const updateBasket = (body) => {
  return axios.put(`${BASKET}/api/v1/Basket`, body);
};

export const checkout = (body) => {
  return axios.post(`${BASKET}/api/v1/Basket/Checkout`, body);
};

export const deleteBasket = (username) => {
  return axios.delete(`${BASKET}/api/v1/Basket/${username}`);
};

export const registerUser = (body) => {
  return axios.post(`${USER}/api/v1/Authentication/RegisterBuyer`, body);
};

export const loginUser = (body) => {
  return axios.post(`${USER}/api/v1/Authentication/Login`, body);
};

export const refreshToken = (body) => {
  return axios.post(`${USER}/api/v1/Authentication/Refresh`, body);
};

export const logout = (body, token) => {
    const headers = {Authorization: `Bearer ${token}`}
    return axios.post(`${USER}/api/v1/Authentication/Logout`, body, {
        headers
    });
};
