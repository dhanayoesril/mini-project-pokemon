import * as ActionTypes from "../constants/actionTypes";

const initialStateDataReducer = {
  loading: true,
  data: [],
  error: null,
  previous: null,
  next: null,
};

export const listPokemonReducers = (
  state = initialStateDataReducer,
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_LIST_POKEMON_PENDING:
      return {
        ...state,
        loading: true,
        data: [],
        error: false,
        previous: null,
        next: null,
      };
    case ActionTypes.FETCH_LIST_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.payload?.completedData,
        error: false,
        previous: action?.payload?.data?.previous,
        next: action?.payload?.data?.next,
      };
    case ActionTypes.FETCH_LIST_POKEMON_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.error,
        previous: null,
        next: null,
      };
    default:
      return state;
  }
};
