import React, { useEffect, useState } from 'react'
import '../css/formstyle.css'
import 'bootstrap/dist/css/bootstrap.css';
import AlertMe from './Alert';
import { toast } from "react-toastify";
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

function AddAircraft() {
  const [value, setValue] = useState("");
  const [models, setmodels] = useState([]);
  const [state, setState] = useState({
    tail: "",
    total_seats: '',
    economy: '',
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
      toast.warn("Enter Model", {
        toastId: "1",position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
      });
    }else{
    axios.post('/aircraft', {state,value}).then((res) => {
      if (res.data.success) {
        toast.success("Aircraft Added", {
          toastId: "1",position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
        });
        setTimeout(() => {
          console.log("working");; // count is 0 here
          window.location.href  = "/add";
          }, 1500);
        // handleClick({
        //   vertical: 'top',
        //   horizontal: 'center'
        // })()
      }

      else if (!res.data.success) {
        if(res.data.duplicate){
          toast.error("Tail ID Already Exits", {
            toastId: "1",position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: 0,
          });
        }else{
          toast.warn("Aircraft Not Added", {
            toastId: "1",position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: 0,
          });

        }
        // console.log(res.data);
        
        // nav("/");
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
      toast.warn("Invalid Input", {
     
        toastId: "1",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
      });
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
      toast.info("Fill the total seats", {
     
        toastId: "1",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
      });
      event.target.value = '';
    } else {


      if (event.target.value < 0  || event.target.value > state.total_seats - state.business - state.platinum) {
        toast.warn("Invalid economy seat count", {
    
          toastId: "1",position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
        });

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
      toast.info("Fill the total seats", {
        
        toastId: "1",position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
      });
      event.target.value = '';
    } else {
      if (event.target.value < 0  || event.target.value > state.total_seats - state.economy - state.platinum) {

        toast.warn("Invalid business seat count", {
 
          toastId: "1",position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
        });



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
      toast.info("Fill the total seats", {
   
        toastId: "1",position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
      });
      event.target.value = '';
    } else {

      if (event.target.value < 0  || event.target.value > state.total_seats - state.economy - state.business) {


        toast.warn("Invalid platinum seat count", {

          toastId: "1",position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
        });
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


  // console.log(models);


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
