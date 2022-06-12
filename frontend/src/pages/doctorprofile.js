import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

const DoctorProfile = ({user}) => {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [degree, setDegree] = useState("");
  const [curwork, setCurwork] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [img, setImg] = useState(null);
  const [uploading,setUploading]  =useState(false)
  const [profileName,setProfileName] = useState('')
  const [profileimage, setProfileimage] = useState(user.profileimage)

  // useEffect(()=>{
  // },[])

  const handleEdit = async() => {
    setIsEdit(!isEdit)
    
    try {
      const { data } = await axios.put('http://localhost:5000/api/doctor/profile/'+user._id, {
        name:name,
        cnic:cnic,
        degree:degree,
        currentlyworking:curwork,
        profileimage:profileName
      })

     if(isEdit){
      alert('Updated Successfully')
     }

    } catch (error) {
      console.error(error)
    }

  }

  const handleChange = async (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not a image, the file is a ${typeof image}`);
      return;
    }
    const formData = new FormData()
    formData.append('image', image)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('http://localhost:5000/api/uploads', formData, config)
      const profilePictureName = data.replace('/uploads/','')

      setProfileName(profilePictureName)
      setProfileimage(profilePictureName)

      setImg(image);
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  };
  

  useEffect(() => {
    setName(user.name)
    setCnic(user.cnic)
    setDegree(user.degree)
    setCurwork(user.currentlyworking)
  },[])

  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-900 h-screen w-screen overflow-scroll" style={{background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'}}>
      <Navbar profile={true} />

      <div className="flex justify-center items-center mt-5 ">
        <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
          <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"  src={profileimage != undefined && profileimage != '' ? "http://localhost:5000/uploads/"+profileimage:'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg'} alt="" />
         
          <div className="p-6 flex flex-col justify-start">
            <h5 className="text-gray-900 text-xl font-medium mb-2">Profile Information</h5>
            <div className="text-gray-700 text-base mb-4">
            <p> Here's ypur profile Summary, click on Edit to Update you info!</p>
              <div className="p-6 flex flex-col justify-start">
          
            <div className="flex flex-row">
              <label className="text-gray-900 text-base mb-4 mr-4">Name</label>
              {
                isEdit?<div className="mb-4">
                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1" placeholder={name} value={name}
    onChange={(e) => setName(e.target.value)} />
              </div>
              :<label className="text-gray-900 text-base mb-4">{name}</label>
              }
            </div>
            <div className="flex flex-row">
              <label className="text-gray-900 text-base mb-4 mr-4">CNIC</label>
              {
                isEdit?<div className="mb-4">
                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1" placeholder={cnic} value={cnic}
    onChange={(e) => setCnic(e.target.value)} />
              </div>
              :<label className="text-gray-900 text-base mb-4">{cnic}</label>
              }
            </div>
            <div className="flex flex-row">
              <label className="text-gray-900 text-base mb-4 mr-4">
                Degree
              </label>
              {
                isEdit?<div className="mb-4">
                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1" placeholder={degree} value={degree}
    onChange={(e) => setDegree(e.target.value)} />
              </div>
              :<label className="text-gray-900 text-base mb-4">{degree}</label>
              }
            </div>
            <div className="flex flex-row">
              <label className="text-gray-900 text-base mb-4 mr-4">
                Currently Working
              </label>
              {
                isEdit?<div className="mb-4">
                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1" placeholder={curwork} value={curwork}
    onChange={(e) => setCurwork(e.target.value)} />
              </div>
              :<label className="text-gray-900 text-base mb-4">{curwork}</label>
              }
            </div>

            {isEdit?
            <>
            <div>
                                <label className="hover:text-blue-500"  htmlFor="upload__img" >Upload Profile Photo</label>
                               

                                <input
              type="file"
              name="upload__img"
              accept="image/png, image/jpeg, image/jpg"
              id="upload__img"
              style={{ display: "none" }}
              onChange={handleChange}
            />
                              </div>
                              
                              <div>
                              {img && (
                <div>
                  <img className="p-[10px] h-[80px] max-w-[200px] object-contain " src={URL.createObjectURL(img)} alt="" />
                  <button onClick={() => setImg("")}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              )}
                              </div>
            </>
            :''}
            <div className="flex flex-row mt-3 justify-end">
              <button
                type="button"
                onClick={() => handleEdit()}
                className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Edit
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DoctorProfile;
