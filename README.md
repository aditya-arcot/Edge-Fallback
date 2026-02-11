# Edge-Fallback

Cloudflare Worker that provides a graceful maintenance fallback when an origin server is unavailable.

This worker sits at the Cloudflare edge, forwards requests to the configured origin, and serves a static maintenance page if the origin is unreachable (e.g., container crash, host reboot, network outage).

## Details

1. Incoming requests hit the Worker at the edge
2. Worker attempts to fetch from origin
3. If successful → response returned to client
4. If failure → maintenance page served
