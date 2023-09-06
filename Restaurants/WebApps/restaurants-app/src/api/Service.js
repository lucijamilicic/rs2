import axios from "axios";

const BASKET = "http://localhost:8001";
const RECIPE = "http://localhost:5009";
const RESTAURANT = "http://localhost:5183";
const USER = "http://localhost:4000";
const ORDERING = "http://localhost:5005";


export const getCategories = async () => {
    return await axios.get(`${RECIPE}/api/v1/Recipes/GetAllCategories`);
};

export const getRecipes = async () => {
  return await axios.get(`${RECIPE}/api/v1/Recipes`);
};

export const getRecipesById = async (id) => {
  return await axios.get(`${RECIPE}/api/v1/Recipes/GetRecipeById/${id}`);
};

export const getRecipesByCategory = async (category) => {
    return await axios.get(`${RECIPE}/api/v1/Recipes/GetRecipesByCategory/${category}`);
};

export const getRecipesByName = async (name) => {
    return await axios.get(`${RECIPE}/api/v1/Recipes/GetRecipesByName/${name}`);
};

export const addNewRecipe = async (body) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.post(`${RECIPE}/api/v1/Recipes`, body, {
        headers
    });
};

export const getRestaurantsByName = async (name) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.get(`${RESTAURANT}/api/v1/Restaurants/${name}`, {
        headers
    });
};

export const getAllRestaurants = async () => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.get(`${RESTAURANT}/api/v1/Restaurants`, {
        headers
    });
};

export const createRestaurants = async (body) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.post(`${RESTAURANT}/api/v1/Restaurants`, body, {
        headers
    });
};

export const deleteRestaurantById = async (id) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.delete(`${RESTAURANT}/api/v1/Restaurants/${id}`, {
        headers
    });
};

export const updateRestaurantById = async (body) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.put(`${RESTAURANT}/api/v1/Restaurants`, body, {
        headers
    });
};

export const addToMenu = async (restaurantId, body) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.post(
    `${RESTAURANT}/api/v1/Restaurants/menu/${restaurantId}`,
        body, {
        headers
    }
  );
};

export const deleteFromMenu = async (restaurantId, mealId) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.delete(
        `${RESTAURANT}/api/v1/Restaurants/menu/${restaurantId}/${mealId}`, {
        headers
    }
  );
};

export const updateMealInMenu = async (restaurantId, body) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.put(
    `${RESTAURANT}/api/v1/Restaurants/menu/${restaurantId}`,
        body, {
        headers
    }
  );
};

export const getBasket = async (username) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.get(`${BASKET}/api/v1/BasketControllers/${username}`, {
        headers
    });
};

export const updateBasket = async (body) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.put(`${BASKET}/api/v1/BasketControllers`, body, {
        headers
    });
};

export const checkout = async (body) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.post(`${BASKET}/api/v1/BasketControllers/Checkout`, body, {
        headers
    }).then(async () => {
        await axios.get(`${ORDERING}/api/v1/FoodOrdering/checkout/${body.buyerUsername}`, {
            headers
        })
    });
};

export const deleteBasket = async (username) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.delete(`${BASKET}/api/v1/BasketControllers/${username}`, {
        headers
    });
};

export const deleteBasketItem = async (username) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.delete(`${BASKET}/orderItem`, {
        headers
    });
};

export const registerUser = async (body) => {
    return await axios.post(`${USER}/api/v1/Authentication/RegisterBuyer`, body);
};

export const loginUser = async (body) => {
    return await axios.post(`${USER}/api/v1/Authentication/Login`, body);
};

export const refreshToken = async (body) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.post(`${USER}/api/v1/Authentication/Refresh`, body, {
        headers
    });
};

export const logout = async (body) => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    return await axios.post(`${USER}/api/v1/Authentication/Logout`, body, {
        headers
    });
};
