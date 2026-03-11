import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple rate limiting usando headers
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_REQUESTS = 100; // 100 requests
const RATE_LIMIT_WINDOW = 60 * 1000; // por minuto

function getRateLimitKey(request: NextRequest): string {
  // Usar IP si está disponible, sino usar user agent como fallback
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return `${ip}-${request.headers.get('user-agent')}`;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(key);

  if (!record || now > record.resetTime) {
    rateLimit.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Limpiar registros antiguos cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimit.entries()) {
    if (now > record.resetTime) {
      rateLimit.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Verificar rate limiting
  const rateLimitKey = getRateLimitKey(request);
  if (!checkRateLimit(rateLimitKey)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'Content-Type': 'text/plain',
      },
    });
  }

  // 2. Agregar headers de seguridad adicionales
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // 3. Bloquear user agents sospechosos
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const suspiciousPatterns = [
    'sqlmap',
    'nikto',
    'nmap',
    'masscan',
    'nessus',
    'burp',
    'metasploit',
  ];
  
  if (suspiciousPatterns.some(pattern => userAgent.includes(pattern))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 4. Validar origen para prevenir hotlinking
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  // Permitir requests sin referer (navegación directa) pero validar si hay referer
  if (referer && host) {
    try {
      const refererUrl = new URL(referer);
      if (!refererUrl.hostname.includes(host) && 
          !refererUrl.hostname.includes('compresor-imagenes.com') &&
          !refererUrl.hostname.includes('localhost')) {
        // Solo loguear pero no bloquear (para no afectar usuarios legítimos)
        console.log(`Suspicious referer: ${referer}`);
      }
    } catch (e) {
      // Invalid referer URL
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, icon.svg (favicon)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
