# [tomstepp.com](https://tomstepp.com)

Personal site in the style of the Google homepage, served by GitHub Pages from `master`.

## Preview locally

There's no build step. From the repo root:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. To check on a phone, join the same Wi-Fi and open `http://<laptop-ip>:8000`.

## Updating the resume

1. Replace `TomStepp_Resume.pdf`.
2. Bump `RESUME_VERSION` at the top of `typing.js` so browsers fetch the new copy.
