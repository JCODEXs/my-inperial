import Card from "./ui/Card";
export const Room = derive({
  list: (get) => {
    const query = get(search).query.toLowerCase();
    return get(allPokemon)
      .pokemon.filter((p) => p.name.toLowerCase().includes(query))
      .slice(0, 10)
      .sort((a, b) => a.name.localeCompare(b.name));
  },
});
