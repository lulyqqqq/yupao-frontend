import {UserType} from "../models/user";

let currentUser: UserType;

const setCurrentUserStates = ({user}: { user: any }) =>{
    currentUser = user
}

const getCurrentUserStates = () : UserType =>{
    return currentUser
}
export {
    setCurrentUserStates,
    getCurrentUserStates
}
