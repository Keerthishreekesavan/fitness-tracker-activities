import React, { useEffect } from "react";
import { useActivity } from "../context/ActivityContext";

const StatsPage = () => {
  const { activities } = useActivity();

  // Question 5 constraints:
  // - exclude invalid goalAchieved values
  // - ignore invalid activities
  const validActivities = activities.filter((a) => {
    if (!a) return false;
    const steps = Number(a.steps);
    const cals = Number(a.caloriesBurned);
    const mins = Number(a.workoutMinutes);
    const isGoalValid = 
      typeof a.goalAchieved === "boolean" || 
      a.goalAchieved === "true" || 
      a.goalAchieved === "false";

    return steps > 0 && cals > 0 && mins > 0 && isGoalValid;
  });

  // "must use .reduce()" for computing the goal totals
  // Calculate total, achieved, and not achieved strictly via reduce.
  const stats = validActivities.reduce(
    (acc, curr) => {
      acc.total += 1;
      if (curr.goalAchieved === true) {
        acc.achieved += 1;
      } else if (curr.goalAchieved === false) {
        acc.notAchieved += 1;
      }
      return acc;
    },
    { total: 0, achieved: 0, notAchieved: 0 }
  );

  const totalActivities = stats.total;
  const goalAchievedCount = stats.achieved;
  const goalNotAchievedCount = stats.notAchieved;

  // Question 5 global state requirement: 
  useEffect(() => {
    window.appState = {
      totalActivities,
      goalAchievedCount,
      goalNotAchievedCount,
    };
  }, [totalActivities, goalAchievedCount, goalNotAchievedCount]);

  if (totalActivities === 0) {
    return (
      <div className="page-container" data-testid="stats-page">
        <div className="empty-state">
          <p>No valid activities to compute stats.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" data-testid="stats-page">
      <div className="page-header">
        <h1 className="page-title">Activities Analytics Dashboard</h1>
      </div>

      <div className="stats-primary-row">
        <div className="stat-highlight-card total">
          <span className="stat-hl-label">Total Valid Activities</span>
          {/* Output exactly as requested by Question 5 */}
          <div data-testid="total-activities" className="stat-hl-value">
            {totalActivities}
          </div>
        </div>

        <div className="stat-highlight-card achieved">
          <span className="stat-hl-label">Goals Achieved</span>
          <div data-testid="goal-achieved" className="stat-hl-value">
            {goalAchievedCount}
          </div>
        </div>

        <div className="stat-highlight-card not-achieved">
          <span className="stat-hl-label">Goals Not Met</span>
          <div data-testid="goal-not-achieved" className="stat-hl-value">
            {goalNotAchievedCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
