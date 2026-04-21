import React from "react";
import { useActivity } from "../context/ActivityContext";
import ActivityCard from "./ActivityCard";

const ActivityList = ({ activitiesToShow }) => {
  const { loading } = useActivity();

  if (loading) {
    return (
      <div className="loading-container" data-testid="loading">
        <div className="spinner"></div>
        <p>Loading activities...</p>
      </div>
    );
  }

  if (!activitiesToShow || activitiesToShow.length === 0) {
    return (
      <div className="empty-state" data-testid="no-activities">
        <span className="empty-icon">🎯</span>
        <p>No activities found.</p>
      </div>
    );
  }

  return (
    <div className="activity-list" data-testid="activity-list">
      {activitiesToShow.map((activity) => (
        <ActivityCard key={activity.activityId} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityList;
