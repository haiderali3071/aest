import React, { useEffect, useState } from 'react'
import Navbar from "../components/navbar";
import PatientCard from '../components/PatientCard/PatientCard';
import axios from "axios";

const Requests = ({user}) => {
  const [update,setUpdate] = useState(0)
  const [requests, setRequests] = useState([{docid: "ABCD", userid: "BCDE", isAccepted: false, isCompleted: false, phone: '+92 123123123'}, 
  {docid: "SHELL", userid: "PETROL", isAccepted: true, isCompleted: false, phone: '+92 123123123'}, 
  {docid: "ABCD", userid: "BSCDE", isAccepted: true, isCompleted: false, phone: '+92 123123123'},
  {docid: "ABCD", userid: "BSCDE", isAccepted: false, isCompleted: false, phone: '+92 123123123'},
  {docid: "ABCD", userid: "BSCDE", isAccepted: false, isCompleted: false, phone: '+92 123123123'},
  {docid: "ABCD", userid: "BSCDE", isAccepted: false, isCompleted: false, phone: '+92 123123123'},
  {docid: "ABCD", userid: "BSCDE", isAccepted: false, isCompleted: false, phone: '+92 123123123'},
  {docid: "ABCD", userid: "BSCDE", isAccepted: false, isCompleted: false, phone: '+92 123123123'},
  {docid: "ABCD", userid: "BCFE", isAccepted: false, isCompleted: false, phone: '+92 123123123'}])
  useEffect(() => {
    // get data req
    // data 
    // setRequests
   

   (async()=>{
    try {
      const { data } = await axios.get('http://localhost:5000/api/'+user.usertype+'/appointments/'+user.usertype+'/'+user._id)
      // console.log('http://localhost:5000/api/'+user.usertype+'/appointments/'+user.usertype+'/'+user._id)
      let arr = []
      data.map((item)=>{
        if(user.usertype == 'doctor'){
          arr.push({
            appid: item._id,
            docid: item.doctorid, 
            userid: item.userid._id, 
            isAccepted: item.isaccepted, 
            isCompleted: item.iscompleted, 
            phone: item.userid.phone,
            name:item.userid.name,
            profileImage:item.userid.profileImage
          })
        }
        else{
          arr.push({
            imgid: item._id,
            img: item.img,
            labid: item.labid, 
            isAccepted: item.isaccepted, 
            isCompleted: item.iscompleted, 
            userid: item.userid._id,
            phone: item.userid.phone,
            name:item.userid.name,
            profileImage:item.userid.profileImage
          })
        }
      })
      setRequests(arr.filter(el => !el.isAccepted))
    } catch (error) {
      console.error(error)
    }

   })()

  
  }, [update])

  const handleAccept = async(item) => {
    // requests.forEach(element => {
    //   if(item.userid === element.userid) {
    //     element.isAccepted = true
    //   }
    // });

   

    try{
      if(user.usertype == 'doctor'){
        const { data } = await axios.get('http://localhost:5000/api/doctor/generate/'+item.appid)
      }
      else{
        const { data } = await axios.put('http://localhost:5000/api/lab/appointment/accept/'+item.imgid)
      }
      setUpdate(Math.random())
    }
    catch(err){
      console.log(err)
    }
  }

  const handleReject = async(item) => {
    try{
      if(user.usertype == 'doctor'){
        const { data } = await axios.delete('http://localhost:5000/api/doctor/appointment/'+item.appid)
        if(data){
          alert('Successfully appointment rejected')
        }
      }
      else{
        const { data } = await axios.delete('http://localhost:5000/api/lab/appointment/'+item.imgid)
        if(data){
          alert('Successfully appointment rejected')
        }
      }
      setUpdate(Math.random())
      
    }
    catch(err){
      console.log(err)
    }
  }

    

  return (
    <div  className='bg-gray-800 lg:h-screen md:h-screen overflow-scroll ' style={{background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'}}>
        <Navbar requests={true} user={user}/>
        <div className='flex scrollbar-hide justify-center flex-wrap mt-10'>
        {
          requests.filter(el => !el.isAccepted).map((item) => {
           return (
             <PatientCard item={item} handleAccept={handleAccept} handleReject={handleReject} />
           )
          })
        }
        </div>
    </div>
  )
}

export default Requests