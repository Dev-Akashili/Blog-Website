const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

data = [];

const homeContent = "Welcome to my blog website. You can log your thoughts, ideas, or anything you want to really. Follow the navigation menu to figure out what you want to do. Click on the About option to learn more about me. Hit Compose to create an entry to this online blog and save it to the home page. Also, hit contact and fill the form to leave a message for me, and I’ll be in touch shortly.";
const aboutContent = "This blog website was buit as a project by Emeka Akashili, a full-stack software developer. Hello World!- This was me sometime in 2020, a curious and eager student, at the start of what would go on to be the most fulfilling career choice I’ve made. A year later, I now write code to solve simple and complex problems, and sometimes to create fun stuff. When I'm not coding, I'm either watching anime, gaming or just chilling outside, observing nature.";


app.get('/', (req, res) => {
  res.render('home', {
    homeCont: homeContent,
    data: data
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    aboutCont: aboutContent
  });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.get('/contact', (req, res) => {

  const url = req.protocol + '://' + req.get('host') + req.originalUrl + '/message';

  res.render('contact', {
    url: url
  });
});

app.get('/contact/message', (req, res) => {
  res.render('message');
});

app.post('/publish', (req, res) => {

  const post = {
    title: req.body.title,
    entry: req.body.entry
  };

  data.push(post);
  res.redirect('/');

});

app.post('/delete', (req, res) => {

  const currentPost = req.body.currentPost;
  const currentEntry = req.body.currentEntry;

  const index = data.findIndex(x => x.title === currentPost && x.entry === currentEntry);

  data.splice(index, 1);

  res.redirect('/');

});

app.get('/entries/:post', (req, res) => {

  const entryPost = _.lowerCase(req.params.post);

  data.forEach((post) => {

    const postData = _.lowerCase(post.title);

    if (entryPost === postData) {
      res.render('post', {
        title: post.title,
        entry: post.entry
      });
    }
  });

});


app.listen(process.env.PORT);
