// import React from 'react';

// const MainScreen = ({ question }) => {
//   if (!question) {
//     return <div>Waiting for the next question...</div>;
//   }

//   return (
//     <div>
//         <h1>KBC Multiplayer Game</h1>
//         {gameStarted ? (
//             <>
//                 <GameScreen question={currentQuestion} />
//                 <QRCodeComponent url="http://localhost:3000/player" />
//             </>
//         ) : (
//             <button onClick={startGame}>Start Game</button>
//         )}
//     </div>
//   );
// };

// export default MainScreen;