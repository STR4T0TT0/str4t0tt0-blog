# str4t0tt0-blog

Source code for **STR4T0TT0’s personal blog**.
Static blog setup with React + Vite frontend, CI/CD with GitHub Actions, hosting on AWS.

---

## Stack

- **Frontend:** React + Vite
- **CI/CD:** GitHub Actions : OIDC to AWS, no long-lived keys
- **Hosting:** Amazon S3 + CloudFront
- **Security:** AWS WAF managed rules and rate-limit

---

## Environments

| Branch                 | Domain                                            | Infra specifics                                                        |
| ---------------------- | ------------------------------------------------- | ---------------------------------------------------------------------- |
| `staging`              | https://staging.str4t0tt0.com                     | Cloudflare DNS, CloudFront, HTTPS (ACM), Restricted to whitelisted IPs |
| `main` / tags `vX.Y.Z` | https://str4t0tt0.com + https://www.str4t0tt0.com | Cloudflare DNS, CloudFront, HTTPS (ACM), WAF                           |

---

## Local Development

```bash
git clone https://github.com/STR4T0TT0/str4t0tt0-blog.git
cd str4t0tt0-blog
npm install
npm run dev
```

Open http://localhost:5173

---

## Build

```bash
npm run build
```

Outputs to `dist/`.

---

## Workflow

### Staging

- **Feature branches** -> PR -> merge into `staging`
- Auto-deploy to S3 (`str4t0tt0-blog-staging`)
- Validation on https://staging.str4t0tt0.com (served via CloudFront, IP-restricted)

### Production

- **Main branch** (or tags `vX.Y.Z`) -> deploy to S3 (`str4t0tt0-blog-prod`)
- Domains: https://str4t0tt0.com + https://www.str4t0tt0.com (served via CloudFront, WAF)

### Rollback & Cache

- **Rollback** : redeploy previous tag/commit (S3 versioning enabled)
- **Invalidation** : automatic CloudFront cache invalidation on each deploy

---

## License

This project is licensed under the [MIT License](LICENSE).  
© 2025 STR4T0TT0.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, provided that proper credit is given. See the full text of the license here: [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).
