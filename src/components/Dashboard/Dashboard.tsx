import { useAuth } from "../../context/AuthContext";
import { signOut, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { DUMMY_FAMILIES } from "../Dummyfiles/DUMMY.FAMILIES";
import { Card } from "../Card/Card";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const addFamily = () => {};

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <p className="dashboard__welcome">
          Witaj, {user?.email}. Oto twoja lista rodzin:
        </p>
        <button className="dashboard__add-button" onClick={addFamily}>
          Dodaj rodzinę
        </button>
      </div>
      <ul className="dashboard__list">
        {DUMMY_FAMILIES.map((family, index) => (
          <li className="dashboard__list-item" key={index}>
            <Card nazwa={family.name} img={family.img} id={family.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
