const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const lodash = require('lodash');

const homeStartingContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porta.'
const aboutContent = 'Pellentesque ultrices scelerisque diam. Integer egestas quam vel orci molestie, in luctus erat hendrerit.'
const contactContent = 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc at tortor felis.'

const posts = [];
const filteredPosts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { posts: posts});
})

app.get('/about', (req, res) => {
    res.render('about', { aboutContent: aboutContent });
})

app.get('/contact', (req, res) => {
    res.render('contact', { contactContent: contactContent });
})

app.get('/compose', (req, res) => {
    res.render('compose');
})

app.get('/posts/:postName', (req, res)=> {
    const postName = lodash.lowerCase(req.params.postName);
    posts.forEach((post)=> {
        if(lodash.lowerCase(post.title) == postName) {
            res.render('post', {title: post.title, content: post.content});
        } 
    })
})

app.post('/compose', (req, res) => {
    const post = { title: req.body.title, content: req.body.content };
    posts.push(post);

    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Listning to port 3000');
})