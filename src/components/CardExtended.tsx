import React from 'react'
import Card from './Card';

type CardExtendedProps = {
  to: string;
  image: string;
  color: string;
  type: string;
  topic: string;
  authorName: string;
  authorImage: string;
  showDelete?: boolean;
  invitedBy?: string;
  scored?: number;
  passed?: number;
  quantity: number;
  status?: string;
}

const CardExtended = ({ to, image, color, type, topic, quantity, authorName, authorImage, invitedBy, showDelete, scored, passed, status } : CardExtendedProps) => {
  return (
    <div className='flex flex-col sm:flex-row gap-8 mt-12 items-center'>
      <Card
        image={image}
        to={to}
        color={color}
        type={type}
        topic={topic}
        authorName={authorName}
        authorImage={authorImage}
        hideText={true}
        quantity={quantity}
      />
      <div className='flex-1 flex justify-between flex-col md:py-3 relative'>
        {
          showDelete && (
            <button className='absolute right-0 font-black text-lg top-0'>
              X
            </button>
          )
        }
        <div>
          {
            invitedBy && (
              <h6 className='font-semibold pb-2'>Invited by <span className='font-black' style={{color: `var(--${color})`}}>{invitedBy}</span></h6>
            )
          }
          <h2 className='font-bold text-lg pr-6'>{type === 'quiz' ? 'Guess the questions about' : 'Learn from flashcards about'} <span className='font-black '>{topic}</span></h2>
          <h6 className='text-gray-300 mt-1 text-sm'>#cosmos #moon #universe #earth</h6>
        </div>
        <div>
          <div className='flex items-center mt-6 sm:mt-3 flex-wrap'>
            {
              scored && passed ? (
                <>
                  <h6 className='font-semibold w-full'>Scored: <span className='font-black' style={{color: `var(--${color})`}}>{scored} Points</span></h6>
                  <h6 className='font-semibold w-full'>Passed: <span className='font-black' style={{color: `var(--${color})`}}>{passed} / {quantity}</span></h6>
                </>
              )
              :
              type === 'flashcards' && status ? (
                <>
                  <h6 className='font-semibold w-full'>
                    Status:  
                    <span className='font-black' style={{color: `var(--${color})`}}> {status}</span>
                  </h6>
                  <h6 className='font-semibold w-full'>
                    Passed:  
                    <span className='font-black' style={{color: `var(--${color})`}}> {passed} / {quantity}</span>
                  </h6>
                </>
              )
              :
              (
                <>
                  <span className='text-gray-300 font-semibold'>2 Days ago</span> 
                  <div className='px-6 py-1 rounded-full text-white font-semibold ml-5' style={{backgroundColor: `var(--${color})`}}>1.6K plays</div>
                </>
              )
            }
            
          </div>
          <div className='flex mt-4 gap-2'>
            <div className='flex-1'>
              <button className='border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-xs'>
                REMOVE FROM WISHLIST
              </button>
            </div>
            <div className='flex-1'>
              <button className='border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-md'>
                GO {type === 'quiz' ? 'QUIZ' : 'LEARN'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardExtended;