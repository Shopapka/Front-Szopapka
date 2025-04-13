import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlUser } from "react-icons/sl";
import { Link } from "react-router-dom";
import "./shop_list_item.css";
import { auth } from "../../firebase";
import { apiUrl } from "../../constants/url";

interface ShopListItemProps {
  itemID: number;
  itemName: string;
  quantity: number;
  state: "NEW" | "DURING" | "DONE";
  buyerName: string;
  buyerSurname: string;
  buyerID: string;
  currentUserID: string;
  onStatusUpdate: () => void;
}

/*PROPS:
 - itemID
 - itemName
 - quantity
 - state:
    - 0 - potrzeba kupić
    - 1 - ktoś zadeklarował że kupi
    - 2 - kupione
 - buyerName - jak '' to nie ma tego przypisanego
 - buyerSurname jak '' to nie ma tego przypisanego
 - buyerID
 - currentUserID 
*/
function ShopListItem(props: ShopListItemProps) {
  let stateClass: any = "";
  if (props.state == "NEW") {
    stateClass = "shop_list_item-toDO";
  } else if (props.state == "DURING") {
    if (props.currentUserID == props.buyerID)
      stateClass = "shop_list_item-mine";
    else stateClass = "shop_list_item_not_mine";
  } else if (props.state == "DONE") {
    stateClass = "shop_list_item-bought";
  }

  const updateStatus = async (status: string) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        console.error("Brak tokenu autoryzacyjnego");
        return;
      }

      const response = await fetch(
        `${apiUrl}/shopping/updateStatus/${props.itemID}?status=${status}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Błąd podczas aktualizacji statusu: ${response.statusText}`
        );
      }

      props.onStatusUpdate();
    } catch (error) {
      console.error("Wystąpił błąd podczas aktualizacji statusu:", error);
    }
  };

  const deleteItem = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        console.error("Brak tokenu autoryzacyjnego");
        return;
      }

      const response = await fetch(
        `${apiUrl}/shopping/deleteShopping/${props.itemID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Błąd podczas usuwania produktu: ${response.statusText}`
        );
      }

      props.onStatusUpdate();
    } catch (error) {
      console.error("Wystąpił błąd podczas usuwania produktu:", error);
    }
  };

  function IWillBuy() {
    updateStatus("DURING");
  }
  function ItemWasBought() {
    updateStatus("DONE");
  }
  function Usun() {
    deleteItem();
  }
  return (
    <div className={"shop_list_item_outer " + stateClass}>
      <div className="shop_list_item_inner">
        <div className="shop_list_item_status">
          {props.state == "NEW" && <p> Status: Do kupienia </p>}
          {props.state == "DURING" && <p> Status: Przypisane do kupowania </p>}
          {props.state == "DONE" && <p> Status kupione </p>}
        </div>

        <div className="shop_list_item_data">
          <div className="shop_list_item_info">
            <p>{props.itemName}</p>
            <p>x {props.quantity}</p>
          </div>

          <div className="shop_list_item_buttons">
            {props.state == "NEW" && (
              <button className="shop_list_item_button" onClick={IWillBuy}>
                {" "}
                Ja to kupię{" "}
              </button>
            )}

            {props.state == "DURING" &&
              props.currentUserID == props.buyerID && (
                <button
                  className="shop_list_item_button"
                  onClick={ItemWasBought}
                >
                  {" "}
                  Kupione{" "}
                </button>
              )}

            {props.state == "DURING" &&
              props.currentUserID != props.buyerID && (
                <p className="shop_list_item_buyer">
                  Kupowane przez: {props.buyerName}&nbsp;{props.buyerSurname}
                </p>
              )}

            {props.state == "DONE" && (
              <button className="shop_list_item_button" onClick={Usun}>
                {" "}
                Usuń{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopListItem;
