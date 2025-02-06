import axios from "axios";

export class UserService {
    apiUrl = "http://localhost:8080/api/user/users/";

    addCustomer(customerDto){
        return axios.post(this.apiUrl + "add", customerDto);
    }

    login(loginDto){
        return axios.post("http://localhost:8080/api/user/auth/login", loginDto);
    }
}