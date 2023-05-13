import React from "react";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IActionButton {
	icon: IconDefinition;
}

const ActionButton: React.FC<IActionButton> = ({
	icon,
}) => {
	return (
		<div className="px-2 py-1 bg-white rounded-md hover:bg-gray-200">
			<FontAwesomeIcon icon={icon} />
		</div>
	);
};

export default ActionButton;
