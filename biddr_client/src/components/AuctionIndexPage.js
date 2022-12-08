import {useState, useEffect} from 'react'
import axios from 'axios'
import dateFormate from 'dateformat'
import { Link } from 'react-router-dom';

const AuctionIndexPage = ({user}) => {

  const [auctions, setAuctions] = useState([])

  const fetchAuctions = () => {
    axios.get('http://localhost:3000/auctions',{withCredentials: true})
        .then(res => setAuctions(res.data))
  }

  useEffect(()=>{fetchAuctions()}, [])

  return (
    <>
        <div className="container-fluid p-0" id="auctions">
        <h1 className="text-center" >Auctions</h1>
        </div>
        <div className="container p-0 ">
        <div className="container mt-3 mx-6 d-flex flex-wrap flex-row justify-content-center">
        {auctions.map(a => 
          {
            
              return (
                <div key={a.id} className="card shadow m-2 mb-5 bg-white col-sm-6" style={{width: "18em"}}>
                    
                    <h4 className="card-title"><Link className="fw-bold text-dark text-decoration-none" to={`/auctions/${a.id}`}>{a.title}</Link></h4> 
                   
                    <p className="card-text text-grey">Seller: {a.user?.name}</p>
                    <p className="card-text text-grey">Posted on {dateFormate(a.created_at, "mmmm dS, yyyy")}</p>
                </div>
              )
            
          }
          
        )}
        </div>
        </div>
    </>
  )
}

export default AuctionIndexPage