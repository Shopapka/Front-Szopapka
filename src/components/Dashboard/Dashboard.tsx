import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, ChangeEvent, Key } from "react";
import { Card } from "../Card/Card";
import "./Dashboard.css";
import { DUMMY_FAMILIES } from "../Dummyfiles/DUMMY.FAMILIES";
import { animate, motion, useInView } from "motion/react";
import { inView, stagger } from "motion";

interface Family {
  id: Key;
  name: string;
  img: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [families, setFamilies] = useState<Family[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newFamilyName, setNewFamilyName] = useState<string>("");
  const [newFamilyImg, setNewFamilyImg] = useState<File | null>(null);

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const response = await fetch("api/jakies");
        if (!response.ok) {
          throw new Error("serwer krzyczy ze nie jest ok :(");
        }
        const data: Family[] = await response.json();
        setFamilies(data);
      } catch (error) {
        console.error("nie udalo sie zlapac rodzin :(", error);
      }
    };

    fetchFamilies();
  }, []);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFamilyName(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFamilyImg(e.target.files[0]);
    }
  };

  const handleAddFamily = async () => {
    if (!newFamilyName || !newFamilyImg) return;

    try {
      const formData = new FormData();
      formData.append("image", newFamilyImg);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imageUrl = await uploadResponse.json();

      const newFamily = { name: newFamilyName, img: imageUrl };

      const response = await fetch("/api/rodziny", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFamily),
      });

      if (!response.ok) {
        throw new Error("serwer krzyczy ze nie udalo sie dodac rodziny :(");
      }

      const addedFamily: Family = await response.json();
      setFamilies([...families, addedFamily]);
      setNewFamilyName("");
      setNewFamilyImg(null);
      setIsAdding(false);
    } catch (error) {
      console.error("Nie udalo sie dodac rodziny :(", error);
    }
  };


  return (
    <div className="dashboard_big">
      <div className="family_form_outside">
        <div className="family_form_inside">
            
            <motion.div className="family_form_explenations"
            initial={{opacity: 0, x: -20}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.3}}
            >
              <div>
                <h2> Jak dodać nową rodzinę? </h2>
                <p> 1. Wybierz wspaniałą nazwę dla twojej rodziny </p>
                <p> 2. Dodaje zdjęcie </p>
                <p> 3. Kliknij przycisk Dodaj rodzinę </p>
                <p className="special_p"> I już możesz cieszyć się własną rodziną 😎 To takie proste!</p>
              </div>
            </motion.div>

            <motion.div className="family_form_form"
              initial={{opacity: 0, x: 20}}
              whileInView={{opacity: 1, x: 0}}
              transition={{duration: 0.3}}
            >
              
              <form className="form_add_family">
              <label> Nazwa rodziny</label>
                <input
                  type="text"
                  placeholder="Podaj nazwę rodziny"
                  value={newFamilyName}
                  onChange={handleNameChange}
                  
                />
                <label> Wybierz Plik </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-file-input"
                  onChange={handleFileChange}
              
                />
                <button onClick={handleAddFamily}>
                  Dodaj rodzinę
                </button>

              </form>
            
            </motion.div>
        </div>
       </div>
  
      <div className="dashboard">
        <div className="dashboard__header">
          <p className="dashboard__label"> Twoje rodziny</p>
        </div>

        <ul className="dashboard__list">
          {families.length
            ? families.map((family, index) => (
                <motion.li className="dashboard__list-item" key={family.id}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.2, delay: index*0.2}}
                
                >
                  <Card nazwa={family.name} img={family.img} id={family.id} />
                </motion.li>
              ))
            : DUMMY_FAMILIES.map((family, index) => (
                <motion.li className="dashboard__list-item" key={index}
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.1, delay: index*0.1}}>
                  <Card nazwa={family.name} img={family.img} id={family.id} />
                </motion.li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
