
import '../styles/App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Homepage from './Homepage'
import Login from './Login'
import Siginup from './Signup'
import Questions from './Questions'
import Profile from './Profile'
import Notfound from './Notfound'
import verifyPlayer from './verifyPlayer';

function App() {
  return (
    <Router>
      <>


        <Switch>
          <Route path="/" exact>
            <Homepage/>
          </Route>
          <Route path="/homepage">
            <Homepage/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/signup'>
            <Siginup/>
          </Route>
          <Route path='/profile'>
            <Profile/>
          </Route>
          <Route path='/questions'>
            <Questions/>
          </Route>
          <Route path='/error' component={Notfound}/>
          <Route path='/verification' component={verifyPlayer}/>
          
        </Switch>
      </>
    </Router>
  );
}

export default App;
