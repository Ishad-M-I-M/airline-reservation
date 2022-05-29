import React, { Component } from 'react'
import '../css/formstyle.css'
import 'bootstrap/dist/css/bootstrap.css';

class Add_craft extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         model:"",
         total_seats:null,
         economy:null,
         business:null,
         platinum:null
 
      }
    }

    
      async ADD_FLIGHT(){

        try {
            let res = await fetch('/addAircraft',{
              method:'post',
              headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model : this.state.model,
                seats : this.state.total_seats,
                economy : this.state.economy,
                business : this.state.business,
                platinum : this.state.platinum
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




        // fetch('/addAircraft',{
        //     method: 'POST',
        //         headers: {
        //           'Accept': 'application/json',
        //           'Content-Type': 'application/json'
        //         }
                
        //         ,body: JSON.stringify({
        //           model : this.state.model,
        //           seats : this.state.total_seats,
        //           economy : this.state.economy,
        //           business : this.state.business,
        //           platinum : this.state.platinum
        //         })
        //   })
        //   .then((res)=>{
        //     res.json()
        //     .then((result)=> console.log(result.data) )
        //     .catch((e)=> console.error(e));
        //   })
        //   .catch((e)=>{
        //     console.error(e);
        //   })
   
       }

    Addmodel= (event) =>{
        this.setState({
            model: event.target.value
            
        })

    }
    Addseats = (event) =>{
            this.setState({
                total_seats: event.target.value
                
            })


    }
    Addeconomy = (event) =>{
        if(event.target.value > this.state.total_seats- this.state.business - this.state.platinum){
            alert("invalid input");
            event.target.value = null;
            this.setState({
                economy: null
                
            })
        }else{
            this.setState({
                economy: event.target.value
                
            })

        }


    }
    Addbusiness = (event) =>{

        if(event.target.value>this.state.total_seats - this.state.economy - this.state.platinum){

            alert("invalid input");
            event.target.value = null;
            this.setState({
                business: null
                
            })
        }else{
            this.setState({
                business: event.target.value
                
            })

        }


    }
    Addplatinum = (event) =>{

        if(event.target.value>this.state.total_seats - this.state.economy - this.state.business){

            alert("invalid input");
            event.target.value = null;
            this.setState({
                platinum: null
                
            })
        }else{
            this.setState({
                platinum: event.target.value
                
            })

        }


    }

  render() {
    return (
      <div className='Aircraft_form'>
        <form onSubmit={()=>{this.ADD_FLIGHT()}}>

            <div class="form-floating mb-3">

            <input type="text" className="form-control" id="floatingInput" value={this.state.model} 
            onChange={this.Addmodel} placeholder="Model" required
            />
            <label for="floatingInput">Model</label>

            </div>

            <div class="form-floating mb-3">

              <input type="text" className="form-control" id="floatingInput" value={this.state.total_seats} 
              onChange={this.Addseats} placeholder="Total seats" required
              />
              <label for="floatingInput">Total seats</label>

              </div>
            
            {/* <input type="text" value={this.state.model} 
            onChange={this.Addmodel} placeholder="Model" required/>             */}
            <br></br>
            <br></br>


            <input type="number" value={this.state.total_seats}  
            onChange={this.Addseats} placeholder="Total seats" required/>            
            <br></br>
            <br></br>
            <input type="text" value={this.state.economy}  
            onChange={this.Addeconomy} placeholder="Economy seats" required/>            
            <br></br>
            <br></br>
            <input type="text" value={this.state.business}  
            onChange={this.Addbusiness} placeholder="Business seats" required/>            
            <br></br>
            <br></br>
            <input type="text" value={this.state.platinum}  
            onChange={this.Addplatinum} placeholder="Platinum seats" required/>            
            <br></br>
            <br></br>
            <button className="btn btn-primary" type='submit'>Submit</button>


   
        </form>
      </div>
    )
  }
}

export default Add_craft
