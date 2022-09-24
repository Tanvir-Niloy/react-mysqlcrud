import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    desc: "",
    cover: "",
    price: null,
  });

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/books", book);
      navigate("/");
    } catch (error) {}
  };
  return (
    <div className="form">
      <h2>Add New Book</h2>
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="desc"
      />
      <input
        type="text"
        placeholder="Cover Image"
        onChange={handleChange}
        name="cover"
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
      />
      <button className="submitBtn" onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
