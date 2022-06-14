import React, { Component } from 'react'
import '../css/formstyle.css'
import 'bootstrap/dist/css/bootstrap.css';

class Form extends Component {

    constructor(props) {
      super(props)
    
      this.state = {

         Origin:'port',
         Destination :'port',
         datas :[]
      }
    }

    changeOrigin = (event) =>{
      this.setState({
          Origin: event.target.value
          
      })

  }

  changeDestination = (event) =>{
    this.setState({
        Destination: event.target.value
        
    })

}
    getRoutes = () =>{

      fetch('/airportDetails',{
        method: 'GET',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((res)=>{
        res.json()
        .then( (result) => { this.setState({
          datas:result.data

        })
        }
        );
      })
    }

  async addRoutes(){
    if(this.state.Origin == this.state.Destination){
      alert('Invalid Selection')
    }else{
    try {
      let res = await fetch('/addRoute',{
        method:'post',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Origin : this.state.Origin,
            Destination : this.state.Destination
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
  }
  
  render() {

    this.getRoutes();
    return (
      <div className='testform'>
        <form onSubmit={()=>{this.addRoutes()}}>


            <div class="form-floating">
            <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
            value={this.state.Origin} placeholder = 'Origin'
            onChange={this.changeOrigin}>
                {
                  this.state.datas.map((c)=>(
                    <option key={c.airport_id} value={c.airport_id}>{c.code}</option>
                  ))
                }
            </select>
            
            <label for="floatingSelect">Select Origin</label>
          </div>

                <br></br>
                
          <div class="form-floating">
            <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
            value={this.state.Destination} placeholder = 'Destination'
            onChange={this.changeDestination}>
                {
                  this.state.datas.map((c)=>(
                    <option key={c.airport_id} value={c.airport_id}>{c.code}</option>
                  ))
                }
            </select>
            <label for="floatingSelect">Select Destination</label>
          </div>


                <br></br>
            
            <button className='btn btn-primary' type='submit'>Submit</button>
        </form>


      </div>
    )
  }
}

export default Form
