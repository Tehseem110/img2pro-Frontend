import React, { useEffect, useState } from 'react';

const Loading = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	});
	return (
		<>
			{loading && (
				<div className='fixed inset-0 flex items-center justify-center z-[100] bg-black/70 backdrop-blur-sm'>
					<div className='animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-r-2 border-b-2 '></div>
				</div>
			)}
		</>
	);
};

export default Loading;
