import axios from "axios";

const SEARCH_EMPLOYEE_BY_FIRST_NAME_URL = 'http://localhost:8080/api/find-employee';

class SearchEmployeeService {

    findEmployees(searchFor) {
        return axios.get(`${SEARCH_EMPLOYEE_BY_FIRST_NAME_URL}?name=${searchFor}`);
    }
}

export default new SearchEmployeeService();
