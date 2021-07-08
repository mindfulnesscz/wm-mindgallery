/*jshint esversion: 9 */
/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import GalleryImage from './gallery-image';
import GalleryPlaceholder from './gallery-placeholder';
import GalleryDropZone from './gallery-dropzone';
import GalleryUpload from './gallery-upload';
import Inspector from './inspector';
import { BackgroundStyles } from './background/';
import { GlobalClasses, GlobalToolbar } from './global/';
import { title, icon } from '../mind-gallery';


/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { withNotices } = wp.components;
const { withColors, withFontSizes } = wp.editor;



/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super(...arguments);

		this.onSelectImage = this.onSelectImage.bind(this);
		this.onRemoveImage = this.onRemoveImage.bind(this);
		this.setImageAttributes = this.setImageAttributes.bind(this);

		this.state = {
			selectedImage: null,
		};
	}

	componentDidMount() {
		// This block does not support caption style.
		this.props.setAttributes({
			captionStyle: undefined,
		});
	}

	componentDidUpdate(prevProps) {
		console.log('Edit Class Updated')

		// Deselect images when deselecting the block
		if (!this.props.isSelected && prevProps.isSelected) {
			this.setState({
				selectedImage: null,
				captionSelected: false,
			});
		}
	}

	onSelectImage(index) {

		return () => {
			if (this.state.selectedImage !== index) {
				this.setState({
					selectedImage: index,
				});
			}
		};
	}

	onRemoveImage(index) {
		return () => {
			const images = filter(this.props.attributes.images, (img, i) => index !== i);
			this.setState({ selectedImage: null });
			this.props.setAttributes({
				images,
			});
		};
	}

	setImageAttributes(index, attributes) {

		const { attributes: { images }, setAttributes } = this.props;
		if (!images[index]) {
			return;
		}

		setAttributes({
			images: [
				...images.slice(0, index),
				{
					...images[index],
					...attributes,
				},
				...images.slice(index + 1),
			],
		});
	}

	render() {

		console.log('STUFFED PROPS');
		console.log(this.props);

		const {
			attributes,
			backgroundColor,
			captionColor,
			className,
			isSelected,
			noticeOperations,
			noticeUI,
			setAttributes,
			fontSize,
		} = this.props;

		const {
			align,
			fullwidth,
			gutter,
			gutterMobile,
			linkTo,
			images,
			controls,
			typeTo,
			shadow,
			captions,
		} = attributes;



		const dropZone = (
			<GalleryDropZone
				{...this.props}
				label={sprintf(__('Drop to add to the %s gallery'), title.toLowerCase())}
			/>
		);
		const wrapperClasses = classnames(
			...GlobalClasses(attributes), 
			'orbit-container',
			{
			'has-fullwidth-images': fullwidth,
			[`align${align}`]: align,
			[`has-margin`]: gutter > 0,
			[`has-margin-bottom-${gutter}`]: gutter > 0,
			[`has-margin-bottom-mobile-${gutterMobile}`]: gutterMobile > 0,
		}
		);

		const wrapperStyles = {
			...BackgroundStyles(attributes),
			backgroundColor: backgroundColor.color,
			color: captionColor.color,
		};

		if (images.length === 0) {
			return (
				<GalleryPlaceholder
					{...this.props}
					label={sprintf(__('%s Gallery'), title)}
					icon={icon}
				/>
			);
		}

		return (
			<Fragment>
				<GlobalToolbar
					{...this.props}
				/>
				<Inspector
					{...this.props}
				/>
				{ noticeUI}
				<div className={className}>
					<div className="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit data-options="animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;">
						<div className="orbit-wrapper">
							<div className="orbit-controls">
								<button className="orbit-previous"><span className="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
								<button className="orbit-next"><span className="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
							</div>
							<ul className={wrapperClasses} style={wrapperStyles}>
								{dropZone}
								{images.map((img, index) => {
									// translators: %1$d is the order number of the image, %2$d is the total number of images.
									const ariaLabel = __(sprintf('image %1$d of %2$d in gallery', (index + 1), images.length));
									return (
										<li className="blockgallery--item orbit-slide" key={img.id || img.url}>
											<GalleryImage
												edited={img.edited}
												url={img.url}
												i_w={img.i_w}
												i_h={img.i_h}
												srcset={img.srcset}
												sizes={img.sizes}
												description={img.description}
												title={img.title}
												alt={img.alt}
												id={img.id}
												gutter={gutter}
												gutterMobile={gutterMobile}
												marginBottom={true}
												shadow={shadow}
												isSelected={isSelected && this.state.selectedImage === index}
												onRemove={this.onRemoveImage(index)}
												onSelect={this.onSelectImage(index)}
												setAttributes={(attrs) => this.setImageAttributes(index, attrs)}
												caption={img.caption}
												aria-label={ariaLabel}
												captions={captions}
												supportsCaption={true}
												fontSize={fontSize.size}
											/>
										</li>
									);
								})}
								{isSelected && (
									<GalleryUpload {...this.props}
										gutter={gutter}
										gutterMobile={gutterMobile}
										marginBottom={true}
									/>
								)}
							</ul>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose([
	withSelect((select, ownProps) => {

		return {
			//new_images: new_images,
			editorSidebarOpened: select('core/edit-post').isEditorSidebarOpened(),
			pluginSidebarOpened: select('core/edit-post').isPluginSidebarOpened(),
			publishSidebarOpened: select('core/edit-post').isPublishSidebarOpened(),
			wideControlsEnabled: select('core/editor').getEditorSettings().alignWide,
		};

	}),
	withColors({ backgroundColor: 'background-color', captionColor: 'color' }),
	withFontSizes('fontSize'),
	withNotices,
])(Edit);
