import React from 'react';

const ContainerFluid = ({ children, custom }) => {
	return <div className={`w-screen ${custom}`}>{children}</div>;
};

export default ContainerFluid;
