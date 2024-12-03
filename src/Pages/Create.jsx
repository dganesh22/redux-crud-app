import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewUser } from '../Action/UserAction'

function Create(props) {
    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        dob: ""
    })
    const [gender,setGender] = useState("male")

    const dispatcher = useDispatch()
    const navigate = useNavigate()
   

    const readInput = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]: value })
    }

    const submitHandler = async (e) => {
            e.preventDefault()
            try {
                let data = {
                    ...user, 
                    gender 
                }
                console.log(`new user = `, data)
                await dispatcher(addNewUser(data))
                      .unwrap()
                      .then(res => {
                        toast.success(res.msg)
                        navigate(`/`)
                      })
                      .catch(err => toast.error(err.response.data.msg))
            } catch (err) {
                toast.error(err.msg)
            }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 offset-md-3 mt-4">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title text-center text-success">Create User</h3>
                        </div>
                        <div className="card-body">
                            <form method='post' onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" value={user.name} onChange={readInput} id="name"  className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" value={user.email} onChange={readInput} id="email" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="number" name="mobile" value={user.mobile} onChange={readInput} id="mobile" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input type="date" name="dob" id="dob" value={user.dob} onChange={readInput} className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="gender">Gender</label>
                                    <div className='form-check'>
                                        <input type="radio" name="gender" id="gender" value={gender} checked={gender === "male"} onChange={(e) => setGender("male")} className="form-check-input" required />
                                        <label className="form-check-label">Male</label>
                                    </div>
                                    <div className='form-check'>
                                        <input type="radio" name="gender"  id="gender" value={gender}  checked={gender === "female"} onChange={(e) => setGender("female")}className="form-check-input" required />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                    <div className='form-check'>
                                        <input type="radio" name="gender" id="gender" value={gender}  checked={gender === "transgender"} onChange={(e) => setGender("transgender")} className="form-check-input" required />
                                        <label className="form-check-label">Transgender</label>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <input type="submit" value="Create new User" className="btn btn-success" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create