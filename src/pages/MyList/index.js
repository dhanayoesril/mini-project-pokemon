import React from "react";
import Footer from "../../components/Footer";
import CardList from "../../components/CardList";
import BaseLayout from "../../components/BaseLayout";
import { Row } from "react-bootstrap";
import { getLocalStorage } from "../../helper/localStorageAction";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const navigate = useNavigate();

  const myPokemonList = getLocalStorage("myPokemonList") || [];

  const onClickCard = (id) => {
    navigate(`/${id}/detail`);
  };
  return (
    <BaseLayout showPagination={false} loading={myPokemonList?.length < 1}>
      <div className="p-4">
        {myPokemonList?.length < 1 ? (
          <div className="text-center font-14 fw-600">
            You don't have any pokemon
          </div>
        ) : (
          <Row>
            {myPokemonList &&
              myPokemonList.map((item, idx) => (
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

export default MyList;
