import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import dateFormat from 'dateformat'
import { useNavigate } from 'react-router-dom'

const AuctionShowPage = ({user}) => {

  const [auction, setAuction] = useState({})
  const [bids, setBids] = useState([])
  const [priceMet, setPriceMet] = useState("not met")
  const [newBidPrice, setNewBidPrice] = useState()
  const [published, setPublished] = useState(false)

  let {id} = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3000/auctions/${id}`, {withCredentials: true})
        .then(res => {
            setAuction(res.data)
            setBids(res.data.bids)            
        })
  }, [])

  useEffect(() => {
    if(user && Math.max(...bids.map(b => b.price)) >= auction.reserve_price) {
      axios.put(`http://localhost:3000/auctions/${id}`, {
        auction:{
          reserve_met: true
        }
    }, {withCredentials: true})
      .then(res => {
        console.log(res.data)
        setPriceMet("has been met") 
      })
    }
  }, [auction, bids])

  const handleChange = (event) => {
    setNewBidPrice(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (user) {
      axios.post(`http://localhost:3000/auctions/${id}/bids`,{
      bid: {
        price: newBidPrice
      }
    }, {withCredentials: true})
      .then(res => {
        //console.log(res)
        setBids([res.data.bid, ...bids])
      })
    } else {
      navigate('/sign_in', {replace: true})
    }
    
  }

  const handleClick = () => {
    axios.put(`http://localhost:3000/auctions/${id}`, {
        auction:{
          published: true,
          draft: false
        }
    }, {withCredentials: true})
      .then(res => {
        console.log(res.data)
        setPublished(true)
      })
  }
  
  return (
    <div className="container shadow mb-3 bg-white rounded" id="auction-show-container" >
        <div className="p-5">
        <h1 className="pt-3">{auction.title}</h1>
        {auction.user && auction.user.id === user?.id && (!published) && auction.draft && <button onClick={handleClick} className='btn btn-primary m-3'>Publish</button>}
        <p>{auction.description}</p>
        <h3>Seller: {auction.user?.name}</h3>
        <h3>Ends at: {dateFormat(auction.end_date, "mmmm dS, yyyy")}</h3>
        <h3>Reserve Price: <span className="badge bg-success text-light">${auction.reserve_price}</span></h3>
        <h3>Reserve Price {priceMet}</h3>
        {/* <form onSubmit={(auction && published)? handleSubmit:undefined}> */}
        <form onSubmit={(auction?.published || published)? handleSubmit:undefined}>
          <input 
            name="price"
            type="text"
            onChange={handleChange}
            required
          />
          <button className='btn btn-primary m-3' type="submit">Bid</button>
        </form>
        <h5>Previous Bids</h5>
        {bids.map(b => (
            <p key={b.id}>
                ${b.price} on {dateFormat(b.created_at, "mmmm dS, yyyy")}
            </p>
        ))}
    </div>
    </div>
  )
}

export default AuctionShowPage