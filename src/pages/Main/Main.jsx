import AboutMe from '../../components/AboutMe/AboutMe';
import AboutProject from '../../components/AboutProject/AboutProject';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MainStyled from '../../components/MainStyled/MainStyled';
import NavTab from '../../components/NavTab/NavTab';
import Portfolio from '../../components/Portfolio/Portfolio';
import Promo from '../../components/Promo/Promo';
import Techs from '../../components/Techs/Techs';
import './Main.css';

export default function Main() {
  return (
    <>
      <Header />

      <MainStyled>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </MainStyled>

      <Footer />
    </>
  );
}
