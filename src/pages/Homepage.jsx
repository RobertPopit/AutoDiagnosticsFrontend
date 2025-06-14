import React, { useState, useEffect } from 'react';
import styles from '../components/Home.module.css';
import TripPlanningModal from '../components/homepage/modalPlanning';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('home');
    const [animatedCards, setAnimatedCards] = useState(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State pentru utilizator
    const [user, setUser] = useState({
        name: 'Ana Maria Popescu',
        email: 'ana.popescu@email.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b784?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    });

    // State pentru dropdown-ul de utilizator
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const startPlanning = () => {
        setIsModalOpen(true);
    };

    const destinations = [
        {
            id: 'paris',
            title: 'Paris, Franța',
            description: 'Orașul luminilor te așteaptă cu monumentele sale iconice, muzeele de clasă mondială și atmosfera romantică unică.',
            price: 'de la 299€',
            image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'tokyo',
            title: 'Tokyo, Japonia',
            description: 'O fuziune fascinantă între tradițional și modern, cu tehnologie de vârf, temple antice și gastronomie extraordinară.',
            price: 'de la 599€',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'santorini',
            title: 'Santorini, Grecia',
            description: 'Insulă vulcanică cu priveliști spectaculoase, apusuri de soare magice și arhitectură cicladică albă.',
            price: 'de la 399€',
            image: 'https://images.unsplash.com/photo-1570077188648-d439c6058155?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'bali',
            title: 'Bali, Indonezia',
            description: 'Paradis tropical cu plaje de vis, temple hinduiste magnifice și o cultură vibrantă plină de spiritualitate.',
            price: 'de la 449€',
            image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'iceland',
            title: 'Islanda',
            description: 'Țara gheții și focului oferă peisaje dramatice, aurora boreală și aventuri în natură de neuitat.',
            price: 'de la 699€',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'dubai',
            title: 'Dubai, UAE',
            description: 'Metropolă futuristă cu zgârie-nori impresionanți, shopping de lux și experiențe de neuitat în deșert.',
            price: 'de la 549€',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];

    const navItems = [
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'destinations', icon: '🌍', label: 'Destinații' },
        { id: 'favorites', icon: '⭐', label: 'Favorite' },
        { id: 'budget', icon: '💰', label: 'Buget' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            destinations.forEach((_, index) => {
                setTimeout(() => {
                    setAnimatedCards(prev => new Set([...prev, index]));
                }, index * 100);
            });
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // Închide dropdown-ul când se face click în afara lui
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-dropdown-container')) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleNavClick = (navId) => {
        setActiveNav(navId);

        switch (navId) {
            case 'home':
                navigate('/home');
                break;
            case 'destinations':
                navigate('/destinations');
                break;
            case 'favorites':
                navigate('/favorites');
                break;
            case 'budget':
                navigate('/budget');
                break;
            default:
                break;
        }
    };

    const handleLogout = () => {
        // Aici poți adăuga logica pentru logout (clear tokens, etc.)
        const confirmLogout = window.confirm('Ești sigur că vrei să te deconectezi?');
        if (confirmLogout) {
            // Șterge datele din localStorage/sessionStorage
            // localStorage.removeItem('authToken');
            // sessionStorage.clear();

            // Resetează starea utilizatorului
            setUser(null);

            // Navighează către pagina de login
            navigate('/');
        }
    };

    const handleProfileClick = () => {
        setIsUserDropdownOpen(false);
        navigate('/profile');
    };

    const handleSettingsClick = () => {
        setIsUserDropdownOpen(false);
        navigate('/settings');
    };

    const selectDestination = (destinationId) => {
        const destination = destinations.find(d => d.id === destinationId);
        if (destination) {
            alert(`Ai selectat ${destination.title}! 🌟\n\nÎn curând vei putea:\n• Vedea detalii complete\n• Planifica itinerariul\n• Găsi oferte speciale\n• Salva la favorite`);
        }
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <nav className={styles.sidebar}>
                <div className={styles.logo}>
                    <h1 className={styles.logoTitle}>✈️ TripPlan</h1>
                </div>

                {/* Container scrollabil pentru meniul de navigație */}
                <div className={styles.navMenuContainer}>
                    <ul className={styles.navMenu}>
                        {navItems.map((item) => (
                            <li key={item.id} className={styles.navItem}>
                                <div
                                    className={`${styles.navLink} ${activeNav === item.id ? styles.active : ''}`}
                                    onClick={() => handleNavClick(item.id)}
                                >
                                    <span className={styles.navIcon}>{item.icon}</span>
                                    {item.label}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Logout Button în Sidebar - Fix la bază */}
                <div className={styles.sidebarFooter}>
                    <div className={styles.navLink} onClick={handleLogout}>
                        <span className={styles.navIcon}>🚪</span>
                        Deconectare
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Header cu User Info */}
                <header className={styles.topHeader}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.pageTitle}>Dashboard</h1>
                        <p className={styles.pageSubtitle}>Bun venit înapoi, {user?.name?.split(' ')[0]}!</p>
                    </div>

                    <div className={`${styles.headerRight} user-dropdown-container`}>
                        <div
                            className={styles.userInfo}
                            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        >
                            <div className={styles.userDetails}>
                                <span className={styles.userName}>{user?.name}</span>
                                <span className={styles.userEmail}>{user?.email}</span>
                            </div>
                            <img
                                src={user?.avatar}
                                alt="Avatar utilizator"
                                className={styles.userAvatar}
                            />
                            <span className={styles.dropdownArrow}>
                                {isUserDropdownOpen ? '▲' : '▼'}
                            </span>
                        </div>

                        {/* Dropdown Menu */}
                        {isUserDropdownOpen && (
                            <div className={styles.userDropdown}>
                                <div className={styles.dropdownItem} onClick={handleProfileClick}>
                                    <span className={styles.dropdownIcon}>👤</span>
                                    Profilul meu
                                </div>
                                <div className={styles.dropdownItem} onClick={handleSettingsClick}>
                                    <span className={styles.dropdownIcon}>⚙️</span>
                                    Setări
                                </div>
                                <div className={styles.dropdownDivider}></div>
                                <div className={styles.dropdownItem} onClick={handleLogout}>
                                    <span className={styles.dropdownIcon}>🚪</span>
                                    Deconectare
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Welcome Section */}
                <section className={styles.welcomeSection}>
                    <h1 className={styles.welcomeTitle}>Bun venit în TripPlan!</h1>
                    <p className={styles.welcomeSubtitle}>
                        Planifică-ți călătoria perfectă, indiferent de buget!
                    </p>
                    <button
                        className={styles.ctaButton}
                        onClick={startPlanning}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#2980b9';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#3498db';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        🚀 Începe să planifici acum
                    </button>
                </section>

                {/* Top Destinations */}
                <section className={styles.destinationsSection}>
                    <h2 className={styles.sectionTitle}>Destinații de Top</h2>
                    <div className={styles.destinationsGrid}>
                        {destinations.map((destination, index) => (
                            <div
                                key={destination.id}
                                className={`${styles.destinationCard} ${animatedCards.has(index) ? styles.cardAnimated : ''}`}
                                onClick={() => selectDestination(destination.id)}
                                style={{
                                    transitionDelay: `${index * 0.1}s`
                                }}
                            >
                                <div
                                    className={styles.cardImage}
                                    style={{ backgroundImage: `url(${destination.image})` }}
                                >
                                    <div className={styles.cardOverlay}></div>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{destination.title}</h3>
                                    <p className={styles.cardDescription}>{destination.description}</p>
                                    <div className={styles.cardPrice}>{destination.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <TripPlanningModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                destinations={destinations}
            />
        </div>
    );
};

export default HomePage;