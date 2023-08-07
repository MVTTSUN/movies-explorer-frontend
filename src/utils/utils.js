const searchFilms = (filmsData, query, checkShortFilms, checkShortFilmsSaved) => {
  let filmsFilter;

  if (query !== null) {
    filmsFilter = filmsData.filter(
      (film) =>
        film.nameRU
          .trim()
          .split(' ')
          .some((word) => word.match(RegExp(`^${query.trim()}`, 'i'))) ||
        film.nameEN
          .trim()
          .split(' ')
          .some((word) => word.match(RegExp(`^${query.trim()}`, 'i'))) ||
        film.nameRU
          .trim()
          .split(/[.,/?'"!@#$%^&*()_+~`№^;:&|<>\-=\\{}«»[]/)
          .join('')
          .split(' ')
          .some((word) => word.match(RegExp(`^${query.trim()}`, 'i'))) ||
        film.nameEN
          .trim('')
          .split(/[.,/?'"!@#$%^&*()_+~`№^;:&|<>\-=\\{}«»[]/)
          .join('')
          .split(' ')
          .some((word) => word.match(RegExp(`^${query.trim()}`, 'i')))
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
