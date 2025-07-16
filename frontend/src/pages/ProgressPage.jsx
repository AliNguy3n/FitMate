import { useState } from "react";
import MBIChart from "../components/MBIChart";
import Modal from "../components/ui/Modal";
import MainLayout from "../layouts/MainLayout";
import DatePicker from "../components/DatePicker";

function ProgressPage() {
  // handles Your Info Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const formInfo = (
    <div className="p-4">
      {/* List history weight and height with time action */}
      <div>
        <div className="text-lg text-gray-700 p-4 mt-6 mb-2">History</div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Height (m)</th>
              <th className="px-6 py-3">Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">2023-10-01</td>
              <td className="px-6 py-4">1.80</td>
              <td className="px-6 py-4">60.0</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">2023-09-01</td>
              <td className="px-6 py-4">1.79</td>
              <td className="px-6 py-4">59.5</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">2023-08-01</td>
              <td className="px-6 py-4">1.78</td>
              <td className="px-6 py-4">59.0</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Form to update height and weight */}
      <div>
        <div className="mt-4 text-2xl text-center text-sky-800 font-bold mb-4">
          Update New Info
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Height (m)
            </label>
            <input
              type="number"
              step="0.01"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your height"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your weight"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  return (
    <MainLayout>
      {/* Modal for updating user info */}
      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        children={formInfo}
      />

      <section id="mbi">
        <div className="flex justify-evenly space-y-3 md:space-x-4 md:flex-row mt-4 p-2">
          {/* Right Side */}
          <div id="table-right">
            <div className="my-4 p-4 border border-sky-500 shadow rounded-2xl">
              <ul className="list-none text-xl text-gray-700">
                <li>Height: 1.8 m</li>
                <li>Weight: 60 kg</li>
              </ul>
              <button
                onClick={openModal}
                className="mt-1 center rounded-lg bg-blue-500 text-white py-3 px-6 font-sans text-xs font-bold hover:bg-amber-800 hover:text-white"
              >
                Update New
              </button>
            </div>
            <h3 className="p-2 text-2xl text-center text-sky-800 font-bold">
              Your MBIs
            </h3>
            <table className="w-full text-left table-auto min-w-max overflow-scroll text-slate-300 bg-slate-800 shadow-md rounded-lg bg-clip-border">
              <thead>
                <tr>
                  <th className="p-4 border-b border-slate-600 bg-slate-700">
                    <p className="text-sm font-normal leading-none text-slate-300">
                      Type
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-600 bg-slate-700">
                    <p className="text-sm font-normal leading-none text-slate-300">
                      Value
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">
                      Body Fat
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">20.6 %</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">SMM</p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">7.0 Kg</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">ECW</p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">22 L</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">
                      ECW/TBW
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">0.36</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">MBR</p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">1112.2 kl</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">
                      Fat Mass
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">8.2 Kg</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Center */}
          <div id="statistic">
            <div className="p-4 text-center text-4xl text-rose-600 bg-rose-200 rounded-2xl shadow-2xl hover:bg-amber-800 hover:text-white">
              You are <i>overweight</i>
            </div>
            <div>
              <MBIChart />
            </div>
            <div className="m-4 p-2 shadow-2xl">
              <div className="text-2xl text-gray-500 font-sans font-bold p-2">Select Goals You Want:</div>
              <select className="mt-4 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
                 <option value="" selected disabled hidden>Choose here</option>
                <option value="">Muscle Building (recommend)</option>
                <option value="">Flexibility and Mobility</option>
                <option value="">Overall Fitness (recommend)</option>
                <option value="">Recovery and Rehabilitation</option>
              </select>
            </div>
          </div>
          {/* Left Side */}
          <div id="table-left">
            <div className="p-2 text-2xl text-center text-sky-800 font-bold">
              Standard MBIs
            </div>
            <table className="w-full text-left table-auto min-w-max overflow-scroll text-slate-300 bg-slate-800 shadow-md rounded-lg bg-clip-border">
              <thead>
                <tr>
                  <th className="p-4 border-b border-slate-600 bg-slate-700">
                    <p className="text-sm font-normal leading-none text-slate-300">
                      Type
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-600 bg-slate-700">
                    <p className="text-sm font-normal leading-none text-slate-300">
                      Male (%)
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-600 bg-slate-700">
                    <p className="text-sm font-normal leading-none text-slate-300">
                      Female (%)
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">
                      Essential Fat
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">2 - 5%</p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">10 - 13%</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">
                      Athletes
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">6 - 13%</p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">14 - 20%</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">
                      Fitness
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">14 - 17%</p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">21 - 24%</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">
                      Normal
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">18 - 24%</p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">25 - 31%</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">
                      Overweight
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">25 - 30%</p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">32 - 38%</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">
                      Obese
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">31 - 35%</p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">39 - 43%</p>
                  </td>
                </tr>
                <tr className="even:bg-slate-900 hover:bg-slate-700">
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-semibold">
                      Obese II
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">&ge;36%</p>
                  </td>
                  <td className="p-4 border-b border-slate-700">
                    <p className="text-sm text-slate-300">&ge;44%</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <div className="border-t-2 border-sky-400"></div>
      <section id="schedule" className="bg-amber-200 p-4 my-4">
        <div className="my-2">
          <div className="text-center p-3 text-3xl font-bold text-sky-500">Pick up a day to watch your workouts</div>
          <DatePicker />
        </div>
        {/* View selected workouts was using by Day*/}
        <div className="flex justify-center items-center mt-4 mb-2">
          <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Workouts by Day
            </h2>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Workout</th>
                  <th className="px-6 py-3">Duration</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">2023-10-01</td>
                  <td className="px-6 py-4">Up your arms</td>
                  <td className="px-6 py-4">30 minutes</td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 font-semibold">Completed</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">2023-10-02</td>
                  <td className="px-6 py-4">Walking</td>
                  <td className="px-6 py-4">45 minutes</td>
                   <td className="px-6 py-4">
                    <span className="text-red-600 font-semibold">Removed</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">2023-10-03</td>
                  <td className="px-6 py-4">Sleep</td>
                  <td className="px-6 py-4">1 hour</td>
                   <td className="px-6 py-4">
                    <span className="text-yellow-600 font-semibold">Paused</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default ProgressPage;
