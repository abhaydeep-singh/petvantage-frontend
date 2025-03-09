import React from 'react'
import dog from "../assets/images/dog.jpg"
import birds1 from "../assets/images/birds1.jpg"
import peta from "../assets/images/peta.jpg"
function FeaturedArticles() {
  return (
    <div className='w-full h-[50vh] p-5'>
      <br />
      <h2 className='text-primary text-center text-6xl'>Featured Articles</h2>
      <br /><br />
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 rounded py-6">


      <div className="article-box w-[90%] h-[50vh] border hover:border-primary rounded-xl overflow-hidden flex flex-col ">
        <div className="img h-[70%] border bg-accent overflow-hidden">
          <img src={dog} alt="" />
        </div>
        <div className="text flex flex-col px-4 py-2">
          <h2 className='text-primary text-2xl'>Lorem ipsum dolor sit.</h2>
          <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam saepe ad quaerat?</p>
        </div>
      </div>

      <div className="article-box w-[90%] h-[50vh] border hover:border-primary rounded-xl overflow-hidden flex flex-col ">
      <div className="img h-[70%] border bg-accent overflow-hidden">
          <img src={birds1} alt="" />
        </div>
        <div className="text flex flex-col px-4 py-2">
          <h2 className='text-primary text-2xl'>Lorem ipsum dolor sit.</h2>
          <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam saepe ad quaerat?</p>
        </div>
      </div>

      <div className="article-box w-[90%] h-[50vh] border hover:border-primary rounded-xl overflow-hidden flex flex-col ">
      <div className="img h-[70%] border bg-accent overflow-hidden">
          <img src={peta} alt="" />
        </div>
        <div className="text flex flex-col px-4 py-2">
          <h2 className='text-primary text-2xl'>Lorem ipsum dolor sit.</h2>
          <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam saepe ad quaerat?</p>
        </div>
      </div>
     
      </div>
    </div>
  )
}

export default FeaturedArticles
