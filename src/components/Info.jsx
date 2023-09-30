import React from 'react'
import { motion } from 'framer-motion'

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 500,
        x: 0,
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index,
        }
    })
}

export default function Info() {
  return (
    <div>
    <motion.div className='text-5xl text-white mt-10'
                 initial={{ y: 500, x: 0, opacity: 0}}
                 animate={{ y: 0, x: 0, opacity: 1}}
                 transition={{duration: 1}}
                >
                  <h1>What is Story Trakr?</h1>
                  
    </motion.div>
    <motion.ul className='text-white text-2xl'
                  variants={fadeInAnimationVariants}
                  >
                    <li>Track your short story submissions</li>
                    <li>Track your short story submissions</li>
                    <li>Track your short story submissions</li>
    </motion.ul>
    </div>
  )
}
