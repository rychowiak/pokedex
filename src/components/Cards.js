export default function Card(props) {
  const { pokemon } = props;
  return (
    <div className="flex flex-wrap p-4 ">
      {pokemon.map((p) => (
        <div
          key={p.id}
          className="flex flex-col justify-around items-center w-300px shadow-sm hover:shadow-gray-600 rounded-xl py-2 px-0 my-3 mx-4 box-border "
        >
          <img
            src={p.sprites.other["official-artwork"].front_default}
            alt="pokemon img"
            className="w-52 bg-gray-200"
          />
          <div className="card-image ">
            <p>N.º0{p.id}</p>
          </div>
          <div>
            <div className="font-semibold text-lg">{p.name}</div>
            <div>{p.types[0].type.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
