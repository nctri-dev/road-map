import "./App.css";
import TimerCard from "./components/Timer";
import ToastContainer from "./components/ToastContainer";

function App() {
  return (
    <main className="flex flex-col gap-4 p-4 h-screen">
      <TimerCard />
      <ToastContainer />
    </main>
  );
}

export default App;
