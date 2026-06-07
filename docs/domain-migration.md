# Domain Migration (reference only)

> **Status: not executed.** The domain `thekingsofstringsband.com` is currently
> registered and managed through Wix and is **not owned/controlled by the site
> builder**. No DNS changes are made by this project. This document is a complete
> runbook to hand to whoever owns the domain when a cutover is desired. Until
> then, the new site runs on its Vercel preview URL and the existing Wix site
> stays live.

## Current state (before any change)

| Item | Value |
| --- | --- |
| Registrar | Wix.com Ltd. |
| DNS provider | Wix (WixDNS) |
| Nameservers | `NS0.WIXDNS.NET`, `NS1.WIXDNS.NET` |
| Root A records | `185.230.63.107`, `185.230.63.171`, `185.230.63.186` |
| www | `www` CNAME -> `cdn1.wixdns.net` |
| DNSSEC | unsigned |
| Domain expiration | 2027-04-09 |

**Back up first.** Before changing anything, export or screenshot ALL DNS records
(A, AAAA, CNAME, MX, TXT, SPF, DKIM, DMARC, and any verification records).

## Safety rules

- Do **not** delete records without documenting them first.
- Do **not** touch `MX`, `SPF`, `DKIM`, `DMARC`, `TXT`, or domain-verification
  records unless you are intentionally changing email or verification. Email and
  verification must keep working.
- For a web cutover, change only the records the host requires: `A`, `AAAA` (if
  needed), and `CNAME`.

## Cutover steps (Vercel)

1. Finish and fully test the new site on the Vercel preview URL (see
   [deployment.md](deployment.md) checklist).
2. In **Vercel -> Project -> Settings -> Domains**, add `thekingsofstringsband.com`
   and `www.thekingsofstringsband.com`.
3. Vercel will display the **exact** DNS records to set. Use those values, not
   assumed ones. Typically:
   - Apex/root `thekingsofstringsband.com` -> an **A** record to Vercel's IP
     (Vercel shows the current value, e.g. `76.76.21.21`).
   - `www` -> a **CNAME** to `cname.vercel-dns.com`.
4. In Wix DNS, update only those web records to the Vercel values. Leave email
   and verification records untouched.
5. Wait for propagation. Confirm:
   - [ ] `https://thekingsofstringsband.com` serves the new site
   - [ ] `https://www.thekingsofstringsband.com` serves the new site
   - [ ] HTTPS/SSL certificate is active (Vercel auto-provisions)
   - [ ] Contact and subscribe forms still work
   - [ ] Email still works (send + receive), if email uses this domain

## Cutover log (fill in at cutover time)

| Field | Value |
| --- | --- |
| New hosting provider | Vercel |
| New apex A record | (value Vercel provides) |
| New www CNAME | `cname.vercel-dns.com` (confirm in Vercel) |
| Date/time of cutover | |
| Who made the DNS changes | |

## Rollback plan

If the new site has problems after cutover, restore the original Wix web records:

- Root **A** records: `185.230.63.107`, `185.230.63.171`, `185.230.63.186`
- `www` **CNAME**: `cdn1.wixdns.net`

Do not delete the Wix site until the new deployment has been stable for a while.
