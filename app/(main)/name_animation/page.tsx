'use client';

import{motion} from 'framer-motion';

export default function NameAnimation() {
    return (
        <div className="flex flex-col gap-2">
            <motion.h1
                initial={{opacity:0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, ease: "easeOut"}}
                className="text-4xl md:text-6xl front-bold text-white"
                >
                    Hi, I'm {""}
                    <span className="text-[#00FF88] bg-clip-text">
                        Prakash Singh
                    </span>
                </motion.h1>

                <motion.p
                initial={{}}

        </div>
    )
}