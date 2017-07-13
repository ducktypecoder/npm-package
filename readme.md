# ducktypecoder npm package

To develop this package and the main app locally, set 'development: true' in your project config.

That will set the api url to hit your localhost rather than the production app.

For example, using the hello-world project,

```

module.exports = {
  token: <testusertoken>,
  project: 'hello-world',
  development: true
}

// /hello-world/ducktypecoder.js
```
