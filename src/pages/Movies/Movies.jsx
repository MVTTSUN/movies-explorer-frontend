import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MainStyled from '../../components/MainStyled/MainStyled';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import './Movies.css';

export default function Movies() {
  return (
    <>
      <Header isLogin />

      <MainStyled>
        <SearchForm />
        <MoviesCardList />
      </MainStyled>

      <Footer />
    </>
  );
}
