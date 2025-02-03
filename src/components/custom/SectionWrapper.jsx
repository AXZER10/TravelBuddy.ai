/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const SectionWrapper = ({ children }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ threshold: 0.3 });

    useEffect(() => {
        if (inView) {
            controls.start({
                zIndex: 10,
                opacity: 1,
                scale: 1.05,
                filter: "blur(0px)", // Remove blur when in focus
                backdropFilter: "blur(0px)"
            });
        } else {
            controls.start({
                zIndex: 1,
                opacity: 0.6,
                scale: 1,
                filter: "blur(6px)", // Apply blur when not in focus
                backdropFilter: "blur(6px)"
            });
        }
    }, [inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            transition={{ duration: 0.5 }}
            className="relative w-full"
        >
            {children}
        </motion.div>
    );
};

export default SectionWrapper;