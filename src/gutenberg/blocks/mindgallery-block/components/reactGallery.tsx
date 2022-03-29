import * as React from 'react';
import { useState, useEffect } from 'react';
import { GalleryProps } from './galleryTypes';
import MindImage from './utils/mind-image';




const ReactGallery: React.FC<GalleryProps> = ({ className, attributes }) => {

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

  return (
    <div className={`${className} mind-gallery-wrapper`}>
      <div className='mind-gallery-container'></div>
      <div className='mind-gallery-data'>
        <ul className='' style={{ 'display': 'none' }} >
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

            const img = <MindImage
              image={image}
            />;

            return (
              <li key={image.id || image.url} className="blockgallery--item orbit-slide">
                {href ? <a href={href}>{img}</a> : img}
              </li>

            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ReactGallery;