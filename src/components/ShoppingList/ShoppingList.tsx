import { Link, useLocation } from "react-router-dom";
import "./shopingList.css"
import { IoIosArrowRoundForward } from "react-icons/io";

import { useState } from "react";
import { motion } from "motion/react";
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
  const {img} = location.state || {};

  const members = ["Kononowicz", "Jabłonowski", "Sobowtów Kononowicza", "Sobowtór Jabłonowskiego", "John Ligma"];
  const listMembers = members.map((mem, index) =>
    <span className="family_data_member">{mem}{(index!=members.length-1)&&(',')}&nbsp;</span>);

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const getShoppingItems = () => {
    setShoppingItems(
      DUMMY_SHOPPING_ITEMS.filter((item) => item.id_rodziny === id)
    );
  };

  return (
    <div>
      <div className="family_data">

        <div className="pretty_absolute_div"></div>

        <motion.div className="family_data_left"
          initial={{x: -20, opacity: 0}}
          whileInView={{x: 0, opacity: 1}}
          transition={{duration: 0.4}}
        >
          <img src={img} alt='zdjęcie rodziny' className="family_data_img"/>
        </motion.div>

        <motion.div className="family_data_right"
          initial={{x: 20, opacity: 0}}
          whileInView={{x: 0, opacity: 1}}
          transition={{duration: 0.4}}
        >
          <p className="family_data_title">Rodzina {nazwa}</p>
          <p className="family_data_members"> {listMembers} </p>
          <Link to="/faq" className="family_data_link">Masz jakieś pytania? <IoIosArrowRoundForward/></Link>
        </motion.div>

       

      </div>

      <div className="family_shopping_list">
          <h2> Wasza lista zakupów </h2>

      </div>

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
