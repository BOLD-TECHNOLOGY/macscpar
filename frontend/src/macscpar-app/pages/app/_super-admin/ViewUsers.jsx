import { useState, useEffect, useContext } from 'react';
import { Search, ChevronDown, Eye, Edit, User, Mail, Calendar, MapPin, Phone, Briefcase, Clock, X } from 'lucide-react';
import { AppContext } from '../../../../Context/AppContext';
import SuperAdminLayout from '../../layout/_role-based/SuperAdminLayout';
import { useCallback } from 'react';
import '../../../../App.css';

export default function ViewUsers() {
    const { token } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editFormData, setEditFormData] = useState({});

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data.users || []);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    const filterAndSortUsers = useCallback(() => {
        let filtered = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.user_id.toString().includes(searchTerm)
        );

        filtered.sort((a, b) => {
            let aValue, bValue;
            
            switch(sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'user_id':
                    aValue = a.user_id;
                    bValue = b.user_id;
                    break;
                case 'created_at':
                    aValue = new Date(a.created_at);
                    bValue = new Date(b.created_at);
                    break;
                default:
                    aValue = a[sortBy];
                    bValue = b[sortBy];
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [users, searchTerm, sortBy, sortOrder]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        filterAndSortUsers();
    }, [filterAndSortUsers]);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                setSelectedUser(data.user);
                setEditFormData(data.user);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const updateUser = async () => {
        try {
            const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editFormData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('User updated successfully');
                setIsEditMode(false);
                fetchUsers();
                setSelectedUser(data.user);
            } else {
                alert(data.message || 'Error updating user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading) {
        return (
            <SuperAdminLayout pageTitle="View Users">
                <div className="view-users loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading users...</p>
                </div>
            </SuperAdminLayout>
        );
    }

    return (
        <SuperAdminLayout pageTitle="View Users">
            <div className="view-users view-users-page">
                <div className="view-users controls-section">
                    <div className="view-users search-box">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    
                    <div className="view-users filters">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="user_id">Sort by User ID</option>
                            <option value="created_at">Sort by Date Registered</option>
                        </select>
                        
                        <button 
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="sort-order-btn"
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                        
                        <select 
                            value={usersPerPage} 
                            onChange={(e) => setUsersPerPage(Number(e.target.value))}
                            className="per-page-select"
                        >
                            <option value={10}>10 per page</option>
                            <option value={50}>50 per page</option>
                            <option value={100}>100 per page</option>
                        </select>
                    </div>
                </div>

                <div className="view-users table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date Registered</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={user.id} className="user-row">
                                    <td>{indexOfFirstUser + index + 1}</td>
                                    <td className="user-id">{user.user_id}</td>
                                    <td className="user-name">{user.name}</td>
                                    <td className="user-email">{user.email}</td>
                                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button 
                                            onClick={() => fetchUserDetails(user.id)}
                                            className="action-btn view-btn"
                                        >
                                            <Eye size={16} />
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="view-users pagination">
                    <div className="pagination-info">
                        Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
                    </div>
                    <div className="pagination-controls">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {showModal && selectedUser && (
                    <div className="view-users modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="view-users modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>User Details</h2>
                                <button 
                                    onClick={() => setShowModal(false)}
                                    className="close-btn"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            
                            <div className="modal-body">
                                <div className="user-details-grid">
                                    <div className="details-section">
                                        <h3><User size={20} /> Personal Information</h3>
                                        <div className="detail-item">
                                            <label>Full Name:</label>
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    value={editFormData.name || ''}
                                                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                                    className="edit-input"
                                                />
                                            ) : (
                                                <span>{selectedUser.name}</span>
                                            )}
                                        </div>
                                        <div className="detail-item">
                                            <label>User ID:</label>
                                            <span>{selectedUser.user_id}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Email:</label>
                                            {isEditMode ? (
                                                <input
                                                    type="email"
                                                    value={editFormData.email || ''}
                                                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                                    className="edit-input"
                                                />
                                            ) : (
                                                <span>{selectedUser.email}</span>
                                            )}
                                        </div>
                                        <div className="detail-item">
                                            <label>Phone:</label>
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    value={editFormData.phone || ''}
                                                    onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                                                    className="edit-input"
                                                />
                                            ) : (
                                                <span>{selectedUser.phone || 'Not provided'}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="details-section">
                                        <h3><Calendar size={20} /> Registration Info</h3>
                                        <div className="detail-item">
                                            <label>Date Registered:</label>
                                            <span>{new Date(selectedUser.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Role:</label>
                                            <span className="role-badge">{selectedUser.role}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Status:</label>
                                            <span className={`status-badge ${selectedUser.status}`}>
                                                {selectedUser.status || 'Active'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="details-section full-width">
                                        <h3><Briefcase size={20} /> Work Information</h3>
                                        <div className="detail-item">
                                            <label>Position:</label>
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    value={editFormData.position || ''}
                                                    onChange={(e) => setEditFormData({...editFormData, position: e.target.value})}
                                                    className="edit-input"
                                                />
                                            ) : (
                                                <span>{selectedUser.position || 'Not specified'}</span>
                                            )}
                                        </div>
                                        <div className="detail-item">
                                            <label>Department:</label>
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    value={editFormData.department || ''}
                                                    onChange={(e) => setEditFormData({...editFormData, department: e.target.value})}
                                                    className="edit-input"
                                                />
                                            ) : (
                                                <span>{selectedUser.department || 'Not specified'}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                {isEditMode ? (
                                    <>
                                        <button 
                                            onClick={updateUser}
                                            className="btn-primary"
                                        >
                                            Save Changes
                                        </button>
                                        <button 
                                            onClick={() => setIsEditMode(false)}
                                            className="btn-secondary"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button 
                                        onClick={() => setIsEditMode(true)}
                                        className="btn-primary"
                                    >
                                        <Edit size={16} />
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </SuperAdminLayout>
    );
}