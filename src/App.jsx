import React from "react";
import TaskFormComp from "./components/TaskFormComp";
import TaskListComp from "./components/TaskListComp";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col p-10 min-h-screen w-full bg-bg-primary-hd text-white overflow-y-auto">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full">
              <TaskListComp />
            </div>
          }
        />
        <Route path="/create-task" element={<TaskFormComp />} />
        <Route path="/edit-task/:id" element={<TaskFormComp />} />
      </Routes>
    </div>
  );
};

export default App;
