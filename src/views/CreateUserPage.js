import { useState } from "react";
import InputComponent from "../Components/InputComponent"

function CreateUserPage() {
    const [email, setEmail] = useState([]);

    function emailOnChange(event){
        setEmail(event.target.value);
    }

    const submitForm = (event) => {
        event.preventDefault();
        console.log(email);
    }

  return (
      <form className="w-96 h-96 pt-10 bg-white m-auto flex flex-col">
          <div className='self-center mt-6'>
            <InputComponent label="First Name" type="text" handleChange={emailOnChange}/>
          </div>

          <div className='self-center mt-6'>
            <InputComponent label="Last Name" type="text" handleChange={emailOnChange}/>
          </div>

          <div className='self-center mt-6'>
            <InputComponent label="Email" type="text" handleChange={emailOnChange}/>
          </div>

          <div className='self-center mt-6'>
            <InputComponent label="Temporary Password" type="text" handleChange={emailOnChange}/>
          </div>


          <div className='self-center mt-6 pb-3'>
            <input id="checkbox-2" aria-describedby="checkbox-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Make this user admin</label>
          </div>

          <div className='grow flex justify-center items-center'>
            <button className='bg-blue-500 hover:bg-blue-700
            text-white font-bold py-2 px-12 rounded justify-self-center' onClick={submitForm}>Submit</button>
          </div>
      </form>
  );
}
export default CreateUserPage;