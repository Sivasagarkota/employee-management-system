import axios from "axios";

const ADD_EMPLOYEE_URL = 'http://localhost:8080/api/employee'

class AddEmployeeService{
    
    addEmployee(employee){
        return axios.post(ADD_EMPLOYEE_URL, employee);
    }
}

export default new AddEmployeeService();