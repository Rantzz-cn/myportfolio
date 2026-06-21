export function BackToTop({ visible }) {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      aria-label="Back to top"
      data-tooltip="Back to Top"
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}
