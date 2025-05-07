import ForgotPassword from "../../components/Forgotpassword.tsx";

export const Forget_password = () => {
  const handlePasswordRecovery = async (email: string) => {
    // Aquí llamas a tu API real
    console.log("Recuperar contraseña para:", email);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simular retardo
  };

  return <ForgotPassword onSubmitEmail={handlePasswordRecovery} />;
};
