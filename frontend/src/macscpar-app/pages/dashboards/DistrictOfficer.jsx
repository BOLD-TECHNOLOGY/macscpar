import { useState, useContext } from 'react';
import { ChevronDown, ChevronRight, Menu, X, BarChart3, Users, Building2, Settings, Eye, Plus, Edit3, UserPlus, FileText, Activity, Shield, Brain, Database, Bell, Lock, Trash2, Calendar, Download } from 'lucide-react';
import { AppContext } from '../../../Context/AppContext';

export default function DistrictOfficer() {
const { user } = useContext(AppContext);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [activeDropdown, setActiveDropdown] = useState(null);

const sidebarItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: BarChart3,
        children: [
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'compliance', label: 'Compliance Reports', icon: FileText }
        ]
    },
    {
        id: 'users',
        label: 'User Management',
        icon: Users,
        children: [
            { id: 'view-users', label: 'View Users', icon: Eye },
            { id: 'add-user', label: 'Add User', icon: UserPlus },
            { id: 'edit-user', label: 'Edit/Deactivate User', icon: Edit3 }
        ]
    },
    {
        id: 'agencies',
        label: 'Agency Management',
        icon: Building2,
        children: [
            { id: 'view-agencies', label: 'View Agencies', icon: Eye },
            { id: 'add-agency', label: 'Add Agency', icon: Plus },
            { id: 'edit-agency', label: 'Edit Agency', icon: Edit3 }
        ]
    },
    {
        id: 'cases',
        label: 'Case Management',
        icon: FileText,
        children: [
            { id: 'view-cases', label: 'View Cases', icon: Eye },
            { id: 'assign-cases', label: 'Assign Cases', icon: UserPlus },
            { id: 'case-reports', label: 'Case Reports', icon: Download }
        ]
    },
    {
        id: 'system',
        label: 'System Settings',
        icon: Settings,
        children: [
            { id: 'role-config', label: 'Role Configuration', icon: Shield },
            { id: 'audit-logs', label: 'Audit Logs', icon: Activity },
            { id: 'ai-settings', label: 'AI Model Settings', icon: Brain },
            { id: 'database', label: 'Database Management', icon: Database },
            { id: 'notifications', label: 'Notification Settings', icon: Bell },
            { id: 'security', label: 'Security Settings', icon: Lock }
        ]
    }
];

const toggleDropdown = (itemId) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
};

const dashboardCards = [
    {
        title: 'Authorized Users',
        value: '10',
        icon: BarChart3,
        color: 'bg-blue-50 text-blue-600',
        bgColor: 'bg-blue-500'
    },
    {
        title: 'Reported Cases',
        value: '43',
        icon: FileText,
        color: 'bg-green-50 text-green-600',
        bgColor: 'bg-green-500'
    },
    {
        title: 'Total Agencies',
        value: '10',
        icon: Building2,
        color: 'bg-purple-50 text-purple-600',
        bgColor: 'bg-purple-500'
    },
    {
        title: 'Total Visitors',
        value: '157',
        icon: Users,
        color: 'bg-orange-50 text-orange-600',
        bgColor: 'bg-orange-500'
    }
];

return (
    <div className="dashboard admin-dashboard">
        {sidebarOpen && (
            <div 
                className="dashboard sidebar-overlay"
                onClick={() => setSidebarOpen(false)}
            />
        )}

        <div className={`dashboard sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="dashboard sidebar-header">
                <h2>Panel</h2>
                <button 
                    className="dashboard sidebar-close"
                    onClick={() => setSidebarOpen(false)}
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="dashboard sidebar-nav">
                {sidebarItems.map((item) => (
                    <div key={item.id} className="nav-item">
                        <button
                            className={`dashboard nav-link ${activeDropdown === item.id ? 'active' : ''}`}
                            onClick={() => toggleDropdown(item.id)}
                        >
                            <div className="dashboard nav-link-content">
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </div>
                            {activeDropdown === item.id ? 
                                <ChevronDown size={16} /> : 
                                <ChevronRight size={16} />
                            }
                        </button>
                        
                        <div className={`dashboard nav-dropdown ${activeDropdown === item.id ? 'dropdown-open' : ''}`}>
                            {item.children.map((child) => (
                                <button
                                    key={child.id}
                                    className="dashboard nav-child-link"
                                    onClick={() => console.log(`Navigate to ${child.id}`)}
                                >
                                    <child.icon size={16} />
                                    <span>{child.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </div>

        <div className="dashboard main-content">
            <div className="dashboard top-header">
                <div className="dashboard header-left">
                    <button 
                        className="dashboard menu-toggle"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <h1>District Officer Dashboard</h1>
                </div>
                <div className="dashboard header-right">
                    <span>Today</span>
                    <div className="dashboard user-info">
                        <span>Welcome, {user?.name}!</span>
                    </div>
                </div>
            </div>

            <div className="dashboard dashboard-grid">
                {dashboardCards.map((card, index) => (
                    <div key={index} className="dashboard dashboard-card">
                        <div className="dashboard card-content">
                            <div className="dashboard card-info">
                                <h3>{card.title}</h3>
                                <p className="dashboard card-value">{card.value}</p>
                            </div>
                            <div className={`dashboard card-icon ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}