export const searchFilter = (selectedRegion, nations, searchQuery) => {
  const query = searchQuery.toLowerCase();

  if (query === '' && selectedRegion === '') {
    return nations;
  }

  const filteredNations = nations.filter((nation) => {
    const name = nation.name.toLowerCase();
    const capital = nation.capital.toLowerCase();
    const { region } = nation;

    return (
      (selectedRegion === '' || region === selectedRegion) &&
      [name, capital].some((field) => field.includes(query))
    );
  });

  return filteredNations;
};
