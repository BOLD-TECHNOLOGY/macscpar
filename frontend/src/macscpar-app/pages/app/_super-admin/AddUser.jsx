import { useState, useContext } from 'react';
import { User, Mail, Lock, CheckCircle, UserCheck, ChevronDown } from 'lucide-react';
import { AppContext } from '../../../../Context/AppContext';
import SuperAdminLayout from '../../layout/_role-based/SuperAdminLayout';
import '../../../../App.css';

const role = [
    { value: 'igp', label: 'IGP' },
    { value: 'state_officer', label: 'STATE OFFICER' }
];

export default function AddUser() {
    const { token } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const handleCreateOfficer = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const res = await fetch('/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            
            const data = await res.json();
            
            if (res.ok) {
                alert(data.message);
                setFormData({ name: '', email: '', password: '', password_confirmation: '', role: '' });
            } else {
                alert(data.message || 'Error creating officer');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <SuperAdminLayout pageTitle="Add User">
            <div className="add-user add-user-page">
                <div className="add-user form-container">
                    <div className="add-user form-body">
                        <form onSubmit={handleCreateOfficer} className="add-user user-form">
                            <div className="add-user form-grid">
                                <div className={`add-user input-group ${focusedField === 'name' ? 'focused' : ''}`}>
                                    <label className="add-user input-label">Full Name</label>
                                    <div className="add-user input-wrapper">
                                        <div className="add-user input-icon"><User size={20} /></div>
                                        <input
                                            type="text"
                                            className="add-user form-input"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={`add-user input-group ${focusedField === 'email' ? 'focused' : ''}`}>
                                    <label className="add-user input-label">Email Address</label>
                                    <div className="add-user input-wrapper">
                                        <div className="add-user input-icon"><Mail size={20} /></div>
                                        <input
                                            type="email"
                                            className="add-user form-input"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={`add-user input-group ${focusedField === 'role' ? 'focused' : ''}`}>
                                    <label className="add-user input-label">Assign Role</label>
                                    <div className="add-user input-wrapper">
                                        <div className="add-user input-icon"><UserCheck size={20} /></div>
                                        <select
                                            className="add-user form-input"
                                            value={formData.role}
                                            onChange={(e) => handleInputChange('role', e.target.value)}
                                            onFocus={() => setFocusedField('role')}
                                            onBlur={() => setFocusedField('')}
                                            required
                                        >
                                            <option value="" disabled>Select user role</option>
                                            {role.map((roleItem) => (
                                                <option key={roleItem.value} value={roleItem.value}>
                                                    {roleItem.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className={`add-user input-group ${focusedField === 'password' ? 'focused' : ''}`}>
                                    <label className="add-user input-label">Password</label>
                                    <div className="add-user input-wrapper">
                                        <div className="add-user input-icon"><Lock size={20} /></div>
                                        <input
                                            type="password"
                                            className="add-user form-input"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="Enter password"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={`add-user input-group ${focusedField === 'password_confirmation' ? 'focused' : ''}`}>
                                    <label className="add-user input-label">Confirm Password</label>
                                    <div className="add-user input-wrapper">
                                        <div className="add-user input-icon"><Lock size={20} /></div>
                                        <input
                                            type="password"
                                            className="add-user form-input"
                                            value={formData.password_confirmation}
                                            onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                                            onFocus={() => setFocusedField('password_confirmation')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="Confirm password"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="add-user submit-section">
                                <button type="submit" className="add-user submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <div className="add-user loading-spinner"></div>
                                            Creating User...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle size={20} />
                                            Create User
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
}