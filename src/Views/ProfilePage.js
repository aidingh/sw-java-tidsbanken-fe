import {React, useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../Elements/LoadingSpinner";
import { Navigate } from "react-router-dom";
import ApplicationFrame from "../Elements/ApplicationFrame";
import InputComponent from "../Components/InputComponent"
import { patchData,useFetch } from "../Service/TimeBankService";

function ProfilePage() {
  
  const [buttonText,setButtonText] = useState('Enable Edit Mode');
  const [isDisabled, setIsDisabled] = useState(true);
  const [email,setEmail] = useState('');
  const [nickname,setNickname] = useState('');

  const token = useSelector((state) => state.token_reducer.value);
  const bearer = `Bearer ${token.jwt_token}`;

  const state = useSelector((state) => state.token_reducer.value);
  const { isAuthenticated, isLoading, user, logout } = useAuth0();

  useEffect(() => {
    setNickname(state.user.nickname);
    setEmail(state.user.email);
  }, []);
  
  /**
   * Performs a request which triggers an email being sent to the current user with a link to change the password.
   */
  async function changePass() {
    const bearer = `Bearer ${state.jwt_token}`;
    await useFetch( `http://localhost:8080/api/v1/user/changePassword/${user.email}`, bearer,() => {
      alert("You have received a link to change password on your email.");
    })
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  /**
   * Changes the button text and unlocks the fields for edit.
   * Performs a patch request with the updated information.
   */
  function editUserInformation(){
    if(isDisabled)
    {
      // Enter Edit Mode
      setButtonText('Confirm and update information');
      setIsDisabled(false);
    }
    else
    {
      // Edits has been confirmed, doing a patch request with updated user infoormation 
      setButtonText("Updating....")
      const userId = user.sub.split('|');
      patchData("http://localhost:8080/api/v1/updateUserAuth0",bearer,{
        "id":userId[1],
        "nickname":nickname,
        "email":email
      }, () => {
        alert("succesfully updated user")
        setButtonText('Enable Edit Mode');
      })
      setIsDisabled(true);
    }
  }
  
  function onNicknameChange(event){
    setNickname(event.target.value);
  }

  function onEmailChange(event){
    setEmail(event.target.value);
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
            <InputComponent isDisabled={isDisabled} label="Nickname" handleChange={onNicknameChange} type="text" value={nickname} />
          </div>

          <div className='self-center mt-6'>
            <InputComponent isDisabled={isDisabled} label="Email" handleChange={onEmailChange} type="text" value={email} />
          </div>

          <div className='grow flex justify-center items-center'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded justify-self-center' onClick={editUserInformation}>{buttonText}</button>
          </div>

          <div className='grow flex justify-center items-center'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded justify-self-center' onClick={changePass}>Change password</button>
          </div>
        </div>

      </>
    )}
    </>
  );
}
export default ProfilePage;
