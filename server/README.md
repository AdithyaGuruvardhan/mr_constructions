# Admin API

A small Express server behind the admin panel at `/admin`. It stores projects, portfolio categories, certificates in `server/data/content.json`, and uploaded images (converted to WebP) in `server/uploads/`. The public site loads this content from `/api/content` and falls back to the data bundled in `src/data/` if the API is unreachable.

After signing in at `/admin`, the admin can also edit the live site directly: an "Edit this page" bar appears at the bottom of every page. Text, images and lists edited this way are stored in `content.json` under `site` (keyed by element), alongside project and certificate changes.

Every save first backs up the previous content to `server/data/backups/`, keeping the last 50 versions.

## Local development

```sh
npm run server:setup -- admin <password>   # once: writes server/.env (login + session secret)
npm run server:seed                        # once: copies src/data/* into server/data/content.json
npm run server                             # API on http://127.0.0.1:3001 (restarts on changes)
npm run dev                                # site; /api and /uploads are proxied to the API
```

Then open http://localhost:5173/admin.

## Production (VPS)

The VPS (`mrconstruction-vps`, Ubuntu 24.04, Node 20, pm2, nginx) already serves the static site from `/var/www/mrconstruction`. The API lives next to it in `/var/www/mrconstruction-api` and runs under pm2 on port **3020** (3000, 3001, 3010 and 5000 are used by other apps on that server).

### First time

1. Copy the code and install: `./deploy-api.sh`. It stops after installing and asks for the setup below.
2. On the server, create the login and settings:
   ```sh
   cd /var/www/mrconstruction-api
   node setup.js <username> '<strong-password>'
   printf 'PORT=3020\nNODE_ENV=production\n' >> .env
   ```
3. Upload the starting content from your machine: `npm run server:seed -- --force`, then
   `scp server/data/content.json mrconstruction-vps:/var/www/mrconstruction-api/data/content.json` (create the `data` folder first).
4. Add these two blocks to the `server { listen 443 … }` block in `/etc/nginx/sites-available/mrconstruction.in`, above `location /`, then run `nginx -t && systemctl reload nginx`:
   ```nginx
   location /api/ {
       proxy_pass http://127.0.0.1:3020;
       proxy_set_header Host $host;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
       client_max_body_size 50m;
   }
   location /uploads/ {
       alias /var/www/mrconstruction-api/uploads/;
       expires 30d;
       add_header Cache-Control "public, immutable";
   }
   ```
5. Run `./deploy-api.sh` again to start it, then deploy the site as usual with `./deploy.sh`.

### Afterwards

- API code changes: `./deploy-api.sh`. Site changes: `./deploy.sh`, unchanged.
- `/var/www/mrconstruction-api/.env`, `data/` and `uploads/` hold the login, the live content and uploaded images. Neither deploy script touches them; back them up.
- Once live, the content in `src/data/*.js` is only the fallback. Change projects and certificates through the admin, not by editing those files.

## Environment variables (`server/.env`)

| Variable | Default | |
| --- | --- | --- |
| `ADMIN_USER` | `admin` | Login username |
| `ADMIN_PASSWORD_HASH` | — | Created by `server:setup` |
| `SESSION_SECRET` | — | Created by `server:setup` |
| `PORT` | `3001` | |
| `SESSION_HOURS` | `12` | How long a login lasts |
| `DATA_DIR` / `UPLOAD_DIR` | `data` / `uploads` | Relative to `server/` |
