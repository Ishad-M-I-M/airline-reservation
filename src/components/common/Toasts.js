import {toast} from "react-toastify";

const options = {
    toastId: "1",position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
};

function successToast(message){
    toast.success(message, options);
}

function infoToast(message){
    toast.info(message, options);
}

function errorToast(message){
    toast.error(message, options);
}

function warningToast(message) {
    toast.warn(message, options);
}

function reload(){
    setTimeout(()=>{
        window.location.reload();
    }, 1500);
}

export {successToast, infoToast, warningToast, errorToast, reload};