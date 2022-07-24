import React, {useEffect, useState} from 'react'
import '../css/formstyle.css'
import 'bootstrap/dist/css/bootstrap.css';
import AlertMe from './Alert';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";

import {successToast, infoToast, warningToast, errorToast, redirect} from './common/Toasts';

const filter = createFilterOptions();

function AddAircraft() {
  const [value, setValue] = useState("");
  const [models, setmodels] = useState([]);
  const [state, setState] = useState({
    tail: "", total_seats: '', economy: '',
    business: '',
    platinum: '',
    alert: false,

  });



  useEffect(() => {
    axios.get('/aircraft/model').then((res) => {
      console.log(res.data.aircrafts);
      setmodels(res.data.aircrafts);
      // airports.push(res.data.airports);
    }).catch((e) => {
      console.error(e);
    });
  }, []);


  const addFlight = (e) => {
    e.preventDefault();
    if(value === ""){
      warningToast("Please enter a model");
    }else{
    axios.post('/aircraft', {state,value}).then((res) => {
      if (res.data.success) {
        successToast("Aircraft added successfully");
        redirect("/add");

      }

      else if (!res.data.success) {
        if(res.data.duplicate){
          errorToast("Tail ID Already Exits");
        }else{
          warningToast("Aircraft Not Added");

        }
      }

    }).catch((err) => {
      console.log(err);
    });
  }
}



  const AddTail = (event) => {
    setState({
      ...state,
      tail: event.target.value

    })

  }
  const Addseats = (event) => {
    if(event.target.value<0){
      warningToast("Invalid Input");
      event.target.value = '';
    }else{
    setState({
      ...state,
      total_seats: event.target.value

    });
    }

  }
  const Addeconomy = (event) => {
    if (state.total_seats === '') {
      infoToast("Please enter total seats");
      event.target.value = '';
    } else {


      if (event.target.value < 0  || event.target.value > state.total_seats - state.business - state.platinum) {
        warningToast("Invalid economy seat count");

        event.target.value = '';
        setState({
          ...state,
          economy: '',
          alert: true



        });
      } else {
        setState({
          ...state,
          economy: event.target.value

        })

      }
    }

  }
  const Addbusiness = (event) => {
    if (state.total_seats === '') {
      infoToast("Please enter total seats");
      event.target.value = '';
    } else {
      if (event.target.value < 0  || event.target.value > state.total_seats - state.economy - state.platinum) {

        warningToast("Invalid business seat count");
        event.target.value = '';
        setState({
          ...state,
          business: ''

        })
      } else {
        setState({
          ...state,
          business: event.target.value

        })

      }

    }
  }
  const Addplatinum = (event) => {
    // console.log(state.total_seats);
    if (state.total_seats === '') {
      infoToast("Please enter total seats");
      event.target.value = '';
    } else {

      if (event.target.value < 0  || event.target.value > state.total_seats - state.economy - state.business) {
        warningToast("Invalid platinum seat count");
        event.target.value = '';
        setState({
          ...state,
          platinum: ''

        })
      } else {
        setState({
          ...state,
          platinum: event.target.value

        })

      }

    }
  }


  return (
    <div className='Aircraft_form'>

      <AlertMe shows={state.alert} />

      <form onSubmit={addFlight}>

        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setValue({
                model: newValue
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                model: newValue.inputValue
              });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some(
              (option) => inputValue === option.model
            );
            if (inputValue !== "" && !isExisting) {
              filtered.push({
                inputValue,
                model: `Add "${inputValue}"`
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={models}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.model;
          }}
          renderOption={(props, option) => <li {...props}>{option.model}</li>}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Model" />
          )}
        />

        <br />

        <div className="form-floating mb-3">

          <input type="text" className="form-control" id="floatingInput" value={state.tail}
            onChange={AddTail} placeholder="Tail ID" required
          />
          <label htmlFor="floatingInput">Tail ID</label>

        </div>

        <div className="form-floating mb-3">

          <input type="number" className="form-control" id="floatingInput" value={state.total_seats}
            onChange={Addseats} placeholder="Total seats" required
          />
          <label htmlFor="floatingInput">Total seats</label>

        </div>

        <div className="form-floating mb-3">

          <input type="number" className="form-control" id="floatingInput" value={state.economy}
            onChange={Addeconomy} placeholder="Economy seats" required
          />
          <label htmlFor="floatingInput">Economy seats</label>

        </div>


        <div className="form-floating mb-3">

          <input type="number" className="form-control" id="floatingInput" value={state.business}
            onChange={Addbusiness} placeholder="Business seats" required
          />
          <label htmlFor="floatingInput">Business seats</label>

        </div>



        <div className="form-floating mb-3">

          <input type="number" className="form-control" id="floatingInput" value={state.platinum}
            onChange={Addplatinum} placeholder="Platinum seats" required
          />
          <label htmlFor="floatingInput">Platinum seats</label>

        </div>

        <button className="btn btn-primary" type='submit'>Submit</button>



      </form>
    </div>
  )
}


export default AddAircraft;
