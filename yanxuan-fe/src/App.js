import './App.css';
import Router from './router/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
const reducer = (state = {ifShow:false}, action) => {
  switch (action.type) {
    case 'setIfShow':
      return { ifShow: !state.ifShow}
    default:
      return state
  }
}
const store = createStore(reducer);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
