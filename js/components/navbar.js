export const Navbar = ({ isTeacher, activeSection }) => {
  return `
          <>
            <div class="logo">
                <span class="ml-3 simple-text logo-mini">
                    EZ &nbsp &nbsp Edurizon
                </span>
                
            </div>
            <div class="sidebar-wrapper" id="sidebar-wrapper">
                <ul class="nav">
                   
                    ${
                      isTeacher
                        ? `<li ${
                            activeSection === "MyCourse" && 'class="active"'
                          }>
                          <a href="./teacherCourse.html">
                              <i class="fas fa-book"></i>
                              <p>My Courses</p>
                          </a>
                      </li>`
                        : ""
                    }
                    ${
                      !isTeacher
                        ? `<li ${
                            activeSection === "MyCourse" && 'class="active"'
                          }>
                          <a href="./studentCourse.html">
                              <i class="fas fa-book"></i>
                              <p>My Courses</p>
                          </a>
                      </li>`
                        : ""
                    }
                    ${
                      isTeacher
                        ? `<li ${
                            activeSection === "Assignments" && 'class="active"'
                          }>
                          <a href="./postAssignmentPage.html">
                              <i class="fas fa-edit"></i>
                              <p>Post assignments</p>
                          </a>
                      </li>`
                        : ""
                    }
                    ${
                      !isTeacher
                        ? `<li ${
                            activeSection === "Submit assignment" &&
                            'class="active"'
                          }>
                          <a href="./submitAssignmentPage.html">
                              <i class="fas fa-edit"></i>
                              <p>Submit assignments</p>
                          </a>
                      </li>`
                        : ""
                    }
                    ${
                      isTeacher
                        ? `<li ${
                            activeSection === "Add course" && 'class="active"'
                          }>
                          <a href="./addCoursepage.html">
                              <i class="fas fa-plus"></i>
                              <p>Create classeroom</p>
                          </a>
                      </li>`
                        : ""
                    }
                      ${
                        !isTeacher
                          ? `<li ${
                              activeSection === "Assignments" &&
                              'class="active"'
                            }>
                          <a href="./assignmentsPage.html">
                              <i class="fas fa-clipboard"></i>
                              <p>My Assignments</p>
                          </a>
                      </li>`
                          : ""
                      }
                    ${
                      isTeacher
                        ? `<li ${
                            activeSection === "Grades" && 'class="active"'
                          }>
                              <a href="./gradeAssignmentsPage.html">
                                  <i class="fas fa-poll"></i>
                                  <p>Grade Assignments</p>
                              </a>
                          </li>`
                        : ""
                    }
                    ${
                      isTeacher
                        ? `<li ${
                            activeSection === "PostAnnouncement" &&
                            'class="active"'
                          }>
                            <a href="./announcementsPage.html">
                                <i class="fas fa-question"></i>
                                <p>Post announcement</p>
                            </a>
                        </li>`
                        : ""
                    }
                    ${
                      !isTeacher
                        ? `<li ${
                            activeSection === "Grades" && 'class="active"'
                          }>
                        <a href="./viewGradesPage.html">
                          <i class="fas fa-poll"></i>
                            <p>View Grades</p>
                        </a>
                    </li>`
                        : ""
                    }
                    ${
                      !isTeacher
                        ? `<li ${
                            activeSection === "StudentForum" && 'class="active"'
                          }>
                          <a href="./studentForumPage.html">
                              <i class="fas fa-question"></i>
                              <p>Student Forum</p>
                          </a>
                      </li>`
                        : ""
                    }
                    ${
                      isTeacher
                        ? `<li ${
                            activeSection === "OfficeHours" && 'class="active"'
                          }>
                              <a href="./officeHoursTeacherPage.html">
                                  <i class="fas fa-handshake"></i>
                                  <p>Office Hours</p>
                              </a>
                          </li>`
                        : ""
                    }
                      ${
                        !isTeacher
                          ? `<li ${
                              activeSection === "OfficeHoursStudent" &&
                              'class="active"'
                            }>
                              <a href="./officeHoursPage.html">
                                  <i class="fas fa-handshake"></i>
                                  <p>Office Hours</p>
                              </a>
                          </li>`
                          : ""
                      }
                    ${
                      isTeacher
                        ? `<li ${
                            activeSection === "OfficeHours" && 'class="active"'
                          }>
                              <a href="./addStudent.html">
                                  <i class="fas fa-plus"></i>
                                  <p>Add Student</p>
                              </a>
                          </li>`
                        : ""
                    }
                      ${
                        !isTeacher
                          ? `<li ${
                              activeSection === "JoinClassroom" &&
                              'class="active"'
                            }>
                              <a href="./joinClass.html">
                                  <i class="fas fa-plus"></i>
                                  <p>Join classroom</p>
                              </a>
                          </li>`
                          : ""
                      }
                    ${
                      isTeacher
                        ? `<li ${
                            activeSection === "Students" && 'class="active"'
                          }>
                              <a href="./enrolledStudents.html">
                                  <i class="fas fa-male"></i>
                                  <p>Students</p>
                              </a>
                          </li>`
                        : ""
                    }
                     
                </ul>
            </div>
          </>
  `;
};
