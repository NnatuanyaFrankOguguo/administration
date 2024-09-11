import React, {useState, useEffect} from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
	let [loading, setLoading] = useState(true);
	

	return (
		<div>
			<div className="sweet-loading " style={{
			display: 'flex',
			justifyContent: 'center', //just to center the icon on all screen sizes
			alignItems: 'center',
			minHeight: '100vh', // Ensures the div takes  up the full viewport height
			marginTop: '-150px' // Adjust the vertical position with a negative margin
            }}>
				<HashLoader
					color='#ac6134'
					loading={loading}
					cssOverride=''
					size={65}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</div>
		</div>
	);
}

export default Loader;
