// @ts-nocheck
import { ReactNode, useState } from "react";
import styled, { keyframes } from "styled-components";
import { SuccessFilled } from "./Icons";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ButtonWithEffect = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: var(--primary-color);
  padding: 0;
  margin: 0;
  opacity: ${(props: any) => props.opacity};
  animation: ${(props: any) => (props.$anim ? props.$anim : fadeIn)} 0.6s
    ease-in-out forwards;
  @media (min-width: 768px) {
    transition: color 200ms ease-in-out;
    cursor: pointer;
    color: var(--secondary-text-color);
  }
  &:hover {
    color: var(--primary-color);
  }
`;

type CopyWithEffectProps = {
  component: ReactNode;
  url: string;
};

const CopyWithEffect = ({ component, url }: CopyWithEffectProps) => {
  const [effect, setEffect] = useState({
    initEffect: false,
    showSuccess: false,
  });

  const handleCopyLink = (e) => {
    e.preventDefault();

    setEffect({
      initEffect: true,
      showSuccess: true,
    });

    window.navigator.clipboard.writeText(url);

    setTimeout(() => {
      setEffect({ initEffect: true, showSuccess: false });
    }, 1500);
  };

  return (
    <ButtonWithEffect
      key={effect.showSuccess}
      onClick={handleCopyLink}
      opacity={!effect.initEffect ? 1 : 0}
      $anim={!effect.initEffect}
      aria-label="Copy button"
    >
      {!effect.showSuccess ? component : <SuccessFilled />}
    </ButtonWithEffect>
  );
};

export default CopyWithEffect;
