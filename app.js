const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sanitizer = require('sanitizer');
const app = express();
const port = 8000;
const path = require('path');

// Set the views folder
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

let projectList = [];

// Routes
app.get('/project', function (req, res) {
  res.render('project.ejs', { projectList });
});

// ... rest of the routes ...

app.use(function (req, res, next) {
  res.redirect('/project');
});

app.listen(port, function () {
  console.log(`Project List App running on http://0.0.0.0:${port}`);
});

module.exports = app;
