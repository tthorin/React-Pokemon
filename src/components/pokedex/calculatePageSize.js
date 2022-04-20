const calculatePageSize = (ref,ref2) => {
	const html = document.querySelector('html');
	const height = html.clientHeight;
	const width = html.clientWidth;
	const smallCardWidth = 270;
	const smallCardHeight = 207;

	const cols = (width<1600&&height>1000)||height>1000?
	 Math.floor(width / smallCardWidth)
	:(Math.floor(width / (smallCardWidth-30)));

	const rows = height<1000?
	 Math.floor(height / smallCardHeight)
	:(Math.floor(height / (smallCardHeight+30)));
	
	return cols * rows;
}

export default calculatePageSize;
