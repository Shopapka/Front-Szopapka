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
      <p>Welcome, {user?.email}</p>
      {/* <button onClick={handleLogout}>Logout</button>*/}
      <button onClick={addFamily}>Add a family</button>
      <ul>
        {DUMMY_FAMILIES.map((family, index) => (
          <li key={index}>
            <Card nazwa={family.name} img={family.img} id={family.id}></Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
