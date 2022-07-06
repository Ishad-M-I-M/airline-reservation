import React from 'react';
import PropTypes from 'prop-types';

const Overlay = (props) => {

    return (
        <div className='overlay' style={{
            display: (props.visible? 'block' : 'none'),
        }}>
            <div className='container-overlay rounded p-3'>
                <button className='btn btn-danger' style={{
                    marginRight:'5px',
                    marginTop:'5px',
                    paddingTop:'1px',
                    paddingBottom:'1px',
                    paddingLeft:'7px',
                    paddingRight:'7px',
                    float:'right'
                }} onClick={()=>{
                    props.changeVisibility(false);
                }}>&times;</button>
                <div style={{color: "black"}}>
                    {props.children}
                </div>
            </div>

        </div>
    );
};

Overlay.propTypes = {
    visible : PropTypes.bool,
    changeVisibility : PropTypes.func
}

export default Overlay;
