import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../App'
import '../App.css' 

const Profile = () => {
    const [mypics,setPics]=useState([]) 
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
       headers:{  "Authorization" : "Bearer "+localStorage.getItem("jwt")}
        }).then(res=>res.json())
        .then(result=>{
                console.log(result)
            setPics(result.mypost)
        })
    },[])
    return (
        <div style={{maxWidth:"70%",margin:"0px auto"}} >
            <div style={{
            display:"flex",
            justifyContent: "space-around",
            margin:"18px 0px",borderBottom:"1px solid grey "
        }}>
                <div style={{borderBottom:"5px solid red"}}>
                   
                   < img style={{width:"160px",height:"160px", borderRadius:"80px"}}
                   src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
                </div>
                <div>
                <h4>{state?state.name:"loading"}</h4>
                <div style={{display:"flex", justifyContent:"space-between",width:"108%"}}> 
                    <h5> {mypics.length} Posts</h5>
                    <h5>0 Follower</h5>
                    <h5>0 Following</h5>
                </div>
                </div>
            </div>
            <div className="gallery">
            {
                        mypics.map(item=>{
                            return(
                                <img className="item" key={item._id} src={item.image} alt={item.title}/>
                            )
                        })
                    }
              
            </div>
        </div>
    )
}

export default Profile
