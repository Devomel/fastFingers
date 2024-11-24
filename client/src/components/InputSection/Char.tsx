import { memo } from 'react'

interface CharProps {
   char: string;
   options?: object
}

const Char = memo(({ char, options }: CharProps) => {
   return <span {...options}>{char}</span>
})
Char.displayName = "Char"


export default Char;