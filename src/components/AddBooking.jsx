import React from 'react';

class AddBooking extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      data:[],
      flights:[],
      classes:['Economy', 'Business', 'Platinum'],
      seatVisible:false,
      name:'',
      address:'',
      dob:'',
      flight_id : 0,
      class:''
    };
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
              flight:`${element.origin} -> ${element.destination} : ${element.takeoff_time}`,
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

  render() {
    
    return (
        <div>
          <h2 className='text-center mt-1'>Book Flight</h2>
          <form>
            <div className='mb-3 row'>
              <div className='col-md-12'>
                <label htmlFor="p-name" className='form-label'>Passenger Name</label>
                <input id='p-name' type="text" className='form-control'/>
              </div>
            </div>
            <div className='mb-3 row'>
              <div className='col-md-12'>
                <label htmlFor='p-address' className='form-label'>Passenger Address</label>
                <input id='p-address' className='form-control' type='text' />
              </div>
            </div>
            <div className='mb-3 row'>
              <div className='col-md-12'>
                <label htmlFor='p-dob' className='form-label'>Passenger Date of Birth</label>
                <input id='p-dob' className='form-control' type='date' />
              </div>
            </div>
            <div className='mb-3 row'>
              <div className='col-md-12'>
                <label htmlFor='flight' className='form-label'>Flights</label>
                <select defaultValue={-1} className='form-control' id='flight' onClick={()=>this.loadFlightDetails()} onChange={(e) => {
                  this.setState({
                    flight_id: e.target.value
                  });
                }
                }>
                  <option disabled selected>--Select--</option>
                  {
                    this.state.flights.map((flight, i)=>
                      <option key={i} value={flight.flight_id}>{flight.flight}</option>
                    )
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
                      class: this.state.classes[parseInt(e.target.value)]
                    });
                  }
                }>
                  <option value={-1} disabled selected>--Select--</option>

                  {
                    this.state.classes.map((element,i) => <option key={i} value={i}>{element}</option>)
                  }
                </select>
              </div>
              <div className='col-md-6'>
                <label htmlFor='seat' className='form-label'>Seat Number</label>
                {
                  this.state.flight_id!==0 && this.state.class !=='' && 
                  <select defaultValue={-1} className='form-control' id='seat'>
                    <option value={-1} disabled selected>--Select--</option>
                    {<option>Test</option>}
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
              <button className='btn btn-primary' >Book</button>
            </div>
        </div>
    );
  }
}

export default AddBooking;