import { Component } from "react";
export class TimeBankService extends Component {
  static timeBankInstance = null;

  static getInstance() {
    return new TimeBankService();
  }

  async getUserData(jwt) {
    try {
      let userResponse = fetch(`${"http://localhost:8080/api/v1/user/all"}`, {
        headers: {
          authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      if ((await userResponse).ok) {
        let data = (await userResponse).json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getUserRole(jwt, userId) {
    try {
      let userResponse = fetch(
        `${"http://localhost:8080/api/v1/user/role/" + userId}`,
        {
          headers: {
            authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      if ((await userResponse).ok) {
        let data = (await userResponse).json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
export default TimeBankService;
