import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import config from "../../firebase.json";

// Firebase 앱 초기화
const app = initializeApp(config);

// Firebase Auth 인스턴스 가져오기
const auth = getAuth(app);

export const login = async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
};

export const signup = async ({ email, password }) => {
    const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    return user;
};
