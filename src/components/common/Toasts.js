import {toast} from "react-toastify";

const timeOut = 1500;

const options = {
    toastId: "1",position: "top-right",
    autoClose: timeOut,
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
    }, timeOut);
}

function redirect(path){
    setTimeout(()=>{
        window.location.href = path;
    }, timeOut);
}

export {successToast, infoToast, warningToast, errorToast, reload, redirect};