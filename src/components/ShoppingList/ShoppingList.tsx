import { Link, useLocation } from "react-router-dom";
import "./shopingList.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import FaqItem from "../faq/faq_item";

import { useState } from "react";
import { motion } from "motion/react";
import ShopListItem from "../shop_list_item/shop_list_item";
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
  const { img } = location.state || {};
  const { code } = location.state || {};

  const members = [
    "Kononowicz",
    "Jabłonowski",
    "Sobowtów Kononowicza",
    "Sobowtór Jabłonowskiego",
    "John Ligma",
  ];
  const listMembers = members.map((mem, index) => (
    <span className="family_data_member">
      {mem}
      {index != members.length - 1 && ","}&nbsp;
    </span>
  ));

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const getShoppingItems = () => {
    setShoppingItems(
      DUMMY_SHOPPING_ITEMS.filter((item) => item.id_rodziny === id)
    );
  };

  let add_title: any = "Dodaj produkt";
  let add_content: any = (
    <form>
      <div className="width-50-big inline-block">
        <label htmlFor="add_item_name">Nazwa produktu</label>
        <input
          type="text"
          placeholder="Podaj nazwę produktu"
          required
          id="add_item_name"
        />
      </div>
      <div className="width-50-big inline-block">
        <label htmlFor="add_item_name">Ilość</label>
        <input
          type="number"
          placeholder="Podaj ilość"
          required
          id="add_item_quantity"
        />
      </div>

      <button type="submit">Dodaj produkt</button>
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
          <img src={img} alt="zdjęcie rodziny" className="family_data_img" />
        </motion.div>

        <motion.div
          className="family_data_right"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="family_data_title">Rodzina {nazwa}</p>
          <p className="family_data_code">Kod dołączenia: {code}</p>
          <p className="family_data_members"> {listMembers} </p>
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
      <div className="item-list">
        {DUMMY_SHOPPING_ITEMS.filter((item) => item.id_rodziny === id).map(
          (item) => (
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
          )
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
