import React, { useState } from "react";
import { useActivity } from "../context/ActivityContext";
import ActivityList from "../components/ActivityList";

const FilterPage = () => {
  const { activities } = useActivity();
  const [inputValue, setInputValue] = useState("");
  const [appliedThreshold, setAppliedThreshold] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFilter = () => {
    // Empty input validation
    if (inputValue.trim() === "") {
      setErrorMsg("Error: Input cannot be empty");
      return;
    }

    const numValue = Number(inputValue);

    // Invalid input validation
    if (isNaN(numValue) || numValue < 0) {
      setErrorMsg("Error: Invalid input. Please enter a positive number.");
      return;
    }

    // Clear errors and apply the valid threshold
    setErrorMsg("");
    setAppliedThreshold(numValue);
  };

  // Interdependency constraint: Base Valid Activities (Question 1 Rules)
  // Must use .filter() and Must not refetch data
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

  // Dynamic filter: steps >= input value
  const filteredActivities = validActivities.filter(
    (activity) => activity.steps >= appliedThreshold
  );

  return (
    <div className="page-container" data-testid="filter-page">
      <div className="page-header">
        <h1 className="page-title">Filter Activities</h1>
        <p className="page-subtitle">Filter valid activities by minimum steps</p>
      </div>

      <div className="filter-controls">
        <input
          type="number"
          placeholder="Enter minimum steps..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          data-testid="filter-input"
          className="filter-select"
          style={{ width: "200px" }}
        />
        <button onClick={handleFilter} className="filter-btn">
          Apply Filter
        </button>
      </div>

      {errorMsg && (
        <div style={{ color: "red", fontWeight: "bold", marginBottom: "1rem" }}>
          {errorMsg}
        </div>
      )}

      <div className="filter-results-label">
        Showing <strong>{filteredActivities.length}</strong> activity matches for {">="} {appliedThreshold} steps.
      </div>

      <ActivityList activitiesToShow={filteredActivities} />
    </div>
  );
};

export default FilterPage;
