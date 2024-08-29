import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import CardList from "../../components/CardList";
import BaseLayout from "../../components/BaseLayout";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getListPokemon } from "../../actions/pokemonActions";
import "./styles.scss";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const onClickCard = (id) => {
    navigate(`/${id}/detail`);
  };

  return (
    <BaseLayout
      loading={loading}
      previous={previous}
      next={next}
      showPagination={true}
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
                  key={idx}
                  imageUrl={item?.sprites?.front_default}
                  name={item?.name}
                  onClick={() => onClickCard(item?.id)}
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
