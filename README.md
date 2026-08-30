# CHJB Short Stays Website

This folder is the source copy for the CHJB Short Stays static website.

## Files to Deploy

Hostinger should deploy the contents of this folder to the site's `public_html` directory.

- `index.html`
- All `.jpg` files in this folder

The browser tab icon is embedded directly inside `index.html`, so it does not need a separate favicon upload.

## Hostinger Git Deployment

In Hostinger hPanel:

1. Open `Websites`.
2. Click `Dashboard` for the CHJB Short Stays website.
3. Go to `Advanced` then `Git`.
4. Connect GitHub.
5. Select the repository for this folder.
6. Select the `main` branch.
7. Set the deployment/root directory to `public_html`.
8. Enable auto-deployment if Hostinger offers it.

After that, future edits can be published by committing and pushing changes to GitHub.
