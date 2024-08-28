import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPokemon } from "../../actions/pokemonActions";

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { data, loading } = useSelector((state) => state.detailPokemon);

  useEffect(() => {
    dispatch(getDetailPokemon(params.id));
  }, []);

  return <div>Ini Detail</div>;
};

export default Detail;
