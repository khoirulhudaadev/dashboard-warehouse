import React from 'react';

interface ErrorProps {
	type?: string;
	text?: string;
	onError?: any;
}

const Error: React.FC<ErrorProps> = ({ type, text, onError }) => {
	switch (type) {
		case 'input-error':
			return (
				<div className="flex w-full py-2 px-4 justify-center items-start gap-2 rounded-2xl">
					<p className="text-red-500 text-[0.85rem] font-semibold">{text ? text : onError}</p>
				</div>
			);
		break;
	}
};

export default Error;
