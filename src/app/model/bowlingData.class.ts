/*
	each frame contains its points (throw a, b and bonus points) 
    2 flags are also used to detail if spares/strikes have been done
*/
export class BowlingFrameData {

	public strike:boolean=false; // frame is strike
	public spare:boolean=false; // frame is spare
	public points:number[]=[]; // array of points for throw a, b and bonus
	public closed:boolean=false; // frame is closed if all pins are down
	
	/*
		default constructor
	*/
	constructor() {
    	this.strike=false;
		this.spare=false;
		this.points=[0,0,0];
		this.closed=false;
  	}

	/*
		css debug "constructor"
	*/
	debugInit(strike:boolean,spare:boolean,points:number[],closed:boolean) {
    	this.strike=strike;
		this.spare=spare;
		this.points=points;
		this.closed=closed;
  	}
}

/*
	this class represents the game state
*/
export class BowlingData {

	public standingPins:number=0; // pins left standing
	public frames:BowlingFrameData[]=[]; // frames data
	public currentFrame:number=0; // index to the current frame
	public throwCount:number=0;	// distinguish which throw we're at (1st or 2nd ball)
	public done:boolean=false;	// when all 10 frames are done

	constructor() {
    	this.standingPins=10;
		this.done=false;
		this.frames=[];
		this.currentFrame=0;
		this.throwCount=0;
  	}

}