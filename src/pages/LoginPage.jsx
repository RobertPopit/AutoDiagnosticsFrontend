import React, { useState } from "react";
import styles from "../components/LoginForm.module.css";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        // Reset errors
        setErrors({ email: "", password: "" });

        // Validation
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email-ul este obligatoriu";
        } else if (!validateEmail(email)) {
            newErrors.email = "Email-ul nu este valid";
        }

        if (!password) {
            newErrors.password = "Parola este obligatorie";
        } else if (password.length < 6) {
            newErrors.password = "Parola trebuie să aibă cel puțin 6 caractere";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            // Aici adaugi logica de autentificare
            console.log('Login attempt:', { email, password });

            // Simulare API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Login reușit - arată mesajul de succes
            setShowSuccess(true);

            // După 1.5 secunde, navighează către pagina ta home
            setTimeout(() => {
                if (onLoginSuccess) {
                    onLoginSuccess({ email, password });
                } else {
                    // Dacă nu ai prop onLoginSuccess, poți folosi window.location sau React Router
                    // window.location.href = '/home';
                    // sau navigate('/home') dacă folosești React Router
                    navigate('/home');
                    console.log('Redirecting to home page...');
                }
            }, 1500);

        } catch (error) {
            setErrors({ email: "", password: "Eroare la autentificare. Încearcă din nou." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Aici adaugi logica pentru Google OAuth
        console.log('Google login');
        alert('Funcționalitatea de login cu Google va fi implementată!');
    };

    const handleForgotPassword = () => {
        // Aici adaugi logica pentru recuperarea parolei
        alert('Te vom redirecționa către pagina de recuperare a parolei!');
        // navigate('/forgot-password'); // când adaugi react-router-dom
    };

    const goToSignup = () => {
        // Aici adaugi logica pentru navigarea la pagina de înregistrare
        navigate('/signup')
    };

    return (
        <div className={styles.container}>
            {/* Animated background elements */}
            <div className={styles.bgAnimation}>
                <div className={styles.floatingElement}></div>
                <div className={styles.floatingElement}></div>
                <div className={styles.floatingElement}></div>
            </div>

            <div className={styles.loginCard}>
                {/* Logo */}
                <div className={styles.logo}>
                    <div className={styles.logoContainer}>
                        <span className={styles.logoIcon}>✈️</span>
                        <h1 className={styles.logoTitle}>TripPlan</h1>
                    </div>
                    <p className={styles.logoSubtitle}>
                        Planifică-ți călătoria perfectă
                    </p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className={styles.successMessage}>
                        Login reușit! Te redirectăm către pagina principală...
                    </div>
                )}

                {/* Login Form */}
                <div className={`${styles.formContainer} ${showSuccess ? styles.formFaded : ''}`}>
                    {/* Email Field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>
                            Email
                        </label>
                        <div className={styles.inputContainer}>
                            <span className={styles.inputIcon}>📧</span>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Introdu adresa de email"
                                className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                            />
                        </div>
                        {errors.email && (
                            <p className={styles.errorMessage}>{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.formLabel}>
                            Parolă
                        </label>
                        <div className={styles.inputContainer}>
                            <span className={styles.inputIcon}>🔒</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Introdu parola"
                                className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles.passwordToggle}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        {errors.password && (
                            <p className={styles.errorMessage}>{errors.password}</p>
                        )}
                    </div>

                    {/* Forgot Password */}
                    <div className={styles.forgotPassword}>
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className={styles.forgotPasswordLink}
                        >
                            Ai uitat parola?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={styles.loginButton}
                    >
                        {isLoading ? 'Se conectează...' : 'Conectează-te'}
                    </button>
                </div>

                {/* Divider */}
                <div className={styles.divider}>
                    <span className={styles.dividerText}>sau</span>
                </div>

                {/* Google Login Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className={styles.googleButton}
                >
                    <svg className={styles.googleIcon} viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Conectează-te cu Google
                </button>

                {/* Signup Link */}
                <div className={styles.signupLink}>
                    Nu ai cont?{' '}
                    <button
                        type="button"
                        onClick={goToSignup}
                        className={styles.signupLinkButton}
                    >
                        Înregistrează-te
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;