import React from "react";
import "./ClassTimetable.css";

const ClassTimetable = () => {
  return (
    <div>
      <section class="class-timetable-section spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="section-title">
                <div className="blur plans-blur-1"></div>
                <div className="blur plans-blur-2"></div>
                <span>Find Your Time</span>
                <h2>Find Your Time</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="class-timetable">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Monday</th>
                      <th>Tuesday</th>
                      <th>Wednesday</th>
                      <th>Thursday</th>
                      <th>Friday</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="class-time">8.00am - 10.00am</td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="workout"
                      >
                        <h5>Strength Training</h5>
                        <span>David Johnson</span>
                      </td>
                      <td class="blank-td"></td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="workout"
                      >
                        <h5>Strength Training</h5>
                        <span>David Johnson</span>
                      </td>
                      <td class="blank-td"></td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="workout"
                      >
                        <h5>Strength Training</h5>
                        <span>David Johnson</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="class-time">10.00am - 12.00am</td>
                      <td class="blank-td"></td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="fitness"
                      >
                        <h5>Cardio</h5>
                        <span>Serena Thompson</span>
                      </td>
                      <td class="blank-td"></td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="motivation"
                      >
                        <h5>Cardio</h5>
                        <span>Serena Thompson</span>
                      </td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="motivation"
                      >
                        <h5>Cardio</h5>
                        <span>Serena Thompson</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="class-time">5.00pm - 7.00pm</td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="fitness"
                      >
                        <h5>Fat Burning</h5>
                        <span>Michael Thompson</span>
                      </td>
                      <td class="blank-td"></td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="fitness"
                      >
                        <h5>Fat Burning</h5>
                        <span>Michael Thompson</span>
                      </td>
                      <td class="blank-td"></td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="fitness"
                      >
                        <h5>Fat Burning</h5>
                        <span>Michael Thompson</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="class-time">7.00pm - 9.00pm</td>
                      <td class="blank-td"></td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="fitness"
                      >
                        <h5>Aerobics</h5>
                        <span>Emily Rodriguez</span>
                      </td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="motivation"
                      >
                        <h5>Aerobics</h5>
                        <span>Emily Rodriguez</span>
                      </td>
                      <td
                        class="dark-bg hover-bg ts-meta"
                        data-tsmeta="motivation"
                      >
                        <h5>Aerobics</h5>
                        <span>Emily Rodriguez</span>
                      </td>
                      <td class="blank-td"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassTimetable;
