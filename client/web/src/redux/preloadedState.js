import dummyData from './dummyData.json';

const preloadedState = {
  data: dummyData,
  searches: [],
  ui: {
    selectedLocation: null,
    resultDetailIsOpen: false,
  }
}

export default preloadedState;