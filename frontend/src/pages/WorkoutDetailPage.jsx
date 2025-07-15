import MainLayout from "../layouts/MainLayout";

function WorkoutDetailPage() {
  return (
    <MainLayout>
      <div className="flex flex-col justify-between items-start space-x-16 p-6 my-2 bg-white shadow-2xl rounded-lg md:flex-row">
        <div className="flex flex-col justify-evenly items-center space-y-2">
          <div className="text-3xl font-bold text-center mb-6">
            Workout Title
          </div>
          <div className="text-gray-700 mb-4">
            Description of the workout goes here.
          </div>
          <img
            className="h-50 rounded-lg mb-4"
            src="https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg"
            alt=""
          />
          <div className="flex flex-col justify-center mb-6">
            <div className="flex space-x-4 justify-between items-center border-2 border-gray-300 rounded-lg p-4">
              <div className="flex flex-col justify-center mb-6 w-full">
                <table className="w-full border-2 border-gray-300 rounded-lg overflow-hidden">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold text-gray-600 bg-gray-50">
                        Views
                      </td>
                      <td className="px-4 py-3">105 views</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold text-gray-600 bg-gray-50">
                        Category
                      </td>
                      <td className="px-4 py-3">Arms</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold text-gray-600 bg-gray-50">
                        Level
                      </td>
                      <td className="px-4 py-3">Beginner</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold text-gray-600 bg-gray-50">
                        Duration
                      </td>
                      <td className="px-4 py-3">10:53</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold text-gray-600 bg-gray-50">
                        Uploaded by
                      </td>
                      <td className="px-4 py-3">@duynguyen17</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-600 bg-gray-50">
                        Calories
                      </td>
                      <td className="px-4 py-3">1120 kl</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Add to Progress
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* List of Exercises */}
        <div className="flex flex-col justify-center items-center space-y-8">
          <div className="p-4 bg-amber-200 text-3xl text-sky-600 font-semibold mb-4 border-2 border-white rounded-2xl">
            Exercises (3 task)
          </div>
          {/* Exercise 01 */}
          <div className="flex justify-between space-x-6 text-blue-50">
            {/* Decoration */}
            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-sky-800 pointer-events-none"></div>
              </div>
              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-sky-500 shadow"></div>
            </div>
            {/* Video */}
            <div className="ml-2 flex flex-col justify-center">
              <div className="rounded-lg shadow-lg bg-white max-w-4xl">
                <div className="flex flex-col md:flex-row">
                  {/* Video Section */}
                  <div className="md:w-1/2">
                    <video
                      width="320"
                      height="240"
                      controls
                      className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    >
                      <source
                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                        type="video/mp4"
                      />
                      <source src="movie.ogg" type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Info Section */}
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <h5 className="text-rose-900 text-xl font-medium mb-3">
                      Exercise Title
                    </h5>
                    <p className="text-rose-700 text-base mb-4">
                      This is a brief description of the exercise. It explains
                      the purpose and benefits of the exercise.
                    </p>

                    {/* Additional exercise details */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          Duration:
                        </span>
                        <span className="text-sm text-gray-800">2:30</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          Difficulty:
                        </span>
                        <span className="text-sm text-gray-800">Beginner</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          Calories:
                        </span>
                        <span className="text-sm text-gray-800">50 kcal</span>
                      </div>
                    </div>

                    {/* Action button */}
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise 01 */}
          <div className="flex justify-between space-x-6 text-blue-50">
            {/* Decoration */}
            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-sky-800 pointer-events-none"></div>
              </div>
              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-sky-500 shadow"></div>
            </div>
            {/* Video */}
            <div className="ml-2 flex flex-col justify-center">
              <div className="rounded-lg shadow-lg bg-white max-w-4xl">
                <div className="flex flex-col md:flex-row">
                  {/* Video Section */}
                  <div className="md:w-1/2">
                    <video
                      width="320"
                      height="240"
                      controls
                      className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    >
                      <source
                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                        type="video/mp4"
                      />
                      <source src="movie.ogg" type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Info Section */}
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <h5 className="text-rose-900 text-xl font-medium mb-3">
                      Exercise Title
                    </h5>
                    <p className="text-rose-700 text-base mb-4">
                      This is a brief description of the exercise. It explains
                      the purpose and benefits of the exercise.
                    </p>

                    {/* Additional exercise details */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          Duration:
                        </span>
                        <span className="text-sm text-gray-800">2:30</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          Difficulty:
                        </span>
                        <span className="text-sm text-gray-800">Beginner</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          Calories:
                        </span>
                        <span className="text-sm text-gray-800">50 kcal</span>
                      </div>
                    </div>

                    {/* Action button */}
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Exercise 01 */}
          <div className="flex justify-between space-x-6 text-blue-50">
            {/* Decoration */}
            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-sky-800 pointer-events-none"></div>
              </div>
              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-sky-500 shadow"></div>
            </div>
            {/* Video */}
            <div className="ml-2 flex flex-col justify-center">
              <div className="rounded-lg shadow-lg bg-white max-w-4xl">
                <div className="flex flex-col md:flex-row">
                  {/* Video Section */}
                  <div className="md:w-1/2">
                    <video
                      width="320"
                      height="240"
                      controls
                      className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    >
                      <source
                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                        type="video/mp4"
                      />
                      <source src="movie.ogg" type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Info Section */}
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <h5 className="text-rose-900 text-xl font-medium mb-3">
                      Exercise Title
                    </h5>
                    <p className="text-rose-700 text-base mb-4">
                      This is a brief description of the exercise. It explains
                      the purpose and benefits of the exercise.
                    </p>

                    {/* Additional exercise details */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          Duration:
                        </span>
                        <span className="text-sm text-gray-800">2:30</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          Difficulty:
                        </span>
                        <span className="text-sm text-gray-800">Beginner</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          Calories:
                        </span>
                        <span className="text-sm text-gray-800">50 kcal</span>
                      </div>
                    </div>

                    {/* Action button */}
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default WorkoutDetailPage;
