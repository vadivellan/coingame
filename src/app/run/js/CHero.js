function CHero(iStartX,iScale,oSprite){
    var _iSpeed;
    var _oHeroSprite;
    var _oAnimation;
    
    this._init = function(iStartX,iScale,oSprite){
        _iSpeed = 1;
        var oData = {   // image to use
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: [
								   [0,0,200,200,0,100,100],
								   [200,0,200,200,0,100,100],
								   [400,0,200,200,0,100,100],
								   [600,0,200,200,0,100,100],
								   [800,0,200,200,0,100,100],
								   [1000,0,200,200,0,100,100],
								   [1200,0,200,200,0,100,100],
								   [0,200,200,200,0,100,100],
								   [200,200,200,200,0,100,100],
								   [400,200,200,200,0,100,100],
								   [600,200,200,200,0,100,100],
								   [800,200,200,200,0,100,100],
								   [1000,200,200,200,0,100,100],
								   [1200,200,200,200,0,100,100],
								   [0,400,200,200,0,100,100],
								   [200,400,200,200,0,100,100],
								   [400,400,200,200,0,100,100],
								   [600,400,200,200,0,100,100],
								   [800,400,200,200,0,100,100]
							   ], 
                        
                        animations: {  walk: [0, 8] }
                        
        };
        
        _oHeroSprite = new createjs.SpriteSheet(oData);
        _oAnimation = new createjs.Sprite(_oHeroSprite, "walk");

        _oAnimation.x = iStartX;
        _oAnimation.y = CANVAS_HEIGHT - 200;
        s_oStage.addChild(_oAnimation);
        _oAnimation.stop();
    };
    
    this.startAnim = function(){
        _oAnimation.play();
    };
    
    this.move = function(iNewXPos){
      createjs.Tween.get(_oAnimation).to({x:iNewXPos }, 150,createjs.Ease.cubicOut);  
    };
    
    this.stopAnim = function(){
      _oAnimation.stop();  
    };
    
    this.getPos = function(){
        return { x: _oAnimation.x, y: _oAnimation.y};
    };
    
    this.getY = function(){
        return _oAnimation.y;
    };
    
    this.isTweening = function(){
        return createjs.Tween.hasActiveTweens(_oAnimation);
    };
    
    this._init(iStartX,iScale,oSprite);
}