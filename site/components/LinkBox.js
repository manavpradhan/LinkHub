import React from "react";

const LinkBox = ({ lbTitle, lbNumber, lbSvg, lbTheme }) => {
  return (
    <div className="flex gap-4 items-center p-8 rounded-lg shadow border">
      <div
        className={`${lbTheme} inline-flex flex-shrink-0 h-16 w-16 rounded-full justify-center items-center`}
      >
        <img src={`/svg/${lbSvg}.svg`} alt="mail_icon" className="w-6" />
      </div>
      <div className="flex flex-col">
        <span className="inline-block text-2xl font-bold">{lbNumber}</span>
        <span className="block text-gray-500 dark:text-gray-300">
          {lbTitle}
        </span>
      </div>
    </div>
  );
};

export default LinkBox;
