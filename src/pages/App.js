
import '../styles/App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Homepage from './Homepage'
import Login from './Login'
import Siginup from './Signup'
import Questions from '../components/Questions'
import Profile from './Profile'
import Notfound from './Notfound'
import Verifyplayer from './Verifyplayer';
import useStore from '../hooks/useStore';
import {Navbar,NavItem,DropdownMenu} from '../components/Navbar';
import {FcHome,FcExpand} from 'react-icons/fc';
import { useHistory } from 'react-router-dom';


/*
TODO LOGIK TO CHECK IF USER IS LOGGED IN => ternary operator based on user
Object in state*/

function App() {

  //Pull useriobj from store
  const userObj = useStore(state => state.userObj);

  //history hook for redirection
  const history = useHistory();

  const goHome = () => {
    history.push('/homepage');
  }

  return (
    <>
      <Router>
        <Navbar>
          <NavItem icon={<FcHome size={100} onClick={() => {goHome()}}/>}/>
          <NavItem icon={<FcExpand size={100}/>} clickable={true}>
            <DropdownMenu/>
          </NavItem>
        </Navbar>
        <Switch>
            <Route path="/" exact>
              {userObj ? <Homepage/> : <Verifyplayer/>}
            </Route>
            <Route path="/homepage">
            {/* {userObj ? <Homepage/> : <Verifyplayer/>} */}
            <Homepage/>
            </Route>
            <Route path='/login'>
              <Login/>
            </Route>
            <Route path='/signup'>
              <Siginup/>
            </Route>
            <Route path='/profile'>
              {userObj ? <Profile/> : <Verifyplayer/>}
            </Route>
            <Route path='/questions'>
            {userObj ? <Questions/> : <Verifyplayer/>}
            </Route>
            <Route component={Notfound}/>
          </Switch>
      </Router>
    </>
  );
}

export default App;
