# Publishing Gleemoji to npm

## One-time setup

1. Create an account at https://www.npmjs.com/signup and verify your email.
2. Turn on two-factor authentication: Account → Account settings → Two-factor authentication. npm requires 2FA to publish.
3. Install Node.js 18 or newer (https://nodejs.org), then log in from a terminal:

   ```bash
   npm login
   ```

## Before your first publish

1. Open `package.json` and set `"author"` to your name (and add `"repository"` once the code is on GitHub).
2. Open `LICENSE` and replace "The Gleemoji authors" with your name or company if you like.
3. Check the name is still free: `npm view gleemoji` should say **404 Not Found**.

## Publish

From this folder:

```bash
npm install        # nothing to install today, but creates the lockfile
npm run build      # regenerates dist/ from art/
npm test           # 8 checks
npm pack --dry-run # shows exactly which files will be uploaded
npm publish        # asks for your 2FA code
```

`npm publish` also runs the build and tests automatically (`prepublishOnly`), so a broken build can't go out.

Check it worked: https://www.npmjs.com/package/gleemoji, then in any project:

```bash
npm install gleemoji
```

## Publishing updates

Every publish needs a new version number. npm never lets you reuse one.

```bash
npm version patch   # 0.1.0 → 0.1.1  fixes
npm version minor   # 0.1.0 → 0.2.0  new emojis or features
npm version major   # 0.1.0 → 1.0.0  breaking changes (renamed emojis, changed props)
npm publish
```

If you push a bad release, publish a fixed version. You can mark the bad one with `npm deprecate gleemoji@0.1.1 "Broken, use 0.1.2"`. Unpublishing is only allowed within 72 hours and blocks that version number forever.

## Optional: publish from GitHub automatically

Once the code is on GitHub, you can set up npm "trusted publishing" so GitHub Actions publishes each tagged release with no token stored anywhere: npmjs.com → your package → Settings → Trusted publishing.
