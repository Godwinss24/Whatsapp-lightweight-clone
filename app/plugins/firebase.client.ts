import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin (() => {
	const { getFirebaseConfig } = useFirebase();

	const firebaseConfig = getFirebaseConfig();

	const app = initializeApp(firebaseConfig);

	const db = getFirestore(app);

	return {
		provide: {
			app,db
		}
	};
});