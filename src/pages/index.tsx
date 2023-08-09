import TimeZone from "@/components/TimeZone";
import Splash from "@/components/Splash";
import { IconContext } from "react-icons";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { motion } from "framer-motion";

import classNames from "classnames";
import { useState, useEffect } from "react";

export default function Home() {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplash(false);
    }, 13000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main
      className={classNames(
        "relative flex h-full w-full flex-col items-center justify-center space-y-4",
      )}
    >
      {splash ? (
        <Splash prop={""} />
      ) : (
        <>
          <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
            <header className="flex h-10 w-full items-center justify-end shadow-2xl backdrop:blur-lg ">
              <IconContext.Provider value={{ size: "2rem" }}>
                <div className="flex items-center justify-center space-x-2">
                  <motion.a
                    whileHover={{ opacity: 0.5, scale: 0.9, cursor: "pointer" }}
                    transition={{ duration: 0.5 }}
                    whileTap={{ scale: 1.4 }}
                    href="https://github.com/AJ4200"
                  >
                    <AiFillGithub />
                  </motion.a>
                  <motion.a
                    whileHover={{ opacity: 0.5, scale: 0.9, cursor: "pointer" }}
                    transition={{ duration: 0.5 }}
                    whileTap={{ scale: 1.4 }}
                    href="https://www.linkedin.com/in/abel-majadibodu-5a0583193/"
                  >
                    <AiFillLinkedin />
                  </motion.a>
                </div>
              </IconContext.Provider>
            </header>
            <TimeZone />
          </div>
        </>
      )}
      <motion.footer id="footr" className="fixed bottom-0 text-sm"
      transition={{duration:1}}>
        
        TimeWhere by
        <a href="https://github.com/AJ4200"> AJ4200 © 2023</a>
      </motion.footer>
    </main>
  );
}
