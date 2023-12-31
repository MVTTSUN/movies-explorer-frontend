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
  const [checkShortFilmsSaved, setCheckShortFilmsSaved] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverErrorModal, setServerErrorModal] = useState('');
  const [filmsWithFilmsSaved, setFilmsWithFilmsSaved] = useState([]);
  const [filmsSaved, setFilmsSaved] = useState([]);
  const [filmsSavedSearch, setFilmsSavedSearch] = useState([]);
  const { isMediumScreen, isLargeScreen } = useResize();
  const limit = isLargeScreen ? 4 : isMediumScreen ? 2 : 1;
  const [count, setCount] = useState(limit);
  const [queryFilmsSaved, setQueryFilmsSaved] = useState('');

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
      const searchFilmsData = searchFilms(filmsData, query, checkShortFilms, false);

      setFilms(searchFilmsData);
    } else {
      filmsData = JSON.parse(localStorage.getItem('filmsSaved'));
      const searchFilmsData = searchFilms(filmsData, query, false, checkShortFilmsSaved);

      setFilmsSavedSearch(searchFilmsData);
    }
  };

  const handleCheckShortFilms = (query) => {
    if (pathname === '/movies') {
      localStorage.setItem('queryFilms', query);
      localStorage.setItem('isShortFilms', !checkShortFilms);
      setCheckShortFilms(!checkShortFilms);
    } else {
      handleSetFilms(query);
      setQueryFilmsSaved(query);
      setCheckShortFilmsSaved(!checkShortFilmsSaved);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('queryFilms')) {
      handleSetFilms(localStorage.getItem('queryFilms') || null);
      setIsNothingFound(true);
    }
  }, [checkShortFilms]);

  useEffect(() => {
    handleSetFilms(queryFilmsSaved);
  }, [checkShortFilmsSaved]);

  useEffect(() => {
    getFilmsHandler();
  }, [films]);

  useEffect(() => {
    localStorage.setItem('filmsSaved', JSON.stringify(filmsSaved));
    if (pathname === '/saved-movies') {
      handleSetFilms(queryFilmsSaved);
    }
  }, [filmsSaved]);

  useEffect(() => {
    if (pathname === '/movies') {
      handleSetFilms(localStorage.getItem('queryFilms'));
    }
    if (pathname === '/saved-movies') {
      handleSetFilms('');
    }
  }, [pathname]);

  useEffect(() => {
    if (!localStorage.getItem('films')) {
      localStorage.setItem('films', JSON.stringify([]));
    }

    if (!localStorage.getItem('filmsSaved')) {
      localStorage.setItem('filmsSaved', JSON.stringify([]));
    }
  }, []);

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
