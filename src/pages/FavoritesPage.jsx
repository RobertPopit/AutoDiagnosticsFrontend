import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Star, Calendar, Trash2, Share2, Filter, Grid3X3, List, Search, Plane, DollarSign, Users, Camera, Clock, TrendingUp, ArrowLeft, Home, Menu } from 'lucide-react';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [showStats, setShowStats] = useState(true);
    const [selectedItems, setSelectedItems] = useState(new Set());

    // Date mock pentru favorite
    const mockFavorites = [
        {
            id: 1,
            name: 'Santorini',
            country: 'Grecia',
            continent: 'Europa',
            image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop',
            rating: 4.8,
            price: 850,
            savedDate: '2025-06-10',
            visited: false,
            wishlistDate: '2025-06-01',
            tags: ['romantic', 'sunset', 'island'],
            notes: 'Perfect pentru luna de miere! Apusurile sunt incredibile.',
            plannedVisit: '2025-08-15',
            budget: 1200,
            duration: 7
        },
        {
            id: 2,
            name: 'Kyoto',
            country: 'Japonia',
            continent: 'Asia',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
            rating: 4.9,
            price: 1200,
            savedDate: '2025-06-08',
            visited: true,
            visitedDate: '2024-03-20',
            wishlistDate: '2024-12-15',
            tags: ['culture', 'temples', 'traditional'],
            notes: 'Temple-urile sunt de vis! Sezonul florilor de cireș este spectaculos.',
            budget: 1500,
            duration: 10
        },
        {
            id: 3,
            name: 'Machu Picchu',
            country: 'Peru',
            continent: 'America',
            image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop',
            rating: 4.7,
            price: 900,
            savedDate: '2025-06-05',
            visited: false,
            wishlistDate: '2025-05-20',
            tags: ['adventure', 'hiking', 'history'],
            notes: 'Vreau să fac trekking-ul complet pe Inca Trail.',
            plannedVisit: '2025-09-10',
            budget: 1100,
            duration: 6
        },
        {
            id: 4,
            name: 'Maldive',
            country: 'Maldive',
            continent: 'Asia',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            rating: 4.9,
            price: 3000,
            savedDate: '2025-06-12',
            visited: false,
            wishlistDate: '2025-06-12',
            tags: ['luxury', 'beach', 'honeymoon'],
            notes: 'Destinația perfectă pentru relaxare totală.',
            plannedVisit: '2025-12-20',
            budget: 4000,
            duration: 8
        },
        {
            id: 5,
            name: 'Safari Serengeti',
            country: 'Tanzania',
            continent: 'Africa',
            image: 'https://images.unsplash.com/photo-1549366021-9f761d040ff1?w=400&h=300&fit=crop',
            rating: 4.6,
            price: 2500,
            savedDate: '2025-06-01',
            visited: true,
            visitedDate: '2024-07-15',
            wishlistDate: '2024-01-10',
            tags: ['wildlife', 'safari', 'adventure'],
            notes: 'Experiența vieții mele! Migrația gnurilor a fost incredibilă.',
            budget: 3000,
            duration: 12
        }
    ];

    useEffect(() => {
        setFavorites(mockFavorites);
    }, []);

    const filteredAndSortedFavorites = favorites
        .filter(fav => {
            // Aplicăm mai întâi filtrul de status
            const matchesFilter = filterBy === 'all' ||
                (filterBy === 'visited' && fav.visited) ||
                (filterBy === 'planned' && !fav.visited && fav.plannedVisit) ||
                (filterBy === 'wishlist' && !fav.visited && !fav.plannedVisit);

            // Apoi aplicăm filtrul de căutare doar pe elementele care trec filtrul de status
            if (!matchesFilter) return false;

            const matchesSearch = searchTerm === '' ||
                fav.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fav.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fav.continent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fav.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            return matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'recent':
                    return new Date(b.savedDate) - new Date(a.savedDate);
                case 'alphabetical':
                    return a.name.localeCompare(b.name);
                case 'rating':
                    return b.rating - a.rating;
                case 'price':
                    return a.price - b.price;
                default:
                    return 0;
            }
        });

    const removeFavorite = (id) => {
        setFavorites(favorites.filter(fav => fav.id !== id));
    };

    const toggleSelect = (id) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedItems(newSelected);
    };

    const getStats = () => {
        const visited = favorites.filter(f => f.visited).length;
        const planned = favorites.filter(f => !f.visited && f.plannedVisit).length;
        const wishlist = favorites.filter(f => !f.visited && !f.plannedVisit).length;
        const totalBudget = favorites.reduce((sum, f) => sum + (f.budget || f.price), 0);
        const avgRating = favorites.reduce((sum, f) => sum + f.rating, 0) / favorites.length;

        return { visited, planned, wishlist, totalBudget, avgRating };
    };

    const stats = getStats();

    const StatCard = ({ icon, title, value, subtitle, color }) => (
        <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: `3px solid ${color}20`,
            transition: 'transform 0.2s ease'
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{
                    background: `${color}20`,
                    padding: '12px',
                    borderRadius: '12px',
                    color: color
                }}>
                    {icon}
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '700', color: '#2c3e50' }}>
                        {value}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>{title}</p>
                </div>
            </div>
            {subtitle && (
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#95a5a6' }}>{subtitle}</p>
            )}
        </div>
    );

    const FavoriteCard = ({ favorite, isListView = false }) => (
        <div style={{
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            display: isListView ? 'flex' : 'block',
            height: isListView ? '180px' : 'auto',
            position: 'relative'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            }}
        >
            {/* Checkbox for selection */}
            <input
                type="checkbox"
                checked={selectedItems.has(favorite.id)}
                onChange={() => toggleSelect(favorite.id)}
                style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 10,
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                }}
                onClick={(e) => e.stopPropagation()}
            />

            <div style={{
                position: 'relative',
                width: isListView ? '280px' : '100%',
                height: isListView ? '180px' : '200px',
                flexShrink: 0
            }}>
                <img
                    src={favorite.image}
                    alt={favorite.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />

                {/* Status badges */}
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    gap: '8px'
                }}>
                    {favorite.visited && (
                        <span style={{
                            background: '#27ae60',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            fontWeight: '600'
                        }}>
                            ✓ Vizitat
                        </span>
                    )}
                    {favorite.plannedVisit && !favorite.visited && (
                        <span style={{
                            background: '#f39c12',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            fontWeight: '600'
                        }}>
                            📅 Planificat
                        </span>
                    )}
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '6px 10px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <Star size={12} fill="gold" color="gold" />
                    {favorite.rating}
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                    <div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: '700', color: '#2c3e50' }}>
                            {favorite.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#7f8c8d' }}>
                            <MapPin size={14} />
                            <span style={{ fontSize: '0.9rem' }}>{favorite.country}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigator.share && navigator.share({
                                    title: favorite.name,
                                    text: `Vreau să vizitez ${favorite.name}, ${favorite.country}!`,
                                    url: window.location.href
                                });
                            }}
                            style={{
                                background: '#3498db',
                                color: 'white',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            <Share2 size={16} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFavorite(favorite.id);
                            }}
                            style={{
                                background: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                {favorite.notes && (
                    <p style={{
                        margin: '0 0 1rem 0',
                        color: '#5a6c7d',
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                        background: '#f8f9fa',
                        padding: '8px',
                        borderRadius: '8px',
                        borderLeft: '3px solid #3498db'
                    }}>
                        💭 {favorite.notes}
                    </p>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
                    {favorite.tags.map((tag, index) => (
                        <span
                            key={index}
                            style={{
                                background: '#ecf0f1',
                                color: '#2c3e50',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '0.7rem',
                                fontWeight: '500'
                            }}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: '#7f8c8d',
                    marginBottom: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <DollarSign size={12} />
                        €{favorite.budget || favorite.price}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} />
                        {favorite.duration}d
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        {new Date(favorite.savedDate).toLocaleDateString('ro-RO')}
                    </div>
                </div>

                {favorite.plannedVisit && (
                    <div style={{
                        background: '#fff3cd',
                        color: '#856404',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                    }}>
                        🗓️ Planificat pentru: {new Date(favorite.plannedVisit).toLocaleDateString('ro-RO')}
                    </div>
                )}

                {favorite.visited && (
                    <div style={{
                        background: '#d4edda',
                        color: '#155724',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                    }}>
                        ✅ Vizitat în: {new Date(favorite.visitedDate).toLocaleDateString('ro-RO')}
                    </div>
                )}
            </div>
        </div>
    );
    ///////////////////////////////////////////////////////////////////////
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Navigation Bar */}
            <nav style={{
                background: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#2980b9'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#3498db'}
                    >
                        <ArrowLeft size={18} />
                        Înapoi
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Heart size={20} color="#e74c3c" />
                        <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
                            Favorite
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            background: 'transparent',
                            color: '#7f8c8d',
                            border: '2px solid #ecf0f1',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.85rem',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#3498db';
                            e.currentTarget.style.color = '#3498db';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#ecf0f1';
                            e.currentTarget.style.color = '#7f8c8d';
                        }}
                    >
                        <Home size={16} />
                        Acasă
                    </button>
                    <button
                        style={{
                            background: 'transparent',
                            color: '#7f8c8d',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </nav>

            <div style={{ padding: '2rem' }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                    color: 'white',
                    padding: '3rem 2rem',
                    borderRadius: '24px',
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                    <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', fontWeight: '700' }}>
                        ❤️ Destinațiile Tale Favorite
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                        Colecția ta personală de locuri de vis și aventuri planificate
                    </p>
                </div>

                {/* Stats Dashboard */}
                {showStats && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <StatCard
                            icon={<Camera size={24} />}
                            title="Destinații Vizitate"
                            value={stats.visited}
                            subtitle={`Din ${favorites.length} favorite`}
                            color="#27ae60"
                        />
                        <StatCard
                            icon={<Calendar size={24} />}
                            title="Călătorii Planificate"
                            value={stats.planned}
                            subtitle="În următoarele luni"
                            color="#f39c12"
                        />
                        <StatCard
                            icon={<Heart size={24} />}
                            title="Lista de Dorințe"
                            value={stats.wishlist}
                            subtitle="De explorat"
                            color="#e74c3c"
                        />
                        <StatCard
                            icon={<DollarSign size={24} />}
                            title="Buget Total"
                            value={`€${stats.totalBudget.toLocaleString()}`}
                            subtitle={`Medie: €${Math.round(stats.totalBudget / favorites.length).toLocaleString()}`}
                            color="#3498db"
                        />
                        <StatCard
                            icon={<TrendingUp size={24} />}
                            title="Rating Mediu"
                            value={stats.avgRating.toFixed(1)}
                            subtitle="⭐ Calitate înaltă"
                            color="#9b59b6"
                        />
                    </div>
                )}

                {/* Controls */}
                <div style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    marginBottom: '2rem'
                }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
                            <Search size={18} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#7f8c8d'
                            }} />
                            <input
                                type="text"
                                placeholder="Caută în destinațiile filtrate..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 45px',
                                    border: '2px solid #ecf0f1',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <select
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                            style={{
                                padding: '12px 16px',
                                border: '2px solid #ecf0f1',
                                borderRadius: '12px',
                                fontSize: '0.95rem',
                                backgroundColor: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="all">Toate</option>
                            <option value="visited">Vizitate</option>
                            <option value="planned">Planificate</option>
                            <option value="wishlist">Lista de dorințe</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '12px 16px',
                                border: '2px solid #ecf0f1',
                                borderRadius: '12px',
                                fontSize: '0.95rem',
                                backgroundColor: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="recent">Cel mai recent</option>
                            <option value="alphabetical">Alfabetic</option>
                            <option value="rating">Rating</option>
                            <option value="price">Preț</option>
                        </select>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => setViewMode('grid')}
                                style={{
                                    background: viewMode === 'grid' ? '#3498db' : '#ecf0f1',
                                    color: viewMode === 'grid' ? 'white' : '#2c3e50',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Grid3X3 size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                style={{
                                    background: viewMode === 'list' ? '#3498db' : '#ecf0f1',
                                    color: viewMode === 'list' ? 'white' : '#2c3e50',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>

                    {selectedItems.size > 0 && (
                        <div style={{
                            marginTop: '1rem',
                            padding: '12px',
                            background: '#f8f9fa',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                                {selectedItems.size} destinații selectate
                            </span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => {
                                        selectedItems.forEach(id => removeFavorite(id));
                                        setSelectedItems(new Set());
                                    }}
                                    style={{
                                        background: '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    Șterge selectate
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    color: '#7f8c8d'
                }}>
                    <span>{filteredAndSortedFavorites.length} destinații găsite</span>
                    <button
                        onClick={() => setShowStats(!showStats)}
                        style={{
                            background: 'transparent',
                            border: '2px solid #3498db',
                            color: '#3498db',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                        }}
                    >
                        {showStats ? 'Ascunde' : 'Arată'} Statistici
                    </button>
                </div>

                {/* Favorites Grid/List */}
                {filteredAndSortedFavorites.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        color: '#7f8c8d'
                    }}>
                        <Heart size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                        <h3>Nu ai încă destinații favorite</h3>
                        <p>Explorează destinațiile și salvează-ți preferatele!</p>
                    </div>
                ) : (
                    <div style={viewMode === 'grid' ? {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                        gap: '2rem'
                    } : {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        {filteredAndSortedFavorites.map(favorite => (
                            <FavoriteCard
                                key={favorite.id}
                                favorite={favorite}
                                isListView={viewMode === 'list'}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;