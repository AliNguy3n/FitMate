import { useState } from "react";
import LinkCard from "../components/products/LinkCard";
import WorkoutCard from "../components/WorkoutCard";
import MainLayout from "../layouts/MainLayout";

function WorkoutPage() {
  const workout = {
    image: "https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg",
    type: "workout",
    link: "/workout/1",
  };

  const allLevels = ["Beginner", "Intermediate", "Advanced"];
  const allParts = ["Arms", "Legs", "Core", "Full Body"];

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPart, setSelectedPart] = useState("");
  return (
    <MainLayout>
      <section className="mt-2 bg-rose-400 py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg text-white font-semibold">
            Welcome to the Workout Page! Here you can find various workout plans
            and routines to help you achieve your fitness goals.
          </p>
        </div>
      </section>
      {/* <!-- Search box --> */}
      <div className="flex flex-col justify-between mt-4 space-y-5 md:flex-row md:space-y-0">
        {/* <!-- Input and SVG Container --> */}
        <div className="flex justify-between border-b">
          <input
            type="text"
            className="ml-6 border-none md:w-80 placeholder:font-thin focus:outline-none"
            placeholder="Search"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 text-gray-300 duration-200 hover:scale-110"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
        </div>
      </div>
      {/* Workout with Levels */}
      <section id="suggestions" className="mt-4">
        <div className="text-3xl font-bold text-center text-sky-700">
          Suggestion Workouts based on your BMIs
        </div>

        <div className="grid grid-cols-3 mt-8 gap-10">
          <LinkCard
            image={workout.image}
            type={workout.type}
            link={workout.link}
          />
          <LinkCard
            image={workout.image}
            type={workout.type}
            link={workout.link}
          />
          <LinkCard
            image={workout.image}
            type={workout.type}
            link={workout.link}
          />
          <LinkCard
            image={workout.image}
            type={workout.type}
            link={workout.link}
          />
        </div>
      </section>
      {/* Workout with Levels */}
      <section id="workout-cards" className="mt-4">
        <div className="text-3xl font-bold text-center text-sky-700">
          Workouts
        </div>
        <div className="text-right">Sort</div>
        <div className="flex justify-between items-start mt-4 space-x-4">
          <div className="flex flex-col justify-start">
            <div className="text-2xl font-bold text-sky-700">Filter By</div>
            {/* Filter Options by Levels */}
            <div className="flex flex-col space-y-2 mb-4">
              {allLevels.map((level) => (
                <button
                  key={level}
                  className={`bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 ${
                    selectedLevel === level ? "bg-blue-400 text-white" : ""
                  }`}
                  onClick={() =>
                    setSelectedLevel(level === selectedLevel ? "" : level)
                  }
                  type="button"
                >
                  {level}
                </button>
              ))}
            </div>
            {/* Filter Options by Body Parts */}
            <div className="flex flex-col space-y-2">
              {allParts.map((part) => (
                <button
                  key={part}
                  className={`bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 ${
                    selectedPart === part ? "bg-blue-400 text-white" : ""
                  }`}
                  onClick={() =>
                    setSelectedPart(part === selectedPart ? "" : part)
                  }
                  type="button"
                >
                  {part}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 mt-8">
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default WorkoutPage;
