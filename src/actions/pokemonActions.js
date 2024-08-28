import * as ActionTypes from "../constants/actionTypes";
import Axios from "axios";

export const getDetailPokemon = async (datas) => {
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
        const completedData = await getDetailPokemon(dataPokemon);

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

// export const getDetailPokemon = (id) => {
//   return (dispatch) => {
//     dispatch({ type: ActionTypes.FETCH_DETAIL_POKEMON_PENDING });

//     return Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
//       .then((res) => {
//         const { data: payload } = res;
//         dispatch({ type: ActionTypes.FETCH_DETAIL_POKEMON_SUCCESS, payload });
//       })
//       .catch((err) => {
//         const errMessage =
//           err?.response?.data?.message || "Failed to get detail pokemon";
//         dispatch({
//           type: ActionTypes.FETCH_DETAIL_POKEMON_ERROR,
//           error: errMessage,
//         });
//       });
//   };
// };
