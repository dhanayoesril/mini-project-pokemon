import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailPokemon,
  postCatchPokemon,
  postReleasePokemon,
} from "../../actions/pokemonActions";
import { ToastContainer, toast } from "react-toastify";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../helper/localStorageAction";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import CardDetail from "../../components/CardDetail";
import BaseLayout from "../../components/BaseLayout";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [isCatched, setIsCatched] = useState(false);

  const { data: detailPokemon, loading } = useSelector(
    (state) => state.detailPokemon
  );

  const pokemonImage = detailPokemon?.sprites;

  const handleClickCatchPokemon = async () => {
    const catchResult = await postCatchPokemon();
    if (catchResult) {
      let newPokemonList = [];
      const existingPokemonList = getLocalStorage("myPokemonList");
      if (existingPokemonList) {
        newPokemonList = JSON.parse(existingPokemonList);
      }
      newPokemonList.push(detailPokemon);
      setLocalStorage("myPokemonList", JSON.stringify(newPokemonList));

      toast.success("Pokemon catched!", {
        position: "top-center",
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate(0);
      }, 1500);
    } else {
      toast.error("Failed to catch pokemon!", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  const handleClickReleasePokemon = async () => {
    const res = await postReleasePokemon();
    if (res) {
      let newPokemonList = [];
      const existingPokemonList = getLocalStorage("myPokemonList");
      if (existingPokemonList) {
        newPokemonList = JSON.parse(existingPokemonList);
      }
      const deletedData = newPokemonList.filter(
        (item) => item?.id !== detailPokemon?.id
      );
      setLocalStorage("myPokemonList", JSON.stringify(deletedData));
      toast.success("Pokemon released!", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate(0);
      }, 1500);
    } else {
      toast.error("Failed to release pokemon!", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  const handleClickRenamePokemon = () => {
    alert("rename pokemon");
  };

  useEffect(() => {
    dispatch(getDetailPokemon(params.id));
  }, []);

  useEffect(() => {
    if (detailPokemon) {
      const existingPokemonList = getLocalStorage("myPokemonList");
      if (existingPokemonList) {
        const parsedData = JSON.parse(existingPokemonList);
        const checkData = parsedData.filter(
          (item) => item?.id === detailPokemon?.id
        );
        if (checkData?.length > 0) {
          setIsCatched(true);
        } else {
          setIsCatched(false);
        }
      } else {
        setIsCatched(false);
      }
    }
  }, [detailPokemon]);

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
              {isCatched ? (
                <div>
                  <div className="mb-1">You have caught this Pokémon</div>
                  <div className="d-flex flex-row">
                    <Button
                      variant="danger"
                      className="btn-catch mb-4"
                      onClick={handleClickReleasePokemon}
                    >
                      Release
                    </Button>
                    <Button
                      variant="primary"
                      className="btn-catch mb-4 ml-3"
                      onClick={handleClickRenamePokemon}
                    >
                      Change Nickname
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="success"
                  className="btn-catch mb-4"
                  onClick={handleClickCatchPokemon}
                >
                  Catch this pokemon
                </Button>
              )}
            </div>
            <div className="mb-4">
              <CardDetail
                types={detailPokemon?.types}
                moves={detailPokemon?.moves}
              />
            </div>
            <ToastContainer />
          </div>
        )}
      </div>
      <Footer />
    </BaseLayout>
  );
};

export default Detail;
