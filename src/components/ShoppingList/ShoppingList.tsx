import { Link, useLocation } from "react-router-dom";
import "./shopingList.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import FaqItem from "../faq/faq_item";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import ShopListItem from "../shop_list_item/shop_list_item";
import { auth } from "../../firebase";
import { apiUrl } from "../../constants/url";
import { Szopracz } from "../../Szopracz/Szopracz";
interface ShoppingItem {
  id: number;
  idFamily: number;
  status: "NEW" | "DURING" | "DONE";
  content: string;
  quantity: number;
  idUser: string;
  userName: string;
  familyName: string;
}

const ShoppingList = () => {
  const location = useLocation();
  const { nazwa } = location.state || {};
  const { familyId } = location.state || {};
  const { img } = location.state || {};
  const { code } = location.state || {};
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isItemsLoading, setIsItemsLoading] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>(img);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemQuantity, setNewItemQuantity] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
  const refreshList = useCallback(() => {
    fetchShoppingItems();
  }, []);
  const handleAddShoppingItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || newItemQuantity <= 0) {
      setErrorMessage("Wprowadź nazwę produktu i poprawną ilość");
      return;
    }

    try {
      setIsLoading(true);
      const token = await auth.currentUser?.getIdToken();

      const response = await fetch(`${apiUrl}/shopping/createListShopping`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idFamily: familyId,
          content: newItemName,
          quantity: newItemQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się dodać produktu");
      }

      setNewItemName("");
      setNewItemQuantity(1);
      setErrorMessage(null);

      await fetchShoppingItems();
    } catch (error) {
      console.error("Błąd podczas dodawania produktu:", error);
      setErrorMessage("Wywaliło błąd w trakcie dodawania produktu");
    } finally {
      setIsLoading(false);
    }
  };

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);

  const fetchShoppingItems = async () => {
    try {
      setIsItemsLoading(true);
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(
        `${apiUrl}/shopping/getByFamily/${familyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: ShoppingItem[] = await response.json();

      setShoppingItems(data);
    } catch (error) {
      console.error("Błąd podczas pobierania listy zakupów:", error);
    } finally {
      setIsItemsLoading(false);
    }
  };

  useEffect(() => {
    if (img) {
      fetchPhoto(img);
    }
    fetchShoppingItems();
  }, [img]);
  let add_title: any = "Dodaj produkt";
  let add_content: any = (
    <form onSubmit={handleAddShoppingItem}>
      <div className="width-50-big inline-block">
        <label htmlFor="add_item_name">Nazwa produktu</label>
        <input
          type="text"
          placeholder="Podaj nazwę produktu"
          required
          id="add_item_name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          disabled={isLoading}
          maxLength={50}
          minLength={2}
        />
      </div>
      <div className="width-50-big inline-block">
        <label htmlFor="add_item_quantity">Ilość</label>
        <input
          type="number"
          placeholder="Podaj ilość"
          required
          id="add_item_quantity"
          value={newItemQuantity}
          onChange={(e) =>
            setNewItemQuantity(Math.min(Number(e.target.value), 999))
          } // Limit max quantity
          min="1"
          max="999"
          disabled={isLoading}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Dodawanie..." : "Dodaj produkt"}
      </button>
    </form>
  );

  return (
    <div>
      <div className="family_data">
        <div className="pretty_absolute_div"></div>

        <motion.div
          className="family_data_left"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={imageSrc}
            alt="ładuje ci sie zdjecie niestety"
            className="family_data_img"
          />{" "}
        </motion.div>

        <motion.div
          className="family_data_right"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="family_data_title">Rodzina {nazwa}</p>
          <p className="family_data_code">Kod dołączenia: {code}</p>
          {/* <p className="family_data_members"> {listMembers} </p> */}
          <Link to="/faq" className="family_data_link">
            Masz jakieś pytania? <IoIosArrowRoundForward />
          </Link>
        </motion.div>
      </div>
      <div className="family_shopping_list">
        <h2> Wasza lista zakupów </h2>
        <div className="family_add_item">
          <FaqItem
            title={add_title}
            content={add_content}
            delay={0.2}
            additionalClass={"family_add_item_form"}
          />
        </div>
      </div>

      <div className="shopping-items-container">
        {isItemsLoading ? (
          <div className="items-loading">
            <Szopracz />
          </div>
        ) : shoppingItems.length ? (
          shoppingItems.map((item) => (
            <ShopListItem
              key={item.id}
              itemID={item.id}
              itemName={item.content}
              quantity={item.quantity}
              state={item.status}
              buyerName={item.userName}
              buyerSurname={item.familyName}
              buyerID={item.idUser}
              currentUserID={item.idUser}
              onStatusUpdate={refreshList}
            />
          ))
        ) : (
          <h1>Pusto tu</h1>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
