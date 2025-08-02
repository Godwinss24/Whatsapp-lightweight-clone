import type { Firestore } from 'firebase/firestore';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import type { User } from '~/interfaces/user';

export const useFirebase = () => {
	const config = useRuntimeConfig();

	const getFirebaseConfig = () => {
		return {
			apiKey: config.public.firebaseApiKey,
			authDomain: config.public.firebaseAuthDomain,
			projectId: config.public.firebaseProjectId,
			storageBucket: config.public.firebaseStorageBucket,
			messagingSenderId: config.public.firebaseMessagingSenderId,
			appId: config.public.firebaseAppId,
			measurementId: config.public.firebaseMeasurementId,
		};
	};
  
	const createUser = (db: Firestore, data: User) => {
		const reference = collection(db, 'users');

		return addDoc(reference,data);
	};

	const findUserByEmail = (db:Firestore, email: string) => {
		const userQuery = query(
			collection(db, 'users'),
			where('email', '==', email)
		);

		return getDocs(userQuery);
	};

	return {
		getFirebaseConfig,
		createUser,
		findUserByEmail
	};
};
