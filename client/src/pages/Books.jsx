import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
     
        const fetchAllBooks = async()=>{

            try {
                const res = await axios.get("http://localhost:7000/books")
                setBooks(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBooks()
    }, [])
    
    const handleDelete = async(id)=>{

        try {
            await axios.delete(`http://localhost:7000/books/${id}`);
            window.location.reload()
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div>
        <h1>Book Shop</h1>
        <hr />
        <button className='add-btn'><Link to='/add'>Add New Book</Link></button>
        <div className="books">
             {books.map(book=>(

                <div className="book" key={book.id}>
                    {book.cover && <img src={book.cover} alt="" /> }
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>{book.price}</span>
                    <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                    <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                </div>
             ))}
        </div>
    </div>
  )
}

export default Books