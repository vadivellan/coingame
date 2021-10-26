function onResize(pStage, pKeepAspectRatio)
{
// browser viewport size
var w = window.innerWidth;
var h = window.innerHeight;

// stage dimensions
var ow = 480; // your stage width
var oh = 800; // your stage height

if (pKeepAspectRatio)
{
    // keep aspect ratio
    var scale = Math.min(w / ow, h / oh);
    pStage.scaleX = scale;
    pStage.scaleY = scale;

   // adjust canvas size
   pStage.canvas.width = ow * scale;
  pStage.canvas.height = oh * scale;
  console.log("scale is ", scale, pStage.canvas.width, pStage.canvas.height)
}
else
{
    // scale to exact fit
    pStage.scaleX = w / ow;
    pStage.scaleY = h / oh;

    // adjust canvas size
    pStage.canvas.width = ow * pStage.scaleX;
    pStage.canvas.height = oh * pStage.scaleY;
   }

 // update the stage
pStage.update()
}

// $(document).ready(function(){
//     myVar = setInterval("showTime()", 1000);
// });

// function showTime(){
//     var d = new Date();
//     var t = d.toLocaleTimeString();
//     // $("#demo").html(t); // display time on the page
//     console.log("Cutrrent TIME == "+t);
//     PLAYING_TIME_SEC = PLAYING_TIME_SEC+1;
//     console.log("PLAYING_TIME_SEC == "+PLAYING_TIME_SEC);
// }

function CMain(){

    var _iCurResource = 0;
    var RESOURCE_TO_LOAD;
    var _iState = STATE_LOADING;
    
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);
         onResize(s_oStage, true);    
        createjs.Touch.enable(s_oStage);

        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
        this._loadImages();
    };
    
    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("play_button1","./sprites/play_button1.png");
        s_oSpriteLibrary.addSprite("play_button2","./sprites/play_button2.png");
        // s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("menu_bg","./sprites/menu_bg.png");
        s_oSpriteLibrary.addSprite("bg_help","./sprites/transprant_bg.png");
        s_oSpriteLibrary.addSprite("road_tile","./sprites/road3.png");
        s_oSpriteLibrary.addSprite("hero","./sprites/hero.png");
        s_oSpriteLibrary.addSprite("but_right","./sprites/right_arrow.png");
        s_oSpriteLibrary.addSprite("but_left","./sprites/left_arrow.png");
        s_oSpriteLibrary.addSprite("enemy","./sprites/enemy.png");
        // s_oSpriteLibrary.addSprite("coin0","./sprites/goldcoin0.png");
        s_oSpriteLibrary.addSprite("coin1","./sprites/goldcoin1.png");
        // s_oSpriteLibrary.addSprite("coin2","./sprites/goldcoin2.png");
        // s_oSpriteLibrary.addSprite("coin5","./sprites/goldcoin5.png");
        // s_oSpriteLibrary.addSprite("coin10","./sprites/goldcoin10.png");
        s_oSpriteLibrary.addSprite("eors_coin","./sprites/eors_coin.png");
        // s_oSpriteLibrary.addSprite("eors_coin","../../../assets/img/eroscoins.png");
        s_oSpriteLibrary.addSprite("life","./sprites/life.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("footer_view","../../../assets/img/footer.png");
        
        RESOURCE_TO_LOAD = s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        //console.log("PERC: "+iPerc);
        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();      
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function(){
        _oGame = new CGame();
        _iState = STATE_GAME;
		
		$(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
    
    this._update = function(event){
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;

    this.initContainer();
}

var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;