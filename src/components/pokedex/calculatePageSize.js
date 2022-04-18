const calculatePageSize = () => {
	if (!document.querySelector('main')) return 0;
	const container = document.querySelector('main');
	const height = container.clientHeight;
	const width = container.clientWidth;
	const cols = Math.floor(width / 240);
	const rows = Math.floor(height / 220);
	console.log(`${cols} x ${rows}`);
	return cols * rows;
}

export default calculatePageSize;