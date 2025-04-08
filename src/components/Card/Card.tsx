import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { auth } from "../../firebase";
import { apiUrl } from "../../constants/url";

export const Card = (props: any) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string>(props.img);

  const onShoppingListClick = () => {
    console.log("Shopping list clicked");
    navigate("/shoppingList", {
      state: {
        nazwa: props.nazwa,
        id: props.id,
        img: props.img,
        code: props.code,
      },
    });
  };

  const fetchPhoto = async (filename: string) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`${apiUrl}/files/${filename}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } else {
        console.error("Failed to fetch image:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (props.img) {
      fetchPhoto(props.img);
    }
  }, [props.img]);

  return (
    <div className="card">
      <div className="card__image-container">
        <img
          className="card__image"
          src={imageSrc}
          alt="GORĄCE MAMUŚKI W TWOJEJ OKOLICY"
        />
      </div>
      <h2 className="card__title">{props.nazwa}</h2>
      <button className="card__button" onClick={onShoppingListClick}>
        PRZEJDŹ DO LISTY ZAKUPÓW
      </button>
    </div>
  );
};
