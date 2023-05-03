import React, { useState } from 'react'


export default function Teste() {

  const [checkBocks, setChecbocks] = useState([
    { "posicao": false, "player": 3 },
    { "posicao:": false, "player": 3 },
    { "posicao:": false, "player": 3 },

    { "posicao:": false, "player": 3 },
    { "posicao:": false, "player": 3 },
    { "posicao:": false, "player": 3 },

    { "posicao:": false, "player": 3 },
    { "posicao:": false, "player": 3 },
    { "posicao:": false, "player": 3 },
  ])

  const resetGame = () => {
    setChecbocks([
      { "posicao": false, "player": 3 },
      { "posicao:": false, "player": 3 },
      { "posicao:": false, "player": 3 },

      { "posicao:": false, "player": 3 },
      { "posicao:": false, "player": 3 },
      { "posicao:": false, "player": 3 },

      { "posicao:": false, "player": 3 },
      { "posicao:": false, "player": 3 },
      { "posicao:": false, "player": 3 },
    ])
  }

  const checkWin = () => {
    const winningCombinations = [
      // Linhas
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Colunas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonais
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i]
      if (checkBocks[a].posicao &&
        checkBocks[a].posicao === checkBocks[b].posicao &&
        checkBocks[a].posicao === checkBocks[c].posicao &&

        checkBocks[a].player === checkBocks[b].player &&
        checkBocks[a].player === checkBocks[c].player
      ) {
        return checkBocks[a].player
      }
    }

    return null
  }

  const [player, setPlayer] = useState(0)

  React.useEffect(() => {
    const vencedor = checkWin()
    if (vencedor != null) {
      alert(`O Player:${vencedor == 0 ? " 2" : "1"} GANHOU`)
      resetGame()
    }
    console.log(checkWin())
  }, [checkBocks])

  const handleCheckBoxClick = (index) => {
    const updatedCheckBoxes = [...checkBocks]
    if (!updatedCheckBoxes[index].posicao) {
      updatedCheckBoxes[index].posicao = !updatedCheckBoxes[index].posicao
      updatedCheckBoxes[index].player = player == 0 ? 1 : 0
      setPlayer(player === 0 ? 1 : 0)
      setChecbocks(updatedCheckBoxes)
    }
  }

  return (
    <>
      <h1>TIC-TAC-TOE</h1>
      <div style={{
        "display": "grid",
        "grid-template-columns": "repeat(3, 1fr)",
        "gap": " 10px",
        "margin-top": "20px",
      }}>
        {
          checkBocks.map((e, index) =>
            <label>
              <input type='checkbox' checked={e.posicao}
                onChange={() => handleCheckBoxClick(index)}
              />
              {
                e.player == 0 && <h1>p2</h1>
              }
              {
                e.player == 1 && <h1>p1</h1>
              }
            </label>
          )
        }
      </div>
    </>
  )
}
