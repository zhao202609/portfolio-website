import { useState } from 'react';
import api from '../api.js';

const contactDetails = [
  { label: 'Name', value: 'Zhao Huijie' },
  { label: 'Email', value: '2044948658@qq.com', href: 'mailto:2044948658@qq.com' },
  { label: 'Phone', value: '14797253590', href: 'tel:14797253590' },
];

// Contact page: controlled form that POSTs to /api/contact, plus contact details.
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      setSuccess('');
      await api.post('/api/contact', form);
      setSuccess('Thanks! Your message has been sent.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className="page-head">
        <h1>Get In Touch</h1>
        <p>Have a question, a project idea, or feedback on my work? Send me a message.</p>
      </div>

      <div className="contact-grid">
        <aside className="contact-info">
          <h3>Contact details</h3>
          {contactDetails.map((c) => (
            <div key={c.label} className="contact-item">
              <span className="contact-label">{c.label}</span>
              {c.href ? (
                <a href={c.href}>{c.value}</a>
              ) : (
                <span className="contact-value">{c.value}</span>
              )}
            </div>
          ))}
        </aside>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </label>
          {error && <p className="status error">{error}</p>}
          {success && <p className="status success">{success}</p>}
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
