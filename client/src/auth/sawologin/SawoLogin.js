import React, { useEffect,useCallback } from "react";
import Sawo from "sawo";
import styles from "./styles"
import axios from "axios";
import { authenticate, isAuth } from "../Helpers";


const SawoLogin = ({ history})=> {
  
  // Sawo: 
  // OnSuccess Callback method

  const onSuccessLogin = useCallback(async(payload) => {
    const email = payload.identifier

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_DEPLOYED_API}/sawo/signin`,
      data: { email},
    })
      .then((response) => {
        
        // save the response {user, token} in local storage/cookie
        authenticate(response,()=>{
          console.log("signin successful")
        })
        isAuth() && isAuth().role === "admin"? history.push("/admin"): history.push("/");

      })
      .catch((error) => {
        console.log("signin error", error);
        // setValues({ ...values, buttonText: "Submit" });
        // toast.error(error.response.data.error);
      });
      
    
  },[history])

  useEffect(() => {

    // Sawo Configuration, required to render form in the container
    // onSuccess callback will get invoke, after successful login


    const sawoConfig = {
      // should be same as the id of the container
      containerID: "sawo-container",
      // can be one of 'email' or 'phone_number_sms'
      identifierType: "email",
      // Add the API key
      apiKey: `${process.env.REACT_APP_SAWO_API_KEY}`,
      // Add a callback here to handle the payload sent by sdk
      onSuccess: onSuccessLogin
    };

    // creating instance
    let sawo = new Sawo(sawoConfig)

    // calling method to show form
    sawo.showForm();
  }, [onSuccessLogin])





  return (
    <React.Fragment>
      
      <div style={styles.containerStyle}>
        <section>
        <h3>Enter your email below</h3>
              <div style={styles.formContainer} id="sawo-container">
                {/* Sawo form will appear here */}
              </div>

        </section>
      </div>
    </React.Fragment>
  );
}

export default SawoLogin;
