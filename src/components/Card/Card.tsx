import { useNavigate } from "react-router-dom";
import "./Card.css";

export const Card = (props: any) => {
  const navigate = useNavigate();

  const onShoppingListClick = () => {
    console.log("Shopping list clicked");
    navigate("/shoppingList", { state: { nazwa: props.nazwa, id: props.id } });
  };

  return (
    <div className="card">
      <div className="card__image-container">
        <img className="card__image" src={props.img} alt="placeholder" />
      </div>
      <h2 className="card__title">{props.nazwa}</h2>
      <button className="card__button" onClick={onShoppingListClick}>
        PRZEJDŹ DO LISTY ZAKUPÓW
      </button>
    </div>
  );
};
