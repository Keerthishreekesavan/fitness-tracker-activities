import React, { useEffect } from "react";
import { useActivity } from "../context/ActivityContext";

const StatsPage = () => {
  const { activities } = useActivity();

  // --- Computed values using map, filter, reduce (never stored in state) ---

  // Total valid activities
  const totalActivities = activities.length;

  // Goal achieved / not achieved counts using filter()
  const goalAchievedCount = activities.filter((a) => a.goalAchieved === true).length;
  const goalNotAchievedCount = activities.filter((a) => a.goalAchieved === false).length;

  // Total steps using reduce()
  const totalSteps = activities.reduce((acc, a) => acc + a.steps, 0);

  // Total calories using reduce()
  const totalCalories = activities.reduce((acc, a) => acc + a.caloriesBurned, 0);

  // Total workout minutes using reduce()
  const totalMinutes = activities.reduce((acc, a) => acc + a.workoutMinutes, 0);

  // Average steps using map() then reduce()
  const avgSteps =
    totalActivities > 0
      ? activities.map((a) => a.steps).reduce((acc, s) => acc + s, 0) / totalActivities
      : 0;

  // Average calories
  const avgCalories =
    totalActivities > 0
      ? Math.round(totalCalories / totalActivities)
      : 0;

  // Most active day (by steps) using reduce()
  const mostActive =
    totalActivities > 0
      ? activities.reduce((best, a) => (a.steps > best.steps ? a : best), activities[0])
      : null;

  // Expose computed values to window for test evaluation
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
          <span className="empty-icon">📊</span>
          <p>No valid activities to compute stats.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" data-testid="stats-page">
      <div className="page-header">
        <h1 className="page-title">📊 Activity Stats</h1>
        <p className="page-subtitle">Aggregated from all valid activities</p>
      </div>

      {/* ── Primary test-ID counters ── */}
      <div className="stats-primary-row">
        <div className="stat-highlight-card total">
          <span className="stat-hl-icon">📋</span>
          <span className="stat-hl-value" data-testid="total-activities">
            {totalActivities}
          </span>
          <span className="stat-hl-label">Total Activities</span>
        </div>

        <div className="stat-highlight-card achieved">
          <span className="stat-hl-icon">🏆</span>
          <span className="stat-hl-value" data-testid="goal-achieved">
            {goalAchievedCount}
          </span>
          <span className="stat-hl-label">Goals Achieved</span>
        </div>

        <div className="stat-highlight-card not-achieved">
          <span className="stat-hl-icon">❌</span>
          <span className="stat-hl-value" data-testid="goal-not-achieved">
            {goalNotAchievedCount}
          </span>
          <span className="stat-hl-label">Goals Not Met</span>
        </div>
      </div>

      {/* ── Secondary metrics ── */}
      <div className="stats-grid">
        <div className="stats-card">
          <span className="stats-icon">👟</span>
          <span className="stats-value">{totalSteps.toLocaleString()}</span>
          <span className="stats-label">Total Steps</span>
        </div>
        <div className="stats-card">
          <span className="stats-icon">🔥</span>
          <span className="stats-value">{totalCalories.toLocaleString()}</span>
          <span className="stats-label">Total Calories Burned</span>
        </div>
        <div className="stats-card">
          <span className="stats-icon">⏱️</span>
          <span className="stats-value">{totalMinutes.toLocaleString()}</span>
          <span className="stats-label">Total Workout Minutes</span>
        </div>
        <div className="stats-card">
          <span className="stats-icon">📈</span>
          <span className="stats-value">{Math.round(avgSteps).toLocaleString()}</span>
          <span className="stats-label">Avg Steps/Activity</span>
        </div>
        <div className="stats-card">
          <span className="stats-icon">💡</span>
          <span className="stats-value">{avgCalories.toLocaleString()}</span>
          <span className="stats-label">Avg Calories/Activity</span>
        </div>
        <div className="stats-card">
          <span className="stats-icon">🎯</span>
          <span className="stats-value">
            {totalActivities > 0
              ? ((goalAchievedCount / totalActivities) * 100).toFixed(0)
              : 0}%
          </span>
          <span className="stats-label">Goal Success Rate</span>
        </div>
      </div>

      {/* ── Best performance ── */}
      {mostActive && (
        <div className="best-performance-card">
          <h2>🥇 Best Performance</h2>
          <p className="best-name">{mostActive.name}</p>
          <p className="best-date">
            {new Date(mostActive.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="best-metrics">
            <span>👟 {mostActive.steps.toLocaleString()} steps</span>
            <span>🔥 {mostActive.caloriesBurned} cal</span>
            <span>⏱️ {mostActive.workoutMinutes} min</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
