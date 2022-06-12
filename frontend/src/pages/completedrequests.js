import React, { useEffect, useState } from 'react'
import Navbar from "../components/navbar";
import PatientCard from '../components/PatientCard/PatientCard';
import axios from "axios";

const CompletedRequests = ({user}) => {
  const [requests, setRequests] = useState([{docid: "ABCD",phone: '+92 123123123', userid: "BCDE", isAccepted: false, isCompleted: false}, 
  {docid: "SHELL",phone: '+92 123123123', userid: "PETROL", isAccepted: true, isCompleted: true}, 
  {docid: "ABCD",phone: '+92 123123123', userid: "BSCDE", isAccepted: true, isCompleted: true},
  {docid: "ABCD",phone: '+92 123123123', userid: "BCFE", isAccepted: false, isCompleted: false},
  {docid: "ABCD",phone: '+92 123123123', userid: "BSCDE", isAccepted: true, isCompleted: true},
  {docid: "ABCD",phone: '+92 123123123', userid: "BSCDE", isAccepted: true, isCompleted: true},
  {docid: "ABCD",phone: '+92 123123123', userid: "BSCDE", isAccepted: true, isCompleted: true},
  {docid: "ABCD",phone: '+92 123123123', userid: "BSCDE", isAccepted: true, isCompleted: true},
  {docid: "ABCD",phone: '+92 123123123', userid: "BSCDE", isAccepted: true, isCompleted: true},
  {docid: "ABCD",phone: '+92 123123123', userid: "BSCDE", isAccepted: true, isCompleted: true},
  {docid: "ABCD",phone: '+92 123123123', userid: "BSCDE", isAccepted: true, isCompleted: true},
  {docid: "ABCD",phone: '+92 123123123', userid: "BSCDE", isAccepted: true, isCompleted: true},
  {docid: "ABCD",phone: '+92 123123123', userid: "BSCDE", isAccepted: true, isCompleted: true}])
  useEffect(() => {
    // get data req
    // data 
    // setRequests

    (async()=>{
      try {
        const { data } = await axios.get('http://localhost:5000/api/'+user.usertype+'/appointments/'+user.usertype+'/'+user._id)
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
              profileImage:item.userid.profileImage,
              link:item.link
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
        setRequests(arr.filter(el => el.isAccepted && el.isCompleted))
      } catch (error) {
        console.error(error)
      }
  
     })()
   
  }, [])

  return (
    <div  className='bg-gray-800 lg:h-screen md:h-screen overflow-scroll ' style={{background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'}}>
        <Navbar completed={true} user={user}/>
        <div className='flex scrollbar-hide justify-center flex-wrap mt-10'>
        {
          requests.filter(el => el.isCompleted).map((item) => {
           return (
             <PatientCard completed={true} item={item} />
           )
          })
        }
        </div>
    </div>
  )
}

export default CompletedRequests