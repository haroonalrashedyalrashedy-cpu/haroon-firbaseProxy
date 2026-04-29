export default async function handler(req, res) {
  const target = req.url.startsWith('/api/auth') 
    ? 'https://identitytoolkit.googleapis.com' 
    : 'https://watsapp-haroon-default-rtdb.firebaseio.com';
  
  const path = req.url.replace('/api/auth', '').replace('/api', '');
  const url = target + path + (req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '');
  
  const response = await fetch(url, {
    method: req.method,
    headers: { ...req.headers, host: new URL(target).host },
    body: req.method !== 'GET' ? req.body : undefined,
  });
  
  const data = await response.text();
  res.status(response.status).send(data);
}
