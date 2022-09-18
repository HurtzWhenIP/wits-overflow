
import '../styles/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage'
import Login from './Login'
import Siginup from './Signup'
import QuestionPage from './QuestionPage';
import Profile from './Profile'
import Notfound from './Notfound'
import Verifyplayer from './Verifyplayer';
import useStore from '../hooks/useStore';
import {Navbar,NavItem,DropdownMenu} from '../components/Navbar';
import {FcHome,FcExpand} from 'react-icons/fc';


function App() {

  //Pull useriobj from store
  const userObj = useStore(state => state.userObj);
  const question = useStore(state => state.question);

  return (
    <Router>
        <Navbar>
          <NavItem icon={<FcHome size={100}/>} path={"/homepage"} clickable={false}/>
          <NavItem icon={<FcExpand size={100}/>} path="#" clickable={true}>
            <DropdownMenu/>
          </NavItem>
        </Navbar>
        <Switch>
            <Route path="/" exact>
              {userObj ? <Homepage/> : <Verifyplayer/>}
            </Route>
            <Route path="/homepage">
            {userObj ? <Homepage/> : <Verifyplayer/>}
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
            <Route path='/question'>
              {(question === null) ? <Homepage/> : <QuestionPage/>}
            </Route>
            <Route component={Notfound}/>
          </Switch>
      </Router>

  );
}

export default App;
