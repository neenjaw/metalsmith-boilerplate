#!/user/bin/env node

/*
Metalsmith build file.
*/

'use strict';

// defaults
const consoleLog = false;
const devBuild = ((process.env.NODE_ENV || '').trim().toLowerCase () !== 'production');
const pkg = require('./package.json');

// main directories
const dir = {
    base: __dirname + '/',
    lib: __dirname + '/lib/',
    source: './src/',
    dest: './dist/'
};

//modules
const metalsmith  = require('metalsmith');
const drafts      = require('metalsmith-drafts');
const markdown    = require('metalsmith-markdown');
const wordcount   = require('metalsmith-word-count');
const collections = require('metalsmith-collections');
const permalinks  = require('metalsmith-permalinks');
const layouts     = require('metalsmith-layouts');
const sitemap     = require('metalsmith-sitemap');

const htmlmin = devBuild ? null : require('metalsmith-html-minifier');

const Handlebars = require('handlebars');
const moment     = require('moment');

const siteMeta = {
    devBuild: devBuild,
    version: pkg.version,
    name: 'neenjaw.com',
    description: 'Views on web development, programming, life by a neenjaw.',
    generatorname: 'Metalsmith',
    generatorurl: 'http://metalsmith.io/',
    generatortitle: 'Check out Metalsmith!',
    hostname: 'Netlify',
    hosturl: 'https://netlify.com/',
    hosttitle: 'Learn more about Netlify',
    domain: devBuild ? 'http://127.0.0.1' : 'https://neenjaw.com'
};

Handlebars.registerHelper('is', function (value, test, options) {
    if (value === test) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('date', function (date) {
    return moment(date, 'MM-DD-YYYY').format('Do MMM \'YY');
});

Handlebars.registerHelper('dotdate', function (date) {
    return moment(date, 'MM-DD-YYYY').format('YYYY . MM . DD');
});

const ms = metalsmith(dir.base)
    .metadata(siteMeta)
    .source(dir.source)
    .destination(dir.dest)
    .clean(!devBuild)
    .use(drafts())
    .use(collections({
        posts: {
            pattern: 'posts/*.md',
            sortBy: 'date',
            reverse: true
        },
        lastPosts: {
            pattern: 'posts/*.md',
            sortBy: 'date',
            limit: 5,
            reverse: true
        },
        pages: {
            pattern: '*.md',
            sortBy: 'menu-order'
        }
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':mainCollection/:title'
    }))
    .use(wordcount({
        raw: true
    }))
    .use(layouts({
        engine: 'handlebars',
        directory: 'layouts',
        default: 'default.hbs',
        partials: 'layouts/partials'
    }));

if (htmlmin) ms.use(htmlmin()); // minify html

ms
    .use(sitemap({
        hostname: siteMeta.domain
    }))
    .build(function (err) {
        if (err) throw err;
    });
