export const searchFilter = (state) => {
  if (state.searchQuery === '' && state.selectedRegion === '') {
    return state.nations;
  } else {
    const selectedRegion = state.selectedRegion;
    const searchQuery = state.searchQuery.toLowerCase();
    let filteredNations = [];

    console.log('selectedRegion:: ', selectedRegion);

    if (selectedRegion === '') {
      filteredNations = state.nations.filter((nation) => {
        const name = nation.name.toLowerCase();
        const capital = nation.capital.toLowerCase();
        const region = nation.region;

        return name.includes(searchQuery) || capital.includes(searchQuery);
      });
    } else {
      filteredNations = state.nations.filter((nation) => {
        const name = nation.name.toLowerCase();
        const capital = nation.capital.toLowerCase();
        const region = nation.region;

        return (
          (region === selectedRegion && name.includes(searchQuery)) ||
          (region === selectedRegion && capital.includes(searchQuery))
        );
      });
    }

    console.log(filteredNations);

    return filteredNations;
  }
};
