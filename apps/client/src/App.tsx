import "./App.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Hero from "./Components/Hero/Hero";

function App() {
	return (
		<div className="App">
			<GoogleOAuthProvider clientId="1013165536691-5b7lk6o6hcd6susbqtvqsqqjlb405u5d.apps.googleusercontent.com">
				<Hero />
			</GoogleOAuthProvider>
		</div>
	);
}

export default App;
