import { useState } from "react";
import AddUserForm from "./components/AddUserForm";
import ProfileContainer from "./components/ProfileContainer";
import { useEffect } from "react";

const App = () => {
  const [profilesData, setProfilesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile-data")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProfilesData(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);


  return (
    <div className="flex justify-around h-screen w-full container my-8">
      <div className="h-full w-full">
        <ProfileContainer {...{ profilesData, setProfilesData, error }} />
      </div>
      <div className=" w-full">
        <AddUserForm {...{ profilesData, setProfilesData }} />
      </div>
    </div>
  );
};

export default App;
