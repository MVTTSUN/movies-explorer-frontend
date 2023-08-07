import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import MainStyled from '../../components/MainStyled/MainStyled';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import './Movies.css';
import { useLocation } from 'react-router-dom';
import { getFilms } from '../../utils/MainApi';
import { useResize } from '../../hooks/useResize';
import { searchFilms } from '../../utils/utils';
import Modal from '../../components/Modal/Modal';
import Footer from '../../components/Footer/Footer';

export default function Movies() {
  const { pathname } = useLocation();
  const [films, setFilms] = useState([]);
  const [checkShortFilms, setCheckShortFilms] = useState(
    JSON.parse(localStorage.getItem('isShortFilms')) || false
  );
  const [checkShortFilmsSaved, setCheckShortFilmsSaved] = useState(
    JSON.parse(localStorage.getItem('isShortFilmsSaved')) || false
  );
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverErrorModal, setServerErrorModal] = useState('');
  const [filmsWithFilmsSaved, setFilmsWithFilmsSaved] = useState([]);
  const [filmsSaved, setFilmsSaved] = useState([]);
  const [filmsSavedSearch, setFilmsSavedSearch] = useState([]);
  const { isMediumScreen, isLargeScreen } = useResize();
  const limit = isLargeScreen ? 4 : isMediumScreen ? 2 : 1;
  const [count, setCount] = useState(limit);

  const handleSetCount = (count) => {
    setCount(count);
  };

  const getFilmsHandler = () => {
    getFilms()
      .then((filmsSaved) => {
        if (films) {
          setFilmsWithFilmsSaved(
            films.map((film) => ({
              ...film,
              isLike: filmsSaved.some((savedFilm) => savedFilm.movieId === film.id),
            }))
          );
          setFilmsSaved(filmsSaved.map((film) => ({ ...film, isLike: true })));
        }
      })
      .catch((err) => {
        setServerErrorModal(err);
      });
  };

  const handleSetFilms = (query) => {
    let filmsData;

    if (pathname === '/movies') {
      filmsData = JSON.parse(localStorage.getItem('films'));
      const searchFilmsData = searchFilms(filmsData, query, checkShortFilms, checkShortFilmsSaved);

      setFilms(searchFilmsData);
    } else {
      filmsData = filmsSaved;
      const searchFilmsData = searchFilms(filmsData, query, checkShortFilms, checkShortFilmsSaved);

      setFilmsSavedSearch(searchFilmsData);
    }
  };

  const handleCheckShortFilms = (query) => {
    if (pathname === '/movies') {
      localStorage.setItem('queryFilms', query);
      localStorage.setItem('isShortFilms', !checkShortFilms);
      setCheckShortFilms(!checkShortFilms);
    } else {
      localStorage.setItem('queryFilmsSaved', query);
      localStorage.setItem('isShortFilmsSaved', !checkShortFilmsSaved);
      setCheckShortFilmsSaved(!checkShortFilmsSaved);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('queryFilms')) {
      handleSetFilms(localStorage.getItem('queryFilms') || '');
    }
  }, [checkShortFilms]);

  useEffect(() => {
    handleSetFilms(localStorage.getItem('queryFilmsSaved'));
  }, [checkShortFilmsSaved]);

  useEffect(() => {
    getFilmsHandler();
  }, [films]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isShortFilmsSaved'))) {
      handleSetFilms(localStorage.getItem('queryFilmsSaved'));
    }
  }, [filmsSaved]);

  return (
    <>
      <Header isLogin />

      <MainStyled>
        <SearchForm
          handleSetFilms={handleSetFilms}
          handleCheckShortFilms={handleCheckShortFilms}
          checkShortFilms={checkShortFilms}
          checkShortFilmsSaved={checkShortFilmsSaved}
          setIsNothingFound={setIsNothingFound}
          setServerError={setServerError}
          handleSetCount={handleSetCount}
          limit={limit}
        />
        <MoviesCardList
          filmsSavedSearch={filmsSavedSearch}
          filmsSaved={filmsSaved}
          films={filmsWithFilmsSaved}
          isNothingFound={isNothingFound}
          serverError={serverError}
          getFilmsHandler={getFilmsHandler}
          handleSetCount={handleSetCount}
          limit={limit}
          count={count}
        />
      </MainStyled>

      <Footer />
      {serverErrorModal && <Modal>{serverErrorModal}</Modal>}
    </>
  );
}
