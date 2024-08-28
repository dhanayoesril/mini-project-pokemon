import { combineReducers } from "redux";
import { listPokemonReducers } from "./listPokemonReducers";
import { detailPokemonReducers } from "./detailPokemonReducers";

export default combineReducers({
  listPokemon: listPokemonReducers,
  detailPokemon: detailPokemonReducers,
});
