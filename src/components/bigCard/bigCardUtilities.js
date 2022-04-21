const countTeamMembers = ({pokeTeam}) => {
    let count = 0;
    pokeTeam.forEach(p => {
        if(p !== null) count++;
    })
    return count;
}

const addToTeam = ({pokeTeam,teamId,bigCard,setPokeTeam,setTeamId}) => {
    const idx = pokeTeam.findIndex(f=>f===null);
    let newArr = [...pokeTeam];
    newArr[idx] = {id:teamId, nickName:bigCard.name, pokemon:bigCard};
    setPokeTeam(newArr);
    setTeamId(teamId+1);
}

export {countTeamMembers,addToTeam};