# Lighthouse Score Improvement Plan

Targeted improvements to push all 4 Lighthouse categories into the 90+ green zone.

| Category       | Current | Target | Key Bottlenecks                                                                   |
| -------------- | ------- | ------ | --------------------------------------------------------------------------------- |
| Performance    | **68**  | 90+    | 2.4 MB images, render-blocking fonts, CLS from TagsList & fonts, no cache headers |
| Accessibility  | **90**  | 95+    | Bookmark/like/comment buttons missing `aria-label`                                |
| Best Practices | **77**  | 90+    | No security headers (CSP, COOP, X-Frame-Options)                                  |
| SEO            | **92**  | 97+    | Broken robots.txt, generic meta description                                       |

---

## Proposed Changes

### 1. Image Optimization (Performance: ~+15 points)

> [!IMPORTANT]
> **This is the single biggest win.** DevStack.png (1,408 KiB, 1024×1024) is served for an 80×80 display slot. DevStack_logo.png (1,030 KiB) is used as the favicon. Together they account for **2.4 MB** of the **2.7 MB** total page weight.

#### [MODIFY] [index.html](./DevStack/client/public/index.html)

- Convert `DevStack_logo.png` → `.ico` / small `.png` for the favicon (`<link rel="icon" href="./favicon.ico">`)

#### [NEW] Optimized logo images

- Resize `DevStack.png` from 1024×1024 → **160×160** (2× of the largest display size 80px)
- Convert to **WebP** format (typically 80-90% smaller)
- Create the optimized files using a build script

#### [MODIFY] [Navbar/index.js](./DevStack/client/src/components/Navbar/index.js)

- Add explicit `width` and `height` attributes to the logo `<img>` to prevent CLS
- Use the optimized WebP image

```diff
-<img src={process.env.PUBLIC_URL + '/DevStack.png'} alt='DevStack Logo'
-  className='h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-20 max-w-[140px]' ... />
+<img src={process.env.PUBLIC_URL + '/DevStack_logo_160.webp'} alt='DevStack Logo'
+  width="80" height="80"
+  className='h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-20 max-w-[140px]' ... />
```

---

### 2. Font Loading Optimization (Performance: ~+5 points, CLS fix)

> [!WARNING]
> Google Fonts is the longest item in the critical rendering path (2,806ms chain). The page loads **5 font families** but only uses **Open Sans**. The other 4 (Bruno Ace, Limelight, Ribeye, Roboto) are unused — pure waste.

#### [MODIFY] [index.html](./DevStack/client/public/index.html)

- Remove unused font families (Bruno Ace, Limelight, Ribeye, Roboto)
- Switch Google Fonts `<link>` from render-blocking to non-blocking using `media="print" onload="this.media='all'"`
- Add `font-display: swap` to prevent invisible text (FOIT) and reduce CLS
- Add `<link rel="preload">` for the actual woff2 file to parallelize the fetch

```diff
-<link href="https://fonts.googleapis.com/css2?family=Bruno+Ace&family=Limelight&family=Open+Sans&family=Ribeye&family=Roboto&display=swap" rel="stylesheet">
+<link rel="preload" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
+<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"></noscript>
```

#### [MODIFY] [index.css](./DevStack/client/src/index.css)

- Add a fallback `font-display: swap` in the body style so text is immediately visible with system fonts while Open Sans loads

---

### 3. CLS Fix — TagsList Sidebar (Performance: +0.2 CLS improvement)

> [!IMPORTANT]
> The largest CLS culprit (0.227) is `div.pt-10.md:min-w-[240px]...` which is the `TagsList` sidebar. It renders empty, then shifts when popular topics load from the API.

#### [MODIFY] [TagsList.js](./DevStack/client/src/components/TagsList.js)

- Reserve fixed minimum height for the tags container to prevent layout shift
- Add a skeleton/placeholder while `mostPopularTopics` is loading

```diff
-<div className='pt-10 md:min-w-[240px] md:max-w-[368px] md:block hidden border-l-[1px] border-[#f0eeee] relative'>
+<div className='pt-10 md:min-w-[240px] md:max-w-[368px] md:block hidden border-l-[1px] border-[#f0eeee] relative min-h-[300px]'>
```

#### [MODIFY] [BlogCard.js](./DevStack/client/src/components/Blogs/BlogCard.js)

- Add `width` and `height` attributes to all user avatar `<img>` elements

---

### 4. Accessibility — Buttons with Accessible Names (Accessibility: +5 points)

#### [MODIFY] [BlogCard.js](./DevStack/client/src/components/Blogs/BlogCard.js)

Add `aria-label` to all icon-only buttons:

```diff
-<button onClick={handleBookmarkButton} className='group p-1 absolute bottom-0 right-0'>
+<button onClick={handleBookmarkButton} className='group p-1 absolute bottom-0 right-0' aria-label='Bookmark this blog'>

-<button onClick={handleLikeButton} className={`flex items-center gap-1 ...`}>
+<button onClick={handleLikeButton} className={`flex items-center gap-1 ...`} aria-label='Like this blog'>

-<button onClick={handleCommentButton} className='flex items-center gap-1 ...'>
+<button onClick={handleCommentButton} className='flex items-center gap-1 ...' aria-label='View comments'>
```

#### [MODIFY] [BlogDetails.js](./DevStack/client/src/components/Blogs/BlogDetails.js)

- Add `aria-label` to like, edit, delete buttons
- Add `key` prop to mapped tags (currently uses `<>` fragment without key)

