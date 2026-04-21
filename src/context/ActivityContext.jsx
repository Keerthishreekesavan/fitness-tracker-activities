import { createContext, useContext, useReducer, useEffect } from "react";
import ActivityReducer from "../reducer/ActivityReducer";
import { getToken, getDataset } from "../api/api";

const initialState = {
  activities: [],
  loading: true,
  filter: "all", // "all" | "achieved" | "not-achieved"
};

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);

  // Fetch activities from the server
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Step 1: Get Token — replace studentId & password for exam
        console.log("Fetching token...");
        const tokenRes = await getToken(
          "E0123014",  // replace during exam
          "273582",    // replace during exam
          "SET B",   // dataset B
        );
        console.log("Token Response:", tokenRes);

        // Step 2: Fetch dataset
        console.log("Fetching dataset with token...");
        const activities = await getDataset(tokenRes.token, tokenRes.dataUrl);
        console.log("Raw activities data downloaded:", activities);

        dispatch({ type: "SET_ACTIVITIES", payload: activities });
      } catch (err) {
        console.error("Error fetching fitness data:", err.message);
        dispatch({ type: "SET_ACTIVITIES", payload: [] });
      }
    };

    fetchActivities();
  }, []);

  const setFilter = (filterValue) =>
    dispatch({ type: "SET_FILTER", payload: filterValue });

  const toggleGoal = (id) =>
    dispatch({ type: "TOGGLE_GOAL", payload: id });

  return (
    <ActivityContext.Provider
      value={{
        activities: state.activities,
        loading: state.loading,
        filter: state.filter,
        setFilter,
        toggleGoal,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);
