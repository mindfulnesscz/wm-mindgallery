/*jshint esversion: 9 */

/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */

import Edit from './components/edit';
import icons from './components/utils/icons';
import MindImage from './components/utils/mind-image';
import { BackgroundStyles } from './components/background';
import { GlobalAttributes, GlobalTransforms, GlobalClasses, GlobalStyles } from './components/global';


/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getFontSizeClass } = wp.editor;

/**
 * Block constants
 */
const name = 'Mindgallery';

const title = __('Mindgallery');

const category = 'layout';

//const icon = icons.stacked;
const icon = 'format-image';

const keywords = [
	__('gallery'),
	__('images'),
	__('photos'),
];

const blockAttributes = {
	...GlobalAttributes,

	// Block specific attributes and overrides.
	align: {
		type: 'string',
		default: 'full',
	},
	captionStyle: {
		type: 'string',
	},
	fullwidth: {
		type: 'boolean',
		default: true,
	},
	gutter: {
		type: 'number',
		default: 0,
	},
	gutterMobile: {
		type: 'number',
		default: 0,
	},
};

const settings = {

	title: title,
	icon: icon,
	category: category,


	description: __('Mindgallery settings for the default gallery.'),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: ['wide', 'full'],
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['blockgallery/masonry'],
				transform: (attributes) => (
					createBlock(`blockgallery/${name}`, {
						...GlobalTransforms(attributes),
					})
				),
			},
			{
				type: 'block',
				blocks: ['blockgallery/carousel'],
				transform: (attributes) => (
					createBlock(`blockgallery/${name}`, {
						...GlobalTransforms(attributes),
					})
				),
			},
			{
				type: 'block',
				blocks: ['blockgallery/thumbnails'],
				transform: (attributes) => (
					createBlock(`blockgallery/${name}`, {
						...GlobalTransforms(attributes),
					})
				),
			},
			{
				type: 'block',
				blocks: ['blockgallery/offset'],
				transform: (attributes) => (
					createBlock(`blockgallery/${name}`, {
						...GlobalTransforms(attributes),
					})
				),
			},
			{
				type: 'block',
				blocks: ['blockgallery/auto-height'],
				transform: (attributes) => (
					createBlock(`blockgallery/${name}`, {
						...GlobalTransforms(attributes),
					})
				),
			},
			{
				type: 'block',
				blocks: ['core/gallery'],
				transform: (attributes) => (
					createBlock(`blockgallery/${name}`, {
						...GlobalTransforms(attributes),
					})
				),
			},
			{
				type: 'block',
				isMultiBlock: true,
				blocks: ['core/image'],
				transform: (attributes) => {
					const validImages = filter(attributes, ({ id, url }) => id && url);
					if (validImages.length > 0) {
						return createBlock(`blockgallery/${name}`, {
							images: validImages.map(({ id, url, alt, caption }) => ({ id, url, alt, caption })),
							ids: validImages.map(({ id }) => id),
						});
					}
					return createBlock(`blockgallery/${name}`);
				},
			},
			{
				type: 'prefix',
				prefix: ':stacked',
				transform: function (content) {
					return createBlock(`blockgallery/${name}`, {
						content,
					});
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: ['core/gallery'],
				transform: (attributes) => (
					createBlock('core/gallery', {
						...GlobalTransforms(attributes),
					})
				),
			},
		],
	},

	edit: Edit,

	save({ attributes, className }) {
		console.log('SAVING IN THE INIT');
		console.log(attributes)

		const {
			captionColor,
			captions,
			customCaptionColor,
			customFontSize,
			fontSize,
			fullwidth,
			gutter,
			gutterMobile,
			images,
			linkTo,
			shadow,
			i_w,
			i_h,
		} = attributes;


		const wrapperClasses = classnames(
			...GlobalClasses(attributes),
			'orbit-container',
			{
			'has-fullwidth-images': fullwidth,
			[`has-margin`]: gutter > 0,
		}
		);

		const wrapperStyles = {
			...GlobalStyles(attributes),
			...BackgroundStyles(attributes),
		};

		const fontSizeClass = getFontSizeClass(fontSize);

		const figureClasses = classnames(
			'blockgallery--figure',
			'orbit-figure', {
			[`has-margin-bottom-${gutter}`]: gutter > 0,
			[`has-margin-bottom-mobile-${gutterMobile}`]: gutterMobile > 0,
			[fontSizeClass]: fontSizeClass,
		});

		const captionClasses = classnames(
			'orbit-caption',
			'blockgallery--caption', {
			[fontSizeClass]: fontSizeClass,
		});

		const captionStyles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		return (
			<div className={className}>
				<div className="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit data-options="animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;">
					<div className="orbit-wrapper">
						<div className="orbit-controls">
							<button className="orbit-previous"><span className="show-for-sr">{ __( 'Previous Slide', 'mindgallery' ) }</span>&#9664;&#xFE0E;</button>
							<button className="orbit-next"><span className="show-for-sr">{ __( 'Next Slide', 'mindgallery' ) }</span>&#9654;&#xFE0E;</button>
						</div>
						<ul className={wrapperClasses} style={wrapperStyles}>
							{images.map((image) => {


								let href;
								switch (linkTo) {
									case 'media':
										href = image.url;
										break;
									case 'attachment':
										href = image.link;
										break;
								}


								const imgClasses = classnames(
									image.id ? [`wp-image-${image.id}`] : null
								);

								const img = <MindImage
									image={image}
								/>;

								return (
									<li key={image.id || image.url} className="blockgallery--item orbit-slide">
										<figure className={figureClasses}>
											{href ? <a href={href}>{img}</a> : img}
											{captions && image.caption && image.caption.length > 0 && (
												<RichText.Content tagName="figcaption" className={captionClasses} value={image.caption} styles={captionStyles} />
											)}
										</figure>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	},
};
export { name, title, icon, settings };
