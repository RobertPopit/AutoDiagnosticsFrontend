import React, { useState } from "react";
import styles from "../components/SignUp.module.css";
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ onSignUpSuccess }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Verifică dacă parola are cel puțin 8 caractere și conține cel puțin o literă și o cifră
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "Prenumele este obligatoriu";
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "Prenumele trebuie să aibă cel puțin 2 caractere";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Numele este obligatoriu";
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = "Numele trebuie să aibă cel puțin 2 caractere";
        }

        if (!formData.email) {
            newErrors.email = "Email-ul este obligatoriu";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Email-ul nu este valid";
        }

        return newErrors;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = "Parola este obligatorie";
        } else if (!validatePassword(formData.password)) {
            newErrors.password = "Parola trebuie să aibă cel puțin 8 caractere, o literă și o cifră";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirmarea parolei este obligatorie";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Parolele nu coincid";
        }

        return newErrors;
    };

    const handleNextStep = () => {
        const stepErrors = validateStep1();
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }
        setErrors({});
        setCurrentStep(2);
    };

    const handlePreviousStep = () => {
        setCurrentStep(1);
        setErrors({});
    };

    const handleSubmit = async () => {
        const stepErrors = validateStep2();
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        setIsLoading(true);

        try {
            console.log('SignUp attempt:', formData);

            // Simulare API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // SignUp reușit - arată mesajul de succes
            setShowSuccess(true);

            // După 2 secunde, navighează către pagina de login sau home
            setTimeout(() => {
                if (onSignUpSuccess) {
                    onSignUpSuccess(formData);
                } else {
                    navigate('/login');
                    console.log('Redirecting to login page...');
                }
            }, 2000);

        } catch (error) {
            setErrors({ general: "Eroare la înregistrare. Încearcă din nou." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        console.log('Google signup');
        alert('Funcționalitatea de înregistrare cu Google va fi implementată!');
    };

    const goToLogin = () => {
        navigate('/');
    };

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, text: "", color: "" };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[@$!%*#?&]/.test(password)) strength++;

        const levels = [
            { text: "Foarte slabă", color: "#ff4444" },
            { text: "Slabă", color: "#ff8800" },
            { text: "Medie", color: "#ffaa00" },
            { text: "Bună", color: "#88cc00" },
            { text: "Foarte bună", color: "#00cc44" }
        ];

        return {
            strength: (strength / 5) * 100,
            text: levels[Math.min(strength - 1, 4)]?.text || "",
            color: levels[Math.min(strength - 1, 4)]?.color || "#ddd"
        };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div className={styles.container}>
            {/* Animated background elements */}
            <div className={styles.bgAnimation}>
                <div className={styles.floatingElement}></div>
                <div className={styles.floatingElement}></div>
                <div className={styles.floatingElement}></div>
                <div className={styles.floatingElement}></div>
            </div>

            <div className={styles.signupCard}>
                {/* Logo */}
                <div className={styles.logo}>
                    <div className={styles.logoContainer}>
                        <span className={styles.logoIcon}>✈️</span>
                        <h1 className={styles.logoTitle}>TripPlan</h1>
                    </div>
                    <p className={styles.logoSubtitle}>
                        Începe-ți aventura cu noi
                    </p>
                </div>

                {/* Progress Steps */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.step}>
                            <div className={`${styles.stepCircle} ${currentStep >= 1 ? styles.active : ''}`}>
                                1
                            </div>
                            <span className={styles.stepLabel}>Date personale</span>
                        </div>
                        <div className={`${styles.progressLine} ${currentStep >= 2 ? styles.completed : ''}`}></div>
                        <div className={styles.step}>
                            <div className={`${styles.stepCircle} ${currentStep >= 2 ? styles.active : ''}`}>
                                2
                            </div>
                            <span className={styles.stepLabel}>Securitate</span>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className={styles.successMessage}>
                        <span className={styles.successIcon}>🎉</span>
                        Cont creat cu succes! Te redirectăm către pagina de login...
                    </div>
                )}

                {/* Error Message */}
                {errors.general && (
                    <div className={styles.errorMessage}>
                        {errors.general}
                    </div>
                )}

                {/* Sign Up Form */}
                <div className={`${styles.formContainer} ${showSuccess ? styles.formFaded : ''}`}>

                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <div className={styles.stepContent}>
                            {/* First Name */}
                            <div className={styles.formGroup}>
                                <label htmlFor="firstName" className={styles.formLabel}>
                                    Prenume
                                </label>
                                <div className={styles.inputContainer}>
                                    <span className={styles.inputIcon}>👤</span>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        placeholder="Introdu prenumele"
                                        className={`${styles.formInput} ${errors.firstName ? styles.error : ''}`}
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className={styles.errorText}>{errors.firstName}</p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className={styles.formGroup}>
                                <label htmlFor="lastName" className={styles.formLabel}>
                                    Nume
                                </label>
                                <div className={styles.inputContainer}>
                                    <span className={styles.inputIcon}>👤</span>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        placeholder="Introdu numele"
                                        className={`${styles.formInput} ${errors.lastName ? styles.error : ''}`}
                                    />
                                </div>
                                {errors.lastName && (
                                    <p className={styles.errorText}>{errors.lastName}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.formLabel}>
                                    Email
                                </label>
                                <div className={styles.inputContainer}>
                                    <span className={styles.inputIcon}>📧</span>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="Introdu adresa de email"
                                        className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className={styles.errorText}>{errors.email}</p>
                                )}
                            </div>

                            {/* Next Button */}
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className={styles.nextButton}
                            >
                                Continuă
                                <span className={styles.buttonIcon}>→</span>
                            </button>
                        </div>
                    )}

                    {/* Step 2: Security */}
                    {currentStep === 2 && (
                        <div className={styles.stepContent}>
                            {/* Password */}
                            <div className={styles.formGroup}>
                                <label htmlFor="password" className={styles.formLabel}>
                                    Parolă
                                </label>
                                <div className={styles.inputContainer}>
                                    <span className={styles.inputIcon}>🔒</span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        placeholder="Creează o parolă sigură"
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

                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className={styles.passwordStrength}>
                                        <div className={styles.strengthBar}>
                                            <div
                                                className={styles.strengthFill}
                                                style={{
                                                    width: `${passwordStrength.strength}%`,
                                                    backgroundColor: passwordStrength.color
                                                }}
                                            ></div>
                                        </div>
                                        <span
                                            className={styles.strengthText}
                                            style={{ color: passwordStrength.color }}
                                        >
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                )}

                                {errors.password && (
                                    <p className={styles.errorText}>{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className={styles.formGroup}>
                                <label htmlFor="confirmPassword" className={styles.formLabel}>
                                    Confirmă parola
                                </label>
                                <div className={styles.inputContainer}>
                                    <span className={styles.inputIcon}>🔐</span>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        placeholder="Confirmă parola"
                                        className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className={styles.passwordToggle}
                                    >
                                        {showConfirmPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className={styles.errorText}>{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={handlePreviousStep}
                                    className={styles.backButton}
                                >
                                    <span className={styles.buttonIcon}>←</span>
                                    Înapoi
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className={styles.signupButton}
                                >
                                    {isLoading ? 'Se înregistrează...' : 'Creează contul'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Divider */}
                {!showSuccess && (
                    <div className={styles.divider}>
                        <span className={styles.dividerText}>sau</span>
                    </div>
                )}

                {/* Google SignUp Button */}
                {!showSuccess && (
                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        className={styles.googleButton}
                    >
                        <svg className={styles.googleIcon} viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Înregistrează-te cu Google
                    </button>
                )}

                {/* Login Link */}
                {!showSuccess && (
                    <div className={styles.loginLink}>
                        Ai deja un cont?{' '}
                        <button
                            type="button"
                            onClick={goToLogin}
                            className={styles.loginLinkButton}
                        >
                            Conectează-te
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUpForm;