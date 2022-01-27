/* eslint import/no-extraneous-dependencies: off*/
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
    deleteUser,
    getAuth,
    updatePassword,
    sendPasswordResetEmail,
    onAuthStateChanged as firebaseOnAuthStateChanged,
    signOut as firebaseSignOut
} from 'firebase/auth';
import config from './firebaseServiceConfig';

export class FirebaseService {
    init(success) {
        try {
            if (Object.entries(config).length === 0 && config.constructor === Object) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn(
                        'Missing Firebase Configuration at src/services/firebaseService/firebaseServiceConfig.js'
                    );
                }
                success(false);
                return;
            }

            const app = initializeApp(config);
            this.auth = getAuth();
            this.db = getFirestore(app);
            this.storage = getStorage(app);
            success(true);
        } catch (error) {
            console.error(error);
            success(false);
            return;
        }
    }

    //* ==========================
    //* AUTH
    //* ==========================

    // ! USER CRUD

    getUserData = async () => {
        try {
            const { uid } = this.auth.currentUser;
            const user = await getDoc(doc(this.db, 'users', uid));
            if (user.exists()) {
                return user.data();
            }
            throw new Error({ message: 'No such document' });
        } catch (error) {
            throw new Error(error);
        }
    };

    updateUserData = async (user) => {
        try {
            const userId = user.uid || user.data?.uid;
            await setDoc(doc(this.db, 'users', userId), user, { merge: true });
        } catch (error) {
            throw new Error(error);
        }
    };

    changePassword = async ({ newPassword }) => {
        try {
            const user = this.auth.currentUser;
            await updatePassword(user, newPassword);
        } catch (error) {
            throw new Error(error);
        }
    };

    forgotPassword = async ({ email }) => {
        try {
            await sendPasswordResetEmail(this.auth, email);
        } catch (error) {
            throw new Error(error);
        }
    };

    deleteAccount = async () => {
        try {
            const user = this.auth.currentUser;
            await deleteUser(user);
        } catch (error) {
            throw new Error(error);
        }
    };

    onAuthStateChanged = (callback) => {
        if (!this.auth) {
            return;
        }
        firebaseOnAuthStateChanged(this.auth, callback);
    };

    signOut = async () => {
        if (!this.auth) {
            return;
        }
        return await firebaseSignOut(this.auth);
    };

    //* ==========================
    //* UPLOADS
    //* ==========================

    uploadPicture = (imgToUpload) => {
        return new Promise((resolve, reject) => {
            const imageRef = ref(this.storage, `images/${imgToUpload.name}`);

            uploadBytesResumable(imageRef, imgToUpload, {
                contentType: imgToUpload.type
            })
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    uploadFile = (fileToUpload) => {
        return new Promise((resolve, reject) => {
            const fileRef = ref(this.storage, `files/${fileToUpload.name}`);

            uploadBytesResumable(fileRef, fileToUpload, {
                contentType: fileToUpload.type
            })
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
}

const instance = new FirebaseService();

export default instance;
