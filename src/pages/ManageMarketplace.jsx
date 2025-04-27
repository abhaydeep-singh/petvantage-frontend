import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { AddProduct, ProductCard } from '@/components';

// import { ProductCard } from '.'

function ManageMarketplace() {
  const [open, setOpen] = useState(false)
  return (
    <div className={`w-full ${false ? "sm:ml-64" : "sm:ml-16"}`}> 
      <div className="nav h-[15vh] md:h-[10vh] md:mt-0 flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center p-7">
        <div className="productCount">All Products: 159 Available: 59</div>
        <div className="buttons flex gap-2">
        <Button variant="secondary" onClick={() => setOpen(true)}>Add</Button>
          <AddProduct open={open} setOpen={setOpen} />
          <Button variant="destructive" >Delete All</Button>
        </div>
      </div>
      <Separator/>

      <div className="flex flex-col items-center">
      <div className="add">
        

      </div>
      <div className="products bg-gray-950 md:w-[90%] rounded-xl flex justify-center py-4 flex-wrap gap-7">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
      </div>
    </div>
  )
}

export default ManageMarketplace
