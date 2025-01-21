"use client";
const ArrowRightIcon = (props: React.SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#000"
      {...props}
      style={{
        width: 14,
        height: 14,
        cursor: "pointer",
        ...props.style,
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export default ArrowRightIcon;
