export const AdminNavbar = ({ activeSection }) => {
  return `
            <>
              <div class="logo">
                  <span class="ml-3 simple-text logo-mini">
                      EZ &nbsp &nbsp Edurizon
                  </span>
                  
              </div>
              <div class="sidebar-wrapper" id="sidebar-wrapper">
                  <ul class="nav">
                      <li ${activeSection === "MyCourse" && 'class="active"'}>
                          <a href="./myCoursesPage.html">
                              <i class="fas fa-book"></i>
                              <p>My Courses</p>
                          </a>
                      </li>
             
                                       </ul>
              </div>
            </>
    `;
};
