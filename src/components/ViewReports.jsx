import React from 'react';
import TotalRevenueOverlay from './TotalRevenueOverlay';
import PassengerDetailsOverlay from './PassengerDetailsOverlay';
import PassengerCountOverlay from './PassengerCountOverlay';
import BookingReportOverlay from './BookingReportOverlay';
import PastFlightDetailsOverlay from './PastFlightDetailsOverlay';


class ViewReports extends React.Component {

  constructor(props) {
    super(props);
    this.state = {   

      aircraft_id:'',
      flight:'',
      Startdate:'',
      Enddate:'',
      Origin: '',
      Destination:'',

      below: false,
      above: false,

      resultVisibility1:false,
      resultVisibility2:false,
      resultVisibility3:false,
      resultVisibility4:false,
      resultVisibility5:false,

      PassengerDetailsOutput: [],
      TotalRevenueOutput: [],
      PassengerCountOutput: [],
      BookingReportOutput: [],
      PastFlightDetailsOutput: [],
    }
  }

  async fetchPassengerDetailsReport() {
    try{
      let res = await fetch('/report/passenger-details',{
        method: 'post',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          flight: this.state.flight,
          below: this.state.below,
          above: this.state.above,
        })
      });

      let result = await res.json();
      console.log(result);
      if(result && result.success) {
        this.setState({
          PassengerDetailsOutput: result.data,
          resultVisibility1: true,
        });

      }else if(result) {
        alert("Request Failed... Fetch Again...");
      }
    }catch(error){
      console.log('Error: ', error);
    }
  }

  async fetchTotalRevenueReport() {
    try{
      let res = await fetch('/report/total-revenue',{
        method: 'post',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          aircraft_id: this.state.aircraft_id,
        })

      });

      let result = await res.json();

      if(result && result.success) {
        this.setState({
          TotalRevenueOutput: result.data,
          resultVisibility2: true,
        });

      }else if(result) {
        alert("Request Failed... Fetch Again...");
      }
    }catch(error){
      console.log('Error: ', error);
    }
  }

  async fetchPassengerCountReport() {
    try{
      let res = await fetch('/report/passenger-count',{
        method: 'post',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          Startdate: this.state.Startdate,
          Enddate: this.state.Enddate,
          Destination: this.state.Destination,
        })
      });

      let result = await res.json();

      if(result && result.success) {
        this.setState({
          PassengerCountOutput: result.data,
          resultVisibility3: true,
        });

      }else if(result) {
        alert("Request Failed... Fetch Again...");
      }
    }catch(error){
      console.log('Error: ', error);
    }
  }

  async fetchBookingReport() {
    try{
      let res = await fetch('/report/bookings',{
        method: 'post',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          Startdate: this.state.Startdate,
          Enddate: this.state.Enddate,
        })
      });

      let result = await res.json();

      if(result && result.success && result.entry) {
        this.setState({
          BookingReportOutput: result.data,
          resultVisibility4: true,
        });

      } else if(result && !result.success && result.entry) {
        alert("Request Failed... Fetch Again...");
      
      } else if (result && !result.success && !result.entry) {
        alert("Enter specific Date Range...");
      }
    }catch(error){
      console.log('Error: ', error);
    }
  }

  async fetchPastFlightDetailsReport() {
    try{
      let res = await fetch('/report/past-flight-details',{
        method: 'post',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          Origin: this.state.Origin,
          Destination: this.state.Destination,
        })
      });

      let result = await res.json();

      if(result && result.success) {
        this.setState({
          PastFlightDetailsOutput: result.data,
          resultVisibility5: true,
        });

      }else if(result) {
        alert("Request Failed... Fetch Again...");
      } 
    }catch(error){
      console.log('Error: ', error);
    }
  }


  render() {
    const {items } = this.state;

    return (
      <div>
        <h2 className='text-center mt-1'>View Reports</h2>
        
        <div>

          {this.state.resultVisibility1 && <PassengerDetailsOverlay visibility={this.state.resultVisibility1} information={this.state.PassengerDetailsOutput} onClick={()=>this.setState({resultVisibility1:false})}/>}
          {this.state.resultVisibility2 && <TotalRevenueOverlay visibility={this.state.resultVisibility2} information={this.state.TotalRevenueOutput} onClick={()=>this.setState({resultVisibility2:false})}/>}
          {this.state.resultVisibility3 && <PassengerCountOverlay visibility={this.state.resultVisibility3} information={this.state.PassengerCountOutput} onClick={()=>this.setState({resultVisibility3:false})}/>}
          {this.state.resultVisibility4 && <BookingReportOverlay visibility={this.state.resultVisibility4} information={this.state.BookingReportOutput} onClick={()=>this.setState({resultVisibility4:false})}/>}
          {this.state.resultVisibility5 && <PastFlightDetailsOverlay visibility={this.state.resultVisibility5} information={this.state.PastFlightDetailsOutput} onClick={()=>this.setState({resultVisibility5:false})}/>}



          <div className="col-3 text-center fw-bold fs-7">
            <label htmlFor="flight" className="form-label"> Flight Model </label>
          </div>

          <div className="row">
            <div className="col-3">
              <input id = "flight" className="form-control" type="text" placeholder='Eg :- N123SP' onChange={(e)=>{this.setState({ flight: e.target.value })}} />
            </div>

            <div className=" col-5 form-check">
              <ul>
                <li>
                  <div className=''>
                    <input className="form-check-input" type="checkbox" value="" id="below" onClick={()=>{this.setState({ below: !this.state.below,})}}/>
                    <label className="form-check-label" htmlFor="below"> Age Below 18 Passenger Details</label>
                  </div>
                </li>
                <li>
                  <div className=''>
                    <input className="form-check-input" type="checkbox" value="" id="above" onClick={()=>{this.setState({ above: !this.state.above, })}} />
                    <label className="form-check-label" htmlFor="above"> Age Above 18 Passenger Details</label>
                  </div>
                </li>
              </ul>          
            </div>

            <div className="col-3">
              <button className='btn btn-primary' onClick={()=>{this.fetchPassengerDetailsReport()}}>Fetch Passenger Details Report</button>
            </div>
          </div>



          <div className='mt-4 text-center' style={{ borderStyle: 'dashed', borderWidth: 2,}} />
          <div className='mt-4 text-center' />



          <div className="col-3 text-center fw-bold fs-7">
            <label htmlFor='aircraft' className='form-label'> Aircraft Model </label>
          </div>

          <div className="row">
            <div className="col-3">
              <input id = "aircraft" className="form-control" type="text" placeholder='Eg :- Boeing 737' onChange={(e)=>{this.setState({ aircraft_id: e.target.value })}} />
            </div>
          
            <div className='col-5'> </div>

            <div className='col-3'>
              <button className='btn btn-primary' onClick={()=>{this.fetchTotalRevenueReport()}}>Fetch Total Revenue Report</button>
            </div>
          </div>



          <div className='mt-4 text-center' style={{ borderStyle: 'dashed', borderWidth: 2,}} />
          <div className='mt-4 text-center' />



          <div className="col-3 text-center fw-bold fs-7">
            <label htmlFor='dateRange' className='form-label'> Date Range (yyyy-mm-dd) </label>
          </div>

          <div className="row">
            <div className="col-3">
              <input id = "startDate" className="form-control" type="text" placeholder='Eg :- 2022-05-25' onChange={(e)=>{this.setState({ Startdate: e.target.value })}} />
            </div>
            <div className="col-md-1 text-center align-middle fw-bold fs-5"> to </div>
            <div className="col-md-3 text-center fw-bold fs-7">
              <input id = "endDate" className="form-control" type="text" placeholder='Eg :- 2022-06-01' onChange={(e)=>{this.setState({ Enddate: e.target.value })}} />
            </div>

            <div className='col-1'> </div>

            <div className='col-3'>
              <button type="button" className='btn btn-primary' onClick={()=>{this.fetchBookingReport()}}>Fetch Booking Report</button>
            </div>
          </div>

          <div className='mt-4 text-center'> </div>

          <div className="row">
            <div className="col-3 text-center fw-bold fs-7">
              <label htmlFor='destination' className='form-label'> Destination </label>
              <input id = "destination" className="form-control" type="text" placeholder='Eg :- BIA' onChange={(e)=>{this.setState({ Destination: e.target.value })}} />
            </div>

            <div className='col-5'> </div>

            <div className='col-3'>
            <button type="button" className='btn btn-primary' onClick={()=>{this.fetchPassengerCountReport()}}>Fetch Passenger Count Report</button>
            </div>
          </div>



          <div className='mt-4 text-center' style={{ borderStyle: 'dashed', borderWidth: 2,}} />
          <div className='mt-4 text-center' />


          <div className="row align-items-center mb-3">
            <div className="col-3 text-center fw-bold fs-7">
              <label htmlFor='origin' className='form-label'> Origin </label>
              <input id = "origin" className="form-control" type="text" placeholder='Eg :- CGK' onChange={(e)=>{this.setState({ Origin: e.target.value })}} />
            </div>

            <div className="col-md-1 text-center align-middle fw-bold fs-5"> to </div>

            <div className="col-md-3 text-center fw-bold fs-7">
              <label htmlFor='destination' className='form-label'> Destination </label>
              <input id = "destination" className="form-control" type="text" placeholder='Eg :- BIA' onChange={(e)=>{this.setState({ Destination: e.target.value })}} />
            </div>

            <div className='col-1'> </div>

            <div className='col-4'>
              <button className='btn btn-primary' onClick={()=>{this.fetchPastFlightDetailsReport()}}>Fetch Past Flights Details Report</button>
            </div>
          </div>

        </div>
      </div>
  );
  }
}

export default ViewReports;
