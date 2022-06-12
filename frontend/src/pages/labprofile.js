import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import axios from "axios";

const LabProfile = ({user}) => {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState(null);
  const [phone, setPhone] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [uploading,setUploading]  =useState(false)
  const [profileName,setProfileName] = useState('')
  const [profileimage, setProfileimage] = useState(user.profileimage)

  const handleEdit = async() => {
    setIsEdit(!isEdit)
    try {
      const { data } = await axios.put('http://localhost:5000/api/lab/profile/'+user._id, {
        name:name,
        cnic:cnic,
        phone:phone,
        address:address,
        profileimage:profileName
      })
      
      if(isEdit){
        alert('Updated Successfully')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = async(e) => {
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
  }

  useEffect(() => {
    setName(user.name)
    setCnic(user.cnic)
    setAddress(user.address)
    setPhone(user.phone)
  },[user])

  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-900 h-screen w-screen">
      <Navbar user={user}/>
      <div className="flex justify-center mt-24">
        <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-gray-100 shadow-lg">
          <img
            className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
            
            src={profileimage != undefined && profileimage != '' ? "http://localhost:5000/uploads/"+profileimage:'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg'}
            alt=""
          />
          <div className="p-6 flex flex-col justify-start">
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              Profile Information
            </h5>
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
                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput2" placeholder={cnic} value={cnic}
    onChange={(e) => setCnic(e.target.value)} />
              </div>
              :<label className="text-gray-900 text-base mb-4">{cnic}</label>
              }
            </div>
            <div className="flex flex-row">
              <label className="text-gray-900 text-base mb-4 mr-4">
                Phone
              </label>

            {
                isEdit?<div className="mb-4">
                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1" placeholder={phone} value={phone}
    onChange={(e) => setPhone(e.target.value)} />
              </div>
              :<label className="text-gray-900 text-base mb-4">{phone}</label>
              }
            </div>
            <div className="flex flex-row">
              <label className="text-gray-900 text-base mb-4 mr-4">
                Address
              </label>
              
        
               {
                isEdit?<div className="mb-4">
                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1" placeholder={address} value={address}
    onChange={(e) => setAddress(e.target.value)} />
              </div>
              :<label className="text-gray-900 text-base mb-4">{address}</label>
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
  );
};

export default LabProfile;
