import { Children, ReactElement, ReactNode } from "react";

interface ShowProps {
  children: ReactNode;
}

interface WhenElseProps {
  isTrue?: boolean;
  render?: boolean;
  children: ReactNode;
}

export const Show = ({ children }: ShowProps) => {
  let when: ReactElement | null = null;
  let otherwise = null;

  Children.forEach(children, (child) => {
    const elementChild = child as ReactElement;
    if (elementChild.props.isTrue === undefined) {
      otherwise = children;
    } else if (!when && elementChild.props.isTrue === true) {
      when = elementChild;
    }
  });

  return when || otherwise;
};

Show.When = ({ isTrue, children }: WhenElseProps) => isTrue && children;
Show.Else = ({ render, children }: WhenElseProps) => render || children;
