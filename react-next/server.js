const express = require('express')
const next = require('next')
const compression = require('compression')
const dev = process.env.NODE_ENV !== 'production'
const ENV_PORT = process.env.PORT || 8900
const app = next({dev})
const handle = app.getRequestHandler()
let port = dev ? ENV_PORT : 80

app.prepare()
  .then(() => {
    const server = express()

    if (!dev) {
      server.use(compression()) //gzip
    }

		server.get('/', (req, res) => {
			const actualPage = '/index'
			app.render(req, res, actualPage, {})
		})
		server.get('/search', (req, res) => {
			const actualPage = '/search'
			app.render(req, res, actualPage, {})
		})
		server.get('/detail/:id', (req, res) => {
			const actualPage = '/detail'
			const queryParams = {id: req.params.id}
			app.render(req, res, actualPage, queryParams)
		})

    const optionsPlain = {
      root: __dirname + '/static/',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      }
    };
    const optionsHtml = {
      root: __dirname + '/static/',
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      }
    };
    const optionsXml = {
      root: __dirname + '/static/',
      headers: {
        'Content-Type': 'application/xml;charset=UTF-8',
      }
    };
    server.get('/robots.txt', (req, res) => (
      res.status(200).sendFile('robots.txt', optionsPlain)
    ));
    // server.get('/sitemap.html', (req, res) => (
    //   res.status(200).sendFile('sitemap.html', optionsHtml)
    // ));
    // server.get('/sitemap.xml', (req, res) => (
    //   res.status(200).sendFile('sitemap.xml', optionsXml)
    // ));
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })

  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
