import axios from "axios";

const DELETE_EMPLOYEE_URL = 'http://localhost:8080/api/employee'

class DeleteEmployeeService{

    deleteEmployee(id){
        return axios.delete(DELETE_EMPLOYEE_URL + '/' + id);
    }

}

export default new DeleteEmployeeService();