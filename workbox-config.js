module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,png,ico,html,txt,js,css}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};