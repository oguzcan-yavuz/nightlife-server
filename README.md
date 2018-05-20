# nightlife-server
Freecodecamp Dynamic Web Application Project: Build a Nightlife Coordination App (Back-end)

### My Notes:

- When developing front-end and back-end separated, you have to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
Install cors package for handling that. Also set `{ credentials: true, origin: true }` options in `cors()` if you are sending credentials with the request.

        npm install --save cors
        // server.js
        const cors = require('cors');
        app.use(cors({ credentials: true, origin: true }));

- Don't forget to include `credentials: 'include'` option while using fetch if you need cookies.
- [Front-End github link](https://github.com/yavuzovski/nightlife-client)
