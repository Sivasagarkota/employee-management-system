import axios from "axios";

const EDIT_EMPLOYEE_URL = 'http://localhost:8080/api/employee'

const GET_EMPLOYEE_BY_ID_URL = 'http://localhost:8080/api/employee'

class EditEmployeeService{

    editEmployee(id, updatedEmployeeDetails){

        return axios.put(EDIT_EMPLOYEE_URL + '/' + id, updatedEmployeeDetails);
    }

    getEmployeeById(id){
        return axios.get(GET_EMPLOYEE_BY_ID_URL + '/' + id);
    }

}

export default new EditEmployeeService();