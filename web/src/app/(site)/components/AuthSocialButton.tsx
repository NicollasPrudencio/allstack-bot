import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  text: string
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
  text
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
      bg-gray-700 
      hover:bg-gray-600 
      text-white 
      font-bold 
      p-3
      flex flex-row
      justify-center
      gap-2
      items-center

      rounded-full
      max-w-sm
      focus:outline-none 
      focus:shadow-outline-gray

      "
    >
      <Icon size={32}/> <p>{text}</p>
    </button>
  );
};

export default AuthSocialButton;
