import { memo } from 'react'

interface CharsProps {
   chars: string[];
   classname: string
}

const Chars = memo(({ chars, classname }: CharsProps) => {
   return (
      <>
         {
            chars.map(
               char => <span
                  key={Math.random()}
                  className={classname}
               >
                  {char}
               </span>)
         }
      </>
   )
})

Chars.displayName = "Chars"

export default Chars;