/* data & constants classes */
import { Constants } from './constants.class';
import { BowlingData,BowlingFrameData } from '../model/bowlingData.class';

/*
  embodies the processing unit of the game
*/
export class Process
{
  /*
    A game of bowling consists of ten frames. 
    In each frame, the bowler will have two chances to knock down as many pins as possible with their bowling ball.

    inputs:
  	 fallenPins (process user input/ fallen pins on this throw)
  	 bowlingData (cfr BowlingData class)
    
    outputs:
      bowlingData (the modified game state)
  */
  public static calcScore(fallenPins:number,bowlingData:BowlingData):BowlingData {

  	const pinsLeft = bowlingData.standingPins - fallenPins;
  	
  	// fill a frame if current data is missing
  	if(bowlingData.currentFrame > bowlingData.frames.length-1){
  		bowlingData.frames.push(new BowlingFrameData());
  	}

    /*
      If a bowler is able to knock down all ten pins with their first ball, he is awarded a strike.
    */
  	if(fallenPins==Constants.MAX_FRAMES) {
  		bowlingData.frames[bowlingData.currentFrame].strike = true;
      bowlingData.frames[bowlingData.currentFrame].spare = false;
  	}

    /*
      If the bowler is able to knock down all 10 pins with the two balls of a frame, it is known as a spare
    */
  	else if(pinsLeft<=0) {
      bowlingData.frames[bowlingData.currentFrame].strike = false;
  		bowlingData.frames[bowlingData.currentFrame].spare = true;
  	}

    // update regular points on current throw
		bowlingData.frames[bowlingData.currentFrame].points[bowlingData.throwCount]=fallenPins;

  	// check previous frame for bonuses
  	if(bowlingData.currentFrame>0) {
      /*
        Bonus points are awarded for strikes/spares, depending on what is scored in the next 2 balls (for a strike) or 1 ball (for a spare).
      */
  		let bonus = 0;
  		if(bowlingData.frames[bowlingData.currentFrame-1].strike)
  		{
  			bonus += bowlingData.frames[bowlingData.currentFrame].points[Constants.THROW_A];
  			bonus += bowlingData.frames[bowlingData.currentFrame].points[Constants.THROW_B];
  		}
  		else if(bowlingData.frames[bowlingData.currentFrame-1].spare)
  		{
  			bonus += bowlingData.frames[bowlingData.currentFrame].points[Constants.THROW_A];
  		}
  		bowlingData.frames[bowlingData.currentFrame].points[Constants.BONUS] = bonus;
  	}

  	// update standing pins
  	bowlingData.standingPins -= fallenPins;

  	//------------------------------------ next throw or frame
  	bowlingData.throwCount++;
  	if( (bowlingData.throwCount>=2) || (bowlingData.standingPins<=0) ) {
  		bowlingData.throwCount = 0;
  		
      /*
        When a player fails to knock down all ten pins after their second ball it is known as an open frame
      */
  		if(bowlingData.standingPins==0) {
  			bowlingData.frames[bowlingData.currentFrame].closed=true;
  		}

  		// put back the pins at their place		
  		bowlingData.standingPins=Constants.MAX_FRAMES;

  		// game done ? allows for display of "reset game" button (cfr BowlingTable component)
      if(bowlingData.currentFrame >= Constants.MAX_FRAMES-1){
  			bowlingData.done=true;
  		}
  		else{
  			bowlingData.currentFrame++;
  		}
  	}

  	return bowlingData;
  }
}