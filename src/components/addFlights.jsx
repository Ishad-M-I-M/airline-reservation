import React from 'react';

class AddFlights extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      takeoff_date : '',
      takeoff_time : '',
      landing_date : '',
      landing_time : '',
      route_id:0,
      routes:[],
      aircrafts:[],
      aircraft_id:0,
      button_disabled:true,
    };
    // setInterval(() => {
    //   console.log(`Takeoff Time: ${this.state.takeoff_date} ` + `${this.state.takeoff_time}\nLanding Time: ${this.state.landing_date} ` + `${this.state.landing_time}`);
    // }, 5000);
  }

  async loadAircrafts() {
    if(this.state.aircrafts.length == 0) {
      try {

        let res = await fetch('/aircraft',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        let result = await res.json();
        if(result && result.success) {
          var temp_craft = [];
          result.details.forEach(element => {
            // console.log(element);
            var output = element.model;
            temp_craft[element.aircraft_id] = output;
          });
          this.setState({aircrafts: temp_craft});
        }else {
          console.error(result);
        }
      }catch(error) {}
    }
  }

  async loadRoutes() {
    if(this.state.routes.length == 0) {
      try {

        let res = await fetch('/flightroute',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        let result = await res.json();
        if(result && result.success) {
          var temp_route = [];
          result.details.forEach(element => {
            // console.log(element);
            var output = element.origin + '->' + element.destination;
            temp_route[element.route_id] = output;
          });
          this.setState({routes: temp_route});
        }else {
          console.log(this.state.routes);
          console.error(result);
        }
      }catch(error) {}
    }
  }

  getButton() {
    if(this.state.route_id>0 && this.state.aircraft_id>0 && this.state.landing_date != '' && this.state.landing_time !='' && this.state.takeoff_date != '' && this.state.takeoff_time != '') {
      this.setState({button:false});
      return(<button className='btn btn-primary' onClick={()=>{this.addFlight()}}>Add Flight</button>);
    }else {
      this.setState({button:true})
      return(<button className='btn btn-primary' onClick={()=>{this.addFlight()}} disabled>Add Flight</button>);
    }
  }

  render() {
    
    return (
        <div>
          <h2 className='text-center mt-1'>Add a Flight</h2>
          <form>
            <div className='mb-3'>
              <div className='row'>
                <div className='col-md-6'>
                  <label htmlFor="aircraft" className='form-label'>Aircraft</label>
                  <select defaultValue={-1} id = 'aircraft' className='form-control' onClick={()=>this.loadAircrafts()} onChange={(e)=> this.setState({
                    aircraft: e.target.value
                  })}>
                    <option value={-1} disabled selected> --select-- </option>
                    {
                      this.state.aircrafts.map((model, i) => <option key={i} value={i}>{model}</option>)
                    }
                  </select>
                </div>
    
                <div className='col-md-6'>
                  <label htmlFor='route' className='form-label'>Route</label>
                  <select defaultValue={-1} id = 'route' className='form-control' onClick={()=> this.loadRoutes()} onChange={(e)=> this.setState({
                    route_id: e.target.value
                    })}
                  >
                    <option value={-1} disabled selected> --select-- </option>
                    {
                      this.state.routes.map((route, i) => <option key={i} value={i}>{route}</option>)
                    }
                  </select>
                </div>
              </div>
            </div>
    
            <div className='mb-3'>
              <div className='row'>
                <div className='col-md-6'>
                  <label htmlFor='date' className='form-label'>Takeoff Date</label>
                  <input id='date' className='form-control me-2' type='date' onChange={(e)=>{
                    this.setState({
                      takeoff_date : e.target.value
                    });
                    }} />
                </div>
    
                <div className='col-md-6'>
                  <label htmlFor='time' className='form-label'>Takeoff Time</label>
                  <input id='time' className='form-control me-2' type='time' onChange={(e)=>{
                    this.setState({
                      takeoff_time : e.target.value + ':00',
                    })
                    }} />
                </div>
              </div>
            </div>
    
            <div className='mb-3'>
              <div className='row'>
                <div className='col-md-6'>
                  <label htmlFor='date' className='form-label'>Landing Date</label>
                  <input id='date' className='form-control me-2' type='date' onChange={(e)=>{
                    this.setState({
                      landing_date : e.target.value
                    });
                    }} 
                    />
                </div>
    
                <div className='col-md-6'>
                  <label htmlFor='time' className='form-label'>Landing Time</label>
                  <input id='time' className='form-control me-2' type='time' onChange={(e)=>{
                    this.setState({
                      landing_time : e.target.value + ':00',
                    });
                    }}/>
                </div>
              </div>
            </div>
            
            <div className='mt-5 text-center'>
              {this.getButton()}
            </div>

          </form>
        </div>
    );
  }
}

export default AddFlights;