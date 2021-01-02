import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../App'
import '../App.css' 
import {useParams} from 'react-router-dom'

const Profile = () => {
    const [userProfile,setProfile]=useState(null) 
    const {state,dispatch}=useContext(UserContext)
    const{userid}=useParams()
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
       headers:{  "Authorization" : "Bearer "+localStorage.getItem("jwt")}
        }).then(res=>res.json())
        .then(result=>{

            console.log(result)
            setProfile(result)
        })
    },[])
    return (
        <>
        {userProfile ?
        <div style={{maxWidth:"70%",margin:"0px auto"}} >
            <div style={{
            display:"flex",
            justifyContent: "space-around",
            margin:"18px 0px",borderBottom:"1px solid grey "
        }}>
                <div>
                   
                   < img style={{width:"160px",height:"160px", borderRadius:"80px"}}
                   src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
                </div>
                <div>
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>
                <div style={{display:"flex", justifyContent:"space-between",width:"108%"}}> 
                    <h5>{userProfile.posts.length} Posts</h5>
                    <h5>0 Follower</h5>
                    <h5>0 Following</h5>
                </div>
                </div>
            </div>
            <div className="gallery">
            {
                        userProfile.posts.map(item=>{
                            return(
                                <img className="item" key={item._id} src={item.image} alt={item.title}/>
                            )
                        })
                    }
              
            </div>
        </div>
        :<h2>loading</h2> }
        </>
    )
}

export default Profile
