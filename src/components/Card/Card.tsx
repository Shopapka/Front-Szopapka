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
      <img src={props.img} alt="placeholder" />
      <h2>Rodzina: {props.nazwa}</h2>
      <button onClick={onShoppingListClick}>PRZEJDŹ DO LISTY ZAKUPÓW</button>
    </div>
  );
};
