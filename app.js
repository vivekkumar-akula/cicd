const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sanitizer = require('sanitizer');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

let projectList = [];

app.get('/project', function (req, res) {
  res.render('project.ejs', { projectList });
});

app.post('/project/add/', function (req, res) {
  let newProject = sanitizer.escape(req.body.newProject);
  if (req.body.newProject !== '') {
    projectList.push(newProject);
  }
  res.redirect('/project');
});

app.get('/project/delete/:id', function (req, res) {
  if (req.params.id !== '') {
    projectList.splice(req.params.id, 1);
  }
  res.redirect('/project');
});

app.get('/project/:id', function (req, res) {
  let projectIdx = req.params.id;
  let project = projectList[projectIdx];

  if (project) {
    res.render('edit.ejs', { projectIdx, project });
  } else {
    res.redirect('/project');
  }
});

app.put('/project/edit/:id', function (req, res) {
  let projectIdx = req.params.id;
  let editProject = sanitizer.escape(req.body.editProject);
  if (projectIdx !== '' && editProject !== '') {
    projectList[projectIdx] = editProject;
  }
  res.redirect('/project');
});

app.use(function (req, res, next) {
  res.redirect('/project');
});

app.listen(port, function () {
  console.log(`Project List App running on http://0.0.0.0:${port}`);
});

module.exports = app;
