
/*
*
* Main attributes file for both Gallery and individual 
* Images that are read and passed during edit and save
*
*/


/**
 * Internal dependencies
 */
import BackgroundPanel, { BackgroundAttributes } from '../background';

/**
 * Set global attributes that every block uses.
 * @type {Object}
 */
const GlobalAttributes = {
	images: {
		type: 'array',
		default: [],
		source: 'query',
		selector: '.blockgallery--item',
		query: {
			url: {
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			link: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-link',
			},
			alt: {
				source: 'attribute',
				selector: 'img',
				attribute: 'alt',
				default: '',
			},
			id: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-id',
			},
			caption: {
				type: 'array',
				source: 'children',
				selector: 'figcaption',
			},
			i_w: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'i_w',
			},
			i_h: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'i_h',
			},
			srcset: {
				type: 'string',
				default: '',
				source: 'attribute',
				selector: 'img',
				attribute: 'srcset'
			},
			description: {
				type: 'string',
				default: '',
				source: 'attribute',
				selector: 'img',
				attribute: 'description'
			},
			title: {
				type: 'string',
				default: '',
				source: 'attribute',
				selector: 'img',
				attribute: 'title'
			},
			sizes: {
				type: 'string',
				default: '',
				source: 'attribute',
				selector: 'img',
				attribute: 'sizes'
			}
		},
	},
	linkTo: {
		type: 'string',
		default: 'none',
	},
	typeTo: {
		type: 'string',
		default: 'background',
	},
	align: {
		type: 'string',
	},
	gutter: {
		type: 'number',
		default: 15,
	},
	gutterMobile: {
		type: 'number',
		default: 15,
	},
	radius: {
		type: 'number',
		default: 0,
	},
	shadow: {
		type: 'string',
		default: 'none',
	},
	filter: {
		type: 'string',
		default: 'none',
	},
	captions: {
		type: 'boolean',
		default: true,
	},
	controls: {
		type: 'boolean',
		default: true,
	},
	captionStyle: {
		type: 'string',
		default: 'dark',
	},
	captionColor: {
		type: 'string',
	},
	customCaptionColor: {
		type: 'string',
	},
	fontSize: {
		type: 'string',
	},
	customFontSize: {
		type: 'number',
	},
	primaryCaption: {
		type: 'array',
		source: 'children',
		selector: '.blockgallery--primary-caption',
	},
	...BackgroundAttributes,
};

export default GlobalAttributes;