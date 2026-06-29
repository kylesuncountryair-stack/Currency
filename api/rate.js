export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { from, date } = req.query;

  const validCodes = ['MXN', 'DOP', 'AWG', 'JMD'];
  if (!from || !validCodes.includes(from)) {
    return res.status(400).json({ error: 'Invalid or missing currency code' });
  }

  try {
    let usdRate;
    let resolvedDate;

    if (date) {
      // Historical: use Frankfurter for MXN (ECB), fall back to exchangerate.host for others
      // exchangerate.host supports historical and DOP/AWG/JMD
      const url = `https://api.exchangerate.host/historical?access_key=DEMO&date=${date}&base=${from}&symbols=USD`;
      // Actually use exchangeratesapi free tier approach — fetch USD base and invert
      // Best free option for historical + exotic: use ExchangeRate-API or fawazahmed0
      const histUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${from.toLowerCase()}.json`;
      const histRes = await fetch(histUrl);
      if (!histRes.ok) {
        // fallback to latest if date unavailable
        const fallback = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`);
        if (!fallback.ok) throw new Error('Rate unavailable');
        const fallbackData = await fallback.json();
        usdRate = fallbackData[from.toLowerCase()]['usd'];
        resolvedDate = 'latest';
      } else {
        const histData = await histRes.json();
        usdRate = histData[from.toLowerCase()]['usd'];
        resolvedDate = date;
      }
    } else {
      // Live rate
      const liveUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`;
      const liveRes = await fetch(liveUrl);
      if (!liveRes.ok) throw new Error('Rate unavailable');
      const liveData = await liveRes.json();
      usdRate = liveData[from.toLowerCase()]['usd'];
      resolvedDate = liveData.date;
    }

    return res.status(200).json({
      date: resolvedDate,
      rates: { USD: usdRate }
    });

  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch rate', detail: err.message });
  }
}
