import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'
const Navbar = () => {
    const searchModal = useRef(null)
    const [search, setSearch] = useState('')
    const [userDetails, setUserDetails] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    useEffect(() => {
        M.Modal.init(searchModal.current)
    }, [])
    const renderList = () => {
        if (state) {
            return [
                <li ><Link to="/profile">Profile</Link></li>,
                <li ><Link to="/createpost">Create Post</Link></li>,

                <li >
                    <button className="waves-effect waves-light btn-small"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: "CLEAR" })
                            history.push('/signin')
                        }}
                    >
                        Logout
            </button>
                </li>


            ]
        } else {
            return [
                <li ><Link to="/signin">Signin</Link></li>,
                <li ><Link to="/signup">Signup</Link></li>

            ]
        }
    }



    return (
        <nav>
               <div class="nav-wrapper teal lighten-2">

                <Link to={state ? "/" : "/signin"} className="brand-logo left">Social Media App</Link>
                <ul id="nav-mobile" class="right hide-on-med-and-down" >
                    {renderList()}

                </ul>
                </div>
        </nav>
    )
}


export default Navbar