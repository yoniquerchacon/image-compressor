'use client';

import { useEffect, useRef } from 'react';

interface SecurityEvent {
  type: 'compression' | 'download' | 'upload';
  timestamp: number;
}

const MAX_EVENTS_PER_MINUTE = 50;
const WINDOW_SIZE = 60000; // 1 minuto

export function useSecurityMonitor() {
  const eventsRef = useRef<SecurityEvent[]>([]);
  const suspiciousActivityDetectedRef = useRef(false);

  const cleanOldEvents = () => {
    const now = Date.now();
    eventsRef.current = eventsRef.current.filter(
      event => now - event.timestamp < WINDOW_SIZE
    );
  };

  const logEvent = (type: SecurityEvent['type']): boolean => {
    cleanOldEvents();

    if (suspiciousActivityDetectedRef.current) {
      console.warn('⚠️ Actividad sospechosa detectada. Por favor, espera un momento.');
      return false;
    }

    eventsRef.current.push({
      type,
      timestamp: Date.now(),
    });

    // Detectar spam
    if (eventsRef.current.length > MAX_EVENTS_PER_MINUTE) {
      suspiciousActivityDetectedRef.current = true;
      console.error('🚨 Demasiadas operaciones. Detección de spam activada.');
      
      // Reset después de 2 minutos
      setTimeout(() => {
        suspiciousActivityDetectedRef.current = false;
        eventsRef.current = [];
      }, 120000);
      
      return false;
    }

    return true;
  };

  // Detectar comportamiento del navegador
  useEffect(() => {
    // Detectar si están intentando automatizar
    const detectAutomation = () => {
      // Detectar herramientas de automatización
      if (
        (window as any).navigator.webdriver ||
        (window as any)._phantom ||
        (window as any).callPhantom ||
        (window as any).__nightmare
      ) {
        console.warn('⚠️ Automatización detectada');
      }
    };

    detectAutomation();

    // Detectar tab visibility para pausar operaciones pesadas
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Usuario cambió de pestaña
        console.log('Usuario cambió de pestaña');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { logEvent };
}
