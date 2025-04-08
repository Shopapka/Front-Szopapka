import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, ChangeEvent, Key } from "react";
import { Card } from "../Card/Card";
import "./Dashboard.css";
import { DUMMY_FAMILIES } from "../Dummyfiles/DUMMY.FAMILIES";
import { animate, motion, useInView } from "motion/react";
import { inView, stagger } from "motion";
import { apiUrl } from "../../constants/url";
import { auth } from "../../firebase";
import { Szopracz } from "../../Szopracz/Szopracz";
interface Family {
  id: Key;
  familyName: string;
  image: string;
  members: [
    {
      mail: string;
    }
  ];
  code: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [families, setFamilies] = useState<Family[]>([]);
  const [newFamilyName, setNewFamilyName] = useState<string>("");
  const [newFamilyImg, setNewFamilyImg] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [familyCode, setFamilyCode] = useState<string>("");
  const MAX_FILE_SIZE = 5 * 1024 * 1024; //mozna zmienic w razie wu

  const fetchFamilies = async () => {
    try {
      setIsLoading(true);
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch(`${apiUrl}/Family/getFamilyWithMembers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // if (!response.ok) {
      //   throw new Error("serwer krzyczy ze nie jest ok :(");
      // }
      const data: Family[] = await response.json();
      setFamilies(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilies();
  }, []);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFamilyName(e.target.value);
  };
  const handleFamilyCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFamilyCode(e.target.value);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        setErrorMessage("Zaznaczony plik nie jest zdjęciem :(");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage(
          `Rozmiar pliku przekracza ${
            MAX_FILE_SIZE * ((1 / 1024) * (1 / 1024))
          } MB :(`
        );
        return;
      }

      setErrorMessage(null);
      setNewFamilyImg(file);
    }
  };

  const handleAddFamily = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!newFamilyName || !newFamilyImg) {
      setErrorMessage(
        "Brakuje nazwy lub zdjęcia rodziny (możliwe że zły plik lub rozmiar)"
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("familyName", newFamilyName);
      formData.append("image", newFamilyImg);

      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        setErrorMessage("Użytkownik niezalogowany lub zły token użytkownika");
        return;
      }

      const response = await fetch(`${apiUrl}/Family/createFamily`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage(`Response error: ${errorText}`);
        throw new Error("Failed to create family");
      }

      const data = await response.json();
      console.log("Family created:", data);

      setNewFamilyName("");
      setNewFamilyImg(null);
    } catch (error) {
      setErrorMessage("Błąd dodawania rodziny");
    } finally {
      fetchFamilies();
      setIsLoading(false);
    }
  };

  async function handleFamilyJoining() {
    const formData = new FormData();
    formData.append("familyCode", familyCode);
    try {
      const token = await auth.currentUser?.getIdToken();
      console.log(token);

      const response = await fetch(`${apiUrl}/Family/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: familyCode,
      });
    } catch (error) {
      console.log(error);
    } finally {
      fetchFamilies();
    }
  }

  return (
    <div className="dashboard_big">
      <div className="family_form_outside">
        <div className="family_form_inside">
          <motion.div
            className="family_form_explenations"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h2> Jak dodać nową rodzinę? </h2>
              <p> 1. Wybierz wspaniałą nazwę dla twojej rodziny </p>
              <p> 2. Dodaje zdjęcie </p>
              <p> 3. Kliknij przycisk Dodaj rodzinę </p>
              <p className="special_p">
                {" "}
                I już możesz cieszyć się własną rodziną 😎 To takie proste!
              </p>
            </div>
          </motion.div>

          <motion.div
            className="family_form_form"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form className="form_add_family">
              <label> Nazwa rodziny</label>
              <input
                type="text"
                placeholder="Podaj nazwę rodziny"
                value={newFamilyName}
                onChange={handleNameChange}
                disabled={isLoading}
              />
              <label> Wybierz Plik </label>
              <input
                type="file"
                accept="image/*"
                className="form-file-input"
                onChange={handleFileChange}
                disabled={isLoading}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button
                type="button"
                onClick={handleAddFamily}
                disabled={isLoading}
                className={isLoading ? "loading-button" : ""}
              >
                {isLoading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <span>Dodawanie...</span>
                  </div>
                ) : (
                  "Dodaj rodzinę"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="dashboard">
        <div className="dashboard__header">
          <p className="dashboard__label"> Twoje rodziny</p>
        </div>

        <motion.div
          className="dashboard_join_family"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="text"
            placeholder="Podaj Kod"
            id="family_code_id"
            className="family_input_code"
            disabled={isLoading}
            onChange={handleFamilyCodeChange}
          />
          <button
            onClick={handleFamilyJoining}
            className="join_family_button"
            disabled={isLoading}
          >
            Dołącz do rodziny
          </button>
        </motion.div>
        <div className="dashboard_list-container">
          {isLoading ? (
            <Szopracz></Szopracz>
          ) : (
            <ul className="dashboard__list">
              {
                families.length ? (
                  families.map((family, index) => (
                    <motion.li
                      className="dashboard__list-item"
                      key={family.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.1, delay: index * 0.1 }}
                    >
                      <Card
                        nazwa={family.familyName}
                        img={family.image}
                        id={family.id}
                      />
                    </motion.li>
                  ))
                ) : (
                  <h1>Pusto tu</h1>
                )
                // DUMMY_FAMILIES.map((family, index) => (
                //     <motion.li
                //       className="dashboard__list-item"
                //       key={index}
                //       initial={{ opacity: 0, x: -20 }}
                //       animate={{ opacity: 1, x: 0 }}
                //       transition={{ duration: 0.1, delay: index * 0.1 }}
                //     >
                //       <Card
                //         nazwa={family.name}
                //         img={family.img}
                //         id={family.id}
                //         code={family.code}
                //       />
                //     </motion.li>
                //   )
                //   )
              }
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
