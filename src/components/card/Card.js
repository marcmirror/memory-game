import React from 'react';
import './Card.css';

export default function Card({props, bubbleUpCardFlipEvent}) {

  return (
    <>
      <div className="flip-card">
        <div className={`flip-card-inner ${props.flipped ? 'flip' : ''} ${props.removed ? 'remove' : ''}`}
             onClick={() => bubbleUpCardFlipEvent(props.id)}>
          <div className="flip-card-front nes-container is-rounded">
          </div>
          <div className="flip-card-back nes-container is-rounded" style={{backgroundImage: `url(${props.image})`}}>
          </div>
        </div>
      </div>
    </>
  );

}
