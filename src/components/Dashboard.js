import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUserStatus } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {

            const data = await fetchUsers();
            setUsers(data);
        } catch (err) {
            setError(err);
        }
    };

    const handleSelection = (id) => {
        setSelectedUsers((prev) => 
            prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
        );
    };

    const handleAction = async (action) => {
        if (selectedUsers.length === 0) return;
        try {
            await updateUserStatus(action, selectedUsers);
            loadUsers();
            setSelectedUsers([]);
        } catch (err) {
            setError(err);
        }
    };

    const formattedLastLogin = (lastLogin) => {
        const date = new Date(lastLogin);
        const now = new Date();
        const diffMs = now - date; // Difference in milliseconds
        const diffMinutes = Math.floor(diffMs / (1000 * 60)); // Convert to minutes
    
        if (diffMinutes < 1) return "less than a minute ago";
        if (diffMinutes < 60) return `${diffMinutes} min ago`;
        
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
        
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    
        const diffMonths = Math.floor(diffDays / 30);
        if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    
        const diffYears = Math.floor(diffMonths / 12);
        return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    

    return (
        <div className='container mt-5'>
            {error && <div className='alert alert-danger'>{error}</div>}
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <button className='btn btn-primary bg-transparent text-primary border-primary me-2 ' onClick={() => handleAction('block')}><i className="bi bi-lock-fill"></i>Block</button>
                    <button className='btn btn-primary bg-transparent me-2' onClick={() => handleAction('unblock')}><i className="bi bi-unlock-fill text-primary"></i></button>
                    <button className='btn btn-danger bg-transparent' onClick={() => handleAction('delete')}><i className="bi bi-trash-fill text-danger"></i></button>
                </div>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>

            <table className='table mt-3'>
                <thead>
                    <tr>
                        <th>
                            <input 
                                type="checkbox"
                                onChange={(e) => handleSelection(e.target.checked ? users.map((user) => user._id) : [])}
                                checked={selectedUsers.length === users.length && users.length > 0}
                            />
                        </th>
                        <th className='font-weight-bold'>Name</th>
                        <th>Email</th>
                        <th>Last seen</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => ( 
                        <tr key={user._id}>
                            <td>
                                <input 
                                    type="checkbox"
                                    checked={selectedUsers.includes(user._id)}
                                    onChange={() => handleSelection(user._id)}
                                />
                            </td>
                            <td className={user.status === 'blocked' ? 'text-muted opacity-50 text-decoration-line-through' : 'text-dark'}>
                                {user.name}
                            </td>
                            <td className={user.status === 'blocked' ? 'text-muted opacity-50 text-decoration-line-through' : 'text-dark'}>{user.email}</td>
                            <td className={user.status === 'blocked' ? 'text-muted opacity-50' : 'text-dark'}>{formattedLastLogin(user.last_login)}</td>
                            <td>
                                <Sparklines data={[0, 5, 3, 7, 2, 6, 8]} width={200} height={60}>
                                    <SparklinesLine color="blue" />
                                </Sparklines>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;