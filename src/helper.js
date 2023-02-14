export const searchFilter = (state) => {
  const { selectedRegion, nations } = state;
  const searchQuery = state.searchQuery.toLowerCase();

  if (searchQuery === '' && selectedRegion === '') {
    return nations;
  }

  const filteredNations = nations.filter((nation) => {
    const name = nation.name.toLowerCase();
    const capital = nation.capital.toLowerCase();
    const { region } = nation;

    return (
      (selectedRegion === '' || region === selectedRegion) &&
      [name, capital].some((field) => field.includes(searchQuery))
    );
  });

  return filteredNations;
};
