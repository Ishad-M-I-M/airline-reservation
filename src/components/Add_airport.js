import React, { Component } from 'react'
import '../css/formstyle.css'


class Add_airport extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         code:"",
         name:"",
         location:"",
         address : []
 
      }
    }
    addAddress(){
      this.setState({
          address :[...this.state.address,""]
      })
  }
  handleChange(e,index){
      this.state.address[index] = e.target.value;
      this.setState({
          address : this.state.address
      })
  }

  handleRemove(index){
      this.state.address.splice(index,1)
      this.setState({
          address: this.state.address
      })
  }

    handleSubmit = (event)=>{
        alert(`${this.state.code} , 
        ${this.state.name} , 
        ${this.state.location}`)
        event.preventDefault()
   
       }

      addAirport_ = (event) => {
        fetch('/add_airport',{
          method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
              
              ,body:{
                'code' : this.state.code,
                'name' : this.state.name,
                'location': this.state.location
              }
        })
        .then((res)=>{
          res.json()
          .then((result)=> console.log(result.data) )
          .catch((e)=> console.error(e));
        })
        .catch((e)=>{
          console.error(e);
        })

       }

       async addAirport() {
        try {
            let res = await fetch('/addAirport',{
              method:'post',
              headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code:this.state.code,
                address :this.state.address,
                name : this.state.name
                  
              }),
              credentials : 'include',
            });
      
            let result = await res.json();
            console.log(result);
            if(result && result.success) {
              console.log('Data Successfully entered to database')
            }else {
              console.log(result.msg);
            }
          }catch(error){
      
          }
        }

    Addcode = (event) =>{
        this.setState({
            code: event.target.value
            
        })

    }
    Addname = (event) =>{
        this.setState({
            name: event.target.value
            
        })

    }
    Addlocation = (event) =>{
        this.setState({
            location: event.target.value
            
        })

    }

  render() {
    return (
      <div className='testform'>
        <form onSubmit={()=>{this.addAirport()}}>
            
            <input type="text" value={this.state.code}  
            onChange={this.Addcode} placeholder="Airport Code" required/>            
            <br></br>
            <br></br>
            <input type="text" value={this.state.name}  
            onChange={this.Addname} placeholder="Airport Name" required/>            
            <br></br>
            <br></br>
            <input type="text" value={this.state.location}  
            onChange={this.Addlocation} placeholder="Location" required/>            
            <br></br>
            <br></br>
            <div>

          {
              this.state.address.map((address,index)=>{

             return(
                 <div key = {index}>
                     <input required placeholder='Address' onChange={(e)=>{this.handleChange(e,index)}} value = {address}/>
                     <button onClick={() =>{this.handleRemove(index)}}>remove</button>
                     </div>
             )
              })

          }
          <button onClick={(e) =>{this.addAddress(e)}}>Add</button>
      </div>

            <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default Add_airport
