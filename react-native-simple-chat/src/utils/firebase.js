import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import config from "../../firebase.json";

// Firebase 앱 초기화
const app = initializeApp(config);

// Firebase Auth 인스턴스 가져오기
const Auth = getAuth(app);

export const login = async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
        Auth,
        email,
        password
    );
    return userCredential.user; // ✅ userCredential 객체에서 user 추출
};
