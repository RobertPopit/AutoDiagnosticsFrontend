import React, { useState } from 'react';

const TripPlanningModal = ({ isOpen, onClose, destinations }) => {
    const [formData, setFormData] = useState({
        destination: '',
        budget: '',
        persons: 1,
        startDate: '',
        endDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenerate = () => {
        if (!formData.destination || !formData.budget || !formData.startDate || !formData.endDate) {
            alert('Te rog completează toate câmpurile obligatorii!');
            return;
        }

        alert(`🎉 Planul tău a fost generat!\n\nDestinația: ${formData.destination}\nBuget: ${formData.budget}€\nPersoane: ${formData.persons}\nPerioadă: ${formData.startDate} - ${formData.endDate}\n\nÎn curând vei primi itinerariul complet!`);
        onClose();
    };

    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            transition: 'all 0.3s ease'
        },
        modal: {
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-20px)',
            transition: 'all 0.3s ease',
            position: 'relative'
        },
        closeButton: {
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
        },
        title: {
            fontSize: '1.8rem',
            color: '#2c3e50',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: '600'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        },
        label: {
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#34495e',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        input: {
            padding: '12px 16px',
            border: '2px solid #e1e8ed',
            borderRadius: '12px',
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            backgroundColor: '#f8f9fa'
        },
        select: {
            padding: '12px 16px',
            border: '2px solid #e1e8ed',
            borderRadius: '12px',
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer'
        },
        dateRow: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
        },
        generateButton: {
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '1rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
        }
    };

    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay} onClick={onClose}>
            <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
                <button
                    style={modalStyles.closeButton}
                    onClick={onClose}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f1f2f6';
                        e.target.style.color = '#2c3e50';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#666';
                    }}
                >
                    ×
                </button>

                <h2 style={modalStyles.title}>🌟 Planifică-ți Călătoria</h2>

                <div style={modalStyles.form}>
                    <div style={modalStyles.formGroup}>
                        <label style={modalStyles.label}>
                            🌍 Destinația *
                        </label>
                        <select
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            style={modalStyles.select}
                            onFocus={(e) => e.target.style.borderColor = '#3498db'}
                            onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                        >
                            <option value="">Selectează destinația</option>
                            {destinations.map(dest => (
                                <option key={dest.id} value={dest.title}>
                                    {dest.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={modalStyles.formGroup}>
                        <label style={modalStyles.label}>
                            💰 Buget (EUR) *
                        </label>
                        <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            placeholder="ex: 1500"
                            min="0"
                            style={modalStyles.input}
                            onFocus={(e) => e.target.style.borderColor = '#3498db'}
                            onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                        />
                    </div>

                    <div style={modalStyles.formGroup}>
                        <label style={modalStyles.label}>
                            👥 Numărul de persoane
                        </label>
                        <input
                            type="number"
                            name="persons"
                            value={formData.persons}
                            onChange={handleInputChange}
                            min="1"
                            max="20"
                            style={modalStyles.input}
                            onFocus={(e) => e.target.style.borderColor = '#3498db'}
                            onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                        />
                    </div>

                    <div style={modalStyles.dateRow}>
                        <div style={modalStyles.formGroup}>
                            <label style={modalStyles.label}>
                                📅 Data plecare *
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                style={modalStyles.input}
                                min={new Date().toISOString().split('T')[0]}
                                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                                onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                            />
                        </div>

                        <div style={modalStyles.formGroup}>
                            <label style={modalStyles.label}>
                                📅 Data întoarcere *
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                style={modalStyles.input}
                                min={formData.startDate || new Date().toISOString().split('T')[0]}
                                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                                onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGenerate}
                        style={modalStyles.generateButton}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#2980b9';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#3498db';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
                        }}
                    >
                        ✨ Generează Planul
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TripPlanningModal;