import { useState } from "react";
import InputComponent from "../Components/InputComponent"
import { postData } from "../Service/TimeBankService";
import { useSelector } from "react-redux";
import ApplicationFrame from "../Elements/ApplicationFrame";
import { useAuth0 } from "@auth0/auth0-react";
function CreateUserPage() {
  const { logout } = useAuth0();
  const token = useSelector((state) => state.token_reducer.value);
  const bearer = `Bearer ${token.jwt_token}`;

  const [buttonText,setButtonText] = useState('Create User');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  function isAdminOnChange(event){
    setIsAdmin(event.target.checked);
  }
  function passwordOnChange(event){
    setPassword(event.target.value);
  }
  function lastNameOnChange(event){
    setLastName(event.target.value);
  }
  function firstNameOnChange(event){
    setFirstName(event.target.value);
  }
  function emailOnChange(event){
    setEmail(event.target.value);
  }

  async function submitForm(event){
    event.preventDefault();
    setButtonText('Creating User....');
    
    if(!validName(firstName))
    {
      alert("First name is not valid")
      return;
    }

    if(!validName(lastName)){
      alert("Last name is not valid")
      return;
    }

    if(!validEmail(email)){
      alert("email is not valid");
      return;
    }
    
    postData(`http://localhost:8080/api/v1/createUser`, bearer,
    {
      "firstName":firstName,
      "lastName":lastName,
      "email":email,
      "isAdmin":isAdmin
    },
    () => {
      alert("Created user " + email);
      
      setButtonText('Create User');
      setPassword("");
      setFirstName("");
      setLastName("");
      setEmail("");
    });
  }

  function validEmail(email){
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(email.match(mailformat)){
      return true;
    }
    else{
      return false;
    }
  }

  function validName(name){
    const regName = /^[a-zA-Z]+$/;

    if(name.match(regName)){
      return true
    }
    else{
      return false;
    }
  }

  function startLogOutAction() {
    let startPagePath = "http://localhost:3000/";
    logout({ startPagePath });
  }

  return (
    <>
    <ApplicationFrame startLogOutAction={startLogOutAction}/>
      <form className="w-96 h-96 pt-10 bg-white m-auto flex flex-col">
          <div className='self-center mt-6'>
            <InputComponent label="First Name" type="text" value={firstName} handleChange={firstNameOnChange}/>
          </div>

          <div className='self-center mt-6'>
            <InputComponent label="Last Name" type="text" value={lastName} handleChange={lastNameOnChange}/>
          </div>

          <div className='self-center mt-6'>
            <InputComponent label="Email" type="text" value={email} handleChange={emailOnChange}/>
          </div>

          <div className='self-center mt-6'>
            <InputComponent label="Temporary Password" type="text" value={password} handleChange={passwordOnChange}/>
          </div>


          <div className='self-center mt-6 pb-3'>
            <input id="checkbox-2" aria-describedby="checkbox-2" type="checkbox" onChange={isAdminOnChange} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Make this user admin</label>
          </div>

          <div className='grow flex justify-center items-center'>
            <button className='bg-blue-500 hover:bg-blue-700
            text-white font-bold py-2 px-12 rounded justify-self-center' onClick={submitForm}>{buttonText}</button>
          </div>
      </form>
    </>
  );
}
export default CreateUserPage;