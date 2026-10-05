import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
const domain = 'mgrowgate.com';
const business = 'ecommerce';
function route(host, path) {
  return config.rewrites.find(rule =>
    (rule.source === path || (rule.source === '/pg/:path*' && (path === '/pg' || path.startsWith('/pg/')))) &&
    (!rule.has || rule.has.every(condition => condition.type === 'host' && new RegExp('^' + condition.value + '$').test(host)))
  )?.destination;
}
test('known payment paths keep dev and production separate', () => {
  for (const environment of ['dev', 'production']) {
    const host = 'www.' + domain;
    const prefix = environment === 'dev' ? '/pg/dev' : '/pg';
    const api = environment === 'dev' ? 'https://dev.api.letspay.co.in' : 'https://api.letspay.co.in';
    assert.equal(route(host, prefix + '/checkout'), api + '/pg/proxy/' + business + '/checkout');
    assert.equal(route(host, prefix + '/return'), api + '/pg/proxy/' + business + '/return');
    assert.equal(route(host, prefix + '/health'), api + '/api/health');
    for (const provider of ['razorpay', 'cashfree'])
      assert.equal(route(host, prefix + '/webhooks/' + provider), api + '/api/webhooks/' + provider + '/payments');
    assert.equal(route(host, prefix + '/unknown'), 'https://api.letspay.co.in/pg/unavailable');
  }
});
test('preview/unknown hosts cannot open live checkout', () => {
  for (const host of ['preview.vercel.app', 'www.' + domain + '.evil.test', domain, 'dev.' + domain])
    for (const prefix of ['/pg', '/pg/dev']) {
      assert.equal(route(host, prefix + '/checkout'), 'https://api.letspay.co.in/pg/unavailable');
      assert.equal(route(host, prefix + '/webhooks/razorpay'), 'https://api.letspay.co.in/pg/unavailable');
    }
  assert.equal(config.redirects, undefined);
});
test('payment paths are uncached and precede the website fallback', () => {
  assert.equal(config.rewrites.findIndex(rule => rule.source === '/pg/:path*'), 10);
  assert.deepEqual(config.headers.find(rule => rule.source === '/pg/:path*').headers, [
    { key: 'Cache-Control', value: 'no-store' }, { key: 'Referrer-Policy', value: 'no-referrer' }
  ]);
  assert.ok(config.rewrites.some(rule => rule.destination === '/index.html'));
});
