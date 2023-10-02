import React from 'react'
import { motion } from 'framer-motion'
import { infoListItems } from '../lib/data'

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
            delay: 0.75 * index,
        }
    })
}

export default function Info() {
  return (
    <div>
    <motion.div className='text-5xl text-white mt-10'
                 initial={{ y: 500, x: 0, opacity: 0}}
                 animate={{ y: 0, x: 0, opacity: 1}}
                 transition={{duration: 0.1}}
                >
                  <h1>What is Story Trakr?</h1>
                  
    </motion.div>
    <ul className='text-white text-2xl'
                  variants={fadeInAnimationVariants}
                  >
                    {
                        infoListItems.map((item, index) => (
                            <motion.li className='bg-white borderBlack rounded-xl px-5 py-3'
                            key={item.id}
                            custom={index}
                             variants={fadeInAnimationVariants}
                             initial='initial'
                             animate='animate'
                            >
                                {item.text}
                            </motion.li>
                        ))
                    }
      </ul>
    </div>
  )
}
