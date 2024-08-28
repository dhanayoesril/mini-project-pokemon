import React, { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getListPokemon } from "../../actions/pokemonActions";
import Footer from "../../components/Footer";
import BaseLayout from "../../components/BaseLayout";
import CardList from "../../components/CardList";
import "./styles.scss";

const List = () => {
  const dispatch = useDispatch();
  const {
    data: listPokemon,
    loading,
    previous,
    next,
  } = useSelector((state) => state.listPokemon);

  const getDataPokemon = (url) => {
    dispatch(getListPokemon(url));
  };

  useEffect(() => {
    getDataPokemon("https://pokeapi.co/api/v2/pokemon");
  }, []);

  const onClickPageAction = (url) => {
    getDataPokemon(url);
  };

  return (
    <BaseLayout
      loading={loading}
      previous={previous}
      next={next}
      onClickPageAction={(url) => onClickPageAction(url)}
    >
      <div className="p-4 mb-4">
        {loading ? (
          <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <Row>
            {listPokemon &&
              listPokemon.map((item, idx) => (
                <CardList
                  imageUrl={item?.sprites?.front_default}
                  name={item?.name}
                  key={idx}
                />
              ))}
          </Row>
        )}
      </div>
      <Footer />
    </BaseLayout>
  );
};

export default List;
