import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuctionNewPage = () => {
  let navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [end_date, setEnd_date] = useState("")
  const [reserve_price, setReserve_price] = useState()

  const handleChange = (event) => {
    event.target.name === 'title' && setTitle(event.target.value)
    event.target.name === 'description' && setDescription(event.target.value)
    event.target.name === 'end_date' && setEnd_date(event.target.value)
    event.target.name === 'reserve_price' && setReserve_price(event.target.value)
  }

  const handleSubmit = (event) => {
    
    axios.post("http://localhost:3000/auctions", {
        auction: {
            title,
            description,
            end_date,
            reserve_price
        }
    }, {withCredentials: true})
        .then(res => {
            navigate(`/auctions/${res.data.id}`, {replace: true})
        })

    event.preventDefault()
  }

  return (
    <>
        <h1>Create an Auction</h1>
        <form onSubmit={handleSubmit}>
            <label>Title*</label>
            <input 
                type="text"
                name="title"
                onChange={handleChange}
                required
            />
            <br/>
            <label>Description*</label>
            <input 
                type="text"
                name="description"
                onChange={handleChange}
                required
            />
            <br/>
            <label>Ends at*</label>
            <input 
                type="date"
                name="end_date"
                onChange={handleChange}
                required
            />
            <br/>
            <label>Reserve Price* $</label>
            <input 
                type="number"
                name="reserve_price"
                onChange={handleChange}
                required
            />
            <br/>
            <button type="submit" className='btn btn-primary m-3'>Save</button>
        </form>
    </>
  )
}

export default AuctionNewPage