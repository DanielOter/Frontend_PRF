import { AppContextProvider } from "./context/context.js";
import Navigation from "./Navigation.js";

export default function App() {
    return (
        <AppContextProvider>
            <Navigation />
        </AppContextProvider>
    );
}
