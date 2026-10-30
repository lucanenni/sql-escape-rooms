// SHA-256 in puro JS (sincrono, funziona anche senza HTTPS). Usato per nascondere le risposte.
function sha256(str) {
  const rotr = (n, x) => (x >>> n) | (x << (32 - n));
  const K = [], H = [];
  for (let p = 2, n = 0; n < 64; p++) {
    let prime = true;
    for (let d = 2; d * d <= p; d++) if (p % d === 0) { prime = false; break; }
    if (!prime) continue;
    if (n < 8) H[n] = (Math.pow(p, 1 / 2) % 1 * 2 ** 32) | 0;
    K[n++] = (Math.pow(p, 1 / 3) % 1 * 2 ** 32) | 0;
  }
  const s = unescape(encodeURIComponent(str));
  const bytes = Array.from(s, (c) => c.charCodeAt(0));
  const bits = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  const hi = Math.floor(bits / 2 ** 32), lo = bits >>> 0;
  for (const v of [hi, lo]) bytes.push(v >>> 24, (v >>> 16) & 255, (v >>> 8) & 255, v & 255);
  let h = H.slice();
  for (let o = 0; o < bytes.length; o += 64) {
    const w = [];
    for (let i = 0; i < 16; i++) w[i] = (bytes[o + 4 * i] << 24) | (bytes[o + 4 * i + 1] << 16) | (bytes[o + 4 * i + 2] << 8) | bytes[o + 4 * i + 3];
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(7, w[i - 15]) ^ rotr(18, w[i - 15]) ^ (w[i - 15] >>> 3);
      const s1 = rotr(17, w[i - 2]) ^ rotr(19, w[i - 2]) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let i = 0; i < 64; i++) {
      const t1 = (hh + (rotr(6, e) ^ rotr(11, e) ^ rotr(25, e)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0;
      const t2 = ((rotr(2, a) ^ rotr(13, a) ^ rotr(22, a)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    h = [h[0] + a, h[1] + b, h[2] + c, h[3] + d, h[4] + e, h[5] + f, h[6] + g, h[7] + hh].map((x) => x | 0);
  }
  return h.map((x) => (x >>> 0).toString(16).padStart(8, "0")).join("");
}
if (typeof module !== "undefined") module.exports = sha256;
