import { useState, useEffect } from "react";
import AddUserInput from "./AddUserInput";
import { v4 as uuidv4 } from 'uuid';

const AddUserForm = ({ profilesData, setProfilesData }) => {
  const [inputsData, setInputData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    like: 0,
    comments: [],
  });

  const addProfile = (newProfile) => {
    setProfilesData([...profilesData, newProfile]);
  };

  useEffect(() => {
    fetch("http://localhost:4000/input-data")
      .then(res => res.json())
      .then(data => setInputData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");

    const formDataWithId = { ...formData, id: uuidv4() };

    fetch("http://localhost:4000/profile-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataWithId),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Data successfully posted:", data);
        addProfile(data);
        setFormData({
          name: "",
          specialization: "",
          email: "",
          like: 0,
          comments: [],
        });
      })
      .catch(error => console.error('Error posting data:', error));
  };

  return (
    <div className="w-full">
      <section className="max-w-xl p-6 mx-auto bg-white rounded-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 capitalize mb-8">
          Add Form Profile
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {inputsData.map((input) => (
            <AddUserInput
              label={input.label}
              inputId={input.inputId}
              type={input.type}
              key={input.id}
              onChange={handleChange}
              value={formData[input.inputId] || ""}
            />
          ))}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-blue-600 rounded-md hover:bg-blue-500"
            >
              Add User
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddUserForm;
