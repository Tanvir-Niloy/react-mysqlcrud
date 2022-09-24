import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const location  = useLocation();


  const bookId = location.pathname.split("/")[2];

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
      await axios.put(`http://localhost:7000/books/${bookId}`,book);
      navigate("/");
    } catch (error) {}
  };
  
  return (
    <div className="form">
      <h2>Update Book</h2>
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
      <button className="submitBtn" onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
