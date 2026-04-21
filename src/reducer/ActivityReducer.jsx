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

    case "TOGGLE_GOAL": {
      return {
        ...state,
        activities: state.activities.map((activity) => {
          if (String(activity.activityId) === String(action.payload)) {
            // "invalid activity - ignore"
            if (!activity || activity.steps <= 0 || activity.caloriesBurned <= 0 || activity.workoutMinutes <= 0) {
                return activity;
            }

            let newGoal = !activity.goalAchieved;
            
            // "buggy requirement: if steps>=8000 goalAchieved must automatically become true"
            if (activity.steps >= 8000) {
              newGoal = true;
            }

            // "already correct value - no duplicate update"
            if (newGoal === activity.goalAchieved) {
              return activity;
            }

            // "must not directly modify state" -> return fresh object
            return { ...activity, goalAchieved: newGoal };
          }
          return activity;
        }),
      };
    }

    default:
      console.warn("Unknown action:", action.type);
      return state;
  }
};

export default ActivityReducer;
