import React from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../Elements/LoadingSpinner";
import { Navigate } from "react-router-dom";
import ApplicationFrame from "../Elements/ApplicationFrame";
import InputComponent from "../Components/InputComponent"
function ProfilePage() {

  const { logout } = useAuth0();
  const token = useSelector((state) => state.token_reducer.value);
  const bearer = `Bearer ${token.jwt_token}`;
  const state = useSelector((state) => state.token_reducer.value);
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }


  function startLogOutAction() {
    let startPagePath = "http://localhost:3000/";
    logout({ startPagePath });
  }
  return (
    <>
    {!isAuthenticated && <Navigate to="/" />}
    {isAuthenticated && (
      <>
        <ApplicationFrame startLogOutAction={startLogOutAction}/>
        <div className="w-96 h-96 pt-10 bg-white m-auto flex flex-col">
          <div className="w-6/12 sm:w-4/12 px-4 self-center mt-6">
              <img
                src={user.picture}
                alt="..."
                className="shadow-lg rounded max-w-full h-auto align-middle border-none"
              />
          </div>

          <div className='self-center mt-6'>
            <InputComponent isDisabled={true} label="First Name" type="text" value={"Love"} />
          </div>

          <div className='self-center mt-6'>
            <InputComponent isDisabled={true} label="Last Name" type="text" value={"Beling"} />
          </div>

          <div className='self-center mt-6'>
            <InputComponent isDisabled={true} label="Email" type="text" value={"Beling"} handleChange={() => console.log("hej")}/>
          </div>
        </div>
      </>
    )}
    </>
  );
}
export default ProfilePage;
