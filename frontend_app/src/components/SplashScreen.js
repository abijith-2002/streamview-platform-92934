import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * SplashScreen
 * A modern, branded splash screen using the Ocean Professional theme.
 * Renders a centered brand mark/title, optional tagline, and animated loader.
 * Respects prefers-reduced-motion and provides accessible contrast and labels.
 */
function SplashScreen({ title = 'StreamView', tagline = 'Your gateway to premium streaming', showTagline = true }) {
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme tokens (Ocean Professional)
  const colors = {
    primary: '#2563EB', // blue-600
    secondary: '#F59E0B', // amber-500
    background: '#f9fafb', // gray-50
    surface: '#ffffff',
    text: '#111827' // gray-900
  };

  const containerStyle = {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, rgba(59,130,246,0.10) 0%, ${colors.background} 60%)`,
    color: colors.text
  };

  const cardStyle = {
    background: colors.surface,
    borderRadius: '16px',
    padding: '32px 28px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)',
    textAlign: 'center',
    width: 'min(92vw, 520px)',
    border: '1px solid rgba(17,24,39,0.06)',
    transform: prefersReducedMotion ? 'none' : 'translateY(0)',
    transition: prefersReducedMotion ? 'none' : 'transform 500ms ease, opacity 500ms ease',
    opacity: 1
  };

  const logoWrapStyle = {
    height: 64,
    width: 64,
    borderRadius: 16,
    display: 'grid',
    placeItems: 'center',
    margin: '0 auto 16px',
    background: `conic-gradient(from 180deg at 50% 50%, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.5), 0 6px 18px rgba(37,99,235,0.25)'
  };

  const logoInnerStyle = {
    height: 52,
    width: 52,
    borderRadius: 12,
    background: colors.surface,
    display: 'grid',
    placeItems: 'center',
    color: colors.primary,
    fontWeight: 800,
    fontSize: 22,
    letterSpacing: 0.5,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  };

  const titleStyle = {
    margin: '8px 0 6px',
    fontSize: 'clamp(22px, 3.2vw, 28px)',
    lineHeight: 1.15,
    fontWeight: 800,
    color: colors.text
  };

  const taglineStyle = {
    margin: '0 0 18px',
    color: '#4b5563',
    fontSize: 'clamp(14px, 2.5vw, 16px)'
  };

  const barWrap = {
    position: 'relative',
    height: 6,
    width: '72%',
    margin: '0 auto',
    background: '#eef2ff',
    borderRadius: 999
  };

  const shimmer = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '40%',
    borderRadius: 999,
    background: `linear-gradient(90deg, rgba(37,99,235,0) 0%, rgba(37,99,235,0.45) 40%, rgba(245,158,11,0.45) 70%, rgba(37,99,235,0) 100%)`,
    transform: 'translateX(-100%)',
    animation: prefersReducedMotion ? 'none' : 'shimmer 1.4s ease-in-out infinite',
  };

  // Inject a keyframes style tag scoped to this component
  // This avoids relying on global CSS or Tailwind.
  const keyframes = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(160%); }
    }
  `;

  return (
    <div style={containerStyle} role="status" aria-live="polite" aria-label="Loading application">
      <style>{keyframes}</style>
      <div style={cardStyle}>
        <div style={logoWrapStyle} aria-hidden="true">
          <div style={logoInnerStyle}>
            SV
          </div>
        </div>
        <h1 style={titleStyle} aria-label={`${title} loading`}>
          <span style={{ color: colors.primary }}>{title.slice(0, 6)}</span>
          <span style={{ color: colors.text }}>{title.slice(6)}</span>
        </h1>
        {showTagline && <p style={taglineStyle}>{tagline}</p>}

        <div style={barWrap} aria-hidden="true">
          <div style={shimmer} />
        </div>

        <div style={{ marginTop: 14 }}>
          <span
            style={{
              fontSize: 12,
              color: '#6b7280',
              letterSpacing: 0.3
            }}
          >
            Preparing your experience…
          </span>
        </div>
      </div>
    </div>
  );
}

SplashScreen.propTypes = {
  title: PropTypes.string,
  tagline: PropTypes.string,
  showTagline: PropTypes.bool
};

export default SplashScreen;
