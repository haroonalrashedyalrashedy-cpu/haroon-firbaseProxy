export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  
  // للـ Auth حق تسجيل الدخول
  if (url.pathname.startsWith('/api/auth')) {
    const path = url.pathname.replace('/api/auth', '');
    return fetch('https://identitytoolkit.googleapis.com' + path + url.search, {
      method: req.method,
      headers: req.headers,
      body: req.body
    });
  }
  
  // للداتابيس Realtime Database
  const path = url.pathname.replace('/api', '');
  return fetch('https://watsapp-haroon-default-rtdb.firebaseio.com' + path + url.search, {
    method: req.method,
    headers: req.headers,
    body: req.body
  });
}
