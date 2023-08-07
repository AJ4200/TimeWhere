    import React from "react";

    interface SplashProps {
      prop: string;
    }

    const Splash: React.FC<SplashProps> = ({ prop }) => {
      return (
        <>
          <div className="wrapper">
            <svg className="svglogo">
              <text x="43%" y="50%" dy=".35em" text-anchor="middle">
                Time
              </text>
              <text x="57%" y="50%" dy=".35em" text-anchor="middle">
                Where
              </text>
            </svg>
              </div>
              <div className="mdloader"></div>
        </>
      );
    };
    export default Splash;
