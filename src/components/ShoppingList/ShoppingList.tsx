import { useLocation } from "react-router-dom";

import { useState } from "react";
import ShopListItem from "../shop_list_item/shop_list_item";
import "./ShoppingList.css";
interface ShoppingItem {
  id: String;
  id_rodziny: String;
  nazwa: String;
  data: String;
  id_status: String;
}
const DUMMY_SHOPPING_ITEMS: ShoppingItem[] = [
  {
    id: "1",
    id_rodziny: "1",
    nazwa: "kebab",
    data: "69-69-69",
    id_status: "1",
  },
  {
    id: "2",
    id_rodziny: "1",
    nazwa: "piwo",
    data: "69-69-69",
    id_status: "1",
  },
  {
    id: "3",
    id_rodziny: "2",
    nazwa: "kebab",
    data: "69-69-69",
    id_status: "1",
  },
];
const ShoppingList = () => {
  const location = useLocation();
  const { nazwa } = location.state || {};
  const { id } = location.state || {};
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const getShoppingItems = () => {
    setShoppingItems(
      DUMMY_SHOPPING_ITEMS.filter((item) => item.id_rodziny === id)
    );
  };

  return (
    <div className="item-container">
      <h1>
        Shopping List for {nazwa}, id {id}
      </h1>
      <div className="item-list">
        {DUMMY_SHOPPING_ITEMS.filter((item) => item.id_rodziny === id).map(
          (item, index) => (
            <ShopListItem
              itemID={item.id}
              itemName={item.nazwa}
              quantity={item.data}
              state={0}
              buyerName=""
              buyerSurname=""
              buyerID="chujwie"
              currentUserID="tezchujwie"
            ></ShopListItem>

            // <div key={index}>
            //   <p>{item.nazwa}</p>
            //   <p>{item.data}</p>
            // </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
