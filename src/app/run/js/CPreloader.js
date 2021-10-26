function CPreloader(){
    var _oLoadingText;
    var _oButStart;
    
    this._init = function(){
       //this._loadPreloaderImages();
       this._onAllPreloaderImagesLoaded();
    };
    
    this._loadPreloaderImages = function(){
        s_oSpriteLibrary.init( this._onPreloaderImagesLoaded,this._onAllPreloaderImagesLoaded, this );
        
        s_oSpriteLibrary.addSprite("but_start","./sprites/but_start.png");
        
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onPreloaderImagesLoaded = function(){
            
    };
    
    this._onAllPreloaderImagesLoaded = function(){
        _oLoadingText = new createjs.Text("","bold 22px Arial center", "#ffffff");
        _oLoadingText.x = (CANVAS_WIDTH/2)-40;
        _oLoadingText.y = CANVAS_HEIGHT/2;
        s_oStage.addChild(_oLoadingText);
    };
    
    this.unload = function(){
    };
    
    this._onStart = function(){
        _oButStart.setVisible(false);
        s_oMain.onAllPreloaderImagesLoaded();
    };
    
    this.refreshLoader = function(iPerc){
        _oLoadingText.text = iPerc+"%";
    };
    
    this._init();
    
}