import { Constants } from './constants.class';
import { BowlingData,BowlingFrameData } from '../model/bowlingData.class';

export class Process
{
/*  
	this should of course be in a PBI,an analyst document or a company wiki/sharepoint
*/
/*
	A game of bowling consists of ten frames. 
	In each frame, the bowler will have two chances to knock down as many pins as possible with their bowling ball.

	If a bowler is able to knock down all ten pins with their first ball, he is awarded a strike.

	If the bowler is able to knock down all 10 pins with the two balls of a frame, it is known as a spare

	Bonus points are awarded for both of these, depending on what is scored in the next 2 balls (for a strike) or 1 ball (for a spare).

	If the bowler knocks down all 10 pins in the tenth frame, the bowler is allowed to throw 3 balls for that frame

	When a player fails to knock down all ten pins after their second ball it is known as an open frame
*/

/*
	fallenPins (process user input/ fallen pins on this throw)
	bowlingData (cfr BowlingData class)
*/
  public static calcScore(fallenPins:number,bowlingData:BowlingData):BowlingData
  {
  	const pinsLeft = bowlingData.standingPins - fallenPins;
  	
  	// fill a frame if current is missing
  	if(bowlingData.currentFrame > bowlingData.frames.length-1)
  	{
  		bowlingData.frames.push(new BowlingFrameData());
  	}

  	//-------------------------------------------------------- apply game rules (cfr doc above)
  	if(fallenPins==Constants.MAX_FRAMES) // strike ?
  	{
  		bowlingData.frames[bowlingData.currentFrame].strike = true;
  	}
  	else if(pinsLeft<=0) // spare ?
  	{
  		bowlingData.frames[bowlingData.currentFrame].spare = true;
  	}

  	if(bowlingData.throwCount==Constants.THROW_A) // first throw
  	{
  		bowlingData.frames[bowlingData.currentFrame].points[Constants.THROW_A]=fallenPins;
  	}
  	else if(bowlingData.throwCount==Constants.THROW_B) // 2nd throw
  	{
  		bowlingData.frames[bowlingData.currentFrame].points[Constants.THROW_B]=fallenPins;
  	}
  	// check previous frame
  	if(bowlingData.currentFrame>0)
  	{
  		let bonus = 0;
  		if(bowlingData.frames[bowlingData.currentFrame-1].strike)
  		{
  			bonus += bowlingData.frames[bowlingData.currentFrame].points[Constants.THROW_A];
  			bonus += bowlingData.frames[bowlingData.currentFrame].points[Constants.THROW_B];
  		}
  		else if(bowlingData.frames[bowlingData.currentFrame-1].strike)
  		{
  			bonus += bowlingData.frames[bowlingData.currentFrame].points[Constants.THROW_A];
  		}
		bowlingData.frames[bowlingData.currentFrame].points[Constants.BONUS] = bonus;
  	}

  	// update standing pins
  	bowlingData.standingPins -= fallenPins;

  	//------------------------------------ next throw or frame
  	bowlingData.throwCount++;
	if( (bowlingData.throwCount>=2) || (bowlingData.standingPins<=0) )
	{
		bowlingData.throwCount = 0;
		
		if(bowlingData.standingPins>0)
		{
			bowlingData.frames[bowlingData.currentFrame].open=true;
		}

		// put back the pins at their place		
		bowlingData.standingPins=Constants.MAX_FRAMES;

		if(bowlingData.currentFrame >= Constants.MAX_FRAMES-1)
		{
			bowlingData.done=true;
		}
		else
		{
			bowlingData.currentFrame++;
		}
	}

	return bowlingData;
  }
}