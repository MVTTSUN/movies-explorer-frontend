const searchFilms = (filmsData, query, checkShortFilms, checkShortFilmsSaved) => {
  let filmsFilter;

  if (query !== null) {
    filmsFilter = filmsData.filter(
      (film) =>
        film.nameRU.trim().match(RegExp(`^${query.trim()}`, 'i')) ||
        film.nameEN.trim().match(RegExp(`^${query.trim()}`, 'i')) ||
        film.nameRU
          .trim()
          .split(/[.,/?'"!@#$%^&*()_+~`№^;:&|<>\-=\\{}«»[]/)
          .join('')
          .match(RegExp(`^${query.trim()}`, 'i')) ||
        film.nameEN
          .trim('')
          .split(/[.,/?'"!@#$%^&*()_+~`№^;:&|<>\-=\\{}«»[]/)
          .join('')
          .match(RegExp(`^${query.trim()}`, 'i'))
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
