import React, { useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import SplashScreen from './components/SplashScreen';

/**
 * PUBLIC_INTERFACE
 * App
 * Root component that renders a branded SplashScreen on initial load
 * and then transitions to the existing home content.
 * - Feature flag: REACT_APP_FEATURE_FLAGS (JSON), checks splashScreen boolean; defaults to true if not set.
 * - Configurable delay: REACT_APP_SPLASH_MS (optional), default 1600ms.
 * - Respects prefers-reduced-motion to shorten/disable heavy animations.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [ready, setReady] = useState(false);

  // Apply theme to document element for existing UI
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Parse feature flags from env, default splashScreen:true if undefined.
  const featureFlags = useMemo(() => {
    let parsed = {};
    try {
      parsed = process.env.REACT_APP_FEATURE_FLAGS ? JSON.parse(process.env.REACT_APP_FEATURE_FLAGS) : {};
    } catch (e) {
      // If invalid JSON, fail safe with empty object.
      parsed = {};
    }
    return {
      splashScreen: parsed.splashScreen !== undefined ? parsed.splashScreen : true,
      ...parsed
    };
  }, []);

  // Determine reduced motion and splash duration
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const splashMs = useMemo(() => {
    const envMs = Number(process.env.REACT_APP_SPLASH_MS);
    const base = Number.isFinite(envMs) && envMs > 0 ? envMs : 1600; // default ~1.6s
    return prefersReducedMotion ? Math.min(base, 1000) : base;
  }, [prefersReducedMotion]);

  // Simulate readiness or delay until app is ready.
  useEffect(() => {
    if (!featureFlags.splashScreen) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setReady(true), splashMs);
    return () => clearTimeout(t);
  }, [featureFlags.splashScreen, splashMs]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (!ready && featureFlags.splashScreen) {
    return (
      <SplashScreen
        title="StreamView"
        tagline="Your gateway to premium streaming"
        showTagline
      />
    );
  }

  // Existing "home page" content preserved
  return (
    <div className="App" role="main">
      <header className="App-header" aria-label="Home">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
