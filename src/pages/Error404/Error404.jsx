import CenterContainer from '../../components/CenterContainer/CenterContainer';
import MainStyled from '../../components/MainStyled/MainStyled';
import { useNavigate } from 'react-router-dom';
import './Error404.css';

export default function Error404() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <MainStyled>
        <section className="error404" aria-label="Страница 404">
          <CenterContainer>
            <h2 className="error404__title">404</h2>
            <p className="error404__text">Страница не найдена</p>
            <button onClick={goBack} className="error404__button button" type="button">
              Назад
            </button>
          </CenterContainer>
        </section>
      </MainStyled>
    </>
  );
}
