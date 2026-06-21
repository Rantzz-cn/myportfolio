import { useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Button } from './Button';
import { contactItems } from '../data/contact';

const FORM_ACTION = 'https://formspree.io/f/xbdezwbr';

export function Contact() {
  const ref = useScrollReveal(
    '.contact-info, .contact__form-wrapper',
    { translateY: [16, 0], duration: 800, easing: 'easeOutQuad' },
    { threshold: 0.2 }
  );
  const formRef = useRef(null);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = formRef.current;
    if (!form.checkValidity()) {
      setStatus({ state: 'error', message: 'Please fill out all fields before sending.' });
      return;
    }

    setStatus({ state: 'sending', message: '' });
    const formData = new FormData(form);

    try {
      const response = await fetch(FORM_ACTION, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus({ state: 'success', message: 'Thanks! Your message has been sent.' });
        form.reset();
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus({
        state: 'error',
        message: 'Oops! Something went wrong. Please try again or email me directly.',
      });
    }
  }

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Contact</span>
          <h2 className="section__title">Let's work together</h2>
          <p className="section__subtitle">
            Have a project in mind or just want to say hi? Send a message or reach out directly
            through any of the channels below.
          </p>
        </div>

        <div className="contact__grid" ref={ref}>
          <div className="contact-info">
            {contactItems.map((item) => (
              <div className="contact-info__item" key={item.id}>
                <span className="contact-info__icon" aria-hidden="true">
                  <iconify-icon icon={item.icon} width="18"></iconify-icon>
                </span>
                <div>
                  <p className="contact-info__label">{item.label}</p>
                  {item.href ? (
                    <a className="contact-info__value" href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                      {item.value}
                    </a>
                  ) : (
                    <p className="contact-info__value">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="contact__form-wrapper">
            <form className="form" ref={formRef} action={FORM_ACTION} method="POST" onSubmit={handleSubmit}>
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input className="form__input" type="text" id="name" name="name" placeholder="Your name" required />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="email">
                  Email
                </label>
                <input
                  className="form__input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="form__textarea"
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              {/* Spam protection (honeypot) */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

              <Button type="submit" variant="primary" block disabled={status.state === 'sending'}>
                {status.state === 'sending' ? 'Sending...' : 'Send Message'}
              </Button>
              <p
                className="form__status"
                role="status"
                aria-live="polite"
                style={{
                  color:
                    status.state === 'success'
                      ? 'var(--color-success)'
                      : status.state === 'error'
                      ? 'var(--color-danger)'
                      : undefined,
                }}
              >
                {status.message}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
