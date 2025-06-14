import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Heart, MapPin, Star, DollarSign, Calendar, Users, ArrowLeft } from 'lucide-react';
import styles from '../components/Destionations.module.css';

const TravelDestinationsApp = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedContinent, setSelectedContinent] = useState('all');
    const [selectedBudget, setSelectedBudget] = useState('all');
    const [favorites, setFavorites] = useState(new Set());

    const continents = [
        { id: 'all', name: 'Toate Continentele', icon: '🌍' },
        { id: 'europe', name: 'Europa', icon: '🏰' },
        { id: 'asia', name: 'Asia', icon: '🏯' },
        { id: 'africa', name: 'Africa', icon: '🦁' },
        { id: 'america', name: 'America', icon: '🗽' },
        { id: 'oceania', name: 'Oceania', icon: '🏝️' }
    ];

    const budgetRanges = [
        { id: 'all', name: 'Toate Bugetele', range: '' },
        { id: 'budget', name: 'Buget Mic', range: '< 500€' },
        { id: 'mid', name: 'Buget Mediu', range: '500€ - 1500€' },
        { id: 'luxury', name: 'Buget Mare', range: '> 1500€' }
    ];

    const destinations = [
        {
            id: 1,
            name: 'Santorini',
            country: 'Grecia',
            continent: 'europe',
            budget: 'mid',
            image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop',
            rating: 4.8,
            price: 850,
            duration: '5-7 zile',
            description: 'Insulă magică cu apusuri spectaculoase și arhitectură cicladică unică.',
            highlights: ['Apusuri de vis', 'Plaje cu nisip vulcanic', 'Vin local']
        },
        {
            id: 2,
            name: 'Kyoto',
            country: 'Japonia',
            continent: 'asia',
            budget: 'mid',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
            rating: 4.9,
            price: 1200,
            duration: '7-10 zile',
            description: 'Orașul tradițional al Japoniei cu temple antice și grădini zen.',
            highlights: ['Temple istorice', 'Ceremonia ceaiului', 'Florile de cireș']
        },
        {
            id: 3,
            name: 'Machu Picchu',
            country: 'Peru',
            continent: 'america',
            budget: 'mid',
            image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop',
            rating: 4.7,
            price: 900,
            duration: '4-6 zile',
            description: 'Citadela pierdută a incașilor, una dintre Minunile Lumii.',
            highlights: ['Ruine antice', 'Trasee montane', 'Cultură incașă']
        },
        {
            id: 4,
            name: 'Safari Serengeti',
            country: 'Tanzania',
            continent: 'africa',
            budget: 'luxury',
            image: 'https://images.unsplash.com/photo-1549366021-9f761d040ff1?w=400&h=300&fit=crop',
            rating: 4.6,
            price: 2500,
            duration: '7-14 zile',
            description: 'Experiență safari de neuitat în inima Africii.',
            highlights: ['Big Five', 'Migrația gnurilor', 'Lodge-uri de lux']
        },
        {
            id: 5,
            name: 'Bali',
            country: 'Indonezia',
            continent: 'asia',
            budget: 'budget',
            image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
            rating: 4.5,
            price: 650,
            duration: '7-14 zile',
            description: 'Paradis tropical cu temple hinduiste și terase de orez.',
            highlights: ['Plaje exotice', 'Yoga și wellness', 'Cultură balineză']
        },
        {
            id: 6,
            name: 'Patagonia',
            country: 'Argentina/Chile',
            continent: 'america',
            budget: 'mid',
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
            rating: 4.8,
            price: 1100,
            duration: '10-14 zile',
            description: 'Peisaje sălbatice cu ghețari, munți și stepă infinită.',
            highlights: ['Torres del Paine', 'Ghețarul Perito Moreno', 'Hiking epic']
        },
        {
            id: 7,
            name: 'Maldive',
            country: 'Maldive',
            continent: 'asia',
            budget: 'luxury',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            rating: 4.9,
            price: 3000,
            duration: '5-10 zile',
            description: 'Atoluri de vis cu ape cristaline și vile peste apă.',
            highlights: ['Overwater bungalows', 'Scuba diving', 'Plaje private']
        },
        {
            id: 8,
            name: 'Sydney',
            country: 'Australia',
            continent: 'oceania',
            budget: 'mid',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            rating: 4.4,
            price: 1300,
            duration: '7-10 zile',
            description: 'Orașul-port iconic cu Opera House și Harbour Bridge.',
            highlights: ['Opera House', 'Bondi Beach', 'Harbour Bridge']
        }
    ];

    const filteredDestinations = useMemo(() => {
        return destinations.filter(dest => {
            const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dest.country.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesContinent = selectedContinent === 'all' || dest.continent === selectedContinent;
            const matchesBudget = selectedBudget === 'all' || dest.budget === selectedBudget;

            return matchesSearch && matchesContinent && matchesBudget;
        });
    }, [searchTerm, selectedContinent, selectedBudget]);

    const toggleFavorite = (id) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(id)) {
            newFavorites.delete(id);
        } else {
            newFavorites.add(id);
        }
        setFavorites(newFavorites);
    };

    const DestinationCard = ({ destination, isListView = false }) => (
        <div className={`${styles.destinationCard} ${isListView ? styles.listView : ''}`}>
            <div className={`${styles.imageContainer} ${isListView ? styles.listImageContainer : ''}`}>
                <img
                    src={destination.image}
                    alt={destination.name}
                    className={styles.destinationImage}
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(destination.id);
                    }}
                    className={styles.favoriteButton}
                >
                    <Heart
                        size={20}
                        fill={favorites.has(destination.id) ? '#e74c3c' : 'none'}
                        color={favorites.has(destination.id) ? '#e74c3c' : '#2c3e50'}
                    />
                </button>
                <div className={styles.ratingBadge}>
                    <Star size={12} fill="gold" color="gold" />
                    {destination.rating}
                </div>
            </div>

            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.destinationName}>
                        {destination.name}
                    </h3>
                    <span className={styles.price}>
                        €{destination.price}
                    </span>
                </div>

                <div className={styles.locationInfo}>
                    <MapPin size={14} />
                    <span>{destination.country}</span>
                </div>

                <p className={`${styles.description} ${isListView ? styles.listDescription : ''}`}>
                    {destination.description}
                </p>

                <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                        <Calendar size={14} />
                        {destination.duration}
                    </div>
                    <div className={styles.metaItem}>
                        <Users size={14} />
                        2-4 pers
                    </div>
                </div>

                <div className={styles.highlightsContainer}>
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className={styles.highlight}>
                            {highlight}
                        </span>
                    ))}
                </div>

                <button className={styles.detailsButton}>
                    Vezi Detalii
                </button>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            {/* Back Button */}
            <div className={styles.backButtonContainer}>
                <button
                    onClick={() => window.history.back()}
                    className={styles.backButton}
                >
                    <ArrowLeft size={20} />
                    Înapoi
                </button>
            </div>

            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>
                    🌍 Explorează Lumea
                </h1>
                <p className={styles.subtitle}>
                    Descoperă destinații de vis din întreaga lume și planifică-ți următoarea aventură
                </p>
            </div>

            {/* Search & Filters */}
            <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                    {/* Search Bar */}
                    <div className={styles.searchBarContainer}>
                        <Search size={20} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Caută destinații sau țări..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    {/* Filter Toggles */}
                    <div className={styles.filterControls}>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={styles.filterToggle}
                        >
                            <Filter size={18} />
                            Filtre {showFilters ? '↑' : '↓'}
                        </button>

                        <div className={styles.viewModeButtons}>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`${styles.viewModeButton} ${viewMode === 'grid' ? styles.active : ''}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`${styles.viewModeButton} ${viewMode === 'list' ? styles.active : ''}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className={styles.filtersContainer}>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>
                                    🌍 Continent
                                </label>
                                <select
                                    value={selectedContinent}
                                    onChange={(e) => setSelectedContinent(e.target.value)}
                                    className={styles.filterSelect}
                                >
                                    {continents.map(continent => (
                                        <option key={continent.id} value={continent.id}>
                                            {continent.icon} {continent.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>
                                    💰 Buget
                                </label>
                                <select
                                    value={selectedBudget}
                                    onChange={(e) => setSelectedBudget(e.target.value)}
                                    className={styles.filterSelect}
                                >
                                    {budgetRanges.map(budget => (
                                        <option key={budget.id} value={budget.id}>
                                            {budget.name} ({budget.range})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Results Count */}
                    <div className={styles.resultsInfo}>
                        <span>
                            {filteredDestinations.length} destinații găsite
                        </span>
                        {favorites.size > 0 && (
                            <span className={styles.favoritesCount}>
                                <Heart size={16} fill="#e74c3c" color="#e74c3c" />
                                {favorites.size} favorite
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Destinations Grid/List */}
            <div className={styles.destinationsSection}>
                {filteredDestinations.length === 0 ? (
                    <div className={styles.noResults}>
                        <h3>Nu am găsit destinații care să corespundă criteriilor tale</h3>
                        <p>Încearcă să modifici filtrele sau termenii de căutare</p>
                    </div>
                ) : (
                    <div className={`${styles.destinationsGrid} ${viewMode === 'list' ? styles.listLayout : ''}`}>
                        {filteredDestinations.map(destination => (
                            <DestinationCard
                                key={destination.id}
                                destination={destination}
                                isListView={viewMode === 'list'}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <p>
                    © 2025 Explorează Lumea. Toate drepturile rezervate.
                </p>
            </div>
        </div>
    );
};

export default TravelDestinationsApp;