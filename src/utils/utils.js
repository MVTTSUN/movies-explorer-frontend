const searchFilms = (filmsData, query, checkShortFilms, checkShortFilmsSaved) => {
  let filmsFilter;

  if (query !== null) {
    filmsFilter = filmsData.filter(
      (film) => film.nameRU.match(RegExp(`^${query}`, 'i')) || film.nameEN.match(RegExp(`^${query}`, 'i'))
    );
  } else {
    filmsFilter = filmsData;
  }

  if (checkShortFilms || checkShortFilmsSaved) {
    filmsFilter = filmsFilter.filter((film) => film.duration <= 40);
  }

  return filmsFilter;
};

export { searchFilms };
