export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { from, date } = req.query;

  if (!from) {
    return res.status(400).json({ error: 'Missing ?from= parameter' });
  }

  const validCodes = ['MXN', 'DOP', 'AWG', 'JMD'];
  if (!validCodes.includes(from)) {
    return res.status(400).json({ error: 'Invalid currency code' });
  }

  try {
    let url;
    if (date) {
      url = `https://api.frankfurter.dev/${date}?base=${from}&symbols=USD`;
    } else {
      url = `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=USD`;
    }

    const upstream = await fetch(url);

    if (!upstream.ok) {
      const text = await upstream.text();
      return res.status(upstream.status).json({ error: 'Upstream error', detail: text });
    }

    const data = await upstream.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch rate', detail: err.message });
  }
}
