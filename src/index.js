/*jshint esversion: 9 */

const { registerBlockType } = wp.blocks;

import * as mindgallery from "./gutenberg/blocks/mindgallery-block/mind-gallery";

registerBlockType( 'wmwp-blocks/mindgallery', { ...mindgallery.settings  } );









