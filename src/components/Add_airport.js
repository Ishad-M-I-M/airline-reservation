import React, { Component } from 'react'
import '../css/formstyle.css'
import 'bootstrap/dist/css/bootstrap.css';


class Add_airport extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         code:"",
         name:"",
         location:"",
         address : [],
         parent :"",
         Country :[]
 
      }
    }


    getCounty = () =>{

      fetch('/getCountries',{
        method: 'GET',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((res)=>{
        res.json()
        .then( (result) => { this.setState({
          Country:result.data

        })
        }
        );
      })
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
                name : this.state.name,
                parent:this.state.parent
                  
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
    AddCountry = (event) =>{
      this.setState({
          parent: event.target.value
          
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
    this.getCounty();
    return (
      <div className='Airtportform'>
        <form onSubmit={()=>{this.addAirport()}}>
        <div class="form-floating mb-3">

          <input type="text" className="form-control" id="floatingInput" value={this.state.code} 
          onChange={this.Addcode} placeholder="Airport Code" required
          />
          <label for="floatingInput">Airport Code</label>

          </div>
          <div class="form-floating mb-3">

          <input type="text" className="form-control" id="floatingInput" value={this.state.name} 
          onChange={this.Addname} placeholder="Airport Name" required
          />
          <label for="floatingInput">Airport Name</label>

          </div>


          {/* <div class="form-floating mb-3">

          <input type="text" className="form-control" id="floatingInput" value={this.state.location} 
          onChange={this.Addlocation} placeholder="Country" required
          />
          <label for="floatingInput">Country</label>

          </div> */}



          <div className="form-floating mb-3">
          <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Add country..."
          value={this.state.parent} 
          onChange={this.AddCountry} required
          />
          <datalist id="datalistOptions">
                {
                  this.state.Country.map((c)=>(
                    <option  key= {c.id} value={c.location}>{c.location}</option>
                  ))
                }
            </datalist>
            <label for="floatingInput">Add/Select Country</label>
          </div>

          {this.state.parent}
          <div>

          {
              this.state.address.map((address,index)=>{

             return(
                 <div key = {index}>
                     
                     <div class="form-floating input-group mb-3">
                      <input required type="text" className="form-control" id="floatingInput" placeholder="Address" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e)=>{this.handleChange(e,index)}} value = {address} />
                      <label for="floatingInput">Address</label>
                      <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() =>{this.handleRemove(index)}}>Remove</button>
                    </div>
                     </div>
             )
              })

          }
          <button className="btn btn-primary" onClick={(e) =>{this.addAddress(e)}}>Add</button>
      </div>
            <br></br>
      
            <button className="btn btn-primary Discount_btn" type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default Add_airport
