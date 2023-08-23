import { useEffect, useState } from 'react';
import CenterContainer from '../CenterContainer/CenterContainer';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import ErrorField from '../ErrorField/ErrorField';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({
  filmsSavedSearch,
  filmsSaved,
  films,
  isNothingFound,
  serverError,
  getFilmsHandler,
  handleSetCount,
  count,
  limit,
}) {
  const { pathname } = useLocation();
  const [isLastCardsRow, setIsLastCardsRow] = useState(false);
  const [filmsLimit, setFilmsLimit] = useState([]);

  const findLastCardsRow = () => {
    if (count >= films.length) {
      setIsLastCardsRow(true);
    } else {
      setIsLastCardsRow(false);
    }
  };

  const renderCards = () => {
    setFilmsLimit(films.slice(0, count));
    findLastCardsRow();
  };

  const getMoreFilms = () => {
    handleSetCount(count + limit);
  };

  useEffect(() => {
    renderCards();
  }, [count]);

  useEffect(() => {
    renderCards();
  }, [films]);

  return (
    <section className="movies-card-list" aria-label="Карточки фильмов">
      <CenterContainer>
        {serverError && <ErrorField isActive>{serverError}</ErrorField>}
        {pathname === '/movies' && !!filmsLimit.length && (
          <>
            <ul className="movies-card-list__list list">
              {filmsLimit.map((film) => (
                <li key={film.id}>
                  <MoviesCard film={film} getFilmsHandler={getFilmsHandler} />
                </li>
              ))}
            </ul>
            {pathname === '/movies' && !isLastCardsRow && (
              <button onClick={getMoreFilms} type="button" className="movies-card-list__button button">
                Ещё
              </button>
            )}
          </>
        )}
        {pathname === '/movies' && !filmsLimit.length && isNothingFound && (
          <p className="movies-card-list__text-nothing">Ничего не найдено</p>
        )}
        {pathname === '/saved-movies' && (
          <ul className="movies-card-list__list list">
            {!!filmsSavedSearch.length
              ? filmsSavedSearch.map((film) => (
                  <li key={film.movieId}>
                    <MoviesCard film={film} isLike getFilmsHandler={getFilmsHandler} />
                  </li>
                ))
              : !isNothingFound &&
                filmsSaved.map((film) => (
                  <li key={film.movieId}>
                    <MoviesCard film={film} isLike getFilmsHandler={getFilmsHandler} />
                  </li>
                ))}
          </ul>
        )}
        {pathname === '/saved-movies' && !filmsSavedSearch.length && isNothingFound && (
          <p className="movies-card-list__text-nothing">Ничего не найдено</p>
        )}
      </CenterContainer>
    </section>
  );
}
