import { FC } from 'react'
import Key from './Key';
import SpaceKey from './SpaceKey';
import "./Keyboard.scss"

interface KeyboardProps {
  sentence: {
    done: string,
    rest: string
  }
}
const Keyboard: FC<KeyboardProps> = ({ sentence }) => {
  const symbols = [
    [
      { key: "'", color: 'purple', type: 'keyboard__letter' },
      { key: '1', color: 'purple', type: 'keyboard__letter' },
      { key: '2', color: 'purple', type: 'keyboard__letter' },
      { key: '3', color: 'green', type: 'keyboard__letter' },
      { key: '4', color: 'red', type: 'keyboard__letter' },
      { key: '5', color: 'blue', type: 'keyboard__letter' },
      { key: '6', color: 'blue', type: 'keyboard__letter' },
      { key: '7', color: 'yellow', type: 'keyboard__letter' },
      { key: '8', color: 'red', type: 'keyboard__letter' },
      { key: '9', color: 'green', type: 'keyboard__letter' },
      { key: '0', color: 'purple', type: 'keyboard__letter' },
      { key: '-', color: 'purple', type: 'keyboard__letter' },
      { key: '=', color: 'purple', type: 'keyboard__letter' },
      { key: '<-', type: 'functional_btn', color: 'grey' }
    ],
    [
      { key: 'Tab', type: 'functional_btn', color: 'grey' },
      { key: 'й', color: 'purple', type: 'keyboard__letter' },
      { key: 'ц', color: 'green', type: 'keyboard__letter' },
      { key: 'у', color: 'red', type: 'keyboard__letter' },
      { key: 'к', color: 'blue', type: 'keyboard__letter' },
      { key: 'е', color: 'blue', type: 'keyboard__letter' },
      { key: 'н', color: 'yellow', type: 'keyboard__letter' },
      { key: 'г', color: 'yellow', type: 'keyboard__letter' },
      { key: 'ш', color: 'red', type: 'keyboard__letter' },
      { key: 'щ', color: 'green', type: 'keyboard__letter' },
      { key: 'з', color: 'purple', type: 'keyboard__letter' },
      { key: 'х', color: 'purple', type: 'keyboard__letter' },
      { key: 'ї', color: 'purple', type: 'keyboard__letter' },
      { key: '\\', color: 'grey', type: 'keyboard__letter' }
    ],
    [
      { key: 'Caps', type: 'functional_btn', color: 'grey' },
      { key: 'ф', color: 'purple', type: 'keyboard__letter' },
      { key: 'і', color: 'green', type: 'keyboard__letter' },
      { key: 'в', color: 'red', type: 'keyboard__letter' },
      { key: 'а', color: 'blue', type: 'keyboard__letter' },
      { key: 'п', color: 'blue', type: 'keyboard__letter' },
      { key: 'р', color: 'yellow', type: 'keyboard__letter' },
      { key: 'о', color: 'yellow', type: 'keyboard__letter' },
      { key: 'л', color: 'red', type: 'keyboard__letter' },
      { key: 'д', color: 'green', type: 'keyboard__letter' },
      { key: 'ж', color: 'purple', type: 'keyboard__letter' },
      { key: 'є', color: 'purple', type: 'keyboard__letter' },
      { key: 'Enter', type: 'functional_btn', color: 'grey' }
    ],
    [
      { key: 'Shift L', type: 'functional_btn', color: 'grey' },
      { key: 'я', color: 'purple', type: 'keyboard__letter' },
      { key: 'ч', color: 'green', type: 'keyboard__letter' },
      { key: 'с', color: 'red', type: 'keyboard__letter' },
      { key: 'м', color: 'blue', type: 'keyboard__letter' },
      { key: 'и', color: 'blue', type: 'keyboard__letter' },
      { key: 'т', color: 'yellow', type: 'keyboard__letter' },
      { key: 'ь', color: 'yellow', type: 'keyboard__letter' },
      { key: 'б', color: 'red', type: 'keyboard__letter' },
      { key: 'ю', color: 'green', type: 'keyboard__letter' },
      { key: '.', color: 'purple', type: 'keyboard__letter' },
      { key: 'Shift R', type: 'functional_btn', color: 'grey' }
    ]
  ];

  const currBtn = sentence.rest.charAt(0).toLocaleLowerCase()

  return (
    <div className="keyboard">
      <div className="keyboard__container">
        {symbols.map((row, rowIndex) => (
          <div className="keyboard__row" key={rowIndex}>
            {row.map((symbol) => (
              <Key symbol={symbol} currBtn={currBtn} key={symbol.key} />
            ))}
          </div>
        ))}
        <div className="keyboard__row">
          <SpaceKey currBtn={currBtn} />
        </div>
      </div>
    </div>
  )
}

export default Keyboard;