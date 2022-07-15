import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/formstyle.css'
import Example from './Toaster';

import {successToast, infoToast, warningToast, errorToast, redirect} from './common/Toasts';
class AddDiscount extends Component {



    constructor(props) {
      super(props)
    
      this.state = {
         discount:'',
         gold : '',
         Frequent :'',
         SavedGold : ''

      }
      this.getDiscounts();
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
          console.log(res);
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

    async Add_Discount(e) {
      e.preventDefault();
      if(this.state.gold === '' && this.state.discount ===''){
        infoToast("Enter Discount");
      }else{
       
      if(parseInt(this.state.gold) < 0 || parseInt(this.state.discount) < 0|| parseInt(this.state.gold) > 100 || parseInt(this.state.discount) > 100){
        warningToast("Invalid Input");
      }else{

      
        try {
            let res = await fetch('/discount',{
              method:'POST',
              headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  gold : parseInt(this.state.gold),
                  discount : parseInt(this.state.discount)
              }),
              credentials : 'include',
            });
      
            let result = await res.json();
            console.log(result);
            console.log(result.msg);
            
            if(result.success) {
              successToast("Discount values updated");
              this.getDiscounts();
              redirect("/add");
            }else {
              console.log(result.msg);
            }
          }catch(error){
      
          }
      }
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
    return (
      <div className='Discount_form'>


        <form onSubmit ={(e)=>{this.Add_Discount(e)}}>

          <Example Frequent={this.state.Frequent} SavedGold={this.state.SavedGold}/>
          <br></br>
          <br></br>
          <div className="form-floating mb-3">
          <input type="number" className="form-control" id="floatingInput" value={this.state.discount} 
          onChange={this.updateDiscount} placeholder="Regular Discount"/>
          <label htmlFor="floatingInput">Regular Discount</label>
          </div>


          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="floatingInput" value={this.state.gold} 
            onChange={this.updateGold} placeholder="Gold Discount" />
            <label htmlFor="floatingInput">Gold Discount</label>
            </div>

            <button type='submit' className='btn btn-primary' >Submit</button>
        </form>

      </div>
    )
  }
}

export default AddDiscount;
