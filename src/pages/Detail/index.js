import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailPokemon,
  postCatchPokemon,
  postReleasePokemon,
  getFibonacciNumber,
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
  const [showModal, setShowModal] = useState(false);
  const [showModalMoves, setShowModalMoves] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState("");

  const { data: detailPokemon, loading } = useSelector(
    (state) => state.detailPokemon
  );

  const pokemonImage = detailPokemon?.sprites;

  const handleSavePokemon = () => {
    let newPokemonList = [];
    const existingPokemonList = getLocalStorage("myPokemonList");
    if (existingPokemonList) {
      newPokemonList = JSON.parse(existingPokemonList);
    }
    const newDataPokemon = detailPokemon;
    newDataPokemon.nickname = nickname;
    newDataPokemon.editCount = 0;
    newPokemonList.push(newDataPokemon);
    setLocalStorage("myPokemonList", JSON.stringify(newPokemonList));

    setShowModal(false);

    toast.success("Pokemon catched!", {
      position: "top-center",
      autoClose: 1500,
    });

    setTimeout(() => {
      navigate(0);
    }, 1500);
  };

  const handleEditPokemon = async () => {
    let newPokemonList = [];
    const existingPokemonList = getLocalStorage("myPokemonList");
    if (existingPokemonList) {
      newPokemonList = JSON.parse(existingPokemonList);
    }
    const indexData = newPokemonList.findIndex(
      (item) => item.id === detailPokemon.id
    );
    const dataEdit = newPokemonList.find(
      (item) => item.id === detailPokemon.id
    );
    const fibonacciNum = await getFibonacciNumber(dataEdit?.editCount + 1);
    newPokemonList[indexData].nickname = `${nickname}-${fibonacciNum}`;
    newPokemonList[indexData].editCount = dataEdit?.editCount + 1;
    setLocalStorage("myPokemonList", JSON.stringify(newPokemonList));

    setShowModal(false);

    toast.success("Change nickname success!", {
      position: "top-center",
      autoClose: 1500,
    });
  };

  const handleClickCatchPokemon = async () => {
    const catchResult = await postCatchPokemon();
    if (catchResult) {
      setShowModal(true);
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
    const existingPokemonList = getLocalStorage("myPokemonList");
    const parsedList = JSON.parse(existingPokemonList);
    const pokemon = parsedList.find((item) => item.id === detailPokemon?.id);
    setNickname(pokemon?.nickname);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNickname("");
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
                isCatched={isCatched}
                id={detailPokemon?.id}
                name={detailPokemon?.name}
                types={detailPokemon?.types}
                moves={detailPokemon?.moves}
                setShowModalMoves={() => setShowModalMoves(true)}
              />
            </div>
            <ToastContainer />
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered={true}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? "Edit Pokemon Nickname" : "Input Pokemon Nickname"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={nickname?.length < 1}
            onClick={isEdit ? handleEditPokemon : handleSavePokemon}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModalMoves}
        onHide={() => setShowModalMoves(false)}
        centered={true}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>All Moves</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className={`px-3 d-flex justify-content-center mb-1 all-moves`}>
            {detailPokemon?.moves &&
              detailPokemon?.moves.map((item, idx) => (
                <Col
                  md={4}
                  sm={4}
                  xs={4}
                  className="detail-wrapper bg-warning mr-1 mb-1 text-center"
                  key={idx}
                >
                  <div className="font-14 fw-600">{item?.move?.name}</div>
                </Col>
              ))}
          </Row>
        </Modal.Body>
      </Modal>
      <Footer />
    </BaseLayout>
  );
};

export default Detail;
