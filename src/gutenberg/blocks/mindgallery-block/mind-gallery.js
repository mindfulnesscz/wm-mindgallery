/*jshint esversion: 9 */

/**
 * External dependencies
 */
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */

import Edit from './components/edit';
import ReactGallery from './components/reactGallery.tsx';
import { GlobalAttributes, GlobalTransforms } from './components/global';




/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;

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

    return (
      <ReactGallery className={className} attributes={attributes} />
    );

  },
};
export { name, title, icon, settings };
