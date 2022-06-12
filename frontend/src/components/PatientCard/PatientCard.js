import React, { useEffect, useState } from "react";
import axios from "axios";

function PatientCard({item, pending, completed, handleAccept, handleReject, markAsCompleted, type}) {
  const [img, setImg] = useState(null);  
  const [uploading,setUploading]  =useState(false)
  const Chip=()=>{
        return <div class="flex flex-wrap justify-center space-x-2 items-end">
       
      
       <span
      class="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max">
      <img class="rounded-full w-9 h-9 max-w-none" alt="A"
        src= {item?.profileImage != '' ?'http://localhost:5000/uploads/'+item.profileImage:"https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg"}  />
      <span class="flex items-center px-3 py-2">
      {item.name}
      </span>
     
    </span>
      </div>
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
    
    
          setImg(image);
          setUploading(false)
          // update image in image model
          await axios.put('http://localhost:5000/api/lab/appointment/image/'+item.imgid+"/"+profilePictureName)
          alert('successfully uploaded')
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      };
      


  return (
    <div class="m-2">
    <div class="block rounded-lg shadow-lg bg-gray-100 max-w-sm text-center">
    
      <div class="py-3 px-6 border-b border-gray-300">
      <span class="text-lg inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-800 text-white rounded-full"> {completed?'History':pending?'Pending Request': 'Patient Request'}</span>
       
      </div>
      <div class="p-6">
    
        <span class="text-base inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full">{item.phone}</span>
       <div className="flex mx-4 justify-center items-center my-5">
       {/* <p class="text-gray-700 text-base mb-2 mr-2">
          Sohaib Ahmad Khan
        </p> */}
        <Chip/>
       </div>
        <div className='space-x-4'>
          {
             pending && type == 'doctor' ?<><a style={{color:'royalblue'}} href = {item.link}target="_blank">Open meeting</a> <br /><br /> </>: pending && type == 'lab' ?<>
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
             </>:<></>
          }
 
{
  completed?'':
  pending?
  <button type="button" class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={()=>markAsCompleted(item)}>Mark as complete</button>
  :<>
  <button type="button" class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={()=>handleAccept(item)}>Accept</button>
  <button type="button" class="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={()=>handleReject(item)}>Reject</button>
  </>
}
        </div>
      </div>
    </div>
  </div>
   )
}

export default PatientCard