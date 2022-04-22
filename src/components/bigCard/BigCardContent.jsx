const BigCardContent = ({bc}) => {
	return (
		<div className="big-card-content">
			<p className="poke-id">Id #{bc.id<100?("000"+bc.id).slice(-3):bc.id}</p>
			<h3 className="poke-name">{bc.name}</h3>
			<p className="poke-hp">base hp: {bc.hp}</p>
			<p className="poke-type">{bc.types}</p>
			<img className="poke-art" src={bc.img} alt="" />
			<p className="poke-species">{bc.evolvesFrom===null?"":bc.evolvesFrom}</p>
			{bc.abilities.map((ability,idx)=>{
				return (
					<div key={ability.name} className={"poke-ability p-ab"+idx}>
						<p className="poke-ab">{ability.name}: </p>
						<p className="poke-ab-desc">{ability.desc}</p>
					</div>
				)
			})}
		</div>
	)
}

export default BigCardContent;