import React from "react";

class FlightUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isLoaded: false,
            flights: [],
            takeoff_time:'',
            landing_time:'',
        };
    }

    componentDidMount() {
        this.getFlights();
    }

    formatDate(date) {

    }  

    async getFlights() {
        let flight = [];
        try{
            let res = await fetch('/flightsUpdate',{
              method: 'get',
              headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
              }
            });
      
            let result = await res.json();

            if(result && result.success) {
                result.data.map((data, i)=>{
                    let temp = {
                        'flight_id':data.flight_id,
                        'tail_number':data.tail_number,
                        'model':data.model,
                        'takeoff_time': (new Date(data.takeoff_time)).toLocaleString(),
                        'departure_time': (new Date(data.takeoff_time)).toLocaleString(),
                        'origin':data.origin,
                        'destination': data.destination

                    }
                    flight.push(temp);
                });

                this.setState({
                    isLoaded: true,
                    flights: flight,
                });

            }else if(result) {
              alert("Request Failed... Refresh Again...");
            }
          }catch(error){
      
          }
    }

    async updateFlight() {
        try {
            let res = await fetch('/',{
                method: 'get',
                headers: {
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }
              });
        
              let result = await res.json();
        }catch(err) {

        }
    }

    render() {
        return(
            <div>
                <h2 className='text-center mt-1'>Update Flight Time</h2>
                <form>
                    <div className='mb-3 row'>
                        <div className='col-md-12'>
                            <label htmlFor='flight' className='form-label'>Flights</label>
                            <select defaultValue={-1} className='form-control' id='flight' onChange={(e) => {
                                console.log(e.target.value)
                            }}>
                                <option disabled selected>--Select--</option>
                                {this.state.isLoaded === true &&
                                this.state.flights.map((flight, i) =>
                                <option key={i} value={flight.takeoff_time}>{flight.flight_id +" " + flight.tail_number + " " + flight.takeoff_time + " " + flight.departure_time + " " + flight.origin + "->" + flight.destination}</option>
                                )
                                }
                                {
                                this.state.isLoaded === false &&
                                <option disabled>Loading...</option>
                                }
                            </select>
                        </div>
                    </div>

                    <div className='mb-3'>
                        <div className='row'>
                            <div className='col-md-6'>
                            <label htmlFor='time' className='form-label'>Takeoff Time</label>
                                <input id='time' className='form-control me-2' type='time' onChange={(e)=>{
                                    this.setState({
                                        takeoff_time : e.target.value + ':00',
                                    });
                                }} />
                            </div>
    
                            <div className='col-md-6'>
                            <label htmlFor='time' className='form-label'>Landing Time</label>
                                <input id='time' className='form-control me-2' type='time' onChange={(e)=>{
                                    this.setState({
                                        landing_time : e.target.value + ':00',
                                    });
                                }} />
                            </div>
                        </div>
                    </div>
                </form>
                <div className='mt-5 text-center'>
                    <button className='btn btn-primary' onClick={()=>this.updateFlight()}>Update</button>
                </div>
            </div>
        );
    }

}

export default FlightUpdate;