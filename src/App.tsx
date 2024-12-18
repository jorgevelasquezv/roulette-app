import './App.css'
import { WheelProvider } from "./context/wheelProvider";
import WheelPage from "./pages/WheelPage";


function App() {
  return (
    <WheelProvider>
      <WheelPage/>
    </WheelProvider>
  );
}

export default App;
