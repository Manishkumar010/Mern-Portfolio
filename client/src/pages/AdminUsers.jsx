import React, { useEffect, useState } from 'react'
import {Link} from  'react-router-dom'
import { useAuth } from '../store/auth';


const AdminUsers = () => {
    const { AuthorizationToken ,API} = useAuth();
    const [users, setUsers] = useState([])

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken
                }
            })
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : []);
            console.log(data)
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    // Delete user function here
    const deleteUser = async (id) => {
        const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: AuthorizationToken
            }
        })
        const data = await response.json();
        console.log(`user after delete : ${data}`)
        if(response.ok){
            getAllUsersData()
        }
    };

    useEffect(() => {
        getAllUsersData()
    }, []);
    return (
        <>
            <section className='admin-users-section'>
                <div className="container">
                    <h1>Admin Users Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Deleted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((currUser, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{currUser.username}</td>
                                        <td>{currUser.email}</td>
                                        <td>{currUser.phone}</td>
                                        <td><Link to={`/admin/users/${currUser._id}/edit`}>Edit</Link> </td>
                                        <td><button onClick={() => deleteUser(currUser._id)}>Delete</button></td>
                                    </tr>
                                ) 
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default AdminUsers