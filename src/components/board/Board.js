import React, {useEffect, useState} from "react";
import "./Board.css";
import Card from "../card/Card";
import sound from "../../assets/sound/card-flip.wav";

/**
 * The game board on which the memory cards are placed.
 *
 * @param boardSize the board width or height. So for a 5x5 board this would be 5.
 * @param bubbleUpCardFlipEvent function that is called when a card is flipped.
 */
export default function Board({boardSize, bubbleUpCardFlipEvent}) {

  const [cards, setCards] = useState([...Array(boardSize * boardSize).keys()].map(key => {
      return {
        "id": key,
        "removed": false,
        "flipped": false,
        "image": null
      }
    })
  );
  const [isTurnOngoing, setIsTurnOngoing] = useState(false);

  useEffect(() => {
    getImages(boardSize)
      .then(fetchedImages => {
        // Double the fetched images, so that every image will occur twice in the game
        fetchedImages = fetchedImages.concat([...fetchedImages]);
        shuffle(fetchedImages);

        const newCards = [...Array(Math.round(boardSize * boardSize)).keys()];
        newCards.forEach(key => {
          newCards[key] = {
            "id": key,
            "removed": false,
            "flipped": false,
            "image": fetchedImages[key]
          }
        })

        setCards(newCards)
      }).catch(reason => {
      console.error(reason)
    });
  }, [boardSize])

  /**
   * Shuffle images with Fisher–Yates algorithm
   */
  function shuffle(images) {
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }
  }

  async function getImages(boardSize) {
    const images = [];
    for (let i = 1; i <= 32; i++) {
      images.push(`assets/images/cards/${i}.png`)
    }

    shuffle(images);

    return images.slice(0, boardSize * boardSize / 2) // Only return as many images as needed
  }

  /**
   * Checks the game's state after every card flip
   *
   * @param cardId the card that triggered this function call
   */
  async function checkGameState(cardId) {
    if (isTurnOngoing) return;
    setIsTurnOngoing(true);

    const updatedCards = cards.slice();

    const flippedCardsStillInGame = updatedCards
      .filter(card => card.flipped)
      .filter(card => !card.removed);

    // Don't do anything if the player clicks on the already flipped card again
    if (flippedCardsStillInGame[0] && (flippedCardsStillInGame[0].id === updatedCards[cardId].id)) {
      setIsTurnOngoing(false);
      return;
    }

    new Audio(sound).play().catch(reason => console.error(reason));

    if (flippedCardsStillInGame.length === 0) {
      // This will be the only flipped card still in the game
      updatedCards[cardId].flipped = true;
      setIsTurnOngoing(false);
    } else if (flippedCardsStillInGame.length === 1) {
      // There is already another flipped card in the game

      updatedCards[cardId].flipped = true;
      setCards(updatedCards);
      if (flippedCardsStillInGame[0].image === updatedCards[cardId].image) {
        if (updatedCards.filter(card => !card.flipped).filter(card => !card.removed).length === 0) {
          bubbleUpCardFlipEvent(true);
        }

        // Cards are the same. Remove both after a delay
        await removeCards(flippedCardsStillInGame[0].id, cardId);
      } else {
        // Cards are not the same. Flip both back after a delay
        await flipCardsBack(flippedCardsStillInGame[0].id, cardId);
      }
    } else {
      console.error("There are more than two cards facing up. THIS SHOULD NOT HAPPEN!");
    }

    bubbleUpCardFlipEvent(false);
    setCards(updatedCards);
  }

  /**
   * Executed if two cards are not the same and should be flipped back after a delay.
   */
  function flipCardsBack(firstCard, secondCard) {
    return new Promise(() => {
      setTimeout(() => {
        const updatedCards = cards.slice();

        updatedCards[firstCard].flipped = false;
        updatedCards[secondCard].flipped = false;

        setCards(updatedCards);
        setIsTurnOngoing(false);
      }, 1500);
    }).catch(reason => console.error(reason));
  }

  /**
   * Executed if two cards are the same and should be removed from the board after a delay.
   */
  function removeCards(firstCard, secondCard) {
    return new Promise(() => {
      setTimeout(() => {
        const updatedCards = cards.slice();

        updatedCards[firstCard].removed = true;
        updatedCards[secondCard].removed = true;

        setCards(updatedCards);
        setIsTurnOngoing(false);
      }, 1500);
    }).catch(reason => console.error(reason));
  }

  /**
   * Returns the class names for the element that will be rendered. Improves responsive design.
   */
  function getCssClass() {
    let classNames = "nes-container is-rounded ";
    switch (boardSize) {
      case 4:
        classNames += " four"
        break;
      case 6:
        classNames += " six"
        break;
      case 8:
        classNames += " eight"
        break;
      default:
        classNames += " four"
        break;
    }
    return classNames;
  }

  return (
    <div id="board" className={getCssClass()}>
      {[...Array(boardSize * boardSize).keys()].map(index => {
        return <Card key={index} props={cards[index]} bubbleUpCardFlipEvent={checkGameState}></Card>
      })}
    </div>
  );

}
