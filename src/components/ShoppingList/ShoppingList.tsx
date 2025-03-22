import { useLocation } from "react-router-dom";

import { useState } from "react";
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
    <div>
      <h1>
        Shopping List for {nazwa}, id {id}
      </h1>
      {DUMMY_SHOPPING_ITEMS.filter((item) => item.id_rodziny === id).map(
        (item, index) => (
          <div key={index}>
            <p>{item.nazwa}</p>
            <p>{item.data}</p>
          </div>
        )
      )}
    </div>
  );
};

export default ShoppingList;
