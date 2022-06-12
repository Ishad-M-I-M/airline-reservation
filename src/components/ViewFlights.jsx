import React from 'react';
import FlightResultOverlay from './FlightResultOverlay';

class ViewFlights extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      codes:[],
      aircrafts:[],
      flight_id:'',
      origin:'',
      destination:'',
      aircraft_id:'',
      past:false,
      future:false,
      resultVisibility:false,
      FlightOutput: [],
    }
  }


  componentDidMount() {
    this.getAirportCodes();
    this.getAircrafts();
  }

  async getAircrafts() {
    if(this.state.aircrafts.length === 0) {
      try {
        let res = await fetch('/aircraft',{
          method:'post',
          headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
          }
        });

        let result = await res.json();

        if(result && result.success) {
          let temp_craft = [];
          result.details.forEach(element => {
            temp_craft.push(`${element.model} - ${element.aircraft_id}`);          
          });
          this.setState({
            aircrafts: temp_craft,
          });
        }else if(result) {
          alert("Refresh Again");
        }
      } catch(error){}
    }
  }

  async getAirportCodes() {
    if(this.state.codes.length === 0){
      try{

        let res = await fetch('/airportCodes',{
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        let result = await res.json();

        if(result && result.success) {
          let temp_codes = [];
          result.codes.forEach(element => {
            temp_codes.push(element.code);
          });
          temp_codes.sort((a, b) => a > b ? 1 : -1);
          this.setState({
            codes:temp_codes,
          });
        }else if(result) {
          alert("Refresh again");
        }
      }catch(error){
        console.error(error);
      }
    }
  }

  async fetchFlightDetails() {
    try{
      let res = await fetch('/fetchFlight/clerk',{
        method: 'post',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          flight_id: this.state.flight_id,
          aircraft_id: this.state.aircraft_id,
          origin: this.state.origin,
          destination: this.state.destination,
          past: this.state.past,
          future: this.state.future,
        })
      });

      let result = await res.json();
      console.log(result);
      if(result && result.success) {
        this.setState({
          FlightOutput: result.data,
          resultVisibility: true,
        });
      }else if(result) {
        alert("Request Failed... Fetch Again...");
      }
    }catch(error){

    }
  }


  render() {

    return (
      <div>
        <h2 className='text-center mt-1'>View Flight Details</h2>
        <div>
          {this.state.resultVisibility && <FlightResultOverlay visibility={this.state.resultVisibility} information={this.state.FlightOutput} onClick={()=>this.setState({resultVisibility:false})}/>}
          <div className='mb-3'>
            <div className='row'>
              <div className='col-md-6'>
                <label htmlFor="flightid" className='form-label'>Flight ID</label>
                {
                (this.state.origin !== '' || this.state.destination !== '' || this.state.aircraft_id !== '') && 
                <input id='flightid' type='text' className='form-control' disabled/>
                }
                {
                  ((this.state.origin === '' && this.state.destination === '') && this.state.aircraft_id==='') &&
                  <input id='flightid' type="text" className='form-control' onChange={(e)=>{
                    this.setState({
                      flight_id: e.target.value,
                    });
                  }} />
                }
              </div>
              <div className='text-center mt-3'>OR</div>
            </div>
          </div>
  
          <div className='mb-3'>
            <div className='row'>

              <div className='col-md-6'>
                <label htmlFor='origin' className='form-label'>Origin</label>
                {
                  (this.state.flight_id !== '' || this.state.aircraft_id !== '')&& 
                  <select className='form-control' disabled>
                    <option>--Select--</option>
                  </select>
                }
                {
                  (this.state.flight_id === '' && this.state.aircraft_id === '' )&&
                  <select className='form-control' id='origin' onChange={(e)=>{
                    this.setState({
                    origin: e.target.value
                    });
                  }}>
                    <option value={''}>--Select--</option>
                    {
                      this.state.codes.map((code, i)=>
                      <option key={i} value={code}>{code}</option>)
                    }
                  </select>
                }
              </div>

              <div className='col-md-6'>
                <label htmlFor='destination' className='form-label'>Destination</label>
                {
                  (this.state.flight_id !== '' || this.state.aircraft_id !== '')&& 
                  <select defaultValue className='form-control' disabled>
                    <option>--Select--</option>
                  </select>
                }
                {
                  (this.state.flight_id === '' && this.state.aircraft_id === '' )&&
                  <select defaultValue={''} className='form-control' id='destination' onChange={(e)=>{this.setState({
                    destination: e.target.value
                  })}}>
                    <option value={''}>--Select--</option>
                    {
                      this.state.codes.map((code, i)=>
                      <option key={i} value={code}>{code}</option>)
                    }
                  </select>
                }
              </div>
              <div className='text-center mt-3'>OR</div>
            </div>
          </div>
  
          <div className='mb-3'>
            <div className='row'>
              <div className='col-md-6'>
                <label htmlFor='aircraft' className='form-label'>Aircraft Model</label>
                {
                  (this.state.flight_id !== '' || this.state.origin !== '' || this.state.destination !== '') &&
                  <select className='form-control' id='aircraft' disabled>
                    <option value={''}>--Select--</option>
                  </select>
                }
                {
                  (this.state.flight_id === '' && this.state.origin === '' && this.state.destination === '') && 
                  <select className='form-control' id='aircraft' onChange={(e)=>{this.setState({
                    aircraft_id: e.target.value
                  })}}>
                    <option value={''} >--Select--</option>
                    {
                      this.state.aircrafts.map((craft, i)=>
                      <option key={i} value={craft.split("-")[1].trim()}>{craft}</option>)
                    }
                  </select>
                }
              </div>
            </div>
          </div>
          
          <div className='mt-5 text-center'>

          </div>

        </div>

        <div className="form-check">
          <ul>
            <li>
              <div className=''>
                <input className="form-check-input" type="checkbox" value="" id="past" onClick={()=>{this.setState({
                  past: !this.state.past,
                })}}/>
                <label className="form-check-label" htmlFor="past">Past Flight Details</label>
              </div>
            </li>
            <li>
              <div className=''>
                <input className="form-check-input" type="checkbox" value="" id="future" onClick={()=>{this.setState({
                  future: !this.state.future,
                })}} />
                <label className="form-check-label" htmlFor="future">Future Flight Details</label>
              </div>
            </li>
          </ul>
          
          </div>
        <div className='mt-5 text-center'>
          <button className='btn btn-primary' onClick={()=>{this.fetchFlightDetails()}}>Fetch Flight Details</button>
        </div>
      </div>
  );
  }
}

export default ViewFlights;