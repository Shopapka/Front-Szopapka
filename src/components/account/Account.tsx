import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, ChangeEvent, Key } from "react";
import "./Account.css";
import { animate, motion, useInView } from "motion/react";
import { inView, stagger } from "motion";
import shop from "../../assets/shop.png"
import { MdHeight } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";


const Account = () => {

    let name:any = "Imie";
    let surname:any = "Nazwisko";
    const navigate = useNavigate();

    const hadleLogOut = async() =>
    {
        try {
            await signOut(auth);
            navigate("/login");
        }catch(error)
        {
            console.log(error);
        }
    }
    
    return(
        <div className="Account">
            <div className="spacer"></div>
           
            <motion.div className="account_info"
            initial={{opacity: 0, y: -20}}
            whileInView={{opacity: 1, y: 0}}

            transition={{duration: 0.6}}
            
            >
                <div className="account_info_abs"></div>
                <div className="account_info_left">
                    <p className="account_info_left_welcome"> Co u ciebie? </p>
                    <h2>{name +" "+ surname}</h2>
                    <p className="accont_info_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula ullamcorper enim, 
                        at lacinia massa ullamcorper quis. Nullam ipsum lectus, pretium non quam ut, 
                        sagittis vehicula dolor. Etiam porta commodo arcu, ut pellentesque nisi eleifend sit amet. 
                        Integer commodo nibh ipsum, faucibus vestibulum nibh vehicula non. Sed blandit tempus rhoncus.</p>
                    <button className="button_log_out" onClick={hadleLogOut}>Wyloguj</button>
                </div>
                <div className="account_info_right">
                    <img src={shop} alt="shop"/>
                </div>
            </motion.div>

            <div className="spacer"></div>

            <motion.div className="account_bottom"
                initial={{opacity: 0, x: 20}}
                whileInView={{opacity: 1, x: 0}}
                >
                <h2> Zagubiony?</h2>
                <p className="account_bottom_info">Przejrzyj poniżej co oferuje nasza strona! 😉</p>

                <div className="offert">
                    <div className="offert_item">
                        <h3>Twoje rodziny</h3>
                        <Link to="/dashboard">Więcej tutaj <IoIosArrowRoundForward /></Link>
                        <p>Rodzina to podstawa naszej strony. Dodaj rodziny i zamień zakupy w przyjemność</p>
                    </div>

                    <div className="offert_item">
                        <h3>Pamiętaj o listach zakupów</h3>
                        <Link to="/dashboard">Więcej tutaj <IoIosArrowRoundForward /></Link>
                        <p>Sprawdzaj czy inni ludzie kupili, przypisuj się do kupienia rzeczy i dodawaj zapotrzebowanie na nowe produkty</p>
                    </div>

                    <div className="offert_item">
                        <h3>FAQ</h3>
                        <Link to="/faq">Więcej tutaj <IoIosArrowRoundForward /></Link>
                        <p>Wciąż masz pytania? Zajrzyj do naszego FAQ i rozwiej je wszystkie</p>
                    </div>
                </div>
            </motion.div>
            

            

        </div>
    );
} 

export default Account;