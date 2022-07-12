import React from 'react';
import axios from "axios";

import {errorToast, redirect, successToast} from "./common/Toasts";

const AddAircraftModel = () => {
    const [data, setData] = React.useState({});

    const addModel = (e) => {
        e.preventDefault();
        console.log(data);
        axios.post('/aircraft/model', data)
            .then((res) => {
                successToast("Aircraft Model added successfully");
                redirect("/add");
            })
            .catch((err) => {
                console.log(err);
                errorToast("Aircraft Model Not Added");
                redirect("/add");
            });
    }

    const handleChange = (field, value) => {
        let data_ = {...data};
        data_[field] = value;
        setData(data_);
    }

    return (<div className='Aircraft_form'>
        <form onSubmit={addModel}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="model"
                       onChange={(e) => handleChange('model', e.target.value)} placeholder="Model Name" required
                />
                <label htmlFor="model">Model Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="number" className="form-control" id="economy"
                       onChange={(e) => handleChange('economy', e.target.value)} placeholder="Number of Economy Seats"
                       required
                />
                <label htmlFor="economy">Number of Economy Seats</label>
            </div>
            <div className="form-floating mb-3">
                <input type="number" className="form-control" id="business"
                       onChange={(e) => handleChange('business', e.target.value)} placeholder="Number of Business Seats"
                       required
                />
                <label htmlFor="business">Number of Business Seats</label>
            </div>
            <div className="form-floating mb-3">
                <input type="number" className="form-control" id="platinum"
                       onChange={(e) => handleChange('platinum', e.target.value)} placeholder="Number of Platinum Seats"
                       required
                />
                <label htmlFor="platinum">Number of Platinum Seats</label>
            </div>
            <button className="btn btn-primary" type='submit'>Submit</button>
        </form>
    </div>);
};

export default AddAircraftModel;
