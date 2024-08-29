import * as ActionTypes from "../constants/actionTypes";

const initialStateDataReducer = {
  loading: true,
  data: {},
  error: null,
};

export const detailPokemonReducers = (
  state = initialStateDataReducer,
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_DETAIL_POKEMON_PENDING:
      return {
        ...state,
        loading: true,
        data: {},
        error: false,
      };
    case ActionTypes.FETCH_DETAIL_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.payload,
        error: false,
      };
    case ActionTypes.FETCH_DETAIL_POKEMON_ERROR:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.error,
      };
    default:
      return state;
  }
};
