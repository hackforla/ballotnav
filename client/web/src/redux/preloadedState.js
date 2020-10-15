import dummyData from './dummyData.json';

const preloadedState = {
  data: dummyData,
  searches: [],
  ui: {
    selectedLocation: undefined,
    resultDetailIsOpen: false,
  }
}

export default preloadedState;