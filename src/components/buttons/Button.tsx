import { ReactNode } from 'react';
import { BtnLoader } from '../Loader/Loader';
// import styles from "./Button.module.css";

type ButtonProps = {
  btnText: string;
  onClick: (e: KeyboardEvent) => any;
  isModal: boolean;
  isDisabled: boolean;
  loading: boolean;
  icon?: ReactNode | null;
};

const Button = ({ btnText, onClick, isDisabled, isModal, icon, loading }: ButtonProps) => {
  return (
    <button onClick={(e: any) => (!loading ? onClick(e) : null)} disabled={isDisabled} className='btn btn-primary'>
      {!loading ? (
        <>
          {icon && icon} {btnText}
        </>
      ) : (
        <BtnLoader />
      )}
    </button>
  );
};

export default Button;
