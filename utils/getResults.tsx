// mealService.js
import axios from "axios";

const searchres = async (q) => {
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
    const result = { "meals": [] };
    if (response.data.meals !== null) {
      response.data.meals.forEach(element => {
        result.meals.push({ "idMeal": element.idMeal, "strMeal": element.strMeal, "strMealThumb": element.strMealThumb });
      });
    } else {
      result.meals = null;
    }
    return result;
  } catch (error) {
    console.error("Error in search API call:", error);
    return { "meals": null };
  }
};

const firstres = async (q) => {
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${q}`);
    const result = { "meals": [] };
    if (response.data.meals !== null) {
      response.data.meals.forEach(element => {
        result.meals.push({ "idMeal": element.idMeal, "strMeal": element.strMeal, "strMealThumb": element.strMealThumb });
      });
    } else {
      result.meals = null;
    }
    return result;
  } catch (error) {
    console.error("Error in search API call:", error);
    return { "meals": null };
  }
};

const ingfilter = async (q) => {
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${q}`);
    const result = { "meals": [] };
    if (response.data.meals !== null) {
      response.data.meals.forEach(element => {
        result.meals.push({ "idMeal": element.idMeal, "strMeal": element.strMeal, "strMealThumb": element.strMealThumb });
      });
    } else {
      result.meals = null;
    }
    return result;
  } catch (error) {
    console.error("Error in filter API call:", error);
    return { "meals": null };
  }
};

const fetchMeals = async (searchQuery) => {
  let result = { "meals": [] };
  let result1 = { "meals": [] };

  if (searchQuery.length === 1) {
    result = await firstres(searchQuery);
  } else {
    [result, result1] = await Promise.all([searchres(searchQuery), ingfilter(searchQuery)]);
  }

  if (result.meals !== null && result1.meals !== null) {
    const uniqueMeals = new Set();
    result.meals.forEach(meal => uniqueMeals.add(meal.idMeal));
    result1.meals.forEach(meal => uniqueMeals.add(meal.idMeal));
    const uniqueMealsArray = Array.from(uniqueMeals).map(idMeal => {
      return result.meals.find(meal => meal.idMeal === idMeal) || result1.meals.find(meal => meal.idMeal === idMeal);
    });
    return uniqueMealsArray;
  } else if (result.meals !== null) {
    return result.meals;
  } else if (result1.meals !== null) {
    return result1.meals;
  } else {
    return [];
  }
};

export { fetchMeals };