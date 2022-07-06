import React from 'react';

class AddBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      flights:[],
      classes:['Economy', 'Business', 'Platinum'],
      seatVisible:false,
      isFlightLoaded:false,
      id:'',
      name:'',
      address:'',
      dob:'',
      flight_id : 0,
      class:'',
      seat_numbers : ['Loading...'],
      seat_number:0,
      seat_loading:false
    };
  }


  async seatNumber() {
    if(this.state.flight_id !== 0 && this.state.class !== '') {
      // console.log("Sending seat Request");
      try{
        let res = await fetch('/loadSeatnumber',{
          method:'POST',
          headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            flight_id: this.state.flight_id,
            class: this.state.class
          }),
          credentials: "include",
        });

        let result = await res.json();
        let seats = [];
        if(result && result.success){
          seats = ((Object.values(Object.values(result.data)[0]))[0].split('-')).map((s) => {return parseInt(s, 10)}).sort((a,b)=>{return a-b});
          if(seats.join('-')!==this.state.seat_numbers.join('-')) {
            console.log("Updating Seats");
            this.setState({
              seat_numbers : seats,
            });
            if(this.state.seat_number !== 0) {
              alert("Selected seat already booked. Change Seat!");
            }
          }else {
            console.log("Not Updating Seats");
          }  
        }
      }catch(err){}
    }
  }

  async loadFlightDetails() {
    if(this.state.flights.length === 0) {
      try{
        let res = await fetch('/bookingFlights',{
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
          }
        });

        let result = await res.json();

        if(result && result.success) {
          this.setState({
            data: result
          })
          let temp_flights = []
          result.data.forEach((element, i) => {
            var data = {
              flight:`${element.origin} -> ${element.destination} : ${(new Date(element.takeoff_time)).toLocaleString()}`,
              flight_id: element.flight_id
            };
            temp_flights.push(data);
          });
          this.setState({
            flights: temp_flights,
          })
        }
      }catch(err){
        console.error(err);
      }
    }
  }

  async handleSubmit() {
    let date_ob = new Date();
      let date = date_ob.getFullYear()+'-'+date_ob.getMonth()+'-'+date_ob.getDate()+" "+date_ob.getHours()+":"+date_ob.getMinutes()+":"+date_ob.getSeconds();
    if(this.state.name === '' || this.state.address === '' || this.state.dob === ''|| this.state.id === '' || this.state.flight_id === 0 || this.state.class === '' || this.state.seat_number === 0) {
      alert("Fill all the columns");
    }else {
      console.log(this.state);
      try{
        let res = await fetch('/bookTicket',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            passenger_name: this.state.name,
            passenger_address: this.state.address,
            passenger_id: this.state.id,
            dob: this.state.dob,
            flight_id: this.state.flight_id,
            seat_number: this.state.seat_number,
            date:date,
            class: this.state.class,
          })
        });

        let result = await res.json();
        console.log(result);
        if(result && result.success) {
          window.location.href = "/paymentportal";
        }else {
          if(result) {
            alert(result.msg);
          }else{  
            alert("Booking Failed!!! Try Again");
          }
        }
      }catch(err){
        console.log(err);
        alert("Booking Failed by Unknown server error!!! Try Again");
      }
    }
  }

  render() {
    return (
          <div>
          <h2 className='text-center mt-1'>Book Flight</h2>
          <form>
            <div className='mb-3 row'>
              <div className='col-md-12'>
                <label htmlFor="p-name" className='form-label'>Passenger Name</label>
                <input id='p-name' type="text" className='form-control' onChange={(e)=>this.setState({
                  name: e.target.value,
                })}/>
              </div>
            </div>
            <div className='mb-3 row'>
              <div className='col-md-12'>
                <label htmlFor='p-address' className='form-label'>Passenger Address</label>
                <input id='p-address' className='form-control' type='text' onChange={(e)=>this.setState({
                  address: e.target.value,
                })}/>
              </div>
            </div>
            <div className='mb-3 row'>
              <div className='col-md-12'>
                <label htmlFor='p-id' className='form-label'>Passenger Id</label>
                <input id='p-id' className='form-control' type='text' onChange={(e)=>this.setState({
                  id: e.target.value
                })}/>
              </div>
            </div>
            <div className='mb-3 row'>
              <div className='col-md-12'>
                <label htmlFor='p-dob' className='form-label'>Passenger Date of Birth</label>
                <input id='p-dob' className='form-control' type='date' onChange={(e)=>this.setState({
                  dob: e.target.value,
                })}/>
              </div>
            </div>
            <div className='mb-3 row'>
              <div className='col-md-12'>
                <label htmlFor='flight' className='form-label'>Flights</label>
                <select defaultValue={-1} className='form-control' id='flight' onClick={()=>{
                  this.loadFlightDetails();
                  this.setState({
                    isFlightLoaded:true,
                  });
                }} onChange={(e) => {
                  this.setState({
                    flight_id: e.target.value,
                  });
                }
                }>
                  <option disabled selected>--Select--</option>
                  {this.state.isFlightLoaded === true &&
                    this.state.flights.map((flight, i)=>
                      <option key={i} value={flight.flight_id}>{flight.flight}</option>
                    )
                  }
                  {
                    this.state.isFlightLoaded === false &&
                    <option disabled>Loading...</option>
                  }
                </select>
              </div>
            </div>
            <div className='mb-3 row'>
              <div className='col-md-6'>
                <label htmlFor='class' className='form-label'>Class</label>
                <select defaultValue={-1} className='form-control' id='class' onChange={(e)=>
                  {
                    this.setState({
                      class: e.target.value,
                    });
                  }
                }>
                  <option value={-1} disabled selected>--Select--</option>

                  {
                    this.state.classes.map((element,i) => <option key={i} value={element}>{element}</option>)
                  }
                </select>
              </div>
              <div className='col-md-6'>
                <label htmlFor='seat' className='form-label'>Seat Number</label>
                {
                  this.state.flight_id!==0 && this.state.class !=='' && 
                  <select defaultValue={-1} className='form-control' id='seat' onClick={()=>
                    {
                      this.seatNumber();
                      if(!this.state.seat_loading){
                        console.log('Setting Interval');
                        setInterval(()=>
                        {
                          this.seatNumber();
                          this.setState({
                            seat_loading:true
                          })
                        }, 
                        10000);
                      }
                    }}
                  onChange={(e)=>this.setState({
                    seat_number: e.target.value,
                  })}>
                    <option value={-1} disabled selected>--Select--</option>
                    {
                      this.state.seat_numbers.map((seatNumber) => <option key={seatNumber} value={seatNumber}>{seatNumber}</option>)
                    }
                  </select>
                }
                {
                  (this.state.flight_id === 0 || this.state.class === '') && 
                  <select defaultValue={-1} className='form-control' id='seat' disabled>
                    <option value={-1} disabled selected>--Select--</option>
                    {}
                  </select>
                }
                
              </div>
            </div>
          </form>
          <div className='mt-5 text-center'>
              <button className='btn btn-primary' onClick={()=>this.handleSubmit()}>Book</button>
        </div>
        </div>
    );
  }
}

export default AddBooking;