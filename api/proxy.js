export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const isAuth = url.pathname.startsWith('/api/auth');
  const target = isAuth 
    ? 'https://identitytoolkit.googleapis.com'
    : 'https://watsapp-haroon-default-rtdb.firebaseio.com';
    
  const path = url.pathname.replace('/api/auth', '').replace('/api', '');
  const headers = new Headers(req.headers);
  headers.delete('host');
  
  return fetch(target + path + url.search, {
    method: req.method,
    headers: headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : null,
  });
}
