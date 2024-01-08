import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'fascinate-block/team-member', {
	title: __( 'Team member', 'fascinate' ),
	description: __( 'A team member item', 'fascinate' ),
	icon: 'admin-users',
	parent: [ 'fascinate-block/team-members' ],
	edit: () => <p>edit</p>,
	save: () => <p>save</p>,
} );