#### [MODIFY] [Navbar/index.js](./DevStack/client/src/components/Navbar/index.js)

- Add `aria-label` to the profile dropdown toggle button

#### [MODIFY] [SearchBar.js](./DevStack/client/src/components/Navbar/SearchBar.js)

- Add `aria-label="Search blogs"` to the search input

#### [MODIFY] [LoginForm.js](./DevStack/client/src/components/UserForm/LoginForm.js) & [SignUpForm.js](./DevStack/client/src/components/UserForm/SignUpForm.js)

- Add `aria-label` to the password toggle buttons

---

### 5. Security Headers (Best Practices: ~+13 points)

#### [MODIFY] [server/index.js](./DevStack/server/index.js)

Add security headers middleware before routes:

```js
// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups"); // allow-popups needed for Google OAuth
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://accounts.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://lh3.googleusercontent.com data:; connect-src 'self'",
  );
  next();
});
```

#### [NEW] [client/public/\_headers](./DevStack/client/public/_headers) (for Vercel/static hosting)

Since the React app is served separately from the API, the client also needs headers. Create a `vercel.json` or `_headers` in the client deployment:

```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Cross-Origin-Opener-Policy: same-origin-allow-popups
```

> [!NOTE]
> The third-party cookies issue (42 cookies from Google Sign-In SDK) cannot be fully resolved since they come from `accounts.google.com`. This is expected behavior for Google OAuth.

---

### 6. SEO — robots.txt & Meta Description (SEO: +5 points)

#### [NEW] [client/public/robots.txt](./DevStack/client/public/robots.txt)

Create a proper robots.txt file (currently CRA serves `index.html` for unknown routes, so Lighthouse sees HTML as the robots.txt):

```
User-agent: *
Allow: /

Sitemap: https://dev-stack-blog.vercel.app/sitemap.xml
```

#### [MODIFY] [index.html](./DevStack/client/public/index.html)

- Replace the generic CRA meta description
- Add Open Graph tags for social sharing
- Add preconnect hints for Google user content domain

```diff
-<meta name="description" content="Web site created using create-react-app" />
+<meta name="description" content="DevStack — A developer blogging platform to create, share, and discover technical articles. Powered by the MERN stack." />
+<meta property="og:title" content="DevStack — Developer Blogging Platform" />
+<meta property="og:description" content="Create, share, and discover technical articles on DevStack." />
+<meta property="og:type" content="website" />
+<link rel="preconnect" href="https://accounts.google.com" />
+<link rel="preconnect" href="https://lh3.googleusercontent.com" />
```

---

### 7. Cache Headers & Preconnect (Performance: minor gains)

#### [MODIFY] [server/vercel.json](./DevStack/server/vercel.json)

Add cache-control headers for static assets:

```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### [NEW] [client/vercel.json](./DevStack/client/vercel.json)

Create client-side Vercel config with cache headers and security headers for the static hosting.

---

### 8. Lazy Load Google Sign-In SDK (Performance: minor gain)

> [!NOTE]
> The Google Sign-In SDK (`/gsi/client`) accounts for 84 KiB of unused JavaScript on initial page load. This is loaded by `@react-oauth/google`'s `GoogleOAuthProvider`. Unfortunately, this library eagerly loads the SDK. A minor improvement would be to defer this until the user actually needs to sign in — but this requires a larger refactor of the OAuth provider placement. **I recommend deferring this to a later iteration.**

---

## Summary of Expected Impact

| Change                                | Performance | Accessibility | Best Practices |   SEO   |
| ------------------------------------- | :---------: | :-----------: | :------------: | :-----: |
| Image optimization (WebP + resize)    | **+12-15**  |       —       |       —        |    —    |
| Font loading (remove unused, async)   |  **+3-5**   |       —       |       —        |    —    |
| CLS fixes (TagsList + img dimensions) |  **+3-5**   |       —       |       —        |    —    |
| Accessible button names               |      —      |    **+5**     |       —        |    —    |
| Security headers                      |      —      |       —       |   **+10-13**   |    —    |
| robots.txt + meta description         |      —      |       —       |       —        | **+5**  |
| Cache headers + preconnect            |  **+1-2**   |       —       |       —        |    —    |
| **Estimated Totals**                  | **~88-95**  |    **~95**    |    **~90**     | **~97** |

---

## Open Questions

> [!IMPORTANT]
>
> 1. **Logo images**: Do you have access to the original logo files in a vector format (SVG)? If so, I can create properly sized exports directly. Otherwise, I'll resize the existing PNGs and convert to WebP using a sharp/imagemagick command.
> 2. **Client deployment**: Is the React client also deployed on Vercel? I need to know where to place the `vercel.json` / headers config for the client-side security headers.
> 3. **CSP strictness**: The Content-Security-Policy I proposed allows `'unsafe-inline'` for styles (required by Tailwind/React). Do you want a stricter CSP using nonces, or is this level acceptable?

## Verification Plan

### Automated Tests

1. Run `npx serve -s build` locally after making changes
2. Run Lighthouse CLI: `npx lighthouse http://localhost:3000 --output=json --output=html`
3. Verify all 4 scores are in the 90+ range

### Manual Verification

- Open the deployed app in Chrome DevTools → Lighthouse tab
- Verify no visual regressions (logo looks correct, fonts load properly)
- Verify Google OAuth still works after CSP / COOP headers
- Confirm robots.txt returns proper text content, not HTML
