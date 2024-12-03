import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readAllUser, deleteUser } from '../Action/UserAction'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

function Home(props) {
    const dispatcher = useDispatch()

    const readData = useCallback(() => {
        dispatcher(readAllUser())
    }, [])

    useEffect(() => {
        readData()
    }, [])

    // to read the from redux state
    const users = useSelector(item => item.users)

    // delete handler
    const deleteHandler = async (id) => {
        if(window.confirm(`Are you sure to delete user?`)) {
            toast.success(`id = ${id}`)
            await dispatcher(deleteUser(id))
                .unwrap()
                .then(res => {
                    toast.success(res.data.msg)
                    readData()
                })
                .catch(err => toast.error(err.response.data.msg))
        } else {
            toast.warning("delete terminated")
        }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Users</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="table table-responsive text-center">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Dob</th>
                                    <th>Gender</th>
                                    <th>Address</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map((item, index) => {
                                        return (
                                            <tr className='text-center' key={index}>
                                                <td> {item.name} </td>
                                                <td> {item.email} </td>
                                                <td> {item.mobile} </td>
                                                <td> {new Date(item.dob).toLocaleDateString()} </td>
                                                <td> { item.gender } </td>
                                                <td> {item.address} </td>
                                                <td> {item.role} </td>
                                                <td>
                                                    <NavLink to={`/edit/${item._id}`} className="btn btn-sm btn-info me-2">
                                                        <i className="bi bi-pencil"></i>
                                                    </NavLink>
                                                    <button onClick={() => deleteHandler(item._id)} className="btn btn-sm btn-danger">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home