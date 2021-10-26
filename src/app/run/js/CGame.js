function CGame(){
    var _bUpdate = false;
    var _bRestartMode = false;
    var _iSpeed;
    var _iMaxHeroSpeed;
    var _iScore = 0;
    var _iScoreInterval = 0;
    var _iLives;
    var _iCurHeroX;
    var _iInterval;
    var _aLifeSprites;
    var _oBg;
    // var _oButExit;  
    var _oFpsText;
    var _aLineXPos;
    var _aObstaclePos;
    var _aObstacleInScene;
    var _aCoinInScene;
    var _oHero;
    var _oHurt;
    var _oButLeft;
    var _oButRight;
    var _oScoreText;
    var _oGameOverPanel;
    var _oScrollingBg;
    var _oHelpBg;
    var _oReadyBg;

    var _oPlayAgain;
    var _oOtherGames;

    var _timerVariable;
   

    var _ofooterView;
    
    this._init = function(){

        // var oBgCanvas = new createjs.Shape();
        // oBgCanvas.graphics.beginFill("#5B89A1").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        // s_oStage.addChild(oBgCanvas);

        // For change the background
        var _oMainBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('road_tile'));
        s_oStage.addChild(_oMainBg);

        this._initLineObjects();
        this._initObstacles();

        // var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        // _oButExit = new CGfxButton(CANVAS_WIDTH - (oSprite.width/2) - 10,10+ (oSprite.height/2),oSprite,true);
        // _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        var oEorsCoin = s_oSpriteLibrary.getSprite('eors_coin'); 
        oEorsCoin.height = "10px";

        var _oEorsCoinImage = new createjs.Bitmap(oEorsCoin);
        _oEorsCoinImage.x = CANVAS_WIDTH - (oEorsCoin.width)-10;
        _oEorsCoinImage.y = 10;
        s_oStage.addChild(_oEorsCoinImage);
        
        _iLives = NUM_LIVES;
        _iCurHeroX  = 1;
        var oSpriteHero = s_oSpriteLibrary.getSprite('hero');
        _oHero = new CHero(_aLineXPos[_iCurHeroX],1-((NUM_LINES-_iCurHeroX)*0.2),oSpriteHero);
        
        _aLifeSprites = new Array();
        var oSpriteLife = s_oSpriteLibrary.getSprite("life");
        var iXPos = 10;
        for(var i=0;i<_iLives;i++){
            var oLife = new createjs.Bitmap(oSpriteLife);
            oLife.x = iXPos;
            oLife.y = 10;
            
            s_oStage.addChild(oLife);
            
            iXPos += oSpriteLife.width+10;
            
            _aLifeSprites.push(oLife);
        }
        
        var oBgGUI = new createjs.Shape();
        oBgGUI.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0,900,CANVAS_WIDTH,124);
        s_oStage.addChild(oBgGUI);
        
        _oScoreText = new createjs.Text(TEXT_SCORE+": 0","bold 40px Arial", "#ffffff");
        _oScoreText.x = (CANVAS_WIDTH/2);
        _oScoreText.y = CANVAS_HEIGHT-120;
        _oScoreText.textAlign = "center";
        s_oStage.addChild(_oScoreText);
        
        _oFpsText = new createjs.Text("","14px Arial", "#ffffff");
        _oFpsText.x = 150;
        _oFpsText.y = 15;
        _oFpsText.textAlign = "center";
        //s_oStage.addChild(_oFpsText);
        
        _oHurt = new createjs.Shape();
        _oHurt.graphics.beginFill("red").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oHurt.alpha = 0.1;
        _oHurt.visible =  false;
        
        s_oStage.addChild(_oHurt);
        
        oSprite = s_oSpriteLibrary.getSprite('but_left');
        _oButLeft = new CGfxButton(BUT_LEFT_X,BUT_LEFT_Y,oSprite,true);
        _oButLeft.addEventListener(ON_MOUSE_UP, this._onReleaseLeft, this);
        
        oSprite = s_oSpriteLibrary.getSprite('but_right');
        _oButRight = new CGfxButton(BUT_RIGHT_X,BUT_RIGHT_Y,oSprite,true);
        _oButRight.addEventListener(ON_MOUSE_UP, this._onReleaseRight, this);


        oSprite = s_oSpriteLibrary.getSprite('footer_view');
        _ofooterView = new CGfxButton(FOOTER_X,FOOTER_Y,oSprite,true);
        _ofooterView.addEventListener(ON_MOUSE_UP, this._onReleaseRight, this);
        // s_oStage.addChild(_ofooterView);

        var oFooterMsg = new createjs.Text(TEXT_SALES,"18px ProximaNovaRegular", "#ffffff");
        oFooterMsg.textAlign = "center";
        oFooterMsg.x =  (CANVAS_WIDTH/2);
        oFooterMsg.y = 750;
        s_oStage.addChild(oFooterMsg);

        _iSpeed = 0;
        _iMaxHeroSpeed = 15;

        //For First time need to show the message
        if(!_bRestartMode)
        {
            this.laodHelpScreen();  
        }
        else
        {
            this._onLoadReady(TEXT_READY);
            _bRestartMode = false;
            _iScore = 0;
        }

    };


    this.showTime = function(){
        var d = new Date();
        var t = d.toLocaleTimeString();
        // $("#demo").html(t); // display time on the page
        // console.log("Cutrrent TIME == "+t);
        PLAYING_TIME_SEC = PLAYING_TIME_SEC+1;
        console.log("PLAYING_TIME_SEC == "+PLAYING_TIME_SEC);
    }
    
    this.laodHelpScreen = function(){
        var oParent = this;
        var oHelpPng = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_help')); 
        
        var oText1 = new createjs.Text(TEXT_HOW_TO_PLAY,"35px ProximaNovaSemibold", "#ffffff");
        oText1.textAlign = "center";
        oText1.x =  (CANVAS_WIDTH/2);
        oText1.y = 220;

        var oText2 = new createjs.Text(TEXT_HELP_2,"22px ProximaNovaRegular", "#ffffff");
        oText2.textAlign = "center";
        oText2.lineHeight = 30;
        oText2.x =  (CANVAS_WIDTH/2);
        oText2.y = 300;

        var oText3 = new createjs.Text(TEXT_HELP_3,"22px ProximaNovaRegular", "#ffffff");
        oText3.textAlign = "center";
        oText3.lineHeight = 30;
        oText3.x =  (CANVAS_WIDTH/2);
        oText3.y = 440;

        _oHelpBg = new createjs.Container();
        _oHelpBg.addChild(oHelpPng);
        _oHelpBg.addChild(oText1);
        _oHelpBg.addChild(oText2);
        _oHelpBg.addChild(oText3);
        _oHelpBg.on("pressup",function(){oParent._onExitHelp()});
        s_oStage.addChild(_oHelpBg);
    }

    this.unload = function(){
        // _oButExit.unload();       
        // _oButExit = null;
        
        _oButLeft.unload();
        _oButLeft = null;
        
        _oButRight.unload();
        _oButRight = null;
    };
    
    this._onExitHelp = function(){
        _oHelpBg.off("pressup");
        s_oStage.removeChild(_oHelpBg);
        this._onLoadReady(TEXT_READY)
        // _oHero.startAnim();
        // _bUpdate = true;
    };

    this._onLoadReady = function(inputText){

        if(_oReadyBg!= null)
        {
            s_oStage.removeChild(_oReadyBg);
        }

        var oHelpPng = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_help')); 

        var oText = new createjs.Text(inputText,"80px MontserratBold", "#ffffff");
        oText.textAlign = "center";
        oText.x =  (CANVAS_WIDTH/2);
        oText.y = (CANVAS_HEIGHT/2)-100;

        _oReadyBg = new createjs.Container();
        _oReadyBg.addChild(oHelpPng);
        _oReadyBg.addChild(oText);
        s_oStage.addChild(_oReadyBg);

        if(inputText == TEXT_READY)
        {
            inputText = 4; 
        }

         var _this = this;
        if(inputText > 0)
        {
            setTimeout(function(){
                _this._onLoadReady(inputText-1);
                }, 1000);
        }
        else
        {
            if(_timerVariable != null)
            {
               clearInterval(_timerVariable);
                _timerVariable = null;   
            }
            _timerVariable = setInterval(function(){
                _this.showTime();
            },1000);
           
            this._onLoadPlayGame(); 
        }  
    };

    this._onLoadRestart = function(){

        if(_oGameOverPanel != null)
        {
            s_oStage.removeChild(_oGameOverPanel); 
        }
        this.unLoadBtn();
        _bRestartMode = true;
        this._init();

        this._onLoadReady(TEXT_READY) ;
    }

    this._onLoadOtherGames = function(){
        alert("other games button clicked");
        console.log("Load other games button clicked");
    }

    this.unLoadBtn = function(){
        //  _oPlayAgain.unloadbtn();
        _oPlayAgain.setVisible(false);
        _oPlayAgain = null;

        // _oOtherGames.unloadbtn();
        _oOtherGames.setVisible(false);
        _oOtherGames = null;
    }

    this._onLoadPlayGame = function(){

        if(_oReadyBg != null)
        {
            s_oStage.removeChild(_oReadyBg); 
        }
        _oHero.startAnim();
        
        _bUpdate = true;
    };

    this._initLineObjects = function(){
        _aLineXPos = new Array(100,240,380);

         var oSprite = s_oSpriteLibrary.getSprite('road_tile');
         _oScrollingBg = new CScrollingBg(oSprite);
    };
    
     this._initObstacles = function(){
         
         _aObstaclePos = new Array();
         
         _aObstaclePos[0]  = [_aLineXPos[0]];
         _aObstaclePos[1]  = [_aLineXPos[1]];
         _aObstaclePos[2]  = [_aLineXPos[2]];
         _aObstaclePos[3]  = [_aLineXPos[0]];//,_aLineXPos[1]];
         _aObstaclePos[4]  = [_aLineXPos[1]];//,_aLineXPos[2]];
         _aObstaclePos[5]  = [_aLineXPos[2]];//,_aLineXPos[0]];
         _aObstaclePos[6]  = [_aLineXPos[0]];//,_aLineXPos[1]];
         _aObstaclePos[7]  = [_aLineXPos[1]];//,_aLineXPos[2]];
         _aObstaclePos[8]  = [_aLineXPos[2]];//,_aLineXPos[0]];
         _aObstaclePos[9]  = [_aLineXPos[2]];//,_aLineXPos[0]];
         _aObstaclePos[10] = [_aLineXPos[0]];//,_aLineXPos[1]];
         _aObstaclePos[11] = [_aLineXPos[1]];//,_aLineXPos[2]];
         _aObstaclePos[12] = [_aLineXPos[2]];//,_aLineXPos[0]];
         _aObstaclePos[13] = [_aLineXPos[0]];//,_aLineXPos[1]];
         _aObstaclePos[14] = [_aLineXPos[1]];//,_aLineXPos[2]];
         
         _aObstaclePos = shuffle(_aObstaclePos);
         
         _aObstacleInScene = new Array();
         _aCoinInScene = new Array();

         var oSprite = s_oSpriteLibrary.getSprite('enemy');

        // var cSprite = s_oSpriteLibrary.getSprite('coin');
        // var cSprite0 = s_oSpriteLibrary.getSprite('coin0');
        var cSprite1 = s_oSpriteLibrary.getSprite('coin1');
        // var cSprite2 = s_oSpriteLibrary.getSprite('coin2');
        // var cSprite5 = s_oSpriteLibrary.getSprite('coin5');
        // var cSprite10 = s_oSpriteLibrary.getSprite('coin10');

         var iCont = 0;
         var iYPos = -oSprite.height;

         function getOtherPos(pPos){
            var myArray = [100, 240, 380]; 
             var rand = myArray[Math.floor(Math.random() * myArray.length)];
             if(pPos == rand){
                getOtherPos(pPos);
             }else{
                return rand;
             }
         }
         
         while(iYPos > - (CANVAS_HEIGHT*8)){
             for(var k=0;k<_aObstaclePos[iCont].length;k++){
                 var oObstacle = new CObstacle(_aObstaclePos[iCont][k],iYPos,oSprite);
                   _aObstacleInScene.push(oObstacle);   

                    var rr = getOtherPos(_aObstaclePos[iCont][k]);
                   // if(_aObstaclePos[iCont][k]==240){rr=100;}
                   if(rr!=null){
                   // console.log("rrrrrrrrrrrrr"+rr)
                    var noOfCoins = Math.floor(1+Math.random() * 3);
                    for(var i=0; i< noOfCoins; i++){
                        var randomCoins = Math.floor(1+Math.random() * 4);
                        var dynamicCoin; 
                        // if(randomCoins==1)
                        // {
                        //     dynamicCoin = new CCoin(rr,iYPos-i*50,cSprite2);
                        //     dynamicCoin.value = 2;
                        // }
                        // else if(randomCoins==2)
                        // {
                        //     dynamicCoin = new CCoin(rr,iYPos-i*50,cSprite5);
                        //     dynamicCoin.value = 5;
                        // }
                        // else if(randomCoins==3)
                        // {
                        //     dynamicCoin = new CCoin(rr,iYPos-i*50,cSprite10);
                        //     dynamicCoin.value = 10;
                        // }
                        // else if(randomCoins==4)
                        // {
                        //     dynamicCoin = new CCoin(rr,iYPos-i*50,cSprite0);
                        //     dynamicCoin.value = -1;
                        // }
                        dynamicCoin = new CCoin(rr,iYPos-i*50,cSprite1);
                        dynamicCoin.value = 1;
                        _aCoinInScene.push(dynamicCoin); 
                    }
                }   
             }
             iYPos -= (ENEMY_HEIGHT + DISTANCE_AMONG_OBSTACLES);
             iCont++;
         }
     };
     
     this._increaseScore = function(coin){

        // console.log("Current Coin Value :"+coin.value);
        //  _iScore += SCORE_INCREASE;
        _iScore += coin.value;
        _oScoreText.text = TEXT_SCORE+": "+_iScore;
         
        //  _iScoreInterval += SCORE_INCREASE;
        //  if(_iScoreInterval>LEVEL_INCREASE){
        //     console.log("_iScoreInterval==="+_iScoreInterval);
        //     console.log("_iMaxHeroSpeed :"+_iMaxHeroSpeed);
        //      _iScoreInterval = 0;
        //      _iMaxHeroSpeed += 10;
        //  }
        if(PLAYING_TIME_SEC>LEVEL_INCREASE){
            console.log("_iScoreInterval==="+_iScoreInterval);
            console.log("_iMaxHeroSpeed :"+_iMaxHeroSpeed);
            //  _iScoreInterval = 0;
            PLAYING_TIME_SEC = 0;
             _iMaxHeroSpeed += 10;
         }
     };
     
     this._lifeLost = function(){
        _oHurt.visible = true;
        var oParent = this;
        
        createjs.Tween.get(_oHurt).to({alpha:0.6 }, 400).call(function() {oParent._resetHurt();});

        _iScore -= MALUS_SCORE;
        if(_iScore<0){
            _iScore = 0;
        }
        
        _oScoreText.text = TEXT_SCORE+": "+_iScore;
        
        _iLives--;

        if(_iLives === 0){
            this._gameOver();
        }else{
            s_oStage.removeChild(_aLifeSprites[_iLives]);
        }
    };
    
    this._resetHurt = function(){
        _oHurt.visible = false;
        _oHurt.alpha = 0.5;
    };
    
    this._gameOver = function(){
        _bUpdate = false;
        clearInterval(_iInterval);
        clearInterval(_timerVariable);

        if(_timerVariable != null)
        {
            _timerVariable = null;
        }
        PLAYING_TIME_SEC = 0;
        
        _oHero.stopAnim();
        for(var i=0;i<_aObstacleInScene.length;i++){
            _aObstacleInScene[i].stopAnim();
        }

         for(var i=0;i<_aCoinInScene.length;i++){
            _aCoinInScene[i].stopAnim();
        }
        
        // var oSprite = s_oSpriteLibrary.getSprite('msg_box');
      //  _oGameOverPanel = new CEndPanel(oSprite);
        // _oGameOverPanel.show(_iScore);

        var oHelpPng = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_help')); 

        var oText1 = new createjs.Text(TEXT_OOPS,"35px ProximaNovaSemibold", "#ffffff");
        oText1.textAlign = "center";
        oText1.x =  (CANVAS_WIDTH/2);
        oText1.y = (CANVAS_HEIGHT/2)-150;

        var oText2 = new createjs.Text(TEXT_LIVES,"25px ProximaNovaRegular", "#ffffff");
        oText2.textAlign = "center";
        oText2.x =  (CANVAS_WIDTH/2);
        oText2.y = (CANVAS_HEIGHT/2)-100;

        var oText3 = new createjs.Text("You lost "+_iScore+" EORS coins!,","25px ProximaNovaSemibold", "#FFFF00");
        oText3.textAlign = "center";
        oText3.x =  (CANVAS_WIDTH/2);
        oText3.y = (CANVAS_HEIGHT/2)-60;

        _oGameOverPanel = new createjs.Container();
        _oGameOverPanel.addChild(oHelpPng);
        _oGameOverPanel.addChild(oText1);
        _oGameOverPanel.addChild(oText2);
        _oGameOverPanel.addChild(oText3);
        s_oStage.addChild(_oGameOverPanel);

        var oSprite = s_oSpriteLibrary.getSprite('play_button2');
        // _oPlayAgain = new CGfxButton(CANVAS_WIDTH - oSprite.width - 10,(CANVAS_HEIGHT/2)-60,oSprite,PLAY_AGAIN,"Arial","#ffffff",20);
        _oPlayAgain = new CTextButton(CANVAS_WIDTH - (oSprite.width-40),(CANVAS_HEIGHT/2)+60,oSprite,PLAY_AGAIN,"Arial","#ffffff",20);
        _oPlayAgain.addEventListener(ON_MOUSE_UP, this._onLoadRestart, this);
        
        _oOtherGames = new CTextButton(CANVAS_WIDTH - (oSprite.width-40),(CANVAS_HEIGHT/2)+(oSprite.height)+60,oSprite,OTHER_GAMES,"Arial","#ffffff",20);
        _oOtherGames.addEventListener(ON_MOUSE_UP, this._onLoadOtherGames, this);
    };
    
    this._onReleaseLeft = function(){
        if(_iCurHeroX === 0 || _oHero.isTweening()){
            return;
        }
        
        _iCurHeroX--;
        _oHero.move(_aLineXPos[_iCurHeroX]/*,1-((NUM_LINES-_iCurHeroX)*0.2)*/);
    };
    
    this._onReleaseRight = function(){
        if(_iCurHeroX === NUM_LINES || _oHero.isTweening()){
            return;
        }
        
        _iCurHeroX++;
        _oHero.move(_aLineXPos[_iCurHeroX],1-((NUM_LINES-_iCurHeroX)*0.2));
    };
    
    this._onExit = function(){
        this.unload();
        
        s_oMain.gotoMenu();
		
		$(s_oMain).trigger("restart");
    };
    
    this._checkCollision = function(  oObstacle ){
        var vHeroPos        = _oHero.getPos();
        var vObstaclePos    = oObstacle.getPos();
        var fObstacleRadius = oObstacle.getRadius();
        
        var fDistance =  Math.sqrt( ( (vObstaclePos.x - vHeroPos.x)*(vObstaclePos.x - vHeroPos.x) ) + ( (vObstaclePos.y - vHeroPos.y)*(vObstaclePos.y - vHeroPos.y) ) );
        //trace("fDistance: "+fDistance);
        //trace("fObstacleRadius: "+fObstacleRadius);		
        if ( fDistance < fObstacleRadius ){
            return true;
        }else{
            return false;
        }
    };
    
    this._updateMove = function(){
       _iSpeed += ACCELLERATION;
       if(_iSpeed > _iMaxHeroSpeed){
          _iSpeed = _iMaxHeroSpeed;
       }
       _oScrollingBg.update(_iSpeed);  
    };
    
    this.updateObstacles = function(){
        for(var i=0;i<_aObstacleInScene.length;i++){
            _aObstacleInScene[i].update(_iSpeed);
            //console.log(_aObstacleInScene[i].getY() +"=="+_oHero.getY())
            if(_aObstacleInScene[i].getY() > 0){
                var scaleVal = 0.6 + (_aObstacleInScene[i].getY()/1200);
                 _aObstacleInScene[i].scaleObject(scaleVal);
            }
            if(_aObstacleInScene[i].getY() > (_oHero.getY()- 70)){
               
                _aObstacleInScene[i].tackle();
            }

            if( this._checkCollision(_aObstacleInScene[i])){
                _aObstacleInScene[i].reset();
                
               this._lifeLost();
            }else if(_aObstacleInScene[i].getY()>CANVAS_HEIGHT){
                _aObstacleInScene[i].reset();
            }
        }
    };


    this.updateCoins = function(){
        for(var i=0;i<_aCoinInScene.length;i++){
            _aCoinInScene[i].update(_iSpeed);

             if(_aCoinInScene[i].getY() > 0){
                var scaleVal = 0.3 + (_aCoinInScene[i].getY()/1600);
                 _aCoinInScene[i].scaleObject(scaleVal);
            }

            if(_aCoinInScene[i].getY() > (_oHero.getY()- 70)){
                _aCoinInScene[i].tackle();
            }

            if( this._checkCollision(_aCoinInScene[i])){

                var currentCoin = _aCoinInScene[i];
                _aCoinInScene[i].reset();
              // this._lifeLost();
              this._increaseScore(currentCoin);
            }
            else if(_aCoinInScene[i].getY()>CANVAS_HEIGHT){
                _aCoinInScene[i].reset();
            }
            
        }
    };
    
    this.update = function(){
        if(_bUpdate === false){
            return;
        }
        
        //_oFpsText.text = ""+s_iCurFps;
        
        this._updateMove();
        this.updateObstacles();   
        this.updateCoins(); 
    };
    
    s_oGame=this;
    
    this._init();
}

var s_oGame;
