import React,{useState, useEffect, useContext} from 'react'
import '../App.css'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'


const Home = () => {
    const[data,setData]=useState([])
    const{state,dipatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/allposts',{
       headers:{  "Authorization" : "Bearer "+localStorage.getItem("jwt")}
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
    },[])

    const likePost=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{"Content-Type":"application/json", "Authorization" : "Bearer "+localStorage.getItem("jwt")},
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })

    }

    const unlikePost=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{"Content-Type":"application/json", "Authorization" : "Bearer "+localStorage.getItem("jwt")},
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    const makecomment =(text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json", "Authorization" : "Bearer "+localStorage.getItem("jwt")},
            body:JSON.stringify({
                postId,
                text
            })
        
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
        
    }
    const deletePost=(postId)=>{
        fetch(`/deletepost/${postId}`,{
        method:"delete",
        headers:{Authorization: "Bearer "+localStorage.getItem("jwt")}
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData =data.filter(item=>{
                return item._id != result._id
            })
            setData(newData)
        })
    }

    return (
        <div className="home">
            {
            data.map(item=>{
                
                return(
                    <div style={{boxShadow:"0px 2px 5px #808080", borderRadius:"5px"}} className="card home-card" key={item._id}>
                        <div className="post_header"  style={{boxShadow:"0px 1px 2px #808080"}}>
                            < img style={{width:"40px",height:"40px", borderRadius:"8px" ,float:"left" ,padding:"5px"}}
                           src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"/>        
                    <h5><Link to={item.postedBy._id !== state._id ?"/profile/"+item.postedBy._id :"/profile"}>{item.postedBy.name}</Link>{item.postedBy._id == state._id
                    && 
                    <i className="material-icons" style={{float:'right'}} onClick={()=>deletePost(item._id)}>delete</i>}</h5>
                    </div>
                    <div className="card-image">
                        <img className="post_image" src={item.image}/>
                    </div> 
                    <div  className="card-content">
                   <div  style={{boxShadow:"0px 0px 0px #8a795d"}}><div className="like-buttons">
                  { item.likes.includes(state._id)?
                  <i className="material-icons"  onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                  :
                    <i className="material-icons" onClick={()=>{likePost(item._id)}} >thumb_up</i>
                 }</div>
                    <h6 >{item.likes.length}<b> Likes</b></h6>
                    <h6 >{item.title}</h6>
                    <p >{item.body}</p>
                    {
                        item.comment.map(record=>{
                            return(
                                <h6  key={record._id}style={{ fontWeight:"lighter"}}><span style={{fontWeight:"1000"}}>{ record.postedBy.name }</span>  { record.text }</h6>
                            )
                        })
                    }
                    </div>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                       makecomment(e.target[0].value,item._id)
                    }}>
                    <input type="text" className="form__input" placeholder="add a comment" /></form>
                    </div>
                </div>
                )
            })
        }
           
            </div>
            
           
    )
}

export default Home
