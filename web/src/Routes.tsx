// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import {Router, Route, Set} from '@redwoodjs/router'
import BaseAppLayout from "src/layouts/BaseAppLayout/BaseAppLayout";
import GlassMorphismBgLayout from "src/layouts/GlassMorphismBgLayout/GlassMorphismBgLayout";

const Routes = () => {
  return (
    <Router>
      <Set wrap={[GlassMorphismBgLayout]}>
        <Set wrap={[BaseAppLayout]}>
          <Route path="/configure" page={ConfigurePage} name="configure" />
          <Route path="/monitor" page={MonitorPage} name="monitor" />
        </Set>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
