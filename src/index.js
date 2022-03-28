/*jshint esversion: 9 */

const { registerBlockType } = wp.blocks;

// Category slug and title
const category = {
	slug: 'block-gallery',
	title: 'Block Gallery',
};


import * as mindgallery from "./gutenberg/blocks/mindgallery-block/mind-gallery";

registerBlockType( 'mindfulness-blocks/mindgallery-block', { ...mindgallery.settings  } );









