'use strict';

// Packages
const express = require('express');
const fs = require('fs');
const quick = require('quick-tmp')('chrome-launch');
const chromeLaunch = require('chrome-launch');
const chrome = require('chrome-location');

// Node Native
const spawn = require('child_process').spawn;

// constants
const PORT = 8090;

// App
const app = express();

// Main Entry Point
app.get('/', function (req, res) {

	var post = getEditorPost('editorPost.json');

	var base64Post = new Buffer(JSON.stringify(post)).toString('base64');

	openEditor(base64Post);

	//	res.send('http://localhost:8080/#/editor/1?templatefile=https:%2F%2Fs3-us-west-2.amazonaws.com%2Fvfs-assets%2FSponsors%2FVelma%2Fhomeside%2FDavesHomesideOHFTemplates.json&useruri=https:%2F%2Fapi.velma.com%2Fapi%2Fohf%2Fs%2F1003&partneruri=https:%2F%2Fapi.velma.com%2Fapi%2Fohf%2Fs%2F1003%2Fp');

});

function openEditor(post) {

	//var url = 'http://localhost:8080/#/editor/1?post=' + post;
	//var url = 'http://vfs-editor.s3-website-us-west-2.amazonaws.com/#/editor/1?post=' + post;
	var url = 'http://editor.vfs.velma.com/#/editor/1?post=' + post;

	var ps = spawn(chrome, [ url ]);

}

function getEditorPost(postFile) {

	console.log('Post to Editor');
	return JSON.parse(fs.readFileSync(postFile));

};

// Listen for Request
app.listen(PORT);

console.log('Running on http://localhost:' + PORT);