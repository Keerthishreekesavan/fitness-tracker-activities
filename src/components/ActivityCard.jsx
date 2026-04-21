import React from "react";
import { Link } from "react-router-dom";
import { useActivity } from "../context/ActivityContext";

// reusable component
const ActivityCard = ({ activity }) => {
  const { toggleGoal } = useActivity();
  const goalClass = activity.goalAchieved ? "goal-achieved" : "goal-not-achieved";

  // Edge cases: missing name and missing date
  const nameDisplay = activity.name ? activity.name : "unknown";
  const dateDisplay = activity.date
    ? new Date(activity.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "no date";

  return (
    <div className={`activity-card ${goalClass}`} data-testid="activity-item">
      <div className="activity-header">
        <h3 className="activity-name">{nameDisplay}</h3>
        <span className="activity-date">{dateDisplay}</span>
      </div>
      
      <p className={`goal-badge ${goalClass}`}>
        {activity.goalAchieved ? "Goal Achieved" : "Goal Not Met"}
      </p>

      <div className="activity-metrics">
        <div className="metric">
          <span className="metric-value">{activity.steps}</span>
          <span className="metric-label">Steps</span>
        </div>
        <div className="metric">
          <span className="metric-value">{activity.caloriesBurned}</span>
          <span className="metric-label">Calories</span>
        </div>
        <div className="metric">
          <span className="metric-value">{activity.workoutMinutes}</span>
          <span className="metric-label">Min</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link
          to={`/activities/${activity.activityId}`}
          className="view-details-btn"
          data-testid={`view-activity-${activity.activityId}`}
        >
          View Details →
        </Link>

        <button 
          onClick={() => toggleGoal(activity.activityId)}
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Toggle Goal
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
