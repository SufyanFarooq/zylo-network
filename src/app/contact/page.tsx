'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaUser, FaComment, FaPaperPlane } from 'react-icons/fa';
import { sendContactEmail } from '@/services/emailService';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import '../globals.css';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const result = await sendContactEmail(formData);

            if (result.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', description: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-vh-100" style={{ background: '#032233' }}>
            <Header />
            {/* Hero Section */}
            <section className="py-5" style={{ background: 'linear-gradient(135deg, #032233 0%, #0a3d5a 100%)', marginTop: '80px' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h1 className="display-4 fw-bold text-white mb-4" style={{
                                background: 'linear-gradient(135deg, #00d6a3 0%, #fee600 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Ping Us
                            </h1>
                            <p className="lead text-white-50 mb-0">
                                Get in touch with our team. We&apos;re here to help you with any questions about Zillow Vortex.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="contact-form-container" style={{
                                background: 'linear-gradient(145deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
                                borderRadius: '24px',
                                padding: '3rem',
                                boxShadow: `
                  0 25px 50px rgba(0, 0, 0, 0.6),
                  0 15px 30px rgba(0, 0, 0, 0.4),
                  inset 0 2px 0 rgba(255, 255, 255, 0.1)
                `,
                                border: '2px solid rgba(0, 214, 163, 0.3)',
                                backdropFilter: 'blur(20px)'
                            }}>
                                <div className="text-center mb-5">
                                    <h2 className="text-white fw-bold mb-3" style={{ fontSize: '2rem' }}>
                                        Send us a Message
                                    </h2>
                                    <p className="text-white-50">
                                        Fill out the form below and we&apos;ll get back to you as soon as possible.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {/* Name Field */}
                                        <div className="col-md-6 mb-4">
                                            <label className="form-label text-white fw-semibold mb-2">
                                                <FaUser className="me-2" style={{ color: '#00d6a3' }} />
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="form-control"
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    border: '2px solid rgba(0, 214, 163, 0.3)',
                                                    borderRadius: '12px',
                                                    color: '#ffffff',
                                                    padding: '12px 16px',
                                                    fontSize: '1rem'
                                                }}
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        {/* Email Field */}
                                        <div className="col-md-6 mb-4">
                                            <label className="form-label text-white fw-semibold mb-2">
                                                <FaEnvelope className="me-2" style={{ color: '#00d6a3' }} />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="form-control"
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    border: '2px solid rgba(0, 214, 163, 0.3)',
                                                    borderRadius: '12px',
                                                    color: '#ffffff',
                                                    padding: '12px 16px',
                                                    fontSize: '1rem'
                                                }}
                                                placeholder="Enter your email address"
                                            />
                                        </div>

                                        {/* Phone Field */}
                                        <div className="col-md-6 mb-4">
                                            <label className="form-label text-white fw-semibold mb-2">
                                                <FaPhone className="me-2" style={{ color: '#00d6a3' }} />
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    border: '2px solid rgba(0, 214, 163, 0.3)',
                                                    borderRadius: '12px',
                                                    color: '#ffffff',
                                                    padding: '12px 16px',
                                                    fontSize: '1rem'
                                                }}
                                                placeholder="Enter your phone number"
                                            />
                                        </div>

                                        {/* Description Field */}
                                        <div className="col-12 mb-4">
                                            <label className="form-label text-white fw-semibold mb-2">
                                                <FaComment className="me-2" style={{ color: '#00d6a3' }} />
                                                Message
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                required
                                                rows={5}
                                                className="form-control"
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    border: '2px solid rgba(0, 214, 163, 0.3)',
                                                    borderRadius: '12px',
                                                    color: '#ffffff',
                                                    padding: '12px 16px',
                                                    fontSize: '1rem',
                                                    resize: 'vertical'
                                                }}
                                                placeholder="Tell us how we can help you..."
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="col-12 text-center">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="btn btn-lg px-5 py-3 fw-bold"
                                                style={{
                                                    background: 'linear-gradient(135deg, #00d6a3 0%, #fee600 100%)',
                                                    border: 'none',
                                                    borderRadius: '16px',
                                                    color: '#000000',
                                                    fontSize: '1.1rem',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: '0 8px 25px rgba(0, 214, 163, 0.4)',
                                                    minWidth: '200px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 214, 163, 0.6)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 214, 163, 0.4)';
                                                }}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaPaperPlane className="me-2" />
                                                        Send Message
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {/* Status Messages */}
                                        {submitStatus === 'success' && (
                                            <div className="col-12 mt-4">
                                                <div className="alert alert-success" style={{
                                                    background: 'rgba(0, 214, 163, 0.1)',
                                                    border: '2px solid #00d6a3',
                                                    borderRadius: '12px',
                                                    color: '#00d6a3'
                                                }}>
                                                    <strong>Success!</strong> Your message has been sent successfully. We&apos;ll get back to you soon.
                                                </div>
                                            </div>
                                        )}

                                        {submitStatus === 'error' && (
                                            <div className="col-12 mt-4">
                                                <div className="alert alert-danger" style={{
                                                    background: 'rgba(220, 53, 69, 0.1)',
                                                    border: '2px solid #dc3545',
                                                    borderRadius: '12px',
                                                    color: '#dc3545'
                                                }}>
                                                    <strong>Error!</strong> There was a problem sending your message. Please try again.
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <div className="text-center">
                                        <div className="contact-info-card" style={{
                                            background: 'linear-gradient(145deg, #0f0f23 0%, #1a1a2e 100%)',
                                            borderRadius: '20px',
                                            padding: '2rem',
                                            border: '2px solid rgba(0, 214, 163, 0.3)',
                                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)'
                                        }}>
                                            <FaEnvelope className="fs-1 mb-3" style={{ color: '#00d6a3' }} />
                                            <h5 className="text-white fw-bold mb-2">Email Us</h5>
                                            <p className="text-white-50 mb-0">support@zillowvortex.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="text-center">
                                        <div className="contact-info-card" style={{
                                            background: 'linear-gradient(145deg, #0f0f23 0%, #1a1a2e 100%)',
                                            borderRadius: '20px',
                                            padding: '2rem',
                                            border: '2px solid rgba(254, 230, 0, 0.3)',
                                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)'
                                        }}>
                                            <FaPhone className="fs-1 mb-3" style={{ color: '#fee600' }} />
                                            <h5 className="text-white fw-bold mb-2">Call Us</h5>
                                            <p className="text-white-50 mb-0">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="text-center">
                                        <div className="contact-info-card" style={{
                                            background: 'linear-gradient(145deg, #0f0f23 0%, #1a1a2e 100%)',
                                            borderRadius: '20px',
                                            padding: '2rem',
                                            border: '2px solid rgba(0, 214, 163, 0.3)',
                                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)'
                                        }}>
                                            <FaComment className="fs-1 mb-3" style={{ color: '#00d6a3' }} />
                                            <h5 className="text-white fw-bold mb-2">Live Chat</h5>
                                            <p className="text-white-50 mb-0">Available 24/7</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ContactPage;
