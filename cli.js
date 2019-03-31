#! /usr/bin/env node
const axios = require('axios')
const _ = require('lodash')
const cheerio = require('cheerio')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
let channelSlug = ''
if (argv.slug) {
	channelSlug = argv.slug
} else {
	console.log('Pass the slug of the Are.na channel with --slug=YOUR-SLUG-HERE')
	process.exit()
}
const templateString = `
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
  <title>Big</title>
  <link href='big.css' rel='stylesheet' type='text/css' />
  <link href='highlight.css' rel='stylesheet' type='text/css' />
  <style>
    .new-shiny { background: #aaaaaa; }
    .slide-container {
	    background-size: contain;
	    background-position: center center;
	    background-repeat: no-repeat;
	</style>
  <script src='big.js'></script>
  <script src='highlight.js'></script>
  <script>hljs.initHighlightingOnLoad();</script>
</head>
<body class='light'>

</body>
</html>
`

blocks = []
    axios.get(`https://api.are.na/v2/channels/${channelSlug}?per=200`)
	.then((res) => {
		blocks = _.reverse(res.data.contents)
		buildHtmlFromChannel(blocks)
	})

function writeHtmlFile (htmlString) {
	console.log('Writing HTML file...')
	fs.writeFile('index.html', htmlString, function(err){
		if (err) {
			console.log('There was an error...', err)
		}
		console.log('index.html written')
		})
}


function buildHtmlFromChannel (blocks) {
	const $ = cheerio.load(templateString)
	for(i=0; i<blocks.length; i++) {
		let d = blocks[i]
		let postContent = (d.content !== "") ? d.content : d.description
		let postHtml = "<div></div>"
		let post = $(postHtml)
		post.text(postContent)
		post.attr('data-test', 'valvalval')
		if (d.image) {
				if (!d.image.large) return false
				post.attr('data-background-image', d.image.large.url)
		}
		$('body').append(post)
	}
	console.log($.html())
	writeHtmlFile($.html())
}
