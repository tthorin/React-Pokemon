const calculatePageSize = (ref) => {
	if (!document.querySelector('main')) return 0;
	// const container = document.querySelector('.pokedex-container')?
	// 					document.querySelector('.pokedex-container')
	// 					: document.querySelector('main');
	// const container = document.querySelector('main')
	const container = ref
	const height = container.clientHeight;
	const width = container.clientWidth;
	const offHeight = container.offsetHeight;
	const scrollHeight = container.scrollHeight;
	console.log(container,height, offHeight,scrollHeight);
	const cols = Math.floor(width / 248);
	const rows = Math.floor(height / 222);
	console.log(`${cols} x ${rows}`);
	return cols * rows;
}

export default calculatePageSize;