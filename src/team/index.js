/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './team-member';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ( { images, columns } ) => {
					const innerBlocks = images.map( ( { url, id, alt } ) => {
						return createBlock( 'fascinate-block/team-member', {
							alt,
							id,
							url,
						} );
					} );
					return createBlock(
						'fascinate-block/team-members',
						{
							columns: columns || 2,
						},
						innerBlocks
					);
				},
			},
			{
				type: 'block',
				blocks: [ 'core/image' ],
				isMultiBlock: true,
				transform: ( attributes ) => {
					const innerBlocks = attributes.map(
						( { url, alt, id } ) => {
							return createBlock( 'fascinate-block/team-member', {
								alt,
								url,
								id,
							} );
						}
					);
					return createBlock(
						'fascinate-block/team-members',
						{
							columns:
								attributes.length > 3 ? 3 : attributes.length,
						},
						innerBlocks
					);
				},
			},
		],
	},
} );
