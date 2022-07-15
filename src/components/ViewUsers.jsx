import React, {useEffect, useState} from 'react';
import axios from "axios";

import Table from "./common/Table";
import Overlay from './common/Overlay';
import {errorToast, redirect, reload, successToast} from "./common/Toasts";

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const [user, setUser] = useState({'name': 'Sample User1', 'role' : 'Clerk', 'discount_type': 'Normal'});

    useEffect(() => {
        axios.get('/user').then((res) => {
            setUsers(res.data.data);
        }).catch((err) => {
            errorToast("Error in fetching users");
            console.log(err);
        });
    }, []);

    const handleUpdate = (id_) =>{
        setUser([...users].filter(({id})=> id === parseInt(id_)).pop());
        setVisibility(true);
    }
    const handleDelete = (id_) => {
        axios.delete(`/user/${id_}`)
            .then(() => {
                successToast("User Deleted Successfully");
                reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleChange = (field, value) => {
        let user_ = {...user};
        user_[field] = value;
        setUser(user_);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        axios.patch(`/user/${user.id}`, {
            'role' : user.role,
            'discount_type': user.discount_type
        })
            .then(() => {
                successToast("User Updated Successfully");
                redirect("/view-users")
            }).catch((err) => {
                console.error(err);
                errorToast("Error in updating user");
        })
    }

    return (<div className='m-3'>
        <Overlay visible={visibility} changeVisibility={setVisibility}>
            <form style={{width: "40vw"}} className={"text-center"} onSubmit={handleSubmit}>
                <h3 className={"mt-5"}>{user.name}</h3>
                <div className={"m-3"}>
                    <label htmlFor={"role"}>Select Role</label>
                    <select id={"role"} className={"form-control"} onChange={(e)=>handleChange("role", e.target.value)}>
                        <option value={"user"} selected={user.role === "user"}>user</option>
                        <option value={"clerk"} selected={user.role === "clerk"}>clerk</option>
                        <option value={"moderator"} selected={user.role === "moderator"}>moderator</option>
                    </select>
                </div>
                <div className={"m-3"}>
                    <label htmlFor={"discount_type"}>Select Discount Type</label>
                    <select id = {"discount_type"} className={"form-control"} onChange={(e)=> handleChange("discount_type", e.target.value)}>
                        <option value={"Normal"} selected={user.discount_type === "Normal"}>Normal</option>
                        <option value={"Frequent"} selected={user.discount_type === "Frequent"}>Frequent</option>
                        <option value={"Gold"} selected={user.discount_type === "Gold"}>Gold</option>
                    </select>
                </div>
                <button type="submit" className={"btn btn-primary"}>Update</button>

            </form>
        </Overlay>
        <Table id={"id"} tableHeadings={{"name": "Name", "email": "Email", "role": "Role", "discount_type": "Discount Type", "dob": "Date of Birth"}} tableData={users}
               deleteHandler={handleDelete} updateHandler={handleUpdate}/>
    </div>);
};

export default ViewUsers;
