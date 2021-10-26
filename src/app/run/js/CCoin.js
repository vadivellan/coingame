function CCoin(iStartX,iStartY,oSprite){
    var _bActive = true;
    var _bTackling;
    var _iWidth;
    var _iHeight;
    var _iScale;
    var _iSpeed;
    var _iStartX;
    var _iStartY;
    var _bNextCalled;
    var _oSpriteObj;
    var _oAnimationRun;
    var _iDistTraveled;
    
    this._init = function(iStartX,iStartY,oSpriteRun){
        _iDistTraveled = 0;
        _iSpeed = 2;
        _bNextCalled = false;
        _bTackling = false;
        _iScale = 1;//randomFloatBetween(0.5,1,2);
		
		var oData = {   // image to use
			framerate : 20,
                        images: [oSpriteRun], 
                        // width, height & registration point of each sprite
                        //frames: {width: 85, height: 85, regX: 100, regY: 100}, 
                        frames:[
                                 [0,0,100,100,0,50,50]


                                // [0,0,150,171,0,75,85],
                                // [150,0,150,171,0,75,85],
                                // [300,0,150,171,0,75,85],
                                // [450,0,150,171,0,75,85],
                                // [600,0,150,171,0,75,85],
                                // [750,0,150,171,0,75,85],
                                // [900,0,150,171,0,75,85],
                                // [1200,0,150,171,0,75,85],
                                //   [1350,0,150,171,0,75,85],
                                // [1500,0,150,171,0,75,85],
                                // [1650,0,150,171,0,75,85],
                                // [1800,0,150,171,0,75,85],
                                // [1950,0,150,171,0,75,85],
                                // [2100,0,150,171,0,75,85],
                                // [2250,0,150,171,0,75,85],
                                // [2400,0,150,171,0,75,85]

                               //  [0,0,200,200,0,100,100],
                               // [200,0,200,200,0,100,100],
                               // [400,0,200,200,0,100,100],
                               // [600,0,200,200,0,100,100],
                               // [800,0,200,200,0,100,100],
                               // [1000,0,200,200,0,100,100],
                               // [1200,0,200,200,0,100,100],
                               // [0,200,200,200,0,100,100],
                               // [200,200,200,200,0,100,100],
                               // [400,200,200,200,0,100,100],
                               // [600,200,200,200,0,100,100],
                               // [800,200,200,200,0,100,100],
                               // [1000,200,200,200,0,100,100],
                               // [1200,200,200,200,0,100,100],
                               // [0,400,200,200,0,100,100],
                               // [200,400,200,200,0,100,100]
                        ],
                        animations: {  walk: [0, 0], tackle:[0,0] }
        };
		
	_oSpriteObj = new createjs.SpriteSheet(oData);
        _oAnimationRun = new createjs.Sprite(_oSpriteObj, "walk");
        _oAnimationRun.x = iStartX;
        _oAnimationRun.y = iStartY;
        s_oStage.addChild(_oAnimationRun);

        _iWidth = 100;
        _iHeight = 100;
        _iStartX = iStartX;
        _iStartY = iStartY;

    };
	
    this.stopAnim = function(){
      _oAnimationRun.stop(); 
    };
    
    this.tackle = function(){
        if(_bTackling === false){
            _bTackling = true;
            _oAnimationRun.gotoAndPlay("tackle");
        }
    };
    
    this.reset = function(){ 
        _bTackling = false;
        _oAnimationRun.gotoAndPlay("walk");
        _oAnimationRun.y -= ((CANVAS_HEIGHT*8)+DISTANCE_AMONG_OBSTACLES);
    };
    
    this.getPos = function(){
        return { x: _oAnimationRun.x, y: _oAnimationRun.y};
    };
    
    this.getY = function(){
        return _oAnimationRun.y;
    };
    
     this.scaleObject = function(scaleVal){
           _oAnimationRun.scaleX = scaleVal;
          _oAnimationRun.scaleY = scaleVal;
        return _oAnimationRun;
    };
    
    this.getRadius = function(){
        return ((_iWidth/2)*_iScale);
    };
    
    this.isActive = function(){
      return _bActive;  
    };
    
    this.update = function(iHeroSpeed){
        _oAnimationRun.y =_oAnimationRun.y + (iHeroSpeed+_iSpeed); 
    };
    
    this._init(iStartX,iStartY,oSprite);
}