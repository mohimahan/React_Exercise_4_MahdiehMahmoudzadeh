import StudentList from './components/StudentList'
import CourseList from './components/CourseList'
import ProfessorList from "./components/ProfessorList";
import SelectedCourses from "./components/SelectedCourses";
import { Provider } from 'react-redux'
import { store } from './app/store'


function App() {
  
  return (
    <Provider store={store}>
      <StudentList />
      <CourseList />
      <ProfessorList />
      <SelectedCourses />
    </Provider>
  );
}

export default App;
