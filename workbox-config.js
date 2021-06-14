module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{css,html,js,json}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'src/sw.js'
};