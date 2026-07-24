import { useMagnetic } from '../hooks/useMagnetic';

/**
 * Polymorphic .btn — renders an <a> when href is given, otherwise a <button>.
 * Supports optional icon rendering, magnetic hover effect, and shine layer.
 */
export function Button({ href, variant = 'primary', block = false, icon = null, children, className = '', ...rest }) {
  const ref = useMagnetic(10);
  const classes = `btn btn--${variant}${block ? ' btn--block' : ''}${className ? ` ${className}` : ''}`;

  const content = (
    <>
      <span className="btn__text">{children}</span>
      {icon && <span className="btn__icon" aria-hidden="true">{icon}</span>}
      <span className="btn__shine" aria-hidden="true"></span>
    </>
  );

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} {...rest}>
      {content}
    </button>
  );
}
