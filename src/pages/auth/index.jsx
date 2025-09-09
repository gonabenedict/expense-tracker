import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate} from "react-router-dom"; 
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const Auth = () => {
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();

    const SignInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilephoto: results.user.photoURL,
                isAuth: true,
            }
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("/expense-tracker");
        } catch (error) {
            console.error("Authentication error:", error);
            if (error.code === 'auth/popup-blocked') {
                alert('Popup was blocked by browser. Please allow popups for this site and try again.');
            } else if (error.code === 'auth/cancelled-popup-request') {
                alert('Sign-in was cancelled. Please try again.');
            } else {
                alert('Authentication failed. Please try again.');
            }
        }
    };

    if (isAuth) {
        return <Navigate to="/expense-tracker" />;
    }
    
    return (
        <div className="login-page">
            <p>
                Sign in with google to continue
            </p>
            <button className="login-with-google-btn" onClick={SignInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    );
};