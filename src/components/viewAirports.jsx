import React, { useEffect, useState } from 'react'

export default function ViewAirports() {

  //fetch from database and load: GET /ariports
  const [airports, setAirports] = useState([]);
  let handleDelete = (id_) =>{
    // request to delete : DELETE /apirports/:id
    fetch(`/airport/${id_}`,{
      method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    })
    .then((res)=>{
      res.json()
      .then((result)=> {
        alert("Airport sucessfully deleted");
      } )
      .catch((e)=> console.error(e));
    })
    .catch((e)=>{
      console.error(e);
    })
  }

  useEffect(()=>{
    fetch('/airport',{
      method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    })
    .then((res)=>{
      res.json()
      .then((result)=> setAirports(result.data) )
      .catch((e)=> console.error(e));
    })
    .catch((e)=>{
      console.error(e);
    })
  })
  
  return (
    <div className='m-3'>
      <form>
        <label className='form-label' htmlFor='airport'>Search For Airport</label>
        <input id='airport' type="text" list='airports' className='form-control'/>
        <datalist id="airports">
          {airports.map(({id, name}) => <option key={id}>{name}</option>)}
        </datalist>
      </form>
      <br/>
      {
        airports.map(({id, name, code, location})=>{
          return <div className='card mt-1' key={id}>
            <div className='card-header'> {location.split(",")[location.split(",").length -1]}</div>
            <div className='card-body row'>
              <div className='col-4'>{name}</div>
              <div className='col-2'>{code}</div>
              <div className='col-4'>{location.split(",").splice(1).join(', ')}</div>
              <div className='col-2'><button onClick={()=>handleDelete(id)} className="btn btn-primary">Delete</button></div>
            </div>
          </div>
        })
      }
    </div>
  )
}
