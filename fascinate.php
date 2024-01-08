<?php
/**
 * Plugin Name:       Fascinate
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       fascinate
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function fascinate_block_init() {
	register_block_type( __DIR__ . '/build/text-box' );
	register_block_type( __DIR__ . '/build/team' );
}
add_action( 'init', 'fascinate_block_init' );

/**
 * Add a block category for "Fascinate" if it doesn't exist already.
 *
 * @param array $categories Array of block categories.
 *
 * @return array
 */
function fascinate_block_categories( $categories ) {
    $category_slugs = wp_list_pluck( $categories, 'slug' );
    return in_array( 'fascinate', $category_slugs, true ) ? $categories : array_merge(
        
        array(
            array(
                'slug'  => 'fascinate',
                'title' => __( 'Fascinate', 'fascinate' ),
                'icon'  => null,
            ),
        ),
		$categories
    );
}
add_filter( 'block_categories_all', 'fascinate_block_categories' );