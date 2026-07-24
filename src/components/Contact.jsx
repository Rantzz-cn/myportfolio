import { useRef, useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Button } from './Button';
import { contactItems } from '../data/contact';

const FORM_ACTION = 'https://formspree.io/f/xbdezwbr';
const RATE_LIMIT_COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown

export function Contact() {
  const ref = useScrollReveal(
    '.contact-info, .contact__form-wrapper',
    { translateY: [16, 0], duration: 800, easing: 'easeOutQuad' },
    { threshold: 0.2 }
  );
  const formRef = useRef(null);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [cooldownLeft, setCooldownLeft] = useState(0);

  // Check rate limit status on mount and countdown
  useEffect(() => {
    function checkRateLimit() {
      try {
        const lastSent = localStorage.getItem('contact_last_submitted');
        if (lastSent) {
          const elapsed = Date.now() - parseInt(lastSent, 10);
          if (elapsed < RATE_LIMIT_COOLDOWN_MS) {
            const remaining = Math.ceil((RATE_LIMIT_COOLDOWN_MS - elapsed) / 1000);
            setCooldownLeft(remaining);
            return remaining;
          }
        }
      } catch (e) {
        /* storage restricted mode */
      }
      setCooldownLeft(0);
      return 0;
    }

    checkRateLimit();
    const interval = setInterval(() => {
      const left = checkRateLimit();
      if (left <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [status.state]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = formRef.current;

    // Check rate limiting before validating form
    try {
      const lastSent = localStorage.getItem('contact_last_submitted');
      if (lastSent) {
        const elapsed = Date.now() - parseInt(lastSent, 10);
        if (elapsed < RATE_LIMIT_COOLDOWN_MS) {
          const remainingSecs = Math.ceil((RATE_LIMIT_COOLDOWN_MS - elapsed) / 1000);
          setStatus({
            state: 'rate_limited',
            message: `Rate limit reached. Please wait ${remainingSecs} second${remainingSecs === 1 ? '' : 's'} before sending another message.`,
          });
          return;
        }
      }
    } catch (e) {
      /* storage restricted mode fallback */
    }

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
        // Record timestamp for rate limiting
        try {
          localStorage.setItem('contact_last_submitted', Date.now().toString());
        } catch (e) {
          /* ignore storage errors */
        }
        setStatus({ state: 'success', message: 'Thanks! Your message has been sent.' });
        form.reset();
        setCooldownLeft(60);
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

  const isSubmitDisabled = status.state === 'sending' || cooldownLeft > 0;

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
                    <a
                      className="contact-info__value"
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
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
                <input
                  className="form__input"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  disabled={cooldownLeft > 0}
                />
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
                  disabled={cooldownLeft > 0}
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
                  disabled={cooldownLeft > 0}
                ></textarea>
              </div>

              {/* Spam protection (honeypot) */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

              <Button type="submit" variant="primary" block disabled={isSubmitDisabled}>
                {status.state === 'sending'
                  ? 'Sending...'
                  : cooldownLeft > 0
                  ? `Please wait (${cooldownLeft}s)`
                  : 'Send Message'}
              </Button>
              <p
                className="form__status"
                role="status"
                aria-live="polite"
                style={{
                  color:
                    status.state === 'success'
                      ? 'var(--color-success)'
                      : status.state === 'rate_limited' || status.state === 'error'
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
