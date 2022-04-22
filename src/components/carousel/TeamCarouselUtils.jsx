const assignName = (idx,state) => {
  state.setPokeTeam((pt) =>
    pt.map((p, i) => (i === idx ? { ...p, nickName: state.name } : p))
  );
  state.setName("");
  state.setEditingNickName(-1);
};

const cancelEdit = (state) => {
  state.setName("");
  state.setEditingNickName(-1);
};

const fillCarousel = (maxTeamSize,currentTeamSize) => {
  let needed = maxTeamSize - currentTeamSize;
  let output = [];
  for (let i = 0; i < needed; i++) {
    output.push(
      <div
        key={"empty" + i}
        className={"team-card card" + (pokeTeam.length + i + 1)}
      >
        <header>
          <h1>Empty</h1>
        </header>
        <EmptySlotCard slotNumber={pokeTeam.length + 1 + i} />
      </div>
    );
  }
  return output;
};
const removeFromTeam = (id,setPokeTeam) => {
  setPokeTeam((pt) => pt.map((p) => (p === null || p.id === id ? null : p)));
};

export {assignName, cancelEdit, fillCarousel, removeFromTeam};
