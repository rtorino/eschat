require.config( {

	baseUrl : '/',

	deps: [ 'jsx!scripts/chat' ],

	shim : {
		boostrap : {
			deps: [ 'jquery' ],
			exports: 'jquery'
		},

		JSXTransformer: {
			exports: 'JSXTransformer'
		}
	},

	paths : {
		'jquery'         : 'lib/jquery/jquery',
		'bootstrap'      : 'lib/bootstrap/dist/',
		'React'          : 'lib/react/react-with-addons',
		'jsx'            : 'lib/require-jsx/jsx',
		'JSXTransformer' : 'lib/react/JSXTransformer',

		'components'     : 'scripts/components'
	}

} );