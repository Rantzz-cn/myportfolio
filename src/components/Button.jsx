import { useMagnetic } from '../hooks/useMagnetic';

/**
 * Polymorphic .btn — renders an <a> when href is given, otherwise a <button>.
 * Includes the .btn__shine sweep span (was injected via JS in the original
 * initButtonShine()) and the magnetic cursor-follow effect.
 */
export function Button({ href, variant = 'primary', block = false, children, className = '', ...rest }) {
  const ref = useMagnetic(10);
  const classes = `btn btn--${variant}${block ? ' btn--block' : ''}${className ? ` ${className}` : ''}`;

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {children}
        <span className="btn__shine" aria-hidden="true"></span>
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} {...rest}>
      {children}
      <span className="btn__shine" aria-hidden="true"></span>
    </button>
  );
}
