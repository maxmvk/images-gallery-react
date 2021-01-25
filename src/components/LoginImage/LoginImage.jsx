import image from "../../assets/images/surface1.svg"
import { LoginContainer } from "../layouts/LoginContainer";
import styles from "./LoginImage.module.scss";

const LoginImage = () => {
  return (
    <LoginContainer>
      <img src={image} alt="Login" className={styles.image}/>
    </LoginContainer>
  )
}

export default LoginImage;