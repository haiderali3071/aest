import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [step, setStep] = useState("signup");
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [degree, setDegree] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [curwork, setCurwork] = useState("");
  const [uploading,setUploading]  =useState(false)
  const [image,setImage] = useState("")
  const [img, setImg] = useState(null);

  const handleLogin = () => {
    navigate("/");
  };
  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not a image, the file is a ${typeof image}`);
      return;
    }

    setImg(image);
  };

  const handleSignupNext = () => {
    // const emailRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const passwordRegex =
    //   /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    // if (email.match(emailRegex)) {
    //   if (password.match(passwordRegex)) {
    //     if (password === confPassword) {
    //       setStep("info");
    //     } else {
    //       setPassword("");
    //       setConfPassword("");
    //       alert("Confirm password doesn't match password!");
    //     }
    //   } else {
    //     setPassword("");
    //     setConfPassword("");
    //     alert(
    //       "Password must contain at least one upper case letter, one lower case letter, one number and one special character! Minimum of length 8!"
    //     );
    //   }
    // } else {
    //   setEmail("");
    //   setPassword("");
    //   setConfPassword("");
    //   alert("Enter valid email address!");
    // }
    setStep("info")
  };

  const handleDoctorNext = () => {
    // const cnicRegex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
    // const phoneRegex = /^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/;
    // const textRegex = /^[a-zA-Z\s,.-]*$/;
    // const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    // if(name.match(textRegex)) {
    //   if(cnic.match(cnicRegex)) {
    //     if(phone.match(phoneRegex)) {
    //       if(degree.match(textRegex)) {
    //         if(address.match(addressRegex)) {
    //           if(curwork.match(textRegex)) {
    //             setStep("img");
    //           } else {
    //             setCurwork("");
    //             alert("Enter valid information in the field!");
    //           }
    //         } else {
    //           setAddress("");
    //           alert("Enter valid address!");
    //         }
    //       } else {
    //         setDegree("");
    //         alert("Enter valid information in the field!");
    //       }
    //     } else {
    //       setPhone("");
    //       alert("Enter valid phone no. (03000000000 or 00923130000000)!");
    //     }
    //   } else {
    //     setCnic("");
    //     alert("Enter valid cnic (00000-0000000-0)!");
    //   }
    // } else {
    //   setName("");
    //   alert("Enter valid name (Henry or Robert Zaryal)!");
    // }
    setStep("img");
  };

  const handleLabNext = () => {
    // const cnicRegex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
    // const phoneRegex = /^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/;
    // const textRegex = /^[a-zA-Z\s]*$/;
    // const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    // if(name.match(textRegex)) {
    //   if(cnic.match(cnicRegex)) {
    //     if(phone.match(phoneRegex)) {
    //       if(address.match(addressRegex)) {
    //         setStep("img");
    //       } else {
    //         setAddress("");
    //         alert("Enter valid address!");
    //       }
    //     } else {
    //       setPhone("");
    //       alert("Enter valid phone no. (03000000000 or 00923000000000)!");
    //     }
    //   } else {
    //     setCnic("");
    //     alert("Enter valid cnic (00000-0000000-0)!");
    //   }
    // } else {
    //   setName("");
    //   alert("Enter valid name (Henry or Robert Zaryal)!");
    // }
    setStep("img");
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('http://localhost:5000/api/uploads', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }


  const submitForm = (e) => {
    e.preventDefault();
    if (usertype === "doctor") {
      axios
        .post("http://localhost:5000/api/doctor/", {
          name: name,
          email: email,
          password: password,
          cnic: cnic,
          degree: degree,
          degreeimage: image,
          phone: phone,
          currentlyworking: curwork,
          address: address,
          usertype: usertype,
        })
        .then(function (response) {
          console.log(response);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:5000/api/lab/", {
          name: name,
          email: email,
          password: password,
          cnic: cnic,
          address: address,
          phone: phone,
          licenseimage: image,
          usertype: usertype,
        })
        .then(function (response) {
          console.log(response);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex justify-center h-full overflow-auto ">
      <section className="h-full gradient-form bg-gray-200 md:h-screen lg:h-full min-h-screen  ">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          alt="logo"
                        />
                        <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                          Welcome to ASistencia COVID-19
                        </h4>
                      </div>
                      <form onSubmit={submitForm}>
                        <p className="mb-4">Please signup for an account</p>
        {step === "signup" ? (
          <>
            <div className="mb-4">
            
              <input
                                type="email"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput1"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
            </div>
            <div className="mb-4" >
            
               <input
                                type="password"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
            </div>
            <div className="mb-4" >
            <input
                                type="password"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput1"
                                placeholder="Confirm Password"
                                value={confPassword}
                                onChange={(e) =>
                                  setConfPassword(e.target.value)
                                }
                              />
            </div>
            <div className="flex flex-row mt-5 mb-5 justify-center">
                              <input
                                type="radio"
                                className="form-radio h-5 w-5 text-gray-600 mr-3"
                                id="doctor"
                                name="usertype"
                                value="doctor"
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
                          <button
                           onClick={handleSignupNext}
                            className="inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 loginBtn"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            Sign Up
                          </button>
                          </div>
                          <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Already have an account?</p>
                          <button
                            type="button"
                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={handleLogin}
                          >
                            Sign In
                          </button>
                          
                        </div>
          </>
        ) : step === "info" && usertype === "doctor" ? (
          <>
                            <div>
                              <label htmlFor="name">Name</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="cnic">CNIC</label>
                              <div className="mb-4">
                                <input
                                  type="number"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={cnic}
                                  onChange={(e) => setCnic(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="phone">Phone No.</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={[phone]}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="degree">Degree</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={degree}
                                  onChange={(e) => setDegree(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="address">Address</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="curwork">Currently Working</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={curwork}
                                  onChange={(e) => setCurwork(e.target.value)}
                                />
                              </div>
                            </div>
                            <button
                            type="button"
                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={handleDoctorNext}
                          >
                            Next
                          </button>
                          </>
        ) : step === "info" && usertype === "lab" ? (
          <>
          <div>
            <label htmlFor="labname">Name</label>
            <div className="mb-4">
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput1"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="labcnic">CNIC</label>
            <div className="mb-4">
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput1"
                placeholder="cnic"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="labphone">Phone No.</label>
            <div className="mb-4">
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput1"
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <div className="mb-4">
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput1"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <button
                            type="button"
                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={handleLabNext}
                          >
                            Next
                          </button>
        </>
        ) : step === "img" && usertype === "doctor" ? (
          <>
          <div>
            <label htmlFor="upload__img">
              Upload Degree Image
            </label>

            <input
              type="file"
              name="upload__img"
              accept="image/png, image/gif, image/jpeg"
              id="upload__img"
              style={{ display: "none" }}
              onChange={(e)=>uploadFileHandler(e)}
            />
          </div>

          <div>
            {img && (
              <div>
                <img
                  className="p-[10px] h-[150px] max-w-[500px] object-contain "
                  src={URL.createObjectURL(img)}
                  alt=""
                />
                <button onClick={() => setImg("")}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            )}
            <button
                            type="submit"
                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                             
                          >
                            Sign Up
                          </button>
          </div>
        </>
        ) : step === "img" && usertype === "lab" ? (
         <>
                            <div>
                              <label htmlFor="upload__img">
                                Upload Lab License Image
                              </label>

                              <input
                                type="file"
                                name="upload__img"
                                accept="image/png, image/gif, image/jpeg"
                                id="upload__img"
                                style={{ display: "none" }}
                                onChange={(e)=>uploadFileHandler(e)}
                                />
                            </div>

                            <div>
                              {img && (
                                <div>
                                  <img
                                    className="p-[10px] h-[150px] max-w-[500px] object-contain "
                                    src={URL.createObjectURL(img)}
                                    alt=""
                                  />
                                  <button onClick={() => setImg("")}>
                                    <i className="fa-solid fa-xmark"></i>
                                  </button>
                                </div>
                              )}
                              <button
                            type="submit"
                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                             
                          >
                            Sign Up
                          </button>
                            </div>
                           
                          </>
        ) : (
          ""
        )}
      </form>

                      {/* <form onSubmit={submitForm}>
                        <p className="mb-4">Please signup for an account</p>
                        {step === "info" ? (
                          <>
                            <div className="mb-4">
                              <input
                                type="email"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput1"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="mb-4">
                              <input
                                type="password"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>

                            <div className="mb-4">
                              <input
                                type="password"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput1"
                                placeholder="Confirm Password"
                                value={confPassword}
                                onChange={(e) =>
                                  setConfPassword(e.target.value)
                                }
                              />
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
                          </>
                        ) : step === "info" && usertype === "doctor" ? (
                          <>
                            <div>
                              <label htmlFor="name">Name</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="cnic">CNIC</label>
                              <div className="mb-4">
                                <input
                                  type="number"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={cnic}
                                  onChange={(e) => setCnic(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="phone">Phone No.</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={[phone]}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="degree">Degree</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={degree}
                                  onChange={(e) => setDegree(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="address">Address</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="curwork">Currently Working</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={curwork}
                                  onChange={(e) => setCurwork(e.target.value)}
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                handleDoctorNext();
                              }}
                              className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full mt-5"
                            >
                              Next
                            </button>
                          </>
                        ) : step === "info" && usertype === "lab" ? (
                          <>
                            <div>
                              <label htmlFor="labname">Name</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="labcnic">CNIC</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="cnic"
                                  value={cnic}
                                  onChange={(e) => setCnic(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="labphone">Phone No.</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="phone"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="address">Address</label>
                              <div className="mb-4">
                                <input
                                  type="text"
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  id="exampleFormControlInput1"
                                  placeholder="Address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                handleLabNext();
                              }}
                              className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full mt-5"
                            >
                              Next
                            </button>
                          </>
                        ) : step === "img" && usertype === "doctor" ? (
                          <>
                            <div>
                              <label htmlFor="upload__img">
                                Upload Degree Image
                              </label>

                              <input
                                type="file"
                                name="upload__img"
                                accept="image/png, image/gif, image/jpeg"
                                id="upload__img"
                                style={{ display: "none" }}
                                onChange={handleChange}
                              />
                            </div>

                            <div>
                              {img && (
                                <div>
                                  <img
                                    className="p-[10px] h-[150px] max-w-[500px] object-contain "
                                    src={URL.createObjectURL(img)}
                                    alt=""
                                  />
                                  <button onClick={() => setImg("")}>
                                    <i className="fa-solid fa-xmark"></i>
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        ) : step === "img" && usertype === "lab" ? (
                          <>
                            <div>
                              <label htmlFor="upload__img">
                                Upload Lab License Image
                              </label>

                              <input
                                type="file"
                                name="upload__img"
                                accept="image/png, image/gif, image/jpeg"
                                id="upload__img"
                                style={{ display: "none" }}
                                onChange={handleChange}
                              />
                            </div>

                            <div>
                              {img && (
                                <div>
                                  <img
                                    className="p-[10px] h-[150px] max-w-[500px] object-contain "
                                    src={URL.createObjectURL(img)}
                                    alt=""
                                  />
                                  <button onClick={() => setImg("")}>
                                    <i className="fa-solid fa-xmark"></i>
                                  </button>
                                </div>
                              )}
                            </div>
                           
                          </>
                        ) : (
                          ""
                        )}
                        <div className="text-center pt-1 mb-12 pb-1">
                          <button
                            type="submit"
                            className="inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 loginBtn"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            Sign Up
                          </button>
                          
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Already have an account?</p>
                          <button
                            type="button"
                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={handleLogin}
                          >
                            Sign In
                          </button>
                          <button
                            type="button"
                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={handleLabNext}
                          >
                            Next
                          </button>
                        </div>
                      </form> */}
                    </div>
                  </div>
                  <div
                    className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                      <h4 className="text-xl font-semibold mb-6">
                        ASistencia COVID-19
                      </h4>
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

    </div>
  );
};

export default SignUpForm;
