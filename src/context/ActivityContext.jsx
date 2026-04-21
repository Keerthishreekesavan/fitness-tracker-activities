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
        console.log("Fetching token...");

        const tokenRes = await getToken(
          "E0123014",  // Your student ID
          "273582",    // Password
          "setB",      // 
        );
        console.log("Token Response:", tokenRes);

        console.log("Fetching dataset with token...");
        const rawBody = await getDataset(tokenRes.token, tokenRes.dataUrl);
        console.log("Raw activities data downloaded:", rawBody);

        // The teacher nested the array inside an object! 
        // We unpack it here so the Reducer gets the correct Array.
        let items = [];
        if (Array.isArray(rawBody)) items = rawBody;
        else if (Array.isArray(rawBody?.activities)) items = rawBody.activities;
        else if (Array.isArray(rawBody?.data)) items = rawBody.data;

        dispatch({ type: "SET_ACTIVITIES", payload: items });
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
