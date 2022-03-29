import * as React from 'react';
import classnames from 'classnames';
import { GlobalClasses, GlobalStyles } from './global';
import { BackgroundStyles } from './background';
import MindImage from './utils/mind-image';
import { GalleryProps } from './galleryTypes';


declare const wp: any;
const { __ } = wp.i18n;
const { RichText, getFontSizeClass } = wp.blockEditor;


const FoundationGallery: React.FC<GalleryProps> = ({ className, attributes }) => {

  const {
    captions,
    customFontSize,
    fontSize,
    fullwidth,
    gutter,
    gutterMobile,
    images,
    linkTo,
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

export default FoundationGallery;