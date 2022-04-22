import {atom} from 'recoil';

const pokeTeamState = atom({
	  key: 'pokeTeamState',
	  default: [null,null,null,null,null]
})

export default pokeTeamState;