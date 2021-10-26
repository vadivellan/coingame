function CMenu(){
    var _oBg;
    var _oButPlay;
    var _oButSignIn;
    var _oFade;
    
    this._init = function(){
        // _oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('menu_bg'));
        s_oStage.addChild(_oBg);
        
        // var oSprite = s_oSpriteLibrary.getSprite('but_play');
        var oSprite = s_oSpriteLibrary.getSprite('play_button1');
        _oButPlay = new CTextButton((CANVAS_WIDTH/2)+110,CANVAS_HEIGHT-80,oSprite,TEXT_PLAY,"Quicksand-Regular","#ffffff",20);
     
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        //New Code
        _oButSignIn = new CTextButton((CANVAS_WIDTH/2)-110,CANVAS_HEIGHT-80,oSprite,SIGN_IN,"Quicksand-Regular","#ffffff",20);
     
        _oButSignIn.addEventListener(ON_MOUSE_UP, this._onButSignInRelease, this);

        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;

        _oButSignIn.unload(); 
        _oButSignIn = null;

        s_oStage.removeChild(_oBg);
        _oBg = null;
    };
    
    this._onButPlayRelease = function(){
        this.unload();
        s_oMain.gotoGame();
    };

    this._onButSignInRelease = function(){
        this.unload();
        // s_oMain.gotoGame();
        console.log("SignIn Button pressed");
    };
    
    this._init();
}