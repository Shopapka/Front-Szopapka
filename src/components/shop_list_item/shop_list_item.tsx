import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlUser } from "react-icons/sl";
import { Link} from "react-router-dom";
import "./shop_list_item.css"


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
function ShopListItem(props:any)
{

    
    let stateClass:any = '';
    if(props.state ==0)
    {
        stateClass  = 'shop_list_item-toDO';
    }
    else if(props.state == 1)
    {
        if(props.currentUserID == props.buyerID)
            stateClass = 'shop_list_item-mine';
        else
            stateClass = 'shop_list_item_not_mine';
    }
    else if(props.state == 2)
    {
        stateClass = 'shop_list_item-bought';
    }

    function IWillBuy()
    {

    }

    function ItemWasBought()
    {

    }

    function Usun()
    {
        
    }
    return(
        <div className={"shop_list_item_outer " + stateClass}>
            <div className="shop_list_item_inner">
                <div className="shop_list_item_status">
                    
                    {(props.state==0) && (<p> Status: Do kupienia </p>)}
                    {(props.state==1) && (<p> Status: Przypisane do kupowania </p>)}
                    {(props.state==2) && (<p> Status kupione </p>)}

                </div>
                
                <div className="shop_list_item_data">
                    <div className="shop_list_item_info">
                        <p>{props.itemName} x {props.quantity}</p>
                    </div>

                    <div className="shop_list_item_buttons">
                        
                        {(props.state == 0)&&(<button className="shop_list_item_button" onClick={IWillBuy}> Ja to kupię </button>)}

                        {(props.state == 1) && (props.currentUserID == props.buyerID) && (<button className="shop_list_item_button"  onClick={ItemWasBought}> Kupione </button>)}

                        {(props.state == 1) && (props.currentUserID != props.buyerID) && (<p className="shop_list_item_buyer">Kupowane przez: {props.buyerName}&nbsp;{props.buyerSurname}</p>)}

                        {(props.state == 2)&&(<button className="shop_list_item_button" onClick={Usun}> Usuń </button>)}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopListItem;