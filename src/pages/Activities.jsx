import React from "react";
import { useActivity } from "../context/ActivityContext";
import ActivityList from "../components/ActivityList";

const Activities = () => {
  const { activities } = useActivity();

  // MUST USE .filter()
  // Valid activity conditions: steps > 0, caloriesBurned > 0, workoutMinutes > 0, goalAchieved must be Boolean
  const validActivities = activities.filter((activity) => {
    if (!activity) return false;
    return (
      activity.steps > 0 &&
      activity.caloriesBurned > 0 &&
      activity.workoutMinutes > 0 &&
      typeof activity.goalAchieved === "boolean"
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
