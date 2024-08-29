import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPokemon } from "../../actions/pokemonActions";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import CardDetail from "../../components/CardDetail";
import BaseLayout from "../../components/BaseLayout";
import "./styles.scss";

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { data: detailPokemon, loading } = useSelector(
    (state) => state.detailPokemon
  );

  const pokemonImage = detailPokemon?.sprites;

  useEffect(() => {
    dispatch(getDetailPokemon(params.id));
  }, []);

  return (
    <BaseLayout loading={loading} showPagination={false}>
      <div className="p-4">
        {loading ? (
          <Spinner />
        ) : (
          <div className="detail-page-wrapper">
            <div className="image-wrapper">
              <img
                src={pokemonImage?.front_default}
                alt="logo_image"
                className="image"
              />
            </div>
            <div className="d-flex justify-content-center btn-catch-wrapper mb-2">
              <Button variant="success" className="btn-catch mb-4">
                Catch this pokemon
              </Button>
            </div>
            <div className="mb-4">
              <CardDetail
                types={detailPokemon?.types}
                moves={detailPokemon?.moves}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </BaseLayout>
  );
};

export default Detail;
