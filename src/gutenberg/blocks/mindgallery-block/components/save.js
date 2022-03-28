import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { GlobalClasses, GlobalStyles } from './global';
import { BackgroundStyles } from './background';
const { RichText, getFontSizeClass } = wp.blockEditor;


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {


  console.log('SAVING IN THE INIT');

  const attributes = { ...useBlockProps.save() }

  console.log(attributes);

  const {
    captions,
    customFontSize,
    fontSize,
    fullwidth,
    gutter,
    gutterMobile,
    images,
    linkTo,
  } = attributes


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
  console.log(images)

  return (
    <div className='wp-block-mindfulness-blocks-mindgallery-block'>
      <div className="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit data-options="animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;">
        <div className="orbit-wrapper">
          <div className="orbit-controls">
            <button className="orbit-previous"><span className="show-for-sr">{__('Previous Slide', 'mindgallery')}</span>&#9664;&#xFE0E;</button>
            <button className="orbit-next"><span className="show-for-sr">{__('Next Slide', 'mindgallery')}</span>&#9654;&#xFE0E;</button>
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
}