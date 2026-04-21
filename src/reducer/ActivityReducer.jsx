const ActivityReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVITIES": {
      // Do not mutate dataset, store exactly as it comes
      return {
        ...state,
        activities: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };
    }

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload, // "all" | "achieved" | "not-achieved"
      };

    default:
      console.warn("Unknown action:", action.type);
      return state;
  }
};

export default ActivityReducer;
