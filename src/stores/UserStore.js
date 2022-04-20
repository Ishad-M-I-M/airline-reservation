import { extendObservable } from 'mobx';


class UserStore{
    constructor(){
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            role: '',
            email: '',
        });
    }
}

export default new UserStore();