import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./nav/HomeStack";
import LoginStack from "./nav/LoginStack";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

export default function App() {
	const [initialising, setInitialising] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [uid, setUid] = useState("");
	useEffect(() => {
		setInitialising(true);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid);
				setIsLoggedIn(true);
				setInitialising(false);
			} else {
				setIsLoggedIn(false);
				setInitialising(false);
			}
		});
	}, [uid]);

	if (initialising) return null;

	return (
		<NavigationContainer>
			{isLoggedIn ? <HomeStack uid={uid} /> : <LoginStack />}
		</NavigationContainer>
	);
}
