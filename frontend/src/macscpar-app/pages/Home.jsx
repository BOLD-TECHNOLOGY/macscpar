import { useState, useEffect } from 'react';
import { Shield, Users, AlertTriangle, Eye, Lock, Database, Clock, Target, CheckCircle, ArrowRight, Activity, Globe, UserCheck } from 'lucide-react';

import '../../App.css';

export default function Home() {
    const [isVisible, setIsVisible] = useState(false); 
    const [currentStat, setCurrentStat] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        
        const interval = setInterval(() => {
            setCurrentStat(prev => (prev + 1) % 4);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const statistics = [
        { label: "Active Cases", value: "2,847", icon: AlertTriangle },
        { label: "Agencies Connected", value: "156", icon: Users },
        { label: "Children Protected", value: "8,923", icon: Shield },
        { label: "Response Time", value: "< 2hrs", icon: Clock }
    ];

    const capabilities = [
        {
            icon: Shield,
            title: "Secure Intelligence Hub",
            desc: "Encrypted multi-agency data sharing with military-grade security protocols."
        },
        {
            icon: Eye,
            title: "Real-time Surveillance",
            desc: "Advanced monitoring systems for immediate threat detection and response."
        },
        {
            icon: Database,
            title: "Unified Database",
            desc: "Centralized intelligence repository accessible across all participating agencies."
        },
        {
            icon: Target,
            title: "Tactical Response",
            desc: "Coordinated rapid response protocols for critical child protection scenarios."
        },
        {
            icon: Activity,
            title: "Live Operations Center",
            desc: "24/7 monitoring dashboard with real-time case status and agency coordination."
        },
        {
            icon: UserCheck,
            title: "Verified Personnel",
            desc: "Strict authentication and clearance verification for all system users."
        }
    ];

    const alerts = [
        { type: "HIGH", message: "3 critical cases require immediate attention", time: "2 min ago" },
        { type: "MEDIUM", message: "New inter-agency coordination request", time: "15 min ago" },
        { type: "INFO", message: "System security update completed", time: "1 hour ago" }
    ];

    return (
        <div className="home homepage">
            <section className={`home hero-section ${isVisible ? 'home hero-visible' : ''}`}>
                <div className="home hero-background">
                    <div className="home grid-overlay"></div>
                    <div className="home scan-lines"></div>
                </div>
                
                <div className="home hero-content">
                    <div className="home hero-badge">
                        <Shield size={16} />
                        <span>CLASSIFIED SYSTEM - AUTHORIZED PERSONNEL ONLY</span>
                    </div>
                    
                    <h1 className="home hero-title">
                        MULTI-AGENCY CHILD
                        <span className="home title-highlight">PROTECTION NETWORK</span>
                    </h1>
                    
                    <p className="home hero-subtitle">
                        Secure intelligence-driven platform coordinating law enforcement, 
                        social services, and protection agencies for rapid child abuse response
                    </p>
                    
                    <div className="home hero-actions">
                        <button className="home btn-primary">
                            <Lock size={18} />
                            ACCESS SYSTEM
                            <ArrowRight size={18} />
                        </button>
                        <button className="home btn-secondary">
                            <Activity size={18} />
                            OPERATIONS CENTER
                        </button>
                    </div>
                </div>

                <div className="home stats-container">
                    {statistics.map((stat, index) => (
                        <div 
                            key={index} 
                            className={`home stat-item ${currentStat === index ? 'home stat-active' : ''}`}
                        >
                            <stat.icon size={24} />
                            <div className="home stat-content">
                                <div className="home stat-value">{stat.value}</div>
                                <div className="home stat-label">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="home alerts-section">
                <div className="home section-header">
                    <AlertTriangle size={20} />
                    <h2>MISSION CRITICAL ALERTS</h2>
                    <div className="home status-indicator">
                        <div className="home pulse-dot"></div>
                        ACTIVE
                    </div>
                </div>
                
                <div className="home alerts-grid">
                    {alerts.map((alert, index) => (
                        <div key={index} className={`home alert-card alert-${alert.type.toLowerCase()}`}>
                            <div className="home alert-header">
                                <span className={`home alert-badge badge-${alert.type.toLowerCase()}`}>
                                    {alert.type}
                                </span>
                                <span className="home alert-time">{alert.time}</span>
                            </div>
                            <p className="home alert-message">{alert.message}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="home capabilities-section">
                <div className="home section-header">
                    <Target size={20} />
                    <h2>OPERATIONAL CAPABILITIES</h2>
                </div>
                
                <div className="home capabilities-grid">
                    {capabilities.map((capability, index) => (
                        <div 
                            key={index} 
                            className="home capability-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="home capability-icon">
                                <capability.icon size={32} />
                            </div>
                            <h3>{capability.title}</h3>
                            <p>{capability.desc}</p>
                            <div className="home capability-status">
                                <CheckCircle size={14} />
                                <span>OPERATIONAL</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="home command-center">
                <div className="home command-header">
                    <Globe size={20} />
                    <h2>COMMAND CENTER OVERVIEW</h2>
                </div>
                
                <div className="home command-grid">
                    <div className="home command-card">
                        <h3>Active Agencies</h3>
                        <div className="home agency-list">
                            <div className="home agency-item">
                                <div className="home agency-status online"></div>
                                <span>Police Department</span>
                            </div>
                            <div className="home agency-item">
                                <div className="home agency-status online"></div>
                                <span>Child Services</span>
                            </div>
                            <div className="home agency-item">
                                <div className="home agency-status online"></div>
                                <span>Healthcare Network</span>
                            </div>
                            <div className="home agency-item">
                                <div className="home agency-status offline"></div>
                                <span>Legal Aid Services</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="home command-card">
                        <h3>System Status</h3>
                        <div className="home status-list">
                            <div className="home status-item">
                                <CheckCircle size={16} />
                                <span>Database: Operational</span>
                            </div>
                            <div className="home status-item">
                                <CheckCircle size={16} />
                                <span>Security: Maximum</span>
                            </div>
                            <div className="home status-item">
                                <CheckCircle size={16} />
                                <span>Communications: Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}