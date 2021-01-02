import React ,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import '../App.css'
import M from 'materialize-css'


const Signup = () => {
    const history= useHistory()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            name,
            password,
            email
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
          M.toast({html:data.error,classes:"#c62828 red darken-3"})
        }
        else{
            
          M.toast({html:data.message,classes:"#4csf50 green"})
          history.push('/signin')
        
        }
    }).catch(err=>{
        console.log(err)
    })
    }

    return (
        <div className="mycard">
            <  div className="card auth-card">
                <h2>Social Media App</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button className= "btn wave-effect wave-lights" onClick={()=>PostData()}>Login</button>
                <h5 ><Link to="/signin">Already Have An Account ?</Link></h5>

            


	
            </div>
        </div>
    )
}

export default Signup
