import Header from '../../components/Header/Header';
import MainStyled from '../../components/MainStyled/MainStyled';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies() {
  return (
    <>
      <Header isLogin />

      <MainStyled>
        <SearchForm />
        <MoviesCardList type="save" />
      </MainStyled>
    </>
  );
}
