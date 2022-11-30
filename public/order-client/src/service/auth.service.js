import Axios from "axios";

class AuthService {
	login() {
		return Axios.post(process.env.REACT_APP_AUTH_URL + "/login/order", {
			account: process.env.REACT_APP_USERNAME,
			password: process.env.REACT_APP_USERPASSWORD,
		});
	}

	logout(setLoginState) {
		localStorage.removeItem("login");
		setLoginState({ isLogin: false, token: "", user: null });
	}
} //end of AuthService

const authService = new AuthService();
export default authService;
