import React from "react";
import { Link } from "react-router-dom";

function StudentNav() {
  return (
    <div className="flex flex-col">
      <header>
        <div className="flex justify-center p-1 bg-slate-300 mt-5 mx-auto rounded-lg">
          <ul className="flex gap-12 font-bold">
            <Link to="/UserHomePage">
              <li className="hover:bg-slate-400 text-xl h-12 flex items-center rounded-lg p-2">
                Home
              </li>
            </Link>
            <Link to="/AddStudent">
              <li className="hover:bg-slate-400 text-xl h-12 flex items-center rounded-lg p-2">
                Add Student
              </li>
            </Link>
            <Link to="/CategoryDetails">
              <li className="hover:bg-slate-400 text-xl h-12 flex items-center rounded-lg p-2">
                Students Details
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default StudentNav;