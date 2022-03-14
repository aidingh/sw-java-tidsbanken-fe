import { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export class TimeBankService extends Component {
  static timeBankInstance = null;

  static getInstance() {
    return new TimeBankService();
  }

  async getUserData(jwt) {
    console.log("wallabai " + jwt);
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

  async postUserData(jwt) {
    try {
      let response = fetch(`${"some val"}/translations/${jwt}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "some id",
          translations: "yo",
        }),
      });

      if ((await response).ok) {
        let data = (await response).json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
export default TimeBankService;
