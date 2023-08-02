import EventPage from "./components/EventPage";
import GlobalEvents from "./components/GlobalEvents";
import NewEventForm from "./components/NewEventForm";
import UserEvents from "./components/UserEvent";


function App() {
  return (
    <div className="App">
       <EventPage />
       <GlobalEvents />
       <UserEvents />
       <NewEventForm />
    </div>
  );
}

export default App;

