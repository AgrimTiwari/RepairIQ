# RepairIQ Web Prototype

This is the browser-ready RepairIQ prototype.

## Camera note
The camera feature needs a secure web context (HTTPS) on most phones.
Opening `index.html` directly as a local file may prevent camera access.

## Quick deployment
Upload `index.html` to a static HTTPS host such as GitHub Pages, then open the generated HTTPS URL on your phone.

Once hosted over HTTPS:
1. Open RepairIQ.
2. Choose an appliance.
3. Tap **Take Photo**.
4. Allow camera/photo permission.
5. Take a photo.
6. Tap **Predict Problem**.

The prototype also accepts a normal photo-file fallback if the browser does not expose the camera directly.
