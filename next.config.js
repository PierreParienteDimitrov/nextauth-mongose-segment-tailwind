const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			env: {
				mongodb_username: 'pierre0',
				mongodb_password: '8GLXuv3o7ov9V5Wy',
				mongodb_clustername: 'cluster0',
				mongodb_database: 'dev-site',
			},
		};
	}

	return {
		env: {
			mongodb_username: 'pierre0',
			mongodb_password: '8GLXuv3o7ov9V5Wy',
			mongodb_clustername: 'cluster0',
			mongodb_database: 'prod-site',
		},
	};
};
