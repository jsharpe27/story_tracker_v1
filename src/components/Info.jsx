import React from 'react'
import { motion } from 'framer-motion'
import { infoListItems } from '../lib/data'

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 0,
        x: 0,
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 1 * index,
        }
    })
}

export default function Info() {
  return (
    <div className='flex flex-col items-center justify-center'>
    <motion.div className='text-5xl text-white mt-10'
                 initial={{ y: 0, x: 500, opacity: 0}}
                 animate={{ y: 0, x: 0, opacity: 1}}
                 transition={{duration: 0.3}}
                >
                  <h1 className='md:text-5xl text-2xl'>What is Story Trakr?</h1>
                  
    </motion.div>
    <ul className='text-white text-2xl text-center'
                  variants={fadeInAnimationVariants}
                  >
                    {
                        infoListItems.map((item, index) => (
                            <motion.li className=' borderBlack rounded-xl px-5 py-3 md:text-3xl text-lg'
                            key={item.id}
                            custom={index}
                            variants={fadeInAnimationVariants}
                            initial='initial'
                            animate='animate'
                            transition={{delay: 1}}
                            >
                                {item}
                            </motion.li>
                        ))
                    }
      </ul>
    </div>
  )
}
