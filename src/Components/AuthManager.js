import { Component } from "react";

export class AuthManager extends Component {
  static AuthManager = null;

  static getInstance() {
    return new AuthManager();
  }

  logoutAction() {
    let startPagePath = "http://localhost:3000/";
    logout({ startPagePath });
  }
}
export default AuthManager;
