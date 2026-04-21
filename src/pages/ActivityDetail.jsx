import React from "react";
import { useParams, Link } from "react-router-dom";
import { useActivity } from "../context/ActivityContext";

const ActivityDetail = () => {
  const { id } = useParams();
  const { activities, loading } = useActivity();

  if (loading) {
    return <p data-testid="loading">Loading...</p>;
  }

  // Validate ID and find activity
  const activity = activities.find((a) => String(a.activityId) === String(id));

  // Edge case: Invalid ID
  if (!activity) {
    return (
      <div className="page-container" data-testid="activity-not-found">
        <h2>Activity Not Found</h2>
        <Link to="/activities" className="back-btn">← Back to Activities</Link>
      </div>
    );
  }

  // Calculate efficiency score dynamically
  // Edge case: Division by zero handle safely
  const efficiencyScore = 
    activity.workoutMinutes > 0 
      ? (activity.caloriesBurned / activity.workoutMinutes).toFixed(2)
      : 0;

  const dateDisplay = activity.date
    ? new Date(activity.date).toLocaleDateString()
    : "No Date";

  return (
    <div className="page-container" data-testid="activity-detail-page">
      <Link to="/activities" className="back-btn">← Back to Activities</Link>

      <div className="detail-card">
        <h1 data-testid="detail-name">{activity.name || "Unknown"}</h1>
        <p className="detail-meta" data-testid="detail-date">Date: {dateDisplay}</p>
        
        <p><strong>Goal Status:</strong> {activity.goalAchieved ? "✅ Achieved" : "❌ Not Met"}</p>
        
        <div className="detail-metrics-grid">
          <div className="detail-metric-card">
            <span className="dmetric-value" data-testid="detail-steps">
              {activity.steps}
            </span>
            <span className="dmetric-label">Steps</span>
          </div>

          <div className="detail-metric-card">
            <span className="dmetric-value" data-testid="detail-calories">
              {activity.caloriesBurned}
            </span>
            <span className="dmetric-label">Calories Burned</span>
          </div>

          <div className="detail-metric-card">
            <span className="dmetric-value" data-testid="detail-minutes">
              {activity.workoutMinutes}
            </span>
            <span className="dmetric-label">Workout Minutes</span>
          </div>
          
          <div className="detail-metric-card">
            <span className="dmetric-value" data-testid="detail-cal-per-min">
              {efficiencyScore}
            </span>
            <span className="dmetric-label">Efficiency (Cal/Min)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
