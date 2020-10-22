import dummyData from './dummyData.json';
import chicagoParks from './chicago-parks.json';

const preloadedState = {
  data: dummyData,
  chicagoParks: chicagoParks,
  searches: [],
  ui: {
    selectedLocation: null,
  }
}

export default preloadedState;