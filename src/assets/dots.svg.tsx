import { forwardRef, type Ref, type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
}

const SvgComponent = (props: Props, ref: Ref<SVGSVGElement>) => {
  const { size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      ref={ref}
      {...rest}
    >
      <path d="M140 128a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm56-12a12 12 0 1 0 12 12 12 12 0 0 0-12-12Zm-136 0a12 12 0 1 0 12 12 12 12 0 0 0-12-12Z" />
    </svg>
  );
};

const DotsSvgIcon = forwardRef(SvgComponent);
export default DotsSvgIcon;
