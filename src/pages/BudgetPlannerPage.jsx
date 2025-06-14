import React, { useState, useEffect } from 'react';
import { Calculator, PlusCircle, Bell, TrendingDown, TrendingUp, Plane, Hotel, Camera, Utensils, Car, ShoppingBag, AlertCircle, Check, X, ArrowLeft } from 'lucide-react';
import styles from '../components/Budget.module.css';

const BudgetPlanner = () => {
    const [activeTab, setActiveTab] = useState('calculator');
    const [totalBudget, setTotalBudget] = useState(2000);
    const [expenses, setExpenses] = useState([
        { id: 1, category: 'Zbor', amount: 450, icon: Plane, color: '#3b82f6' },
        { id: 2, category: 'Cazare', amount: 600, icon: Hotel, color: '#10b981' },
        { id: 3, category: 'Mâncare', amount: 300, icon: Utensils, color: '#f59e0b' },
        { id: 4, category: 'Transport', amount: 150, icon: Car, color: '#8b5cf6' },
        { id: 5, category: 'Activități', amount: 200, icon: Camera, color: '#ec4899' },
        { id: 6, category: 'Shopping', amount: 100, icon: ShoppingBag, color: '#eab308' }
    ]);

    const [newExpense, setNewExpense] = useState({ category: '', amount: 0 });
    const [priceAlerts, setPriceAlerts] = useState([
        { id: 1, destination: 'Paris', type: 'Zbor', currentPrice: 250, targetPrice: 200, status: 'active' },
        { id: 2, destination: 'Roma', type: 'Hotel', currentPrice: 80, targetPrice: 70, status: 'triggered' },
        { id: 3, destination: 'Barcelona', type: 'Zbor', currentPrice: 180, targetPrice: 150, status: 'active' }
    ]);

    const [destinations, setDestinations] = useState([
        { name: 'Paris', flight: 350, hotel: 120, food: 60, activities: 50 },
        { name: 'Roma', flight: 280, hotel: 90, food: 45, activities: 40 },
        { name: 'Barcelona', flight: 220, hotel: 80, food: 40, activities: 45 },
        { name: 'Amsterdam', flight: 200, hotel: 110, food: 55, activities: 35 }
    ]);

    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = totalBudget - totalSpent;
    const budgetPercentage = (totalSpent / totalBudget) * 100;

    const addExpense = () => {
        if (newExpense.category && newExpense.amount > 0) {
            const categoryData = {
                'Zbor': { icon: Plane, color: '#3b82f6' },
                'Cazare': { icon: Hotel, color: '#10b981' },
                'Mâncare': { icon: Utensils, color: '#f59e0b' },
                'Transport': { icon: Car, color: '#8b5cf6' },
                'Activități': { icon: Camera, color: '#ec4899' },
                'Shopping': { icon: ShoppingBag, color: '#eab308' }
            };

            setExpenses([...expenses, {
                id: Date.now(),
                category: newExpense.category,
                amount: Number(newExpense.amount),
                icon: categoryData[newExpense.category]?.icon || ShoppingBag,
                color: categoryData[newExpense.category]?.color || '#6b7280'
            }]);
            setNewExpense({ category: '', amount: 0 });
        }
    };

    const removeAlert = (id) => {
        setPriceAlerts(priceAlerts.filter(alert => alert.id !== id));
    };

    return (
        <div className={styles.container}>
            {/* Simple Back Icon Button */}
            <button
                onClick={() => window.history.back()}
                className={styles.backButton}
                title="Înapoi la navigație"
            >
                <ArrowLeft size={20} />
            </button>

            <div className={styles.wrapper}>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Buget & Planificare Financiară
                    </h1>
                    <p className={styles.subtitle}>Planifică-ți bugetul pentru călătorii și urmărește cheltuielile</p>
                </div>

                {/* Tab Navigation */}
                <div className={styles.card}>
                    <div className={styles.tabNavigation}>
                        {[
                            { id: 'calculator', label: 'Calculator Costuri', icon: Calculator },
                            { id: 'tracking', label: 'Tracking Cheltuieli', icon: TrendingUp },
                            { id: 'compare', label: 'Comparare Prețuri', icon: TrendingDown },
                            { id: 'alerts', label: 'Alerte Preț', icon: Bell }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
                            >
                                <tab.icon size={20} />
                                <span className={styles.tabLabel}>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.tabContent}>
                        {/* Calculator Tab */}
                        {activeTab === 'calculator' && (
                            <div className={styles.calculatorTab}>
                                <div className={styles.budgetCards}>
                                    <div className={styles.totalBudgetCard}>
                                        <h3 className={styles.cardTitle}>Buget Total</h3>
                                        <div className={styles.budgetInput}>
                                            <input
                                                type="number"
                                                value={totalBudget}
                                                onChange={(e) => setTotalBudget(Number(e.target.value))}
                                                className={styles.budgetInputField}
                                                placeholder="Introdu bugetul"
                                            />
                                            <span className={styles.currency}>€</span>
                                        </div>
                                    </div>

                                    <div className={styles.statusCard}>
                                        <h3 className={styles.cardTitle}>Status Buget</h3>
                                        <div className={styles.statusInfo}>
                                            <div className={styles.statusNumbers}>
                                                <span>Cheltuit: {totalSpent}€</span>
                                                <span>Rămas: {remainingBudget}€</span>
                                            </div>
                                            <div className={styles.progressBar}>
                                                <div
                                                    className={`${styles.progressFill} ${budgetPercentage > 90 ? styles.progressDanger : budgetPercentage > 70 ? styles.progressWarning : styles.progressNormal}`}
                                                    style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                                                ></div>
                                            </div>
                                            <p className={styles.progressText}>
                                                {budgetPercentage.toFixed(1)}% din buget folosit
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.expenseGrid}>
                                    {expenses.map((expense) => (
                                        <div key={expense.id} className={styles.expenseCard}>
                                            <div className={styles.expenseContent}>
                                                <div
                                                    className={styles.expenseIcon}
                                                    style={{ backgroundColor: expense.color }}
                                                >
                                                    <expense.icon size={24} color="white" />
                                                </div>
                                                <div className={styles.expenseInfo}>
                                                    <h4 className={styles.expenseCategory}>{expense.category}</h4>
                                                    <p className={styles.expenseAmount}>{expense.amount}€</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tracking Tab */}
                        {activeTab === 'tracking' && (
                            <div className={styles.trackingTab}>
                                <div className={styles.addExpenseCard}>
                                    <h3 className={styles.cardTitle}>Adaugă Cheltuială Nouă</h3>
                                    <div className={styles.addExpenseForm}>
                                        <select
                                            value={newExpense.category}
                                            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                                            className={styles.input}
                                        >
                                            <option value="">Selectează categoria</option>
                                            <option value="Zbor">Zbor</option>
                                            <option value="Cazare">Cazare</option>
                                            <option value="Mâncare">Mâncare</option>
                                            <option value="Transport">Transport</option>
                                            <option value="Activități">Activități</option>
                                            <option value="Shopping">Shopping</option>
                                        </select>
                                        <input
                                            type="number"
                                            value={newExpense.amount}
                                            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                            placeholder="Suma (€)"
                                            className={`${styles.input} ${styles.amountInput}`}
                                        />
                                        <button
                                            onClick={addExpense}
                                            className={styles.button}
                                        >
                                            <PlusCircle size={20} />
                                            Adaugă
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.expenseList}>
                                    {expenses.map((expense) => (
                                        <div key={expense.id} className={styles.expenseListItem}>
                                            <div className={styles.expenseListLeft}>
                                                <div
                                                    className={styles.expenseListIcon}
                                                    style={{ backgroundColor: expense.color }}
                                                >
                                                    <expense.icon size={20} color="white" />
                                                </div>
                                                <div>
                                                    <h4 className={styles.expenseListCategory}>{expense.category}</h4>
                                                    <p className={styles.expenseListDescription}>Cheltuială de călătorie</p>
                                                </div>
                                            </div>
                                            <div className={styles.expenseListRight}>
                                                <p className={styles.expenseListAmount}>{expense.amount}€</p>
                                                <button
                                                    onClick={() => setExpenses(expenses.filter(e => e.id !== expense.id))}
                                                    className={styles.deleteButton}
                                                >
                                                    Șterge
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Compare Tab */}
                        {activeTab === 'compare' && (
                            <div className={styles.compareTab}>
                                <h3 className={styles.cardTitle}>Comparare Prețuri Destinații</h3>
                                <div className={styles.tableWrapper}>
                                    <table className={styles.table}>
                                        <thead className={styles.tableHead}>
                                            <tr>
                                                <th className={styles.tableHeader}>Destinația</th>
                                                <th className={styles.tableHeader}>Zbor</th>
                                                <th className={styles.tableHeader}>Hotel/noapte</th>
                                                <th className={styles.tableHeader}>Mâncare/zi</th>
                                                <th className={styles.tableHeader}>Activități/zi</th>
                                                <th className={styles.tableHeader}>Total/7 zile</th>
                                            </tr>
                                        </thead>
                                        <tbody className={styles.tableBody}>
                                            {destinations.map((dest, index) => {
                                                const total = dest.flight + (dest.hotel * 7) + (dest.food * 7) + (dest.activities * 7);
                                                return (
                                                    <tr key={index} className={styles.tableRow}>
                                                        <td className={styles.tableCell}>{dest.name}</td>
                                                        <td className={`${styles.tableCell} ${styles.flightPrice}`}>{dest.flight}€</td>
                                                        <td className={`${styles.tableCell} ${styles.hotelPrice}`}>{dest.hotel}€</td>
                                                        <td className={`${styles.tableCell} ${styles.foodPrice}`}>{dest.food}€</td>
                                                        <td className={`${styles.tableCell} ${styles.activityPrice}`}>{dest.activities}€</td>
                                                        <td className={`${styles.tableCell} ${styles.totalPrice}`}>{total}€</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Alerts Tab */}
                        {activeTab === 'alerts' && (
                            <div className={styles.alertsTab}>
                                <div className={styles.alertsHeader}>
                                    <h3 className={styles.cardTitle}>Alertele Tale de Preț</h3>
                                    <button className={styles.button}>
                                        <PlusCircle size={20} />
                                        Alertă Nouă
                                    </button>
                                </div>

                                <div className={styles.alertsList}>
                                    {priceAlerts.map((alert) => (
                                        <div key={alert.id} className={`${styles.alertCard} ${alert.status === 'triggered' ? styles.alertTriggered : ''}`}>
                                            <div className={styles.alertContent}>
                                                <div className={styles.alertLeft}>
                                                    <div className={`${styles.alertIcon} ${alert.status === 'triggered' ? styles.alertIconTriggered : ''}`}>
                                                        {alert.status === 'triggered' ?
                                                            <Check size={20} color="white" /> :
                                                            <AlertCircle size={20} color="white" />
                                                        }
                                                    </div>
                                                    <div>
                                                        <h4 className={styles.alertTitle}>{alert.destination} - {alert.type}</h4>
                                                        <p className={styles.alertDescription}>
                                                            Preț curent: <span className={styles.alertPrice}>{alert.currentPrice}€</span> |
                                                            Preț țintă: <span className={styles.alertPrice}>{alert.targetPrice}€</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={styles.alertRight}>
                                                    {alert.status === 'triggered' && (
                                                        <span className={styles.alertBadge}>
                                                            Preț Atins!
                                                        </span>
                                                    )}
                                                    <button
                                                        onClick={() => removeAlert(alert.id)}
                                                        className={styles.alertCloseButton}
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetPlanner;