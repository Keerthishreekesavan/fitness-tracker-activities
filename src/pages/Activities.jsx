import React from "react";
import { useActivity } from "../context/ActivityContext";
import ActivityList from "../components/ActivityList";

const Activities = () => {
  const { activities } = useActivity();

  // MUST USE .filter()
  // Relaxed filtering to prevent crashing if the backend sends strings instead of numbers/booleans
  const validActivities = activities.filter((activity) => {
    if (!activity) return false;
    
    // Parse strings to numbers safely without crashing
    const steps = Number(activity.steps);
    const cals = Number(activity.caloriesBurned);
    const mins = Number(activity.workoutMinutes);
    
    // Check if goalAchieved is a boolean OR a string that says "true"/"false"
    const isGoalValid = 
      typeof activity.goalAchieved === "boolean" || 
      activity.goalAchieved === "true" || 
      activity.goalAchieved === "false";

    return (
      steps > 0 &&
      cals > 0 &&
      mins > 0 &&
      isGoalValid
    );
  });

  return (
    <div className="page-container" data-testid="activities-page">
      <div className="page-header">
        <h1 className="page-title">Activities</h1>
      </div>
      <ActivityList activitiesToShow={validActivities} />
    </div>
  );
};

export default Activities;
