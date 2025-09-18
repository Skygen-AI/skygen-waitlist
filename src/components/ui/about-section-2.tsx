"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useRef } from "react";

export default function AboutSection2() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };
  
  const textVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  return (
    <section className="py-32 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto" ref={heroRef}>
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Content */}
          <div className="flex-1">
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={revealVariants}
              className="sm:text-4xl text-2xl md:text-5xl !leading-[110%] font-semibold text-gray-900 mb-8"
            >
              We are{" "}
              <motion.span
                custom={1}
                variants={textVariants}
                className="text-blue-600 border-2 border-blue-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                rethinking
              </motion.span>{" "}
              AI assistance to be more reliable and always you-first. Our
              goal is to continually raise the bar and{" "}
              <motion.span
                custom={2}
                variants={textVariants}
                className="text-orange-600 border-2 border-orange-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                challenge
              </motion.span>{" "}
              how things could{" "}
              <motion.span
                custom={3}
                variants={textVariants}
                className="text-green-600 border-2 border-green-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                work for you.
              </motion.span>
            </motion.h1>

            <div className="mt-12 flex gap-2 justify-between">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
                variants={textVariants}
                className="mb-4 sm:text-xl text-xs"
              >
                <div className="font-medium text-gray-900 mb-1 capitalize">
                  We are SkyGen and we will
                </div>
                <div className="text-gray-600 font-semibold uppercase">
                  transform your productivity
                </div>
              </motion.div>

              <motion.button
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={5}
                variants={textVariants}
                className="bg-blue-600 gap-2 font-medium shadow-lg shadow-blue-600 text-white h-12 px-4 rounded-full text-sm inline-flex items-center cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Zap fill="white" size={16} />
                About SkyGen
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
