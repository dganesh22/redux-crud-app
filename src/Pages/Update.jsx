import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editUser } from '../Action/UserAction'
import UserApi from '../API/UserApi';

function Update(props) {
    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        dob: "",
        address: "",
        role: ""
    })
    const [gender,setGender] = useState("male")

    const dispatcher = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    // to read single user data from api
    const readSingleUser = async () => {
         try {
            await UserApi.readSingle(params.id)
                .then(res => {
                    console.log(`single user = `, res)
                    setUser(res.data.user)
                    setGender(res.data.user.gender)
                }).catch(err => toast.error(err.response.data.msg))
         } catch (err) {
            toast.error(err.msg)
         }
    }
    
    useEffect(() => {
        readSingleUser()
    },[])

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
                console.log(`edit user = `, data)
                await dispatcher(editUser({ id: params.id, user: data }))
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
                            <h3 className="card-title text-center text-success">Update User</h3>
                            <p className="text-secondary"> id = { params.id } </p>
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
                                    <strong className="text-success"> { new Date(user.dob).toLocaleDateString()} </strong>
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
                                    <label htmlFor="address">Address</label>
                                    <textarea name="address" id="address" rows="5" cols="30" className="form-control" value={user.address} onChange={readInput} required></textarea>
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="role">Role</label>
                                    <select name="role" id="role" value={user.role} onChange={readInput} className="form-select" required>
                                        <option value="null">Choose Role</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className="form-group mt-2">
                                    <input type="submit" value="Update User" className="btn btn-success" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update