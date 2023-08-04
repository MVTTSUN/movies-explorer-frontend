import CenterContainer from '../CenterContainer/CenterContainer';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <CenterContainer>
      <section className="search-form" aria-label="Поиск по фильмам">
        <form className="search-form__form">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
          />
          <button className="search-form__button button" />
        </form>
        <label className="search-form__label-tumbler">
          <input type="checkbox" className="search-form__tumbler" />
          <span className="search-form__text-tumbler">Короткометражки</span>
        </label>
      </section>
    </CenterContainer>
  );
}
