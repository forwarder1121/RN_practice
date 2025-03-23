import { initializeApp } from "firebase/app";
import { uploadBytesResumable } from "firebase/storage";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import config from "../../firebase.json";
import * as ImageManipulator from "expo-image-manipulator";

// 1. Firebase 앱 초기화
const app = initializeApp(config);

// 2. Auth, Storage 인스턴스
const Auth = getAuth(app);
const Storage = getStorage(app);

// 3. 로그인 함수
export const login = async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(Auth, email, password);
    return user;
};

const uploadImage = async (uri, uid) => {
    console.log("🧪 이미지 업로드 시작:", uri);

    // 🔧 이미지 품질 줄이고, 포맷 JPG로 변경
    const manipulated = await ImageManipulator.manipulateAsync(uri, [], {
        compress: 0.2, // 20% 품질
        format: ImageManipulator.SaveFormat.JPEG,
    });

    console.log("🎨 이미지 품질 조정 완료:", manipulated.uri);

    const response = await fetch(manipulated.uri);
    const blob = await response.blob();
    console.log("📦 Blob(fetch) 변환 성공");
    console.log("📏 Blob 크기:", blob.size);

    const storageRef = ref(Storage, `profile/${uid}/photo.jpg`);
    console.log("📂 업로드할 Storage 경로:", storageRef.fullPath);

    const uploadTask = uploadBytesResumable(storageRef, blob, {
        contentType: "image/jpeg",
    });

    await new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`📶 업로드 진행률: ${progress.toFixed(2)}%`);
            },
            (error) => {
                console.log("🚨 업로드 중 오류 발생:", error.message);
                reject(error);
            },
            () => {
                console.log("✅ 업로드 완료");
                resolve();
            }
        );
    });

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    console.log("🔗 다운로드 URL:", downloadURL);
    return downloadURL;
};

// 5. 회원가입 함수
export const signup = async ({ email, password, name, photoUrl }) => {
    console.log("📩 회원가입 시작");
    const { user } = await createUserWithEmailAndPassword(
        Auth,
        email,
        password
    );
    console.log("✅ 유저 생성:", user.uid);

    const storageUrl = photoUrl.startsWith("https")
        ? photoUrl
        : await uploadImage(photoUrl, user.uid);

    await updateProfile(user, {
        displayName: name,
        photoURL: storageUrl,
    });

    console.log("📝 프로필 업데이트 완료:", name, storageUrl);
    return user;
};
