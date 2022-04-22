import calculatePageSize from './calculatePageSize';

const updateFetched = async (arr,{fetched,setFetched}) => {
    let output = [];
    for (let i = 0; i < arr.length; i++) {
        if(!fetched.find(f=>f.name===arr[i].name)){
        const response = await fetch(arr[i].url);
        const data = await response.json();
        output.push(data);
        }
    }
    setFetched(f=>f.concat(output));
}

const pagNext = (state,amount) => {
    let {pagination,pokeList,setFilteredList,setPagination} = state;
    const PAGE_SIZE = calculatePageSize();
	let newPag = 0;
	switch (amount) {
		case "last": newPag = pokeList.length-PAGE_SIZE;break;
		case "ten": newPag = (pagination + PAGE_SIZE*10) > pokeList.length ? pokeList.length-PAGE_SIZE : pagination + PAGE_SIZE*10;break;
		case "one": newPag = (pagination + PAGE_SIZE) > pokeList.length ? pokeList.length-PAGE_SIZE : pagination + PAGE_SIZE;break;
		default:
			break;
	}
    const newArr= pokeList.slice(newPag,newPag+PAGE_SIZE);
    setFilteredList(newArr);
    setPagination(newPag);
    updateFetched(newArr,state);
}

const pagPrev = (state,amount) => {
    let {pagination,pokeList,setFilteredList,setPagination} = state;
    const PAGE_SIZE = calculatePageSize();
	let newPag = 0;
	switch (amount) {
		case "first": newPag = 0 ;break;
		case "ten": newPag = (pagination - PAGE_SIZE*10) < 0 ? 0 : pagination - PAGE_SIZE*10;break;
		case "one": newPag = (pagination - PAGE_SIZE) < 0 ? 0 : pagination - PAGE_SIZE;break;
		default:
			break;
	}
    const newArr= pokeList.slice(newPag,newPag+PAGE_SIZE);
    setFilteredList(newArr);
    setPagination(newPag);
    updateFetched(newArr,state);
}

const searchTermEffect = (state) => {
    let {searchTerm,pokeList,setFilteredList,pagination} = state;
    if(searchTerm.length > 2 || searchTerm.substring(0,1)==="#"){
			let newArr=null;
			let reg = new RegExp(`\/${searchTerm.substring(1)}\/$`);
			searchTerm.substring(0,1)==="#"?
			newArr=pokeList.filter(p=>reg.test(p.url))
			:newArr = pokeList.filter(p=>p.name.includes(searchTerm.trim().toLowerCase()));
			setFilteredList(newArr);
			updateFetched(newArr,state);
    } else {
        const newArr = pokeList.slice(pagination,pagination+calculatePageSize());
        setFilteredList(newArr);
        updateFetched(newArr,state);
    }
}

export {updateFetched,pagNext,pagPrev,searchTermEffect};