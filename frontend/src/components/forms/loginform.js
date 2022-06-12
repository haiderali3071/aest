import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({user,setUser}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  }, [])

  const handleSignup = () => {
    navigate("/signup");
  };

  const submitForm = (e) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    e.preventDefault();
    if (email.match(emailRegex)) {
      if (usertype !== "") {
        axios
          .post(
            `http://localhost:5000/api/${
              usertype === "Doctor" ? "doctor" : "lab"
            }/login`,
            {
              email: email,
              password: password,
            }
          )
          .then(function (response) {
            setUser(response.data)
            console.log(response.data);
            usertype === "Doctor"
              ? navigate("/doctorprofile")
              : navigate("/labprofile");
          })
          .catch(function (error) {
            console.log(error);
            setEmail("");
            setPassword("");
            alert("Invalid email or password or user type!");
          });
      } else {
        alert("Select user type (Doctor or Laboratory)");
      }
    } else {
      setEmail("");
      setPassword("");
      alert("Enter valid email!");
    }
  };

  return (
    <div className="flex justify-center">
      

      <section className="h-full gradient-form bg-gray-200 md:h-screen ">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <img className="mx-auto w-48" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="logo" />
                        <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">Welcome to ASistencia COVID-19</h4>
                      </div>
                      <form onSubmit={submitForm} >
                        <p className="mb-4">Please login to your account</p>
                        <div className="mb-4">
                          <input type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                          <input type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1" placeholder="Password"  value={password}
              onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-row mt-5 mb-5 justify-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-gray-600 mr-3"
              id="doctor"
              name="usertype"
              value="Doctor"
              onChange={(e) => {
                setUsertype(e.target.value);
              }}
            ></input>
            <label htmlFor="doctor" className="mr-5">
              Doctor
            </label>
            <input
              type="radio"
              className="form-radio h-5 w-5 text-gray-600 mr-3"
              id="laboratory"
              name="usertype"
              value="lab"
              onChange={(e) => {
                setUsertype(e.target.value);
              }}
            ></input>
            <label htmlFor="laboratory" className="mr-5">
              Laboratory
            </label>
          </div>
                        <div className="text-center pt-1 mb-12 pb-1">
                          <button type='submit' className="inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 loginBtn" data-mdb-ripple="true" data-mdb-ripple-color="light" >
                            Log in
                          </button>
                          <a className="text-gray-500" href="#!">Forgot password?</a>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Don't have an account?</p>
                          <button type="button" className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" onClick={handleSignup} >
                            SIgn Up
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none" style={{background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'}}>
                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                      <h4 className="text-xl font-semibold mb-6">ASistencia COVID-19</h4>
                      <p className="text-sm">
                        It is an assisstant application to help in stopping the spread
                        of the novel corona virus 19. It is for educational purpose only
                        and not for medical use. Please always consult with your doctor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* before */}
      {/* <div className="bg-slate-300 flex justify-center h-screen w-screen">
        <form action="" onSubmit={submitForm} className="w-3/5 p-12 md:p-12">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="off"
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-row mt-5 mb-5 justify-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-gray-600 mr-3"
              id="doctor"
              name="usertype"
              value="Doctor"
              onChange={(e) => {
                setUsertype(e.target.value);
              }}
            ></input>
            <label htmlFor="doctor" className="mr-5">
              Doctor
            </label>
            <input
              type="radio"
              className="form-radio h-5 w-5 text-gray-600 mr-3"
              id="laboratory"
              name="usertype"
              value="lab"
              onChange={(e) => {
                setUsertype(e.target.value);
              }}
            ></input>
            <label htmlFor="laboratory" className="mr-5">
              Laboratory
            </label>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full"
          >
            Login
          </button>
          <div className="flex flex-row mt-5 justify-center">
            Don't have an account?{" "}
            <button
              onClick={() => handleSignup()}
              type='button'
              className="text-[red] hover:text-red-600 font-bold"
            >
              Signup here...
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default LoginForm;
