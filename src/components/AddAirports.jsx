import axios from 'axios';
import React, {  useEffect, useState } from 'react'

export default function AddAirports() {
    const [inputs, setInputs] = useState({});
    const [locationFields, setLocationFields] = useState([{location: "", htmlId: 1, exist: false, id : null, parent_id : null}]);
    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get('/location').then((res)=>{
            setData(res.data.locations);
        })
    }, []);
    

    let handleChange = (e) => {
        let data = {...inputs};
        data[e.target.name] = e.target.value;
        setInputs(data);
    }

    let addField = () => {
        let newLocations = [...locationFields];
        newLocations.push({location: "", htmlId: locationFields.length + 1, exist: false});
        setLocationFields(newLocations);
        
    }

    let handleLocationChange = (e) => {
        let isExist = data.filter(({location})=> location === e.target.value).length > 0;
        let updated = [...locationFields].map((field)=>{
            if (e.target.id == field.htmlId){
                let newField = {htmlId: field.htmlId, exist: isExist, location: e.target.value};
                if(isExist){
                    for (let i =0; i < data.length; i++){
                        if(data[i].location === e.target.value) {
                            newField['id'] = data[i].id;
                            newField['parent_id'] = data[i].parent_id;
                        };
                    }
                }
                return newField;
            }
            else return field;
        });

        if(isExist){
            let e = updated.pop();
            let htmlId = e.htmlId;
            updated.push(e);

            let parent = e.parent_id;
            while (parent != null){
                e = data.filter(({id})=> parent === id)[0];
                e['htmlId'] = ++htmlId;
                e['exist'] = true;
                updated.push(e);
                parent = e.parent_id;
            }
        }
        else{
            updated = updated.filter(({exist})=> exist != true);
        }

        let updatedInputs = {... inputs};
        updatedInputs['location'] = updated;
        setInputs(updatedInputs);
        setLocationFields(updated);        
    }

    let handleSubmit = (e) => {
        console.log(inputs);

        axios.post('/airport',inputs).then(()=>{
            alert('Saved airport sucessfully');
        }).catch((err)=>{
            console.log(err);
        });
    }

    let handleRemove = (htmlId_) =>{
        let newlocationFields = locationFields.filter(({htmlId}) => htmlId != htmlId_);
        let i = 1;
        newlocationFields = newlocationFields.map((field)=>{
            field['htmlId'] = i++;
            return field;
        })
        setLocationFields(newlocationFields);
    }

  return (
    <div className='m-3'>
        <form onSubmit={handleSubmit}>
            <div className='mb-3 row'>
                <div className='col-3'>
                    <label htmlFor='code' className='form-label'>Airport Code :</label>
                </div>
                <div className='col-7'>
                    <input name='code' className='form-control' maxLength={3} type="text" value={inputs.code || ""} onChange={(e) => handleChange(e)}></input>
                </div>
            </div>
            <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Airport Name :</label>
                <input name='name' className='form-control' type="text" value={inputs.name || ""} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className='mb-3'>
                <div className='mb-3'>
                    <label className='form-label'>Airport Location :</label>
                    <button type="button" className='btn btn-primary ms-5' onClick={addField}>Add Another Location Field</button>
                </div>
                <div>
                    <datalist id='locations'>
                        {data.map(({id, location})=>{
                            return <option key={id} data-value={id}>{location}</option>
                        })}
                    </datalist>
                    {locationFields.map(({htmlId, location})=>{
                        return <div className='mb-2 row' key={htmlId}>
                                <div className='col-9'>
                                <input type="text" list='locations' className="form-control" id={htmlId} onChange={(e) => handleLocationChange(e)} value={location}></input>
                                </div>
                                <div className='col-3'>
                                    <button className='btn btn-danger' type='button' onClick={()=> handleRemove(htmlId)}>-</button>
                                </div>
                            </div>
                    })}
                </div>                
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}
