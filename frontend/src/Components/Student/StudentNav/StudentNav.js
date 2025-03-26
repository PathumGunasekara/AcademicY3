import React from "react";
import { Link } from "react-router-dom";

function StudentNav() {
  return (
    <div className="flex flex-col">
      <header>
        <div className="flex justify-center p-1 bg-slate-300 mt-5 mx-auto rounded-lg">
          <div className="flex gap-6 font-bold">
            <Link to="/Home">
              <button className="bg-slate-400 hover:bg-slate-500 text-white text-xl font-semibold py-2 px-4 rounded-lg">
                Back to Home
              </button>
            </Link>
            <Link to="/AddStudent">
              <button className="bg-slate-400 hover:bg-slate-500 text-white text-xl font-semibold py-2 px-4 rounded-lg">
                Add Student
              </button>
            </Link>
            <Link to="/StudentDetails">
              <button className="bg-slate-400 hover:bg-slate-500 text-white text-xl font-semibold py-2 px-4 rounded-lg">
                Students Details
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default StudentNav;
