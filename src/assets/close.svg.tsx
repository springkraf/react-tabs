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
      <path d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
    </svg>
  );
};
const CloseSvgIcon = forwardRef(SvgComponent);
export default CloseSvgIcon;
