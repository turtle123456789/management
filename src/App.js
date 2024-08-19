import './App.css';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

function App() {
  return (
    <div className="App bg-gray-800 h-full">
      <Routes>
        {routes.map((route,index) =>(
          <Route key={`route-${index}`} path={route.path} element={route.element}>
            {
              route.children.map((data,index) => (
                <Route key={`route-${index.path}`} path={data.path} element={data.element} />
              ))
            }
          </Route>
        )
        )}
      </Routes>
    </div>
  );
}

export default App;
