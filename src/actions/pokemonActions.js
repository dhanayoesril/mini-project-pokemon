import * as ActionTypes from "../constants/actionTypes";
import Axios from "axios";
import { isPrime } from "../helper/general";

export const getDetailAllPokemon = async (datas) => {
  const promises = [];

  for (const data of datas) {
    const result = Axios.get(data.url);
    promises.push(result);
  }

  const results = await Promise.all(promises);
  const listPokemon = results.map((result) => result.data);
  return listPokemon;
};

export const getListPokemon = (url) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_LIST_POKEMON_PENDING });

    return Axios.get(url)
      .then(async (res) => {
        const { data } = res;
        const dataPokemon = data?.results;
        const completedData = await getDetailAllPokemon(dataPokemon);

        dispatch({
          type: ActionTypes.FETCH_LIST_POKEMON_SUCCESS,
          payload: {
            data,
            completedData,
          },
        });
      })
      .catch((err) => {
        const errMessage =
          err?.response?.data?.message || "Failed to get list pokemon";
        dispatch({
          type: ActionTypes.FETCH_LIST_POKEMON_ERROR,
          error: errMessage,
        });
      });
  };
};

export const getDetailPokemon = (id) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DETAIL_POKEMON_PENDING });

    return Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        const { data: payload } = res;
        dispatch({ type: ActionTypes.FETCH_DETAIL_POKEMON_SUCCESS, payload });
      })
      .catch((err) => {
        const errMessage =
          err?.response?.data?.message || "Failed to get detail pokemon";
        dispatch({
          type: ActionTypes.FETCH_DETAIL_POKEMON_ERROR,
          error: errMessage,
        });
      });
  };
};

export const postCatchPokemon = () => {
  // Use mock api : with probability 50% true or false
  const randomBoolean = () => Math.random() >= 0.5;
  return randomBoolean();
};

export const postReleasePokemon = () => {
  // Use mock api : with random number & check its a prime number or not
  const number = Math.floor(Math.random() * 100);
  return isPrime(number);
};
