import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/formstyle.css'
import Example from './Toaster';


class AddDiscount extends Component {



    constructor(props) {
      super(props)
    
      this.state = {
         discount:null,
         gold : null,
         Frequent :null,
         SavedGold : null
 
      }
    }

    getDiscounts=()=>{
      console.log("Show discount");
      fetch('/discount',{
        method: 'GET',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((res)=>{
        res.json()
        .then( (result) => {
          this.setState({

            Frequent : result.data[0].discount,
            SavedGold : result.data[1].discount
          })
        }
        );
      })

      // alert(`Frequent : ${this.state.Frequent}, Gold : ${this.state.SavedGold}`);
      // alert(result.data[0].type+" : "+result.data[0].discount+"\n"+result.data[1].type+" : "+result.data[1].discount);
    }

    async Add_Discount() {
        try {
            let res = await fetch('/discount',{
              method:'post',
              headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  gold : this.state.gold,
                  discount : this.state.discount
              }),
              credentials : 'include',
            });
      
            let result = await res.json();
            console.log(result);
            console.log(result.msg);
            if(result.success) {
              alert('Data Successfully entered to database');

            }else {
              console.log(result.msg);
            }
          }catch(error){
      
          }
        }

    updateDiscount = (event) =>{
        this.setState({
            discount: event.target.value
            
        })

    }
    updateGold = (event) =>{
      this.setState({
          gold: event.target.value
          
      })

  }

  render() {
    this.getDiscounts();
    return (
      <div className='Discount_form'>


        <form onSubmit ={()=>{this.Add_Discount()}}>

          <Example Frequent={this.state.Frequent} SavedGold={this.state.SavedGold}/>
          <br></br>
          <br></br>
          <div class="form-floating mb-3">
          <input type="number" className="form-control" id="floatingInput" value={this.state.discount} 
          onChange={this.updateDiscount} placeholder="Regular Discount"/>
          <label for="floatingInput">Regular Discount</label>
          </div>


          <div class="form-floating mb-3">
            <input type="number" className="form-control" id="floatingInput" value={this.state.gold} 
            onChange={this.updateGold} placeholder="Gold Discount" />
            <label for="floatingInput">Gold Discount</label>
            </div>

            <button type='submit' className='btn btn-primary' >Submit</button>
        </form>

      </div>
    )
  }
}

export default AddDiscount
