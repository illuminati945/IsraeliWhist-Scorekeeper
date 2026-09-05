var U={STANDARD:{id:"STANDARD",nameEn:"Standard Israeli Whist (Quadratic)",nameHe:"Standard Israeli Whist",descriptionEn:"Exact Made: +10 + Bid\xB2 | Miss: -10 \xD7 diff | Zero: +50 down / +30 up, -50 + 10/trick | Hook Rule: On",descriptionHe:"\u05DE\u05D3\u05D5\u05D9\u05E7: 10 + \u05D4\u05DB\u05E8\u05D6\u05D4\xB2 | \u05D4\u05D7\u05D8\u05D0\u05D4: 10- \u05DC\u05DB\u05DC \u05D4\u05E4\u05E8\u05E9 | \u05D0\u05E4\u05E1: 50+ \u05D1\u05D7\u05E1\u05E8 / 30+ \u05D1\u05D9\u05EA\u05E8, 50- \u05D5-10+ \u05DC\u05DB\u05DC \u05DC\u05E7\u05D9\u05D7\u05D4 \u05E0\u05D5\u05E1\u05E4\u05EA | \u05D7\u05D5\u05E7 \u05D4\u05D4\u05D5\u05E7",bidMadeFormula:"QUADRATIC",missPenaltyRate:10,useProgressivePenalty:!1,passMadeScoreDown:50,passMadeScoreUp:30,passMadeScore:50,passMissPenalty:50,passMissBonusPerTrick:10,pasRoundTrickPenalty:10,pasRoundZeroBonus:50,enforceHookRule:!0,trumpMakerMissDoublePenalty:!1},PROGRESSIVE:{id:"PROGRESSIVE",nameEn:"Progressive Penalty (Tournament)",nameHe:"Progressive Penalty (Tournament)",descriptionEn:"Exact Made: +10 + Bid\xB2 | Miss: -5/-10/-15/-20 per trick by bid | Zero: +50 down / +30 up, -50 + 10/trick",descriptionHe:"\u05DE\u05D3\u05D5\u05D9\u05E7: 10 + \u05D4\u05DB\u05E8\u05D6\u05D4\xB2 | \u05D4\u05D7\u05D8\u05D0\u05D4 \u05E4\u05E8\u05D5\u05D2\u05E8\u05E1\u05D9\u05D1\u05D9\u05EA \u05DC\u05E4\u05D9 \u05D4\u05DB\u05E8\u05D6\u05D4 | \u05D0\u05E4\u05E1: 50+ \u05D1\u05D7\u05E1\u05E8 / 30+ \u05D1\u05D9\u05EA\u05E8, 50- \u05D5-10+ \u05DC\u05DB\u05DC \u05DC\u05E7\u05D9\u05D7\u05D4 \u05E0\u05D5\u05E1\u05E4\u05EA",bidMadeFormula:"QUADRATIC",missPenaltyRate:10,useProgressivePenalty:!0,progressiveRates:{1:5,2:5,3:5,4:5,5:10,6:15,7:20},passMadeScoreDown:50,passMadeScoreUp:30,passMadeScore:50,passMissPenalty:50,passMissBonusPerTrick:10,pasRoundTrickPenalty:10,pasRoundZeroBonus:50,enforceHookRule:!0,trumpMakerMissDoublePenalty:!1},CLASSIC_LINEAR:{id:"CLASSIC_LINEAR",nameEn:"Classic Linear (10 + 10xBid)",nameHe:"Classic Linear (10 + 10xBid)",descriptionEn:"Exact Made: +10 + (Bid \xD7 10) | Miss: -10 \xD7 diff | Zero: +50 down / +30 up, -50 + 10/trick",descriptionHe:"\u05DE\u05D3\u05D5\u05D9\u05E7: 10 + (10 \xD7 \u05D4\u05DB\u05E8\u05D6\u05D4) | \u05D4\u05D7\u05D8\u05D0\u05D4: 10- \u05DC\u05DB\u05DC \u05D4\u05E4\u05E8\u05E9 | \u05D0\u05E4\u05E1: 50+ \u05D1\u05D7\u05E1\u05E8 / 30+ \u05D1\u05D9\u05EA\u05E8, 50- \u05D5-10+ \u05DC\u05DB\u05DC \u05DC\u05E7\u05D9\u05D7\u05D4 \u05E0\u05D5\u05E1\u05E4\u05EA",bidMadeFormula:"LINEAR_10",missPenaltyRate:10,useProgressivePenalty:!1,passMadeScoreDown:50,passMadeScoreUp:30,passMissPenalty:50,passMissBonusPerTrick:10,pasRoundTrickPenalty:10,pasRoundZeroBonus:50,enforceHookRule:!0,trumpMakerMissDoublePenalty:!1}},le=[{id:"NT",symbol:"NT",nameEn:"No Trump",color:"#6366f1",rank:5},{id:"SPADES",symbol:"\u2660",nameEn:"Spades",color:"#94a3b8",rank:4},{id:"HEARTS",symbol:"\u2665",nameEn:"Hearts",color:"#f43f5e",rank:3},{id:"DIAMONDS",symbol:"\u2666",nameEn:"Diamonds",color:"#fbbf24",rank:2},{id:"CLUBS",symbol:"\u2663",nameEn:"Clubs",color:"#34d399",rank:1}];function V(k,e,s=!1,t=!1,i=U.STANDARD,n=13){if(t)if(e===0){let o=i.pasRoundZeroBonus||50;return{score:o,made:!0,delta:0,explanation:`0 tricks taken: +${o} bonus`}}else{let o=-(e*(i.pasRoundTrickPenalty||10));return{score:o,made:!1,delta:e,explanation:`${e} tricks taken \xD7 -${i.pasRoundTrickPenalty||10} = ${o}`}}if(k===e)if(k===0){let o=n>13,d=i.passMadeScoreDown??(i.passMadeScore||50),c=i.passMadeScoreUp??(i.passMadeScoreOver||30),m=o?c:d;return{score:m,made:!0,delta:0,explanation:`Bid 0 made (${o?"Up / \u05D9\u05EA\u05E8":"Down / \u05D7\u05E1\u05E8"}): +${m} pts`}}else{let o=0;return i.bidMadeFormula==="QUADRATIC"?o=10+k*k:i.bidMadeFormula==="LINEAR_10"?o=10+k*10:o=10+k*k,{score:o,made:!0,delta:0,explanation:`Bid ${k} made: 10 + (${k}\xB2) = +${o} pts`}}let a=Math.abs(e-k);if(k===0){let o=i.passMissPenalty??50,d=i.passMissBonusPerTrick??10,c=-o+(e-1)*d,m=e===1?`Bid 0 missed (1 trick): -${o} pts`:`Bid 0 missed (${e} tricks): -${o} + ${(e-1)*d} = ${c>=0?"+":""}${c} pts`;return{score:c,made:!1,delta:a,explanation:m}}let l=i.missPenaltyRate||10;if(i.useProgressivePenalty&&i.progressiveRates){let o=Math.min(Math.max(k,1),7);l=i.progressiveRates[o]||10}let r=-(a*l);return s&&i.trumpMakerMissDoublePenalty&&(r*=2),{score:r,made:!1,delta:a,explanation:`Bid ${k}, took ${e} (${a} diff \xD7 -${l}): ${r} pts`}}function Y(k){let e=k.reduce((s,t)=>s+(typeof t=="number"&&!isNaN(t)?t:0),0);return k.length===4&&k.every(s=>typeof s=="number"&&!isNaN(s))?e===13?{isValid:!1,sum:e,status:"HOOK_VIOLATION"}:{isValid:!0,sum:e,status:e>13?"OVER":"UNDER"}:{isValid:!0,sum:e,status:e>13?"OVER":"UNDER"}}function de(k){return k.length!==4?!1:k.reduce((s,t)=>s+(typeof t=="number"&&!isNaN(t)?t:0),0)===13}var ae="israeli_whist_current_game_v2",O=class k{constructor(e={}){this.id=e.id||"game_"+Date.now(),this.createdAt=e.createdAt||new Date().toISOString(),this.rules=e.rules||{...U.STANDARD},this.targetPoints=e.targetPoints||null,this.maxRounds=e.maxRounds||null,this.simplifiedMode=e.simplifiedMode!==void 0?e.simplifiedMode:!0,this.players=e.players||[{id:"p0",name:"Player 1",color:"#6366f1",initial:"1"},{id:"p1",name:"Player 2",color:"#10b981",initial:"2"},{id:"p2",name:"Player 3",color:"#f59e0b",initial:"3"},{id:"p3",name:"Player 4",color:"#ec4899",initial:"4"}],this.currentDealerIndex=e.currentDealerIndex??0,this.roundNumber=e.roundNumber||1,this.completedRounds=e.completedRounds||[],this.initialScores=Array.isArray(e.initialScores)?e.initialScores.map(s=>parseInt(s,10)||0):[0,0,0,0],this.activeRound=e.activeRound||this.initDraftRound(),this.status=e.status||"IN_PROGRESS",this.listeners=[]}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(s=>s!==e)}}notify(){this.saveToStorage();for(let e of this.listeners)e(this)}initDraftRound(){let e=this.currentDealerIndex,s=(e+1)%4;return{roundNumber:this.roundNumber,dealerIndex:e,leadBidderIndex:s,stage:this.simplifiedMode?"BETS":"TRUMP",trump:{winnerIndex:null,suitId:"NT",bidAmount:0,isPasRound:!1},bets:[null,null,null,null],tricks:[null,null,null,null],scores:[0,0,0,0],roundTotalBets:0,bettingMode:null,timestamp:new Date().toISOString()}}setSimplifiedMode(e){this.simplifiedMode=e,this.activeRound&&(e&&this.activeRound.stage==="TRUMP"?this.activeRound.stage="BETS":!e&&this.activeRound.stage==="BETS"&&this.activeRound.bets.every(s=>s===null)&&(this.activeRound.stage="TRUMP")),this.notify()}getFirstBidderIndex(){return!this.simplifiedMode&&this.activeRound.trump.winnerIndex!==null&&!this.activeRound.trump.isPasRound?this.activeRound.trump.winnerIndex:(this.currentDealerIndex+1)%4}getLastBidderIndex(){return this.simplifiedMode?null:(this.getFirstBidderIndex()+3)%4}getBiddingOrder(){let e=this.getFirstBidderIndex();return[e,(e+1)%4,(e+2)%4,(e+3)%4]}getForbiddenBetForLastBidder(){if(this.simplifiedMode)return null;let e=this.getLastBidderIndex();if(e===null)return null;let s=[];for(let t=0;t<4;t++)t!==e&&typeof this.activeRound.bets[t]=="number"&&!isNaN(this.activeRound.bets[t])&&s.push(this.activeRound.bets[t]);if(s.length===3){let i=13-s.reduce((n,a)=>n+a,0);if(i>=0&&i<=13)return i}return null}setTrump(e,s,t,i=!1){this.activeRound.trump={winnerIndex:i?null:e,suitId:i?"NT":s,bidAmount:i?0:t,isPasRound:i},!i&&e!==null&&typeof e=="number"&&(this.activeRound.bets[e]===null||this.activeRound.bets[e]<t)&&(this.activeRound.bets[e]=t),this.activeRound.stage="BETS",this.notify()}setBet(e,s){if(e<0||e>3)return;this.activeRound.bets[e]=s;let t=this.activeRound.bets.filter(n=>typeof n=="number"&&!isNaN(n)),i=t.reduce((n,a)=>n+a,0);if(this.activeRound.roundTotalBets=i,t.length===4){let n=Y(this.activeRound.bets);this.activeRound.bettingMode=n.status}else this.activeRound.bettingMode=i>13?"OVER":"UNDER";this.notify()}proceedToTricks(){if(this.activeRound.bets.filter(s=>typeof s=="number"&&!isNaN(s)).length!==4&&!this.activeRound.trump.isPasRound)throw new Error("All 4 players must submit bets.");if(this.rules.enforceHookRule&&!this.activeRound.trump.isPasRound&&!Y(this.activeRound.bets).isValid)throw new Error("Total bets cannot equal 13 (Hook Rule). Please adjust the bids.");this.activeRound.stage="TRICKS",this.notify()}setTricks(e,s){e<0||e>3||(this.activeRound.tricks[e]=s,this.notify())}autoFillTricksFromBids(){let e=[],s=-1;for(let t=0;t<4;t++)typeof this.activeRound.tricks[t]=="number"&&!isNaN(this.activeRound.tricks[t])?e.push(this.activeRound.tricks[t]):s=t;if(e.length===3&&s!==-1){let t=13-e.reduce((i,n)=>i+n,0);if(t>=0&&t<=13)return this.activeRound.tricks[s]=t,this.notify(),!0}for(let t=0;t<4;t++){let i=this.activeRound.bets[t];this.activeRound.tricks[t]=typeof i=="number"&&!isNaN(i)?i:0}return this.notify(),!0}commitRound(){let e=this.activeRound.tricks;if(!de(e))throw new Error("Total tricks must equal 13.");let s=[],t=this.activeRound.trump.isPasRound,i=this.activeRound.bets.reduce((a,l)=>a+(typeof l=="number"?l:0),0);for(let a=0;a<4;a++){let l=t?0:this.activeRound.bets[a],r=e[a],o=a===this.activeRound.trump.winnerIndex,d=V(l,r,o,t,this.rules,i);s.push({playerIndex:a,bid:l,tricks:r,score:d.score,made:d.made,delta:d.delta,explanation:d.explanation})}let n={...this.activeRound,simplified:this.simplifiedMode,results:s,scores:s.map(a=>a.score),cumulativeScores:this.calculateCumulativeAfterRound(s.map(a=>a.score)),completedAt:new Date().toISOString()};return this.completedRounds.push(n),this.checkGameEnd(),this.status!=="FINISHED"&&(this.currentDealerIndex=(this.currentDealerIndex+1)%4,this.roundNumber+=1,this.activeRound=this.initDraftRound()),this.notify(),n}calculateCumulativeAfterRound(e){return this.getCumulativeScores().map((t,i)=>t+e[i])}getCumulativeScores(){let e=[...this.initialScores];for(let s of this.completedRounds)for(let t=0;t<4;t++)e[t]+=s.scores&&typeof s.scores[t]=="number"?s.scores[t]:0;return e}setInitialScores(e){Array.isArray(e)&&e.length===4&&(this.initialScores=e.map(s=>parseInt(s,10)||0),this.recalculateAllScores())}recalculateAllScores(){let e=[...this.initialScores];for(let s=0;s<this.completedRounds.length;s++){let t=this.completedRounds[s],i=t.trump&&t.trump.isPasRound,n=r=>!t.simplified&&t.trump&&t.trump.winnerIndex===r,a=(t.bets||[]).reduce((r,o)=>r+(typeof o=="number"?o:0),0),l=[];for(let r=0;r<4;r++){let o=t.bets&&typeof t.bets[r]=="number"?t.bets[r]:0,d=t.tricks&&typeof t.tricks[r]=="number"?t.tricks[r]:0,c=V(o,d,n(r),i,this.rules,a);l.push({playerIndex:r,bid:o,tricks:d,score:c.score,made:c.made,explanation:c.explanation})}t.results=l,t.scores=l.map(r=>r.score),t.roundTotalBets=a,e=e.map((r,o)=>r+t.scores[o]),t.cumulativeScores=[...e]}this.checkGameEnd(),this.notify()}editCompletedRound(e,s={}){if(e<0||e>=this.completedRounds.length)throw new Error(`Invalid round index: ${e}`);let t=this.completedRounds[e];if(Array.isArray(s.bets)&&(t.bets=s.bets.map(i=>parseInt(i,10)||0),t.roundTotalBets=t.bets.reduce((i,n)=>i+n,0)),Array.isArray(s.tricks)){t.tricks=s.tricks.map(n=>parseInt(n,10)||0);let i=t.tricks.reduce((n,a)=>n+a,0);if(i!==13)throw new Error(`Total tricks must equal 13 (sum is ${i})`)}return s.dealerIndex!==void 0&&s.dealerIndex>=0&&s.dealerIndex<4&&(t.dealerIndex=s.dealerIndex,t.leadBidderIndex=(t.dealerIndex+1)%4),s.trump&&(t.trump={...t.trump,...s.trump}),this.recalculateAllScores(),t}deleteCompletedRound(e){if(e<0||e>=this.completedRounds.length)throw new Error(`Invalid round index: ${e}`);this.completedRounds.splice(e,1),this.completedRounds.forEach((s,t)=>{s.roundNumber=t+1}),this.roundNumber=this.completedRounds.length+1,this.activeRound&&(this.activeRound.roundNumber=this.roundNumber),this.recalculateAllScores()}getRankings(){let e=this.getCumulativeScores();return this.players.map((s,t)=>({index:t,player:s,score:e[t]})).sort((s,t)=>t.score-s.score)}checkGameEnd(){if(this.maxRounds&&this.completedRounds.length>=this.maxRounds){this.status="FINISHED";return}this.targetPoints&&this.getCumulativeScores().some(s=>s>=this.targetPoints)&&(this.status="FINISHED")}undoLastRound(){if(this.completedRounds.length===0)return!1;let e=this.completedRounds.pop();return this.roundNumber=e.roundNumber,this.currentDealerIndex=e.dealerIndex,this.activeRound={roundNumber:e.roundNumber,dealerIndex:e.dealerIndex,leadBidderIndex:e.leadBidderIndex,stage:"TRICKS",trump:{...e.trump},bets:[...e.bets],tricks:[...e.tricks],scores:[0,0,0,0],roundTotalBets:e.roundTotalBets,bettingMode:e.bettingMode,timestamp:e.timestamp},this.status="IN_PROGRESS",this.notify(),!0}updatePlayer(e,s,t){e>=0&&e<4&&(this.players[e]={...this.players[e],name:s||this.players[e].name,color:t||this.players[e].color},this.notify())}reorderPlayers(e){if(!Array.isArray(e)||e.length!==4)return;let s=[...this.players];this.players=e.map(i=>s[i]);let t=i=>i!=null&&i>=0&&i<4?e.indexOf(i):i;if(this.currentDealerIndex=t(this.currentDealerIndex),this.activeRound){if(this.activeRound.dealerIndex=t(this.activeRound.dealerIndex),this.activeRound.leadBidderIndex=(this.activeRound.dealerIndex+1)%4,this.activeRound.trump&&this.activeRound.trump.winnerIndex!==null&&(this.activeRound.trump.winnerIndex=t(this.activeRound.trump.winnerIndex)),Array.isArray(this.activeRound.bets)&&this.activeRound.bets.length===4){let i=[...this.activeRound.bets];this.activeRound.bets=e.map(n=>i[n])}if(Array.isArray(this.activeRound.tricks)&&this.activeRound.tricks.length===4){let i=[...this.activeRound.tricks];this.activeRound.tricks=e.map(n=>i[n])}if(Array.isArray(this.activeRound.scores)&&this.activeRound.scores.length===4){let i=[...this.activeRound.scores];this.activeRound.scores=e.map(n=>i[n])}}for(let i of this.completedRounds){if(i.dealerIndex=t(i.dealerIndex),i.leadBidderIndex!==void 0&&(i.leadBidderIndex=t(i.leadBidderIndex)),i.trump&&i.trump.winnerIndex!==null&&(i.trump.winnerIndex=t(i.trump.winnerIndex)),Array.isArray(i.scores)&&i.scores.length===4){let n=[...i.scores];i.scores=e.map(a=>n[a])}if(Array.isArray(i.cumulativeScores)&&i.cumulativeScores.length===4){let n=[...i.cumulativeScores];i.cumulativeScores=e.map(a=>n[a])}if(Array.isArray(i.results))for(let n of i.results)n.playerIndex=t(n.playerIndex)}if(Array.isArray(this.initialScores)&&this.initialScores.length===4){let i=[...this.initialScores];this.initialScores=e.map(n=>i[n])}this.notify()}swapPlayers(e,s){if(e===s||e<0||e>3||s<0||s>3)return;let t=this.players[e];if(this.players[e]=this.players[s],this.players[s]=t,Array.isArray(this.initialScores)&&this.initialScores.length===4){let n=this.initialScores[e];this.initialScores[e]=this.initialScores[s],this.initialScores[s]=n}let i=n=>n===e?s:n===s?e:n;if(this.currentDealerIndex=i(this.currentDealerIndex),this.activeRound){this.activeRound.dealerIndex=i(this.activeRound.dealerIndex),this.activeRound.leadBidderIndex=(this.activeRound.dealerIndex+1)%4,this.activeRound.trump&&this.activeRound.trump.winnerIndex!==null&&(this.activeRound.trump.winnerIndex=i(this.activeRound.trump.winnerIndex));let n=a=>{if(Array.isArray(a)&&a.length===4){let l=a[e];a[e]=a[s],a[s]=l}};n(this.activeRound.bets),n(this.activeRound.tricks),n(this.activeRound.scores)}for(let n of this.completedRounds){if(n.dealerIndex=i(n.dealerIndex),n.leadBidderIndex!==void 0&&(n.leadBidderIndex=i(n.leadBidderIndex)),n.trump&&n.trump.winnerIndex!==null&&(n.trump.winnerIndex=i(n.trump.winnerIndex)),Array.isArray(n.scores)&&n.scores.length===4){let a=n.scores[e];n.scores[e]=n.scores[s],n.scores[s]=a}if(Array.isArray(n.cumulativeScores)&&n.cumulativeScores.length===4){let a=n.cumulativeScores[e];n.cumulativeScores[e]=n.cumulativeScores[s],n.cumulativeScores[s]=a}if(Array.isArray(n.results))for(let a of n.results)a.playerIndex=i(a.playerIndex)}this.notify()}rotateSeatingClockwise(){let e=this.players[3];this.players=[e,this.players[0],this.players[1],this.players[2]];let s=t=>t!=null?(t+1)%4:t;if(this.currentDealerIndex=s(this.currentDealerIndex),this.activeRound){this.activeRound.dealerIndex=s(this.activeRound.dealerIndex),this.activeRound.leadBidderIndex=(this.activeRound.dealerIndex+1)%4,this.activeRound.trump&&this.activeRound.trump.winnerIndex!==null&&(this.activeRound.trump.winnerIndex=s(this.activeRound.trump.winnerIndex));let t=i=>[i[3],i[0],i[1],i[2]];this.activeRound.bets=t(this.activeRound.bets),this.activeRound.tricks=t(this.activeRound.tricks),this.activeRound.scores=t(this.activeRound.scores)}for(let t of this.completedRounds)if(t.dealerIndex=s(t.dealerIndex),t.leadBidderIndex!==void 0&&(t.leadBidderIndex=s(t.leadBidderIndex)),t.trump&&t.trump.winnerIndex!==null&&(t.trump.winnerIndex=s(t.trump.winnerIndex)),Array.isArray(t.scores)&&(t.scores=[t.scores[3],t.scores[0],t.scores[1],t.scores[2]]),Array.isArray(t.cumulativeScores)&&(t.cumulativeScores=[t.cumulativeScores[3],t.cumulativeScores[0],t.cumulativeScores[1],t.cumulativeScores[2]]),Array.isArray(t.results))for(let i of t.results)i.playerIndex=s(i.playerIndex);this.notify()}rotateSeatingCounterClockwise(){let e=this.players[0];this.players=[this.players[1],this.players[2],this.players[3],e];let s=t=>t!=null?(t+3)%4:t;if(this.currentDealerIndex=s(this.currentDealerIndex),this.activeRound){this.activeRound.dealerIndex=s(this.activeRound.dealerIndex),this.activeRound.leadBidderIndex=(this.activeRound.dealerIndex+1)%4,this.activeRound.trump&&this.activeRound.trump.winnerIndex!==null&&(this.activeRound.trump.winnerIndex=s(this.activeRound.trump.winnerIndex));let t=i=>[i[1],i[2],i[3],i[0]];this.activeRound.bets=t(this.activeRound.bets),this.activeRound.tricks=t(this.activeRound.tricks),this.activeRound.scores=t(this.activeRound.scores)}for(let t of this.completedRounds)if(t.dealerIndex=s(t.dealerIndex),t.leadBidderIndex!==void 0&&(t.leadBidderIndex=s(t.leadBidderIndex)),t.trump&&t.trump.winnerIndex!==null&&(t.trump.winnerIndex=s(t.trump.winnerIndex)),Array.isArray(t.scores)&&(t.scores=[t.scores[1],t.scores[2],t.scores[3],t.scores[0]]),Array.isArray(t.cumulativeScores)&&(t.cumulativeScores=[t.cumulativeScores[1],t.cumulativeScores[2],t.cumulativeScores[3],t.cumulativeScores[0]]),Array.isArray(t.results))for(let i of t.results)i.playerIndex=s(i.playerIndex);this.notify()}saveToStorage(){if(!(typeof localStorage>"u"))try{let e=JSON.stringify({id:this.id,createdAt:this.createdAt,rules:this.rules,targetPoints:this.targetPoints,maxRounds:this.maxRounds,simplifiedMode:this.simplifiedMode,players:this.players,currentDealerIndex:this.currentDealerIndex,roundNumber:this.roundNumber,completedRounds:this.completedRounds,initialScores:this.initialScores,activeRound:this.activeRound,status:this.status});localStorage.setItem(ae,e)}catch(e){console.warn("LocalStorage save failed:",e)}}static loadFromStorage(){if(typeof localStorage>"u")return new k;try{let e=localStorage.getItem(ae);if(e){let s=JSON.parse(e);return new k(s)}}catch(e){console.warn("LocalStorage load failed:",e)}return new k}static clearStorage(){if(!(typeof localStorage>"u"))try{localStorage.removeItem(ae)}catch(e){console.warn("LocalStorage clear failed:",e)}}exportJson(){return JSON.stringify({app:"Israeli Whist Scorekeeper",version:"1.0.0",exportedAt:new Date().toISOString(),session:{id:this.id,createdAt:this.createdAt,rules:this.rules,targetPoints:this.targetPoints,maxRounds:this.maxRounds,simplifiedMode:this.simplifiedMode,players:this.players,initialScores:this.initialScores,completedRounds:this.completedRounds,scores:this.getCumulativeScores(),rankings:this.getRankings()}},null,2)}};var X=class{constructor(e,s){this.app=e,this.onRemoteUpdate=s,this.roomId=this.detectRoomIdFromUrl(),this.ws=null,this.connected=!1,this.userCount=1,this.listeners=[],this.isApplyingRemote=!1,this.init()}detectRoomIdFromUrl(){let e=new URLSearchParams(window.location.search),s=e.get("game")||e.get("room");return!s&&window.location.hash&&(s=window.location.hash.replace("#","").trim()),s||this.generateFallbackCode()}generateFallbackCode(){let e="23456789ABCDEFGHJKLMNPQRSTUVWXYZ",s="";for(let t=0;t<4;t++)s+=e.charAt(Math.floor(Math.random()*e.length));return`W-${s}`}updateUrl(e){if(!e)return;let s=new URL(window.location.href);s.searchParams.set("game",e),window.history.replaceState({roomId:e},"",s.toString())}getShareUrl(){let e=new URL(window.location.href);return e.searchParams.set("game",this.roomId),e.toString()}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(s=>s!==e)}}notify(){for(let e of this.listeners)e({roomId:this.roomId,connected:this.connected,userCount:this.userCount,shareUrl:this.getShareUrl()})}init(){this.connectWebSocket()}connectWebSocket(){let e=window.location,s=e.protocol==="https:"?"wss:":"ws:",t="";e.pathname.startsWith("/whist-dev")?t="/whist-dev":e.pathname.startsWith("/whist")&&(t="/whist");let i=`${s}//${e.host}${t}/ws`;try{this.ws=new WebSocket(i),this.ws.onopen=()=>{this.connected=!0,this.notify(),this.joinRoom(this.roomId)},this.ws.onmessage=n=>{try{let a=JSON.parse(n.data);this.handleMessage(a)}catch(a){console.warn("Sync parse error:",a)}},this.ws.onclose=()=>{this.connected=!1,this.notify(),setTimeout(()=>this.connectWebSocket(),3e3)},this.ws.onerror=n=>{console.warn("WebSocket connection error:",n),this.connected=!1,this.notify()}}catch(n){console.warn("WebSocket init error:",n)}}joinRoom(e){this.roomId=e,this.updateUrl(e),this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"JOIN",roomId:e})),this.notify()}createNewRoom(){let e=this.generateFallbackCode();return this.roomId=e,this.updateUrl(e),this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"JOIN",roomId:e})),this.notify(),e}hasMeaningfulLocalState(){if(!this.app||!this.app.session)return!1;let e=this.app.session;if(e.completedRounds&&e.completedRounds.length>0||e.initialScores&&e.initialScores.some(i=>i!==0))return!0;let s=(i,n)=>!i||i===`Player ${n+1}`||i===`\u05E9\u05D7\u05E7\u05DF ${n+1}`;return!!((e.players||[]).some((i,n)=>!s(i.name,n))||e.activeRound&&(e.activeRound.bets&&e.activeRound.bets.some(i=>i!==null)||e.activeRound.tricks&&e.activeRound.tricks.some(i=>i!==null)))}handleMessage(e){e.type==="JOINED"?(this.userCount=e.userCount||1,this.notify(),e.state?(this.isApplyingRemote=!0,this.onRemoteUpdate(e.state),this.isApplyingRemote=!1):this.hasMeaningfulLocalState()&&this.broadcastLocalState()):e.type==="USER_COUNT_CHANGED"?(this.userCount=e.userCount||1,this.notify()):e.type==="STATE_UPDATED"&&(e.state&&(this.isApplyingRemote=!0,this.onRemoteUpdate(e.state),this.isApplyingRemote=!1),e.userCount&&(this.userCount=e.userCount,this.notify()))}broadcastLocalState(){if(this.isApplyingRemote||!this.ws||this.ws.readyState!==WebSocket.OPEN||!this.hasMeaningfulLocalState())return;let e={id:this.app.session.id,createdAt:this.app.session.createdAt,rules:this.app.session.rules,targetPoints:this.app.session.targetPoints,maxRounds:this.app.session.maxRounds,simplifiedMode:this.app.session.simplifiedMode,players:this.app.session.players,currentDealerIndex:this.app.session.currentDealerIndex,roundNumber:this.app.session.roundNumber,completedRounds:this.app.session.completedRounds,initialScores:this.app.session.initialScores,activeRound:this.app.session.activeRound,status:this.app.session.status};this.ws.send(JSON.stringify({type:"SYNC_STATE",roomId:this.roomId,state:e}))}switchRoom(e){this.joinRoom(e)}};var Z="israeli_whist_recent_games_v1";var F=[],z=class{static getRecentGames(){if(F&&F.length>0)return F;if(typeof localStorage>"u")return[];try{let e=localStorage.getItem(Z);if(e)return F=JSON.parse(e),F}catch(e){console.warn("Failed to read recent games archive:",e)}return[]}static getBasePath(){if(typeof window>"u")return"";let e=window.location;return e.pathname.startsWith("/whist-dev")?"/whist-dev":e.pathname.startsWith("/whist")?"/whist":""}static async syncWithServer(e=null){try{let t=`${this.getBasePath()}/api/recent-games`,i=await fetch(t);if(i.ok){let n=await i.json();if(n&&n.success&&Array.isArray(n.games)){let a=n.games,l=this.getRecentGames(),r=new Map;l.forEach(d=>{d&&d.roomId&&r.set(d.roomId,d)}),a.forEach(d=>{d&&d.roomId&&r.set(d.roomId,d)});let o=Array.from(r.values()).sort((d,c)=>new Date(c.updatedAt||c.createdAt)-new Date(d.updatedAt||d.createdAt)).slice(0,10);if(F=o,typeof localStorage<"u")try{localStorage.setItem(Z,JSON.stringify(o))}catch{}return e&&e(o),o}}}catch(t){console.warn("Error syncing recent games with server:",t)}let s=this.getRecentGames();return e&&e(s),s}static saveGameToArchive(e,s){if(!e)return;let t=e.completedRounds?e.completedRounds.length:0,i=(r,o)=>!r||r===`Player ${o+1}`||r===`\u05E9\u05D7\u05E7\u05DF ${o+1}`,n=(e.players||[]).some((r,o)=>!i(r.name,o)),a=e.initialScores&&e.initialScores.some(r=>r!==0),l=e.activeRound&&(e.activeRound.bets&&e.activeRound.bets.some(r=>r!==null)||e.activeRound.tricks&&e.activeRound.tricks.some(r=>r!==null));if(!(t===0&&!n&&!l&&!a))try{let r=this.getRecentGames(),o=e.getCumulativeScores(),d=e.getRankings(),c=d.length>0?d[0]:null,m={roomId:s||e.id||"W-LOCAL",id:e.id,createdAt:e.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),roundNumber:e.roundNumber,completedRoundsCount:e.completedRounds?e.completedRounds.length:0,status:e.status||"IN_PROGRESS",simplifiedMode:e.simplifiedMode,players:e.players.map((S,v)=>({name:S.name,color:S.color,score:o[v]||0})),leaderName:c?c.player.name:e.players[0].name,leaderScore:c?c.score:0,fullState:{id:e.id,createdAt:e.createdAt,rules:e.rules,targetPoints:e.targetPoints,maxRounds:e.maxRounds,simplifiedMode:e.simplifiedMode,players:e.players,currentDealerIndex:e.currentDealerIndex,roundNumber:e.roundNumber,completedRounds:e.completedRounds,initialScores:e.initialScores,activeRound:e.activeRound,status:e.status}},u=r.filter(S=>S.roomId!==m.roomId&&S.id!==m.id),p=[m,...u].slice(0,10);F=p,typeof localStorage<"u"&&localStorage.setItem(Z,JSON.stringify(p));let b=`${this.getBasePath()}/api/session/${m.roomId}`;fetch(b,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m.fullState)}).then(S=>S.json()).then(S=>{S&&S.rejected&&S.session&&typeof window<"u"&&window.__ISRAELI_WHIST_APP__&&(console.warn("[Sync] Server had an authoritative session; restoring state locally."),window.__ISRAELI_WHIST_APP__.applyRemoteState(S.session))}).catch(()=>{})}catch(r){console.warn("Failed to save game to archive:",r)}}static deleteGame(e){try{let t=this.getRecentGames().filter(n=>n.roomId!==e&&n.id!==e);F=t,typeof localStorage<"u"&&localStorage.setItem(Z,JSON.stringify(t));let i=`${this.getBasePath()}/api/delete-session/${e}`;fetch(i).catch(()=>{})}catch(s){console.warn("Failed to delete game from archive:",s)}}static formatTimestamp(e){if(!e)return"";try{let s=new Date(e),t=new Date,i=s.toDateString()===t.toDateString(),n=s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return i?`Today at ${n}`:`${s.toLocaleDateString([],{month:"short",day:"numeric"})} \u2022 ${n}`}catch{return e}}};var ce="israeli_whist_profiles_v1",ue="israeli_whist_last_lineup_v1",N=["\u{1F98A}","\u{1F981}","\u{1F42F}","\u{1F43C}","\u{1F428}","\u{1F985}","\u{1F989}","\u{1F43A}","\u{1F451}","\u{1F0CF}","\u{1F680}","\u2B50","\u{1F525}","\u26A1","\u{1F48E}","\u{1F3AF}","\u{1F3A9}","\u{1F984}","\u{1F432}","\u{1F431}","\u{1F436}","\u{1F355}","\u{1F3AE}","\u{1F3C6}"],G=["#6366f1","#ec4899","#10b981","#f59e0b","#06b6d4","#8b5cf6","#ef4444","#14b8a6","#f97316","#3b82f6"],pe=[{id:"prof_default_1",name:"\u05E2\u05D5\u05DE\u05E8",avatar:"\u{1F98A}",color:"#6366f1",gamesPlayed:5,wins:2,totalScore:320,zeroBids:4,zeroHits:3,lastPlayed:"2026-09-03T10:00:00Z"},{id:"prof_default_2",name:"\u05D3\u05E0\u05D9\u05D0\u05DC",avatar:"\u{1F981}",color:"#ec4899",gamesPlayed:5,wins:1,totalScore:210,zeroBids:3,zeroHits:2,lastPlayed:"2026-09-03T10:00:00Z"},{id:"prof_default_3",name:"\u05D8\u05DC",avatar:"\u{1F451}",color:"#10b981",gamesPlayed:5,wins:1,totalScore:195,zeroBids:2,zeroHits:2,lastPlayed:"2026-09-03T10:00:00Z"},{id:"prof_default_4",name:"\u05DE\u05D9\u05D4",avatar:"\u2B50",color:"#f59e0b",gamesPlayed:5,wins:1,totalScore:180,zeroBids:1,zeroHits:1,lastPlayed:"2026-09-03T10:00:00Z"}],W=null,M=class{static getProfiles(){if(W)return W;let e=[];if(typeof localStorage<"u")try{let s=localStorage.getItem(ce);if(s){let t=JSON.parse(s);Array.isArray(t)&&t.length>0&&(e=t)}}catch(s){console.warn("Failed to parse saved profiles from localStorage:",s)}if(!e||e.length===0){let s=new Set;try{let t=typeof localStorage<"u"?JSON.parse(localStorage.getItem("israeli_whist_recent_games_v1")||"[]"):[];Array.isArray(t)&&t.forEach(i=>{i&&Array.isArray(i.players)&&i.players.forEach(n=>{n&&n.name&&!s.has(n.name.trim().toLowerCase())&&(s.add(n.name.trim().toLowerCase()),e.push({id:`prof_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,name:n.name.trim(),avatar:n.avatar||N[e.length%N.length],color:n.color||G[e.length%G.length],gamesPlayed:1,wins:0,totalScore:n.score||0,zeroBids:0,zeroHits:0,lastPlayed:i.updatedAt||new Date().toISOString()}))})})}catch{}e.length===0&&(e=[...pe]),this.saveToStorage(e)}return W=e,W}static getProfile(e){return this.getProfiles().find(t=>t.id===e)||null}static getProfileByName(e){if(!e)return null;let s=e.trim().toLowerCase();return this.getProfiles().find(i=>i.name.trim().toLowerCase()===s)||null}static saveProfile(e){let s=this.getProfiles(),t=new Date().toISOString(),i=-1;e.id?i=s.findIndex(a=>a.id===e.id):e.name&&(i=s.findIndex(a=>a.name.trim().toLowerCase()===e.name.trim().toLowerCase()));let n=null;if(i>=0)s[i]={...s[i],...e,name:e.name.trim(),avatar:e.avatar||s[i].avatar||"\u{1F98A}",color:e.color||s[i].color||G[i%G.length],lastPlayed:t},n=s[i];else{let l={id:e.id||`prof_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,name:e.name.trim(),avatar:e.avatar||N[s.length%N.length],color:e.color||G[s.length%G.length],gamesPlayed:e.gamesPlayed||0,wins:e.wins||0,totalScore:e.totalScore||0,zeroBids:e.zeroBids||0,zeroHits:e.zeroHits||0,lastPlayed:t};s.unshift(l),n=l}return this.saveToStorage(s),n}static deleteProfile(e){let s=this.getProfiles();s=s.filter(t=>t.id!==e),this.saveToStorage(s)}static recordGameCompletion(e){if(!e||!e.players||!e.completedRounds||e.completedRounds.length===0)return;let t=e.completedRounds[e.completedRounds.length-1].cumulativeScores||[0,0,0,0],i=-1/0,n=0;t.forEach((l,r)=>{l>i&&(i=l,n=r)});let a=e.players.map((l,r)=>({name:l.name,color:l.color,avatar:l.avatar||this.getProfileByName(l.name)?.avatar||N[r%N.length]}));this.saveLastLineup(a),e.players.forEach((l,r)=>{let o=this.getProfileByName(l.name);o||(o=this.saveProfile({name:l.name,color:l.color,avatar:l.avatar||N[r%N.length]}));let d=0,c=0;e.completedRounds.forEach(m=>{(m.bets||m.bids||[])[r]===0&&(d++,m.tricks&&m.tricks[r]===0&&c++)}),o.gamesPlayed=(o.gamesPlayed||0)+1,r===n&&(o.wins=(o.wins||0)+1),o.totalScore=(o.totalScore||0)+t[r],o.zeroBids=(o.zeroBids||0)+d,o.zeroHits=(o.zeroHits||0)+c,o.lastPlayed=new Date().toISOString()}),this.saveToStorage(W)}static getLastLineup(){if(typeof localStorage>"u")return null;try{let e=localStorage.getItem(ue);if(e)return JSON.parse(e)}catch(e){console.warn("Failed to get last lineup:",e)}return null}static saveLastLineup(e){if(!(typeof localStorage>"u"||!Array.isArray(e)))try{localStorage.setItem(ue,JSON.stringify(e))}catch{}}static saveToStorage(e){if(W=e,typeof localStorage<"u")try{localStorage.setItem(ce,JSON.stringify(e))}catch(s){console.warn("Failed to save profiles to localStorage:",s)}}};var Q=class{constructor(e,s){this.app=e,this.container=s}render(){if(!this.container)return;let e=this.app.i18n,s=e.lang==="he",t=z.getRecentGames(),i=M.getProfiles(),n=`
      <div class="landing-hero">
        <div class="landing-badge">\u2660\uFE0F \u2665\uFE0F \u2663\uFE0F \u2666\uFE0F ${s?"\u05D5\u05D5\u05D9\u05E1\u05D8 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9":"ISRAELI WHIST"}</div>
        <h1 class="landing-title">${s?"\u05DE\u05D7\u05E9\u05D1\u05D5\u05DF \u05E0\u05D9\u05E7\u05D5\u05D3":"Scorekeeper"}</h1>
        <p class="landing-subtitle">
          ${e.landingSubtitle}
        </p>

        <div class="landing-actions">
          <button class="btn-block btn-hero-start" id="landing-btn-new-game">
            \u{1F3B2} ${e.startNewMatch}
          </button>

          <button class="btn-outline" id="landing-btn-profiles" style="margin-top: 0.5rem; width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; font-weight: 700; border-color: rgba(99, 102, 241, 0.4); color: #c7d2fe; height: 40px; font-size: 0.85rem;">
            \u{1F465} ${e.playerProfiles}
          </button>
          
          <div class="join-box" style="margin-top: 0.5rem;">
            <input type="text" class="input-field join-input" id="landing-txt-room" placeholder="${e.roomCodePlaceholder}" maxlength="12" />
            <button class="btn-pill btn-share" id="landing-btn-join" style="height: 42px; padding: 0 16px; font-size: 0.85rem;">
              ${e.joinRoom}
            </button>
          </div>
        </div>

        ${i.length>0?`
          <div style="margin-top: 0.85rem; padding: 0.55rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.45rem; overflow-x: auto; -webkit-overflow-scrolling: touch; padding: 2px 0;">
              ${i.slice(0,6).map(a=>`
                <span style="display: inline-flex; align-items: center; gap: 3px; font-size: 0.76rem; background: rgba(255,255,255,0.06); padding: 3px 7px; border-radius: var(--radius-full); white-space: nowrap;">
                  <span>${a.avatar}</span>
                  <span style="font-weight: 600; color: var(--text-primary);">${a.name}</span>
                </span>
              `).join("")}
              ${i.length>6?`<span style="font-size: 0.72rem; color: var(--text-muted); white-space: nowrap;">+${i.length-6}</span>`:""}
            </div>
            <button class="btn-pill" id="landing-btn-quick-manage-profiles" title="${e.playerProfiles}" style="font-size: 0.72rem; height: 26px; padding: 0 8px; flex-shrink: 0;">
              \u2699\uFE0F
            </button>
          </div>
        `:""}
      </div>

      <!-- Recent Saved Games Section -->
      ${t.length>0?`
        <div class="card" style="margin-top: 1.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <h2 style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
              \u{1F4C2} ${e.recentMatches} (${t.length})
            </h2>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.65rem;">
            ${t.slice(0,5).map((a,l)=>{let r=z.formatTimestamp(a.updatedAt||a.createdAt);return`
                <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="room-pill" style="font-size: 0.7rem;">${a.roomId}</span>
                      <span style="font-size: 0.72rem; color: var(--text-secondary);">${r}</span>
                    </div>
                    <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted);">
                      ${a.completedRoundsCount} ${e.deals}
                    </span>
                  </div>

                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem;">
                    ${a.players.map(o=>`
                      <span style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.75rem; display: inline-flex; align-items: center; gap: 3px;">
                        <span class="player-dot" style="background: ${o.color};"></span>
                        <span>${o.name}:</span>
                        <strong class="signed-score" dir="ltr" style="color: ${o.score>=0?"var(--success)":"var(--danger)"}; direction: ltr; unicode-bidi: isolate;">${o.score>=0?"+":""}${o.score}</strong>
                      </span>
                    `).join("")}
                  </div>

                  <div style="display: flex; justify-content: flex-end;">
                    <button class="btn-pill btn-share btn-landing-resume" data-game-idx="${l}" style="font-size: 0.75rem; padding: 0 12px; height: 30px;">
                      ${e.resumeMatch}
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      `:""}

      <!-- Rules Quick Guide -->
      <div class="card" style="margin-top: 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;" id="landing-rules-toggle">
          <h3 style="font-size: 0.9rem; font-weight: 700;">${e.quickRulesTitle}</h3>
          <span style="font-size: 0.85rem; color: var(--text-muted);" id="landing-rules-arrow">\u25BC</span>
        </div>

        <div id="landing-rules-body" style="display: none; margin-top: 0.85rem; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
          ${s?`
            <p style="margin-bottom: 0.5rem;"><strong>1. \u05D7\u05D9\u05E9\u05D5\u05D1 \u05D4\u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05E8\u05D2\u05D9\u05DC:</strong></p>
            <ul style="padding-right: 1.2rem; margin-bottom: 0.75rem;">
              <li>\u05E2\u05DE\u05D9\u05D3\u05D4 \u05D1\u05D7\u05D5\u05D6\u05D4 (\u05DE\u05E2\u05DC 0): <strong>10 + \u05D4\u05DB\u05E8\u05D6\u05D4\xB2</strong> \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA (\u05DC\u05D3\u05D5\u05D2\u05DE\u05D4: \u05D4\u05DB\u05E8\u05D6\u05D4 4 \u05E9\u05E2\u05DE\u05D3\u05D4 = +26).</li>
              <li>\u05E2\u05DE\u05D9\u05D3\u05D4 \u05D1\u05D4\u05DB\u05E8\u05D6\u05D4 0: <strong>50+</strong> \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05D1\u05D7\u05E1\u05E8 (\u05E4\u05D7\u05D5\u05EA \u05DE-13) \u05D0\u05D5 <strong>30+</strong> \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05D1\u05D9\u05EA\u05E8 (\u05DE\u05E2\u05DC 13).</li>
              <li>\u05E0\u05E4\u05D9\u05DC\u05D4 \u05DE\u05D7\u05D5\u05D6\u05D4: <strong>10- \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA</strong> \u05E2\u05DC \u05DB\u05DC \u05DC\u05E7\u05D9\u05D7\u05D4 \u05E9\u05DC \u05E4\u05E1\u05E4\u05D5\u05E1.</li>
              <li>\u05E0\u05E4\u05D9\u05DC\u05D4 \u05DE\u05D4\u05DB\u05E8\u05D6\u05D4 0 (\u05DC\u05E7\u05D7 $T > 0$): <strong>-50</strong> \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05D5-<strong>10+</strong> \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05E2\u05DC \u05DB\u05DC \u05DC\u05E7\u05D9\u05D7\u05D4 \u05E9\u05E0\u05DC\u05E7\u05D7\u05D4 (\u05DC\u05D3\u05D5\u05D2\u05DE\u05D4: 2 \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA = 40-).</li>
            </ul>

            <p style="margin-bottom: 0.5rem;"><strong>2. \u05D7\u05D5\u05E7 \u05D4\u05D4\u05D5\u05E7 (\u05D7\u05D5\u05E7 \u05D4\u05DE\u05D7\u05DC\u05E7):</strong></p>
            <p style="margin-bottom: 0.75rem;">
              \u05E1\u05DA \u05DB\u05DC 4 \u05D4\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA <em>\u05D0\u05D9\u05E0\u05D5 \u05D9\u05DB\u05D5\u05DC</em> \u05DC\u05D4\u05D9\u05D5\u05EA 13 (\u05DE\u05E1\u05E4\u05E8 \u05D4\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D1\u05E1\u05D9\u05D1\u05D5\u05D1). \u05E2\u05DC \u05D4\u05DE\u05DB\u05E8\u05D9\u05D6 \u05D4\u05D0\u05D7\u05E8\u05D5\u05DF \u05D0\u05E1\u05D5\u05E8 \u05DC\u05D4\u05DB\u05E8\u05D9\u05D6 \u05D0\u05EA \u05D4\u05DE\u05E1\u05E4\u05E8 \u05E9\u05D9\u05E9\u05DC\u05D9\u05DD \u05D0\u05EA \u05D4\u05E1\u05DB\u05D5\u05DD \u05DC-13.
            </p>

            <p style="margin-bottom: 0.5rem;"><strong>3. \u05DE\u05E6\u05D1 \u05E4\u05E9\u05D5\u05D8 (Simplified):</strong></p>
            <p>
              \u05DE\u05D3\u05DC\u05D2 \u05E2\u05DC \u05E9\u05DC\u05D1 \u05DE\u05DB\u05E8\u05D6 \u05D4\u05E9\u05DC\u05D9\u05D8. \u05D4\u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05DE\u05D6\u05D9\u05E0\u05D9\u05DD \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA \u05D0\u05EA \u05D4\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D5\u05D0\u05EA \u05D4\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D1\u05E4\u05D5\u05E2\u05DC.
            </p>
          `:`
            <p style="margin-bottom: 0.5rem;"><strong>1. Standard Scoring:</strong></p>
            <ul style="padding-left: 1.2rem; margin-bottom: 0.75rem;">
              <li>Exact Bid ($B > 0$): <strong>+10 + B\xB2</strong> points (e.g. Bid 4 made = +26).</li>
              <li>Exact Zero ($B = 0$): <strong>+50</strong> points when Down ($< 13$) or <strong>+30</strong> points when Up ($> 13$).</li>
              <li>Missed Bid: <strong>-10 \xD7 |Actual - Bid|</strong> points.</li>
              <li>Failed Zero ($B = 0$, took $T > 0$): <strong>-50</strong> points + <strong>10</strong> points per trick taken (e.g. 2 tricks = -40).</li>
            </ul>

            <p style="margin-bottom: 0.5rem;"><strong>2. The Hook Rule:</strong></p>
            <p style="margin-bottom: 0.75rem;">
              The sum of all 4 bids can <em>never</em> equal 13 (the number of tricks in a deal). The last bidder is prohibited from bidding the exact number that would make the total equal 13.
            </p>

            <p style="margin-bottom: 0.5rem;"><strong>3. Simplified Mode:</strong></p>
            <p>
              Skips the Trump Auction phase entirely. Players simply input bids and actual tricks taken.
            </p>
          `}
        </div>
      </div>
    `;this.container.innerHTML=n,this.bindEvents(t)}bindEvents(e){let s=this.container.querySelector("#landing-btn-new-game");s&&s.addEventListener("click",()=>{this.app.dialogs.showNewGameModal()});let t=this.container.querySelector("#landing-btn-profiles");t&&t.addEventListener("click",()=>{this.app.dialogs.showProfilesModal(()=>this.render())});let i=this.container.querySelector("#landing-btn-quick-manage-profiles");i&&i.addEventListener("click",()=>{this.app.dialogs.showProfilesModal(()=>this.render())});let n=this.container.querySelector("#landing-btn-join"),a=this.container.querySelector("#landing-txt-room");if(n&&a){let d=()=>{let c=a.value.trim().toUpperCase();if(!c){alert("Please enter a valid room code or link");return}if(c.includes("game=")){let m=c.match(/game=([A-Za-z0-9_-]+)/);m&&(c=m[1])}!c.startsWith("W-")&&c.length===4&&(c=`W-${c}`),this.app.joinRoomByCode(c)};n.addEventListener("click",d),a.addEventListener("keydown",c=>{c.key==="Enter"&&d()})}this.container.querySelectorAll(".btn-landing-resume").forEach(d=>{d.addEventListener("click",()=>{let c=parseInt(d.dataset.gameIdx,10),m=e[c];m&&this.app.resumeGameFromArchive(m)})});let l=this.container.querySelector("#landing-rules-toggle"),r=this.container.querySelector("#landing-rules-body"),o=this.container.querySelector("#landing-rules-arrow");l&&r&&l.addEventListener("click",()=>{let d=r.style.display==="none";r.style.display=d?"block":"none",o&&(o.textContent=d?"\u25B2":"\u25BC")})}};function q(){if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(8)}catch{}}var K=class{constructor(e,s,t,i){this.session=e,this.container=s,this.i18n=t,this.onRoundComplete=i,this.render()}updateSession(e){this.session=e,this.render()}updateI18n(e){this.i18n=e,this.render()}render(){if(!this.container)return;let e=this.i18n,s=this.session.activeRound,t=s.stage,i=this.session.simplifiedMode,n="";i?n=t==="BETS"?e.stageBets:e.stageTricks:n=t==="TRUMP"?e.stageTrump:t==="BETS"?e.stageBetsFull:e.stageTricksFull;let a=`
      <div class="card">
        <div class="stage-header">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <div class="stage-title">${n}</div>
            <button class="btn-pill" id="btn-toggle-simplified" title="Toggle Mode" style="font-size: 0.72rem; height: 26px; padding: 0 8px; background: ${i?"rgba(16, 185, 129, 0.15)":"rgba(99, 102, 241, 0.15)"}; border-color: ${i?"rgba(16, 185, 129, 0.4)":"rgba(99, 102, 241, 0.4)"}; color: ${i?"#a7f3d0":"#c7d2fe"};">
              ${i?e.simplified:e.fullTrump}
            </button>
          </div>
          <div class="round-pill">
            ${e.deal} #${this.session.roundNumber}
          </div>
        </div>
    `;t==="TRUMP"&&!i?a+=this.renderTrumpStage(s):t==="BETS"?a+=this.renderBetsStage(s,i):t==="TRICKS"&&(a+=this.renderTricksStage(s,i)),a+="</div>",this.container.innerHTML=a,this.bindEvents(t,i)}renderTrumpStage(e){let s=this.i18n,t=s.lang==="he",i=this.session.players[e.dealerIndex],n=this.session.players[e.leadBidderIndex];return`
      <div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.85rem; display: flex; justify-content: space-between;">
          <span>${s.dealer}: <strong>${i.name}</strong></span>
          <span>${s.lead}: <strong>${n.name}</strong></span>
        </div>

        <div class="trump-stage-layout">
          <div class="trump-stage-col">
            <div class="stage-section-title">${s.auctionWinner}</div>
            <div class="trump-grid-2x2">
              ${this.session.players.map((a,l)=>`
                <button class="btn-outline trump-player-btn ${e.trump.winnerIndex===l?"active":""}" 
                        data-player-idx="${l}"
                        style="${e.trump.winnerIndex===l?"border-color: var(--accent-primary); background: var(--accent-primary); color: white;":""}">
                  ${a.avatar?`<span class="player-avatar-mini" style="border-color: ${a.color}; background: ${a.color}22;">${a.avatar}</span>`:`<span class="player-dot" style="background: ${a.color};"></span>`}
                  <span>${a.name}</span>
                </button>
              `).join("")}
            </div>

            <div class="pas-round-box" style="margin-bottom: 0.85rem; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
                <input type="checkbox" id="chk-pas-round" ${e.trump.isPasRound?"checked":""} style="width: 18px; height: 18px;">
                <span style="font-size: 0.85rem; font-weight: 600;">${s.pasRound}</span>
              </label>
            </div>
          </div>

          <div class="trump-stage-col">
            <div class="stage-section-title">${s.denomination}</div>
            <div class="suits-row">
              ${le.map(a=>`
                <div class="suit-option ${e.trump.suitId===a.id&&!e.trump.isPasRound?"active":""}" data-suit-id="${a.id}">
                  <span class="suit-symbol" style="color: ${e.trump.suitId===a.id?"#ffffff":a.color}">${a.symbol}</span>
                  <span class="suit-label">${t?a.nameHe:a.nameEn}</span>
                </div>
              `).join("")}
            </div>

            <div class="stage-section-title">${s.winningTarget}</div>
            <div class="trump-targets-grid">
              ${[5,6,7,8,9,10,11,12,13].map(a=>`
                <button class="chip ${e.trump.bidAmount===a&&!e.trump.isPasRound?"active":""} trump-target-chip" data-amount="${a}">
                  ${a}
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <button class="btn-block" id="btn-confirm-trump" ${e.trump.winnerIndex===null&&!e.trump.isPasRound?"disabled":""}>
          ${s.confirmTrump}
        </button>
      </div>
    `}renderBetsStage(e,s){let t=this.i18n,i=this.session.getLastBidderIndex(),n=i!==null?this.session.players[i]:null,a=this.session.getForbiddenBetForLastBidder(),l=Y(e.bets),r=e.bets.reduce((u,p)=>u+(typeof p=="number"&&!isNaN(p)?p:0),0),o=e.bets.every(u=>typeof u=="number"&&!isNaN(u)),d=this.session.players[e.dealerIndex],c=e.trump.winnerIndex!==null?this.session.players[e.trump.winnerIndex]:null,m="";return s?o&&r===13?m=t.hookViolation:m=`${t.totalBids}: <strong>${r}</strong> (${r>13?t.over:r<13?t.under:"13"})`:a!==null&&n?m=`${t.totalBids}: <strong>${r}</strong> \u2022 ${t.lastBidder} (${n.name}) ${t.lastBidderCannotBid} <strong>${a}</strong>`:m=`${t.totalBids}: <strong>${r}</strong> (${l.status==="OVER"?t.over:l.status==="UNDER"?t.under:"13"})`,`
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <div style="font-size: 0.82rem; color: var(--text-secondary);">
            ${s?`${t.dealer}: <strong>${d.name}</strong>`:`${t.trumpMaker}: <strong>${c?c.name:"\u2014"}</strong> (${t.lastBidder}: <strong>${n?n.name:""}</strong>)`}
          </div>
          ${s?"":`
            <button class="btn-nav" id="btn-back-to-trump" style="font-size: 0.75rem; min-height: 26px; padding: 2px 8px;">${t.editTrump}</button>
          `}
        </div>

        <!-- Hook Banner -->
        <div class="hook-banner ${l.status}">
          <div>
            <span>${m}</span>
          </div>
        </div>

        <!-- Player Input Cards -->
        <div class="round-inputs-grid">
          ${this.session.players.map((u,p)=>{let b=p===e.dealerIndex,S=!s&&p===i,v=!s&&p===e.trump.winnerIndex,h=e.bets[p],g=!s&&S&&a!==null;return`
              <div class="input-row ${b?"dealer-row":""}" data-player-idx="${p}">
                <div class="input-row-header">
                  <div class="input-row-name">
                    ${u.avatar?`<span class="player-avatar-mini" style="border-color: ${u.color}; background: ${u.color}22;">${u.avatar}</span>`:`<span class="player-dot" style="background: ${u.color};"></span>`}
                    <span>${u.name}</span>
                    ${v?`<span style="font-size: 0.62rem; background: #fbbf24; color: black; padding: 1px 5px; border-radius: 4px; font-weight: 800;">${t.trumpMaker.toUpperCase()}</span>`:""}
                    ${S?`<span class="tag-dealer" style="position:static; background: #e11d48;">${t.lastBidder.toUpperCase()}</span>`:""}
                    ${b&&!v&&!S?`<span class="tag-dealer" style="position:static;">${t.dealer.toUpperCase()}</span>`:""}
                  </div>
                  
                  <div class="stepper">
                    <button class="stepper-btn btn-bet-dec" data-player-idx="${p}" ${h===null||h<=0?"disabled":""}>\u2212</button>
                    <span class="stepper-val">${h!==null?h:"\u2014"}</span>
                    <button class="stepper-btn btn-bet-inc" data-player-idx="${p}" ${h>=13?"disabled":""}>+</button>
                  </div>
                </div>

                <div class="chips-row">
                  ${[0,1,2,3,4,5,6,7,8].map(y=>`
                    <button class="chip ${h===y?"active":""} ${g&&a===y?"forbidden":""}" 
                            data-player-idx="${p}" data-amount="${y}">
                      ${y===0?"0":y}
                    </button>
                  `).join("")}
                </div>
              </div>
            `}).join("")}
        </div>

        <button class="btn-block" id="btn-proceed-to-tricks" ${!l.isValid||!o?"disabled":""} style="margin-top: 0.5rem;">
          ${t.enterTricksBtn}
        </button>
      </div>
    `}renderTricksStage(e,s){let t=this.i18n,i=e.tricks,n=i.reduce((r,o)=>r+(typeof o=="number"&&!isNaN(o)?o:0),0),a=n===13&&i.every(r=>typeof r=="number"&&!isNaN(r)),l=13-n;return`
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: ${a?"var(--success)":"var(--warning)"};">
            ${a?t.tricksValid:`${t.remainingToAssign}: ${l}`}
          </div>
          <button class="btn-pill" id="btn-auto-fill-tricks" style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.2); border-color: rgba(99, 102, 241, 0.4); color: #c7d2fe;">
            ${t.autoFillBids}
          </button>
        </div>

        <div class="round-inputs-grid">
          ${this.session.players.map((r,o)=>{let d=e.bets[o],c=i[o],m=c!==null&&d!==null&&c===d;return`
              <div class="input-row" data-player-idx="${o}" style="${m?"border-color: rgba(16, 185, 129, 0.4);":""}">
                <div class="input-row-header">
                  <div class="input-row-name">
                    ${r.avatar?`<span class="player-avatar-mini" style="border-color: ${r.color}; background: ${r.color}22;">${r.avatar}</span>`:`<span class="player-dot" style="background: ${r.color};"></span>`}
                    <span>${r.name}</span>
                    <span class="input-row-sub">
                      (${t.bid||"Bid"}: <strong>${d!==null?d:"\u2014"}</strong>)
                    </span>
                    ${m?`<span style="color: var(--success); font-size: 0.72rem; font-weight: 700; margin-left: 2px;">${t.exact}</span>`:""}
                  </div>

                  <div class="stepper">
                    <button class="stepper-btn btn-trick-dec" data-player-idx="${o}" ${c===null||c<=0?"disabled":""}>\u2212</button>
                    <span class="stepper-val">${c!==null?c:"\u2014"}</span>
                    <button class="stepper-btn btn-trick-inc" data-player-idx="${o}" ${c>=13?"disabled":""}>+</button>
                  </div>
                </div>

                <div class="chips-row">
                  ${[0,1,2,3,4,5,6,7,8].map(u=>`
                    <button class="chip ${c===u?"active":""}" 
                            data-trick-player-idx="${o}" data-amount="${u}">
                      ${u}
                    </button>
                  `).join("")}
                </div>
              </div>
            `}).join("")}
        </div>

        ${a?this.renderScorePreview(e):""}

        <div style="display: flex; gap: 0.4rem; margin-top: 0.85rem;">
          <button class="btn-outline" id="btn-back-to-bets" style="flex: 1;">
            ${t.editBids}
          </button>
          <button class="btn-block" id="btn-commit-round" style="flex: 2;" ${a?"":"disabled"}>
            ${t.calculateNextDeal}
          </button>
        </div>
      </div>
    `}renderScorePreview(e){let s=this.i18n,t=e.bets.reduce((n,a)=>n+(typeof a=="number"?a:0),0),i=e.trump?e.trump.isPasRound:!1;return`
      <div class="breakdown-box">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${s.roundScoreCalc}
        </div>
        <div class="breakdown-items-grid">
          ${this.session.players.map((n,a)=>{let l=V(e.bets[a]||0,e.tricks[a]||0,a===(e.trump?e.trump.winnerIndex:null),i,this.session.rules,t);return`
              <div class="breakdown-item">
                <div>
                  <div style="font-size: 0.82rem; font-weight: 700; display: flex; align-items: center; gap: 4px;">
                    ${n.avatar?`<span class="player-avatar-mini" style="width: 18px; height: 18px; min-width: 18px; font-size: 0.72rem; border-color: ${n.color}; background: ${n.color}22;">${n.avatar}</span>`:`<span class="player-dot" style="background: ${n.color};"></span>`}
                    <span>${n.name}</span>
                  </div>
                  <div style="font-size: 0.72rem; color: var(--text-secondary);">${l.explanation}</div>
                </div>
                <span class="score-badge signed-score ${l.score>=0?"plus":"minus"}" dir="ltr" style="direction: ltr; unicode-bidi: isolate;">
                  ${l.score>=0?`+${l.score}`:l.score}
                </span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}bindEvents(e,s){let t=this.container.querySelector("#btn-toggle-simplified");if(t&&t.addEventListener("click",()=>{q(),this.session.setSimplifiedMode(!this.session.simplifiedMode),this.render()}),e==="TRUMP"&&!s){this.container.querySelectorAll(".trump-player-btn").forEach(a=>{a.addEventListener("click",()=>{q();let l=parseInt(a.dataset.playerIdx,10);this.session.activeRound.trump.winnerIndex=l,this.session.activeRound.trump.isPasRound=!1,this.render()})}),this.container.querySelectorAll(".suit-option").forEach(a=>{a.addEventListener("click",()=>{q();let l=a.dataset.suitId;this.session.activeRound.trump.suitId=l,this.session.activeRound.trump.isPasRound=!1,this.render()})}),this.container.querySelectorAll(".trump-target-chip").forEach(a=>{a.addEventListener("click",()=>{q(),this.session.activeRound.trump.bidAmount=parseInt(a.dataset.amount,10),this.session.activeRound.trump.isPasRound=!1,this.render()})});let i=this.container.querySelector("#chk-pas-round");i&&i.addEventListener("change",a=>{q(),this.session.activeRound.trump.isPasRound=a.target.checked,a.target.checked&&(this.session.activeRound.trump.winnerIndex=null),this.render()});let n=this.container.querySelector("#btn-confirm-trump");n&&n.addEventListener("click",()=>{q();let a=this.session.activeRound.trump;this.session.setTrump(a.winnerIndex,a.suitId,a.bidAmount,a.isPasRound),this.render()})}else if(e==="BETS"){this.container.querySelectorAll(".chip[data-player-idx]").forEach(a=>{a.addEventListener("click",()=>{q();let l=parseInt(a.dataset.playerIdx,10),r=parseInt(a.dataset.amount,10);this.session.setBet(l,r),this.render()})}),this.container.querySelectorAll(".btn-bet-dec").forEach(a=>{a.addEventListener("click",()=>{q();let l=parseInt(a.dataset.playerIdx,10),r=this.session.activeRound.bets[l]||0;r>0&&(this.session.setBet(l,r-1),this.render())})}),this.container.querySelectorAll(".btn-bet-inc").forEach(a=>{a.addEventListener("click",()=>{q();let l=parseInt(a.dataset.playerIdx,10),r=this.session.activeRound.bets[l]??-1;r<13&&(this.session.setBet(l,r+1),this.render())})});let i=this.container.querySelector("#btn-back-to-trump");i&&i.addEventListener("click",()=>{q(),this.session.activeRound.stage="TRUMP",this.render()});let n=this.container.querySelector("#btn-proceed-to-tricks");n&&n.addEventListener("click",()=>{q();try{this.session.proceedToTricks(),this.render()}catch(a){alert(a.message)}})}else if(e==="TRICKS"){this.container.querySelectorAll(".chip[data-trick-player-idx]").forEach(l=>{l.addEventListener("click",()=>{q();let r=parseInt(l.dataset.trickPlayerIdx,10),o=parseInt(l.dataset.amount,10);this.session.setTricks(r,o),this.render()})}),this.container.querySelectorAll(".btn-trick-dec").forEach(l=>{l.addEventListener("click",()=>{q();let r=parseInt(l.dataset.playerIdx,10),o=this.session.activeRound.tricks[r]||0;o>0&&(this.session.setTricks(r,o-1),this.render())})}),this.container.querySelectorAll(".btn-trick-inc").forEach(l=>{l.addEventListener("click",()=>{q();let r=parseInt(l.dataset.playerIdx,10),o=this.session.activeRound.tricks[r]??-1;o<13&&(this.session.setTricks(r,o+1),this.render())})});let i=this.container.querySelector("#btn-auto-fill-tricks");i&&i.addEventListener("click",()=>{q(),this.session.autoFillTricksFromBids(),this.render()});let n=this.container.querySelector("#btn-back-to-bets");n&&n.addEventListener("click",()=>{q(),this.session.activeRound.stage="BETS",this.render()});let a=this.container.querySelector("#btn-commit-round");a&&a.addEventListener("click",()=>{q();try{this.session.commitRound(),this.onRoundComplete&&this.onRoundComplete(),this.render()}catch(l){alert(l.message)}})}}};var ee=class{constructor(e,s,t,i,n,a,l,r){this.session=e,this.leaderboardContainer=s,this.historyContainer=t,this.i18n=i,this.onUndo=n,this.onReorganizeSeating=a,this.onEditDeal=l,this.onSetBaseline=r,this.isJiggleMode=!1,this.isDragging=!1,document.addEventListener("pointerup",o=>{this.isJiggleMode&&!this.isDragging&&(o.target.closest(".player-card")||this.setJiggleMode(!1))}),this.render()}updateSession(e){this.session=e,!this.isDragging&&!this.isJiggleMode&&this.render()}updateI18n(e){this.i18n=e,!this.isDragging&&!this.isJiggleMode&&this.render()}setJiggleMode(e){if(this.isJiggleMode=e,this.leaderboardContainer){let s=this.leaderboardContainer.querySelector(".leaderboard-grid");s&&s.classList.toggle("is-jiggling",e)}e||this.renderLeaderboard()}render(){this.renderLeaderboard(),this.renderHistoryTable()}renderLeaderboard(){if(!this.leaderboardContainer)return;let e=this.i18n,s=this.session.getRankings(),t=this.session.getCumulativeScores(),i=s.length>0?s[0].score:0,n=this.session.currentDealerIndex,a=`
      <div class="leaderboard-grid ${this.isJiggleMode?"is-jiggling":""}">
        ${this.session.players.map((l,r)=>{let o=t[r],d=s.findIndex(u=>u.index===r),c=o===i&&this.session.completedRounds.length>0,m=r===n;return`
            <div class="player-card ${c?"is-leader":""} ${m?"is-dealer":""}" 
                 data-player-idx="${r}" 
                 title="Long-press to lift and reorder seating">
              ${m?`<span class="tag-dealer">${e.dealer.toUpperCase()}</span>`:""}
              <div class="player-card-inner">
                <div class="player-title">
                  ${l.avatar?`<span class="player-avatar-mini" style="border-color: ${l.color}; background: ${l.color}22;">${l.avatar}</span>`:`<span class="player-dot" style="background: ${l.color};"></span>`}
                  <span class="player-name-text">${l.name}</span>
                </div>
                <div class="player-score signed-score" dir="ltr" style="color: ${o>=0?"var(--success)":"var(--danger)"}; direction: ltr; unicode-bidi: isolate;">
                  ${o>=0?`+${o}`:o}
                </div>
                <div class="player-meta">
                  ${e.rank} #${d+1}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    `;this.leaderboardContainer.innerHTML=a,this.bindLeaderboardEvents()}bindLeaderboardEvents(){if(!this.leaderboardContainer)return;let e=this.leaderboardContainer.querySelector(".leaderboard-grid");Array.from(this.leaderboardContainer.querySelectorAll(".player-card")).forEach(t=>{let i=null,n=0,a=0,l=0,r=0,o=0,d=0,c=0,m=!1,u=null,p=null,b=[],S=null,v=null,h=($=25)=>{if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate($)}catch{}},g=()=>Array.from(e.querySelectorAll(".player-card")).map(T=>{let x=T.getBoundingClientRect();return{left:x.left,top:x.top,width:x.width,height:x.height,centerX:x.left+x.width/2,centerY:x.top+x.height/2}}),y=$=>{if($==null)return;let T=Array.from(e.querySelectorAll(".player-card")),x=[0,1,2,3],[R]=x.splice(u,1);x.splice($,0,R),T.forEach((P,C)=>{if(C===u)return;let B=x.indexOf(C),D=b[C],H=b[B];if(D&&H){let _=H.left-D.left,j=H.top-D.top;P.style.transform=`translate3d(${_}px, ${j}px, 0)`}})},f=()=>{Array.from(e.querySelectorAll(".player-card")).forEach(T=>{T.style.transform="",T.style.zIndex=""})},w=()=>{if(!m)return;let $=l-n,T=r-a;d+=(c-d)*.18,t.style.transform=`translate3d(${$}px, ${T-8}px, 0) scale(1.12) rotate(${d.toFixed(2)}deg)`;let x=b[u],R=x.centerX+$,P=x.centerY+T,C=p,B=1/0;b.forEach((D,H)=>{let J=Math.hypot(R-D.centerX,P-D.centerY)*(H===p?.75:1);J<B&&(B=J,C=H)}),C!==p&&(p=C,h(18),y(p)),v=requestAnimationFrame(w)},I=($,T)=>{this.isDragging||(this.isDragging=!0,m=!0,u=parseInt(t.dataset.playerIdx,10),p=u,b=g(),this.setJiggleMode(!0),t.classList.remove("card-pressing"),t.classList.add("is-lifted"),t.style.zIndex="500",h([40,60,40]),l=$,r=T,o=$,d=0,c=0,t.style.transform=`translate3d(${$-n}px, ${T-a-8}px, 0) scale(1.12)`,v=requestAnimationFrame(w))},E=$=>{if(S!==null&&$.pointerId!==S)return;let T=$.clientX,x=$.clientY;if(!m){(Math.abs(T-n)>10||Math.abs(x-a)>10)&&(i&&(clearTimeout(i),i=null),t.classList.remove("card-pressing"));return}$.preventDefault(),$.stopPropagation(),l=T,r=x;let R=T-o;o=T,c=Math.max(-7,Math.min(7,R*.4))},A=$=>{if(!(S!==null&&$.pointerId!==S)){if(i&&(clearTimeout(i),i=null),t.classList.remove("card-pressing"),S=null,v&&(cancelAnimationFrame(v),v=null),m){m=!1,this.isDragging=!1;let T=p,x=b[u],R=b[T];if(x&&R&&u!==T){let P=R.left-x.left,C=R.top-x.top;t.classList.add("is-dropping"),t.style.transform=`translate3d(${P}px, ${C}px, 0) scale(1.0) rotate(0deg)`,h(30);let B=[0,1,2,3],[D]=B.splice(u,1);B.splice(T,0,D),this.session.reorderPlayers(B),setTimeout(()=>{t.classList.remove("is-lifted","is-dropping");let H=Array.from(e.querySelectorAll(".player-card"));B.map(j=>H[j]).forEach((j,J)=>{j.dataset.playerIdx=J,j.style.transform="",j.style.zIndex="",e.appendChild(j)}),f()},260)}else t.classList.remove("is-lifted"),f()}window.removeEventListener("pointermove",E),window.removeEventListener("pointerup",A),window.removeEventListener("pointercancel",A)}},L=$=>{this.isDragging||(S=$.pointerId,n=$.clientX,a=$.clientY,l=$.clientX,r=$.clientY,o=$.clientX,t.classList.add("card-pressing"),window.addEventListener("pointermove",E,{passive:!1}),window.addEventListener("pointerup",A),window.addEventListener("pointercancel",A),this.isJiggleMode?I(n,a):i=setTimeout(()=>{I(n,a)},260))};t.addEventListener("pointerdown",L),t.addEventListener("contextmenu",$=>$.preventDefault())})}renderHistoryTable(){if(!this.historyContainer)return;let e=this.i18n,s=this.session.completedRounds,t=this.session.initialScores&&this.session.initialScores.some(r=>r!==0);if(s.length===0){this.historyContainer.innerHTML=`
        <div class="card" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <div style="font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem;">${e.noDeals}</div>
          <div style="font-size: 0.85rem; margin-bottom: 1rem;">${e.noDealsSub}</div>
          <button class="btn-pill" id="btn-set-baseline-empty" style="font-size: 0.8rem; height: 32px; padding: 0 14px; margin: 0 auto;">
            \u{1F3AF} ${e.setBaseline}
          </button>
        </div>
      `;let r=this.historyContainer.querySelector("#btn-set-baseline-empty");r&&r.addEventListener("click",()=>{this.onSetBaseline&&this.onSetBaseline()});return}let i=`
      <div class="card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem; flex-wrap: wrap; gap: 8px;">
          <h3 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${e.historyTitle} (${s.length} ${e.deals})</h3>
          <div style="display: flex; gap: 6px;">
            <button class="btn-pill" id="btn-set-baseline" style="font-size: 0.72rem; height: 28px;">
              \u{1F3AF} ${e.setBaseline}
            </button>
            <button class="btn-pill" id="btn-undo-round" style="font-size: 0.72rem; color: var(--danger); height: 28px;">
              ${e.undoLastDeal}
            </button>
          </div>
        </div>

        <div class="table-wrap">
          <table class="table-custom">
            <thead>
              <tr>
                <th style="min-width: 65px;">${e.deal}</th>
                <th style="min-width: 95px;">${e.dealer}</th>
                ${this.session.players.map(r=>`
                  <th style="min-width: 85px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
                      ${r.avatar?`<span class="player-avatar-mini" style="width: 18px; height: 18px; min-width: 18px; font-size: 0.72rem; border-color: ${r.color}; background: ${r.color}22;">${r.avatar}</span>`:`<span class="player-dot" style="background: ${r.color};"></span>`}
                      <span>${r.name}</span>
                    </div>
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              ${s.map((r,o)=>{let d=this.session.players[r.dealerIndex];return`
                  <tr>
                    <td style="font-weight: 700;">
                      <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
                        <span>#${r.roundNumber}</span>
                        <button class="btn-pill btn-edit-deal" data-round-idx="${o}" title="${e.editDeal}" style="padding: 1px 5px; font-size: 0.68rem; height: 22px; cursor: pointer;">\u270F\uFE0F</button>
                      </div>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; justify-content: center; gap: 4px; white-space: nowrap;">
                        ${d.avatar?`<span class="player-avatar-mini" style="width: 18px; height: 18px; min-width: 18px; font-size: 0.72rem; border-color: ${d.color}; background: ${d.color}22;">${d.avatar}</span>`:`<span class="player-dot" style="background: ${d.color};"></span>`}
                        <span style="font-weight: 600;">${d.name}</span>
                      </div>
                    </td>
                    ${this.session.players.map((c,m)=>{let u=r.results.find(v=>v.playerIndex===m);if(!u)return"<td>\u2014</td>";let p=u.score>=0?`+${u.score}`:u.score,b=u.made,S=r.cumulativeScores?r.cumulativeScores[m]:"\u2014";return`
                        <td>
                          <div style="font-size: 0.72rem; color: var(--text-muted); direction: ltr; unicode-bidi: isolate;">
                            B:${u.bid} / T:${u.tricks}
                          </div>
                          <div class="score-delta signed-score" dir="ltr" style="font-weight: 800; direction: ltr; unicode-bidi: isolate; color: ${b?"var(--success)":"var(--danger)"};">
                            ${p}
                          </div>
                          <div class="score-cum signed-score" dir="ltr" style="font-size: 0.68rem; direction: ltr; unicode-bidi: isolate; color: var(--text-secondary);">
                            (${S})
                          </div>
                        </td>
                      `}).join("")}
                  </tr>
                `}).reverse().join("")}

              ${t?`
                <tr style="background: rgba(255,255,255,0.03); border-top: 1px dashed var(--border-color);">
                  <td style="font-weight: 700; color: var(--accent-primary);">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
                      <span>#0</span>
                      <button class="btn-pill btn-edit-baseline" title="${e.setBaseline}" style="padding: 1px 5px; font-size: 0.68rem; height: 22px; cursor: pointer;">\u270F\uFE0F</button>
                    </div>
                  </td>
                  <td style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">${e.baselineRow}</td>
                  ${this.session.players.map((r,o)=>{let d=this.session.initialScores&&this.session.initialScores[o]||0,c=d>=0?`+${d}`:`${d}`;return`
                      <td>
                        <div class="score-delta signed-score" dir="ltr" style="font-weight: 700; direction: ltr; unicode-bidi: isolate; color: var(--text-primary);">
                          ${c}
                        </div>
                        <div class="score-cum signed-score" dir="ltr" style="font-size: 0.68rem; direction: ltr; unicode-bidi: isolate; color: var(--text-muted);">
                          (${c})
                        </div>
                      </td>
                    `}).join("")}
                </tr>
              `:""}
            </tbody>
          </table>
        </div>
      </div>
    `;this.historyContainer.innerHTML=i;let n=this.historyContainer.querySelector("#btn-undo-round");n&&n.addEventListener("click",()=>{confirm(e.undoConfirm)&&this.onUndo&&this.onUndo()});let a=this.historyContainer.querySelector("#btn-set-baseline");a&&a.addEventListener("click",()=>{this.onSetBaseline&&this.onSetBaseline()});let l=this.historyContainer.querySelector(".btn-edit-baseline");l&&l.addEventListener("click",()=>{this.onSetBaseline&&this.onSetBaseline()}),this.historyContainer.querySelectorAll(".btn-edit-deal").forEach(r=>{r.addEventListener("click",()=>{let o=parseInt(r.dataset.roundIdx,10);!isNaN(o)&&this.onEditDeal&&this.onEditDeal(o)})})}};var te=class{constructor(e,s,t){this.session=e,this.container=s,this.i18n=t,this.render()}updateSession(e){this.session=e,this.render()}updateI18n(e){this.i18n=e,this.render()}render(){if(!this.container)return;let e=this.session.completedRounds;if(e.length===0){this.container.innerHTML="";return}let s=this.session.players,t=["Start",...e.map(f=>`R${f.roundNumber}`)],i=t.length,n=s.map((f,w)=>{let I=this.session.initialScores&&this.session.initialScores[w]||0,E=[I];return e.forEach(A=>{let L=A.results.find($=>$.playerIndex===w);I+=L?L.score:0,E.push(I)}),{player:f,points:E}}),a=0,l=0;n.forEach(f=>{f.points.forEach(w=>{w<a&&(a=w),w>l&&(l=w)})});let r=20;a=Math.floor((a-r)/20)*20,l=Math.ceil((l+r)/20)*20,a===l&&(l+=50);let o=600,d=240,c=40,m=20,u=20,p=30,b=o-c-m,S=d-u-p,v=f=>c+f/(i-1||1)*b,h=f=>u+S-(f-a)/(l-a)*S,g=h(0),y=`
      <div class="card">
        <h3 style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1rem;">
          Score Progression
        </h3>
        <div style="overflow-x: auto;">
          <svg viewBox="0 0 ${o} ${d}" style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0 auto;">
            <!-- Zero axis -->
            <line x1="${c}" y1="${g}" x2="${o-m}" y2="${g}" stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-dasharray="3 3" />
            <text x="${c-6}" y="${g+3}" fill="var(--text-muted)" font-size="9" text-anchor="end">0</text>
            <text x="${c-6}" y="${u+6}" fill="var(--text-muted)" font-size="9" text-anchor="end">${l}</text>
            <text x="${c-6}" y="${d-p}" fill="var(--text-muted)" font-size="9" text-anchor="end">${a}</text>

            ${t.map((f,w)=>`
              <text x="${v(w)}" y="${d-10}" fill="var(--text-muted)" font-size="9" text-anchor="middle">${f}</text>
            `).join("")}

            ${n.map(f=>{let w=f.points.map((I,E)=>`${v(E)},${h(I)}`).join(" ");return`
                <polyline fill="none" stroke="${f.player.color}" stroke-width="2" points="${w}" />
                ${f.points.map((I,E)=>`
                  <circle cx="${v(E)}" cy="${h(I)}" r="3.5" fill="${f.player.color}" stroke="#111827" stroke-width="1.5">
                    <title>${f.player.name}: ${I}</title>
                  </circle>
                `).join("")}
              `}).join("")}
          </svg>
        </div>

        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 0.75rem; flex-wrap: wrap;">
          ${s.map(f=>`
            <div style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.8rem;">
              <span class="player-dot" style="background: ${f.color};"></span>
              <span>${f.name}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;this.container.innerHTML=y}};function me(k){let e=k.completedRounds,s=e.length,i=k.players.map((o,d)=>{let c=0,m=0,u=0,p=0,b=0,S=0,v=0,h=0,g=0,y=-1/0,f=1/0,w=[0],I=0;e.forEach(x=>{let R=x.results.find(P=>P.playerIndex===d);R&&(c+=R.score,I+=R.score,w.push(I),u++,p+=R.bid||0,b+=R.tricks||0,R.made&&m++,R.bid===0&&(S++,R.made&&v++),x.trump.winnerIndex===d&&(h++,R.made&&g++),R.score>y&&(y=R.score),R.score<f&&(f=R.score))});let E=u>0?m/u*100:0,A=s>0?b/s:0,L=u>0?p/u:0,$=S>0?v/S*100:0,T=h>0?g/h*100:0;return{player:o,pIdx:d,totalScore:c,madeBidsCount:m,totalBidsCount:u,hitRate:Math.round(E*10)/10,totalTricksWon:b,avgTricksPerRound:Math.round(A*10)/10,avgBidPerRound:Math.round(L*10)/10,zeroAttempts:S,zeroSuccess:v,zeroRate:Math.round($*10)/10,passAttempts:S,passSuccess:v,passRate:Math.round($*10)/10,trumpMakerCount:h,trumpMakerSuccess:g,trumpRate:Math.round(T*10)/10,highestSingleRound:y===-1/0?0:y,lowestSingleRound:f===1/0?0:f,roundScoresHistory:w}}),n=0,a=0,l=0;e.forEach(o=>{o.trump.isPasRound?l++:o.roundTotalBets>13?n++:o.roundTotalBets<13&&a++});let r=[...i].sort((o,d)=>d.totalScore-o.totalScore);return{numRounds:s,rankings:r,playerStats:i,overRoundsCount:n,underRoundsCount:a,pasRoundsCount:l,mostAccuratePlayer:[...i].sort((o,d)=>d.hitRate-o.hitRate)[0],mostAggressiveBidder:[...i].sort((o,d)=>d.avgBidPerRound-o.avgBidPerRound)[0],masterOfZero:[...i].sort((o,d)=>d.zeroSuccess-o.zeroSuccess)[0],masterOfPass:[...i].sort((o,d)=>d.zeroSuccess-o.zeroSuccess)[0]}}var se=class{constructor(e){this.app=e}showMenuModal(){let e=this.app.i18n,s=e.lang==="he",t=this.app.session.simplifiedMode,i=z.getRecentGames(),n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.1rem; font-weight: 700;">${e.menuTitle}</h3>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div class="menu-list">
          <button class="menu-item-btn" id="menu-opt-toggle-lang" style="background: rgba(251, 191, 36, 0.12); border-color: rgba(251, 191, 36, 0.35);">
            <div>
              <div style="font-weight: 700; color: #fde68a;">\u{1F310} ${s?"\u05E9\u05E4\u05D4: \u05E2\u05D1\u05E8\u05D9\u05EA (English)":"Language: English (\u05E2\u05D1\u05E8\u05D9\u05EA)"}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${s?"\u05DC\u05D7\u05E5 \u05DB\u05D0\u05DF \u05DB\u05D3\u05D9 \u05DC\u05D4\u05D7\u05DC\u05D9\u05E3 \u05DC\u05D0\u05E0\u05D2\u05DC\u05D9\u05EA":"Tap to switch to Hebrew"}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #f59e0b;">${e.switchLang} \u21C4</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-home-lobby">
            <span>${e.returnToLobby}</span>
            <span>\u2192</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-baseline" style="background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.35);">
            <div>
              <div style="font-weight: 700; color: #fde68a;">\u{1F3AF} ${e.baselineScores}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${e.baselineDesc}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #f59e0b;">Set \u2192</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-profiles" style="background: rgba(139, 92, 246, 0.15); border-color: rgba(139, 92, 246, 0.35);">
            <div>
              <div style="font-weight: 700; color: #c4b5fd;">${e.manageProfilesMenu}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${e.manageProfilesDesc}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #a78bfa;">Open \u2192</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-saved-games" style="background: rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.35);">
            <div>
              <div style="font-weight: 700; color: #a7f3d0;">${e.savedGames} (${i.length}/10)</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${e.savedGamesDesc}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--success);">Open \u2192</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-edit-players" style="background: rgba(99, 102, 241, 0.15); border-color: rgba(99, 102, 241, 0.35);">
            <div>
              <div style="font-weight: 700;">${e.editPlayersSettings}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${e.editPlayersDesc}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-primary);">Edit \u2192</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-toggle-mode">
            <div>
              <div style="font-weight: 700;">${e.modeToggleTitle}: ${t?e.simplified:e.fullTrump}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${t?s?"\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D5\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA":"Direct Bids & Tricks":s?"\u05DB\u05D5\u05DC\u05DC \u05E7\u05D1\u05D9\u05E2\u05EA \u05E9\u05DC\u05D9\u05D8 \u05D5\u05E1\u05D3\u05E8\u05D5\u05EA":"Includes Trump & Suits"}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-primary);">Switch \u21C4</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-share">
            <span>\u{1F4F2} ${e.shareTitle}</span>
            <span>\u2192</span>
          </button>
          <button class="menu-item-btn" id="menu-opt-stats">
            <span>${e.statsAccuracy}</span>
            <span>\u2192</span>
          </button>
          <button class="menu-item-btn" id="menu-opt-export">
            <span>${e.exportShare}</span>
            <span>\u2192</span>
          </button>
          <button class="menu-item-btn" id="menu-opt-new-game" style="border-color: rgba(239, 68, 68, 0.3); color: #fca5a5;">
            <span>${e.startNewGameMenu}</span>
            <span>\u2192</span>
          </button>
        </div>

        <button class="btn-block modal-close" style="margin-top: 0.5rem;">
          ${e.close}
        </button>
      </div>
    `,document.body.appendChild(n);let a=()=>n.remove();n.querySelectorAll(".modal-close").forEach(l=>l.addEventListener("click",a)),n.querySelector("#menu-opt-toggle-lang").addEventListener("click",()=>{a(),this.app.setLanguage(s?"en":"he")}),n.querySelector("#menu-opt-home-lobby").addEventListener("click",()=>{a(),this.app.showLandingView()}),n.querySelector("#menu-opt-baseline").addEventListener("click",()=>{a(),this.showBaselineModal()}),n.querySelector("#menu-opt-profiles").addEventListener("click",()=>{a(),this.showProfilesModal()}),n.querySelector("#menu-opt-saved-games").addEventListener("click",()=>{a(),this.showSavedGamesModal()}),n.querySelector("#menu-opt-edit-players").addEventListener("click",()=>{a(),this.showEditSettingsModal()}),n.querySelector("#menu-opt-toggle-mode").addEventListener("click",()=>{this.app.session.setSimplifiedMode(!this.app.session.simplifiedMode),a()}),n.querySelector("#menu-opt-new-game").addEventListener("click",()=>{a(),this.showNewGameModal()}),n.querySelector("#menu-opt-share").addEventListener("click",()=>{a(),this.showShareModal()}),n.querySelector("#menu-opt-stats").addEventListener("click",()=>{a(),this.showStatsModal()}),n.querySelector("#menu-opt-export").addEventListener("click",()=>{a(),this.showExportModal()})}attachSeatingDragDrop({grid:e,getCards:s,onSwap:t,onTap:i}){if(!e)return;let n=!1,a=(r=25)=>{if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(r)}catch{}};s().forEach(r=>{let o=0,d=0,c=0,m=0,u=0,p=0,b=0,S=!1,v=null,h=null,g=[],y=null,f=null,w=()=>s().map(R=>{let P=R.getBoundingClientRect();return{left:P.left,top:P.top,width:P.width,height:P.height,centerX:P.left+P.width/2,centerY:P.top+P.height/2}}),I=x=>{s().forEach((P,C)=>{if(C!==v)if(x!==null&&C===x&&x!==v){let B=g[v],D=g[x];if(B&&D){let H=B.left-D.left,_=B.top-D.top;P.style.transform=`translate3d(${H}px, ${_}px, 0)`,P.classList.add("is-hovered-target")}}else P.style.transform="",P.classList.remove("is-hovered-target")})},E=()=>{s().forEach(R=>{R.style.transform="",R.style.zIndex="",R.classList.remove("is-hovered-target")})},A=()=>{if(!S)return;let x=c-o,R=m-d;p+=(b-p)*.2,r.style.transform=`translate3d(${x}px, ${R-8}px, 0) scale(1.12) rotate(${p.toFixed(2)}deg)`;let P=g[v],C=P.centerX+x,B=P.centerY+R,D=h,H=1/0;g.forEach((_,j)=>{let oe=Math.hypot(C-_.centerX,B-_.centerY)*(j===h?.75:1);oe<H&&(H=oe,D=j)}),D!==h&&(h=D,a(18),I(h)),y=requestAnimationFrame(A)},L=x=>{if(f!==null&&x.pointerId!==f)return;let R=x.clientX,P=x.clientY;if(!S){if(Math.hypot(R-o,P-d)>5){if(n)return;n=!0,S=!0,v=parseInt(r.dataset.seatIdx,10),h=v,g=w(),r.classList.add("is-lifted"),r.style.zIndex="500",a([30,40]),c=R,m=P,u=R,p=0,b=0,y=requestAnimationFrame(A)}return}x.preventDefault(),x.stopPropagation(),c=R,m=P;let C=R-u;u=R,b=Math.max(-10,Math.min(10,C*.45))},$=x=>{if(!(f!==null&&x.pointerId!==f))if(f=null,y&&(cancelAnimationFrame(y),y=null),window.removeEventListener("pointermove",L),window.removeEventListener("pointerup",$),window.removeEventListener("pointercancel",$),S){S=!1,n=!1;let R=h,P=g[v],C=g[R];if(P&&C&&v!==R){let B=C.left-P.left,D=C.top-P.top;r.classList.add("is-dropping"),r.style.transform=`translate3d(${B}px, ${D}px, 0) scale(1.0) rotate(0deg)`,a(35),setTimeout(()=>{r.classList.remove("is-lifted","is-dropping"),E(),t(v,R)},240)}else r.classList.add("is-dropping"),r.style.transform="translate3d(0, 0, 0) scale(1.0) rotate(0deg)",setTimeout(()=>{r.classList.remove("is-lifted","is-dropping"),E()},220)}else i&&i(parseInt(r.dataset.seatIdx,10),x)},T=x=>{x.target.closest(".btn-clear-seat")||n||(f=x.pointerId,o=x.clientX,d=x.clientY,c=x.clientX,m=x.clientY,u=x.clientX,window.addEventListener("pointermove",L,{passive:!1}),window.addEventListener("pointerup",$),window.addEventListener("pointercancel",$))};r.addEventListener("pointerdown",T),r.addEventListener("contextmenu",x=>x.preventDefault())})}attachRosterChipDragDrop({rosterContainer:e,getSeatCards:s,onAssignToSeat:t}){if(!e)return;let i=(a=25)=>{if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(a)}catch{}};e.querySelectorAll(".profile-chip").forEach(a=>{let l=0,r=0,o=!1,d=null,c=null,m=null,u=()=>s().map(g=>{let y=g.getBoundingClientRect();return{idx:parseInt(g.dataset.seatIdx,10),left:y.left,top:y.top,right:y.right,bottom:y.bottom,card:g}}),p=[],b=h=>{if(c!==null&&h.pointerId!==c)return;let g=h.clientX,y=h.clientY;if(!o){Math.hypot(g-l,y-r)>8&&(o=!0,p=u(),i([25,35]),d=a.cloneNode(!0),d.className="profile-chip ghost-chip-drag",d.style.position="fixed",d.style.left=`${g}px`,d.style.top=`${y}px`,d.style.zIndex="1000",d.style.pointerEvents="none",document.body.appendChild(d),a.style.opacity="0.35");return}h.preventDefault(),h.stopPropagation(),d&&(d.style.left=`${g}px`,d.style.top=`${y}px`);let f=null;for(let w of p)if(g>=w.left&&g<=w.right&&y>=w.top&&y<=w.bottom){f=w.idx;break}f!==m&&(m=f,p.forEach(w=>{w.idx===m?(w.card.classList.add("is-hovered-target"),i(15)):w.card.classList.remove("is-hovered-target")}))},S=h=>{if(!(c!==null&&h.pointerId!==c)&&(c=null,window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",S),window.removeEventListener("pointercancel",S),p.forEach(g=>g.card.classList.remove("is-hovered-target")),o&&(o=!1,a.style.opacity="",d&&(d.remove(),d=null),m!==null))){i(35);let g=a.dataset.profId;t(g,m)}},v=h=>{c=h.pointerId,l=h.clientX,r=h.clientY,window.addEventListener("pointermove",b,{passive:!1}),window.addEventListener("pointerup",S),window.addEventListener("pointercancel",S)};a.addEventListener("pointerdown",v)})}showReorganizeSeatingModal(e=null){let s=this.app.i18n,t=s.lang==="he",i=this.app.session,n=document.createElement("div");n.className="modal-overlay";let a=()=>{let l=r=>i.currentDealerIndex===r;n.innerHTML=`
        <div class="modal-box" style="max-width: 460px;">
          <div class="modal-head">
            <div>
              <h3 style="font-size: 1.1rem; font-weight: 700;">${s.reorganizeTitle}</h3>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${s.reorganizeSub}</div>
            </div>
            <button class="btn-pill modal-close">\u2715</button>
          </div>

          <!-- Circular Seating Table 2x2 Grid -->
          <div class="table-seating-container">
            <div class="leaderboard-grid seating-modal-grid" style="margin-bottom: 0;">
              ${i.players.map((r,o)=>{let d=l(o);return`
                  <div class="player-card seat-swap-card ${d?"is-dealer":""}" 
                       data-seat-idx="${o}" 
                       title="${s.dragToReorder}">
                    ${d?`<span class="tag-dealer">${s.dealer.toUpperCase()}</span>`:""}
                    <div class="seat-top-row">
                      <span>${s.seatNumber} #${o+1}</span>
                    </div>
                    <div style="margin: 2px 0;">
                      <div class="seat-avatar-bubble" style="border-color: ${r.color}; background: ${r.color}24;">
                        ${r.avatar||"\u{1F464}"}
                      </div>
                    </div>
                    <div class="seat-player-name">
                      ${r.name}
                    </div>
                    <div class="seat-action-hint" style="color: var(--accent-primary);">
                      ${t?"\u05D2\u05E8\u05D5\u05E8 \u05DC\u05D4\u05D7\u05DC\u05E4\u05D4":"Drag to swap"}
                    </div>
                  </div>
                `}).join("")}
            </div>
          </div>

          <!-- Swap Hint Banner -->
          <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.75rem; text-align: center; color: #c7d2fe; margin-bottom: 0.85rem;">
            \u270B ${t?"\u05D2\u05E8\u05D5\u05E8 \u05DB\u05E8\u05D8\u05D9\u05E1 \u05E9\u05D7\u05E7\u05DF \u05DC\u05DB\u05D9\u05E1\u05D0 \u05D0\u05D7\u05E8 \u05DB\u05D3\u05D9 \u05DC\u05D4\u05D7\u05DC\u05D9\u05E3 \u05DE\u05E7\u05D5\u05DD":"Drag any player card onto another seat to swap"}
          </div>

          <button class="btn-block modal-close">
            ${s.doneSeating}
          </button>
        </div>
      `,n.querySelectorAll(".modal-close").forEach(r=>r.addEventListener("click",()=>n.remove())),this.attachSeatingDragDrop({grid:n.querySelector(".seating-modal-grid"),getCards:()=>Array.from(n.querySelectorAll(".seat-swap-card")),onSwap:(r,o)=>{i.swapPlayers(r,o),a()}})};a(),document.body.appendChild(n)}showSavedGamesModal(){let e=this.app.i18n,s=e.lang==="he",t=z.getRecentGames(),i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
      <div class="modal-box" style="max-width: 480px;">
        <div class="modal-head">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700;">${e.savedGames} (10)</h3>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${e.savedGamesDesc}</div>
          </div>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        ${t.length===0?`
          <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
            <div style="font-size: 1.1rem; margin-bottom: 0.25rem;">${e.noSavedGames}</div>
            <div style="font-size: 0.8rem;">${e.noSavedGamesSub}</div>
          </div>
        `:`
          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1rem; max-height: 55vh; overflow-y: auto;">
            ${t.map((a,l)=>{let r=z.formatTimestamp(a.updatedAt||a.createdAt),o=this.app.syncManager&&this.app.syncManager.roomId===a.roomId;return`
                <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid ${o?"var(--accent-primary)":"var(--border-subtle)"}; border-radius: var(--radius-md); padding: 0.75rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="room-pill" style="font-size: 0.7rem;">${a.roomId}</span>
                      <span style="font-size: 0.72rem; color: var(--text-secondary);">${r}</span>
                      ${o?`<span style="font-size: 0.65rem; background: var(--accent-primary); color: white; padding: 1px 5px; border-radius: 4px; font-weight: 800;">${e.currentGame}</span>`:""}
                    </div>
                    <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted);">
                      ${a.completedRoundsCount} ${e.deals}
                    </span>
                  </div>

                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem;">
                    ${a.players.map(d=>`
                      <span style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.75rem; display: inline-flex; align-items: center; gap: 3px;">
                        <span class="player-dot" style="background: ${d.color};"></span>
                        <span>${d.name}:</span>
                        <strong class="signed-score" dir="ltr" style="color: ${d.score>=0?"var(--success)":"var(--danger)"}; direction: ltr; unicode-bidi: isolate;">${d.score>=0?"+":""}${d.score}</strong>
                      </span>
                    `).join("")}
                  </div>

                  <div style="display: flex; gap: 0.4rem; justify-content: flex-end;">
                    <button class="btn-pill btn-delete-game" data-room-id="${a.roomId}" style="color: var(--danger); border-color: rgba(239, 68, 68, 0.3); font-size: 0.72rem;">
                      ${e.delete}
                    </button>
                    <button class="btn-pill btn-resume-game ${o?"":"btn-share"}" data-game-idx="${l}" style="font-size: 0.75rem; padding: 0 10px;">
                      ${o?e.currentGame:e.resumeMatch}
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}

        <button class="btn-block modal-close">
          ${e.done}
        </button>
      </div>
    `,document.body.appendChild(i);let n=()=>i.remove();i.querySelectorAll(".modal-close").forEach(a=>a.addEventListener("click",n)),i.querySelectorAll(".btn-resume-game").forEach(a=>{a.addEventListener("click",()=>{let l=parseInt(a.dataset.gameIdx,10),r=t[l];r&&(this.app.resumeGameFromArchive(r),n())})}),i.querySelectorAll(".btn-delete-game").forEach(a=>{a.addEventListener("click",l=>{l.stopPropagation();let r=a.dataset.roomId;confirm(`${e.deleteConfirm} (${r})`)&&(z.deleteGame(r),n(),this.showSavedGamesModal())})})}showEditSettingsModal(e=null){let s=this.app.i18n,t=s.lang==="he",i=this.app.session,n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.1rem; font-weight: 700;">${s.editTitle}</h3>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
          ${s.playerNames}
        </div>
        <div class="modal-players-grid" style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1rem;">
          ${i.players.map((l,r)=>`
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="player-dot" style="background: ${l.color};"></span>
              <input type="text" class="input-field edit-player-name-input" data-p-idx="${r}" value="${l.name}" placeholder="${t?`\u05E9\u05D7\u05E7\u05DF ${r+1}`:`Player ${r+1}`}" style="margin-bottom:0;" />
            </div>
          `).join("")}
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${s.currentDealer}
        </div>
        <select class="select-field" id="edit-dealer-select" style="margin-bottom: 0.85rem;">
          ${i.players.map((l,r)=>`
            <option value="${r}" ${i.currentDealerIndex===r?"selected":""}>
              ${l.name} (${t?`\u05E9\u05D7\u05E7\u05DF ${r+1}`:`Player ${r+1}`})
            </option>
          `).join("")}
        </select>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${s.gameMode}
        </div>
        <select class="select-field" id="edit-mode-select" style="margin-bottom: 0.85rem;">
          <option value="SIMPLIFIED" ${i.simplifiedMode?"selected":""}>${s.simplifiedOpt}</option>
          <option value="FULL" ${i.simplifiedMode?"":"selected"}>${s.fullOpt}</option>
        </select>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${s.scoringRules}
        </div>
        <select class="select-field" id="edit-rule-select" style="margin-bottom: 0.85rem;">
          ${Object.values(U).map(l=>`
            <option value="${l.id}" ${i.rules.id===l.id?"selected":""}>
              ${t?l.nameHe:l.nameEn}
            </option>
          `).join("")}
        </select>

        <div style="margin-bottom: 1rem; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.2); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
            <input type="checkbox" id="chk-edit-hook" ${i.rules.enforceHookRule?"checked":""} style="width: 16px; height: 16px;">
            <span style="font-size: 0.82rem; font-weight: 600;">${s.enforceHook}</span>
          </label>
        </div>

        <div style="display: flex; gap: 0.4rem; margin-top: 0.85rem;">
          <button class="btn-outline modal-close" style="flex: 1;">${s.cancel}</button>
          <button class="btn-block" id="btn-save-settings" style="flex: 2;">${s.saveChanges}</button>
        </div>
      </div>
    `,document.body.appendChild(n);let a=()=>n.remove();if(n.querySelectorAll(".modal-close").forEach(l=>l.addEventListener("click",a)),e!==null){let l=n.querySelector(`.edit-player-name-input[data-p-idx="${e}"]`);l&&setTimeout(()=>{l.focus(),l.select()},100)}n.querySelector("#btn-save-settings").addEventListener("click",()=>{let l=n.querySelectorAll(".edit-player-name-input"),r=parseInt(n.querySelector("#edit-dealer-select").value,10),o=n.querySelector("#edit-mode-select").value==="SIMPLIFIED",d=n.querySelector("#edit-rule-select").value,c=n.querySelector("#chk-edit-hook").checked;i.players.forEach((m,u)=>{let p=l[u].value.trim();p&&(m.name=p)}),i.currentDealerIndex=r,i.activeRound&&(i.activeRound.dealerIndex=r,i.activeRound.leadBidderIndex=(r+1)%4),i.rules={...U[d],enforceHookRule:c},i.setSimplifiedMode(o),i.notify(),a()})}showShareModal(){let e=this.app.i18n,s=this.app.syncManager;this.app.session&&(this.app.archiveCurrentGame(),s&&s.broadcastLocalState());let t=s?s.getShareUrl():window.location.href,i=s?s.roomId:"Local",n=`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(t)}`,a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal-box">
        <div class="modal-head">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700;">${e.shareTitle}</h3>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${e.shareSub}</div>
          </div>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div class="share-modal-layout">
          <div class="share-qr-col" style="text-align: center; margin: 0.5rem 0 1rem;">
            <div style="background: white; padding: 10px; border-radius: var(--radius-md); display: inline-block;">
              <img src="${n}" alt="Game QR Code" width="150" height="150" style="display: block;" />
            </div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.4rem;">
              ${e.scanQr}
            </div>
          </div>

          <div class="share-info-col" style="flex: 1;">
            <div style="margin-bottom: 0.85rem;">
              <label style="font-size: 0.72rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.3rem;">
                ${e.shareUrlLabel}
              </label>
              <div style="display: flex; gap: 0.4rem;">
                <input type="text" class="input-field" id="txt-share-url" value="${t}" readonly style="margin-bottom: 0; font-family: monospace; font-size: 0.78rem;" />
                <button class="btn-pill btn-share" id="btn-copy-url" style="height: 42px; padding: 0 12px;">${e.copy}</button>
              </div>
            </div>

            <div style="display: flex; gap: 0.4rem; margin-top: 1rem;">
              ${navigator.share?`
                <button class="btn-block" id="btn-native-share" style="flex: 1; background: #2563eb;">
                  ${e.shareMobile}
                </button>
              `:""}
              <button class="btn-outline modal-close" style="flex: 1;">${e.close}</button>
            </div>
          </div>
        </div>
      </div>
    `,document.body.appendChild(a);let l=()=>a.remove();a.querySelectorAll(".modal-close").forEach(o=>o.addEventListener("click",l)),a.querySelector("#btn-copy-url").addEventListener("click",()=>{navigator.clipboard.writeText(t);let o=a.querySelector("#btn-copy-url");o.textContent=e.copied,setTimeout(()=>o.textContent=e.copy,2e3)});let r=a.querySelector("#btn-native-share");r&&r.addEventListener("click",()=>{navigator.share({title:e.appTitle,text:`${e.shareTitle} (${i})`,url:t}).catch(()=>{})})}showNewGameModal(){let e=this.app.i18n,s=e.lang==="he",t=this.app.session,i=z.getRecentGames(),n=M.getProfiles(),a=M.getLastLineup(),l=[null,null,null,null],r=0,o=document.createElement("div");o.className="modal-overlay";let d=()=>{n=M.getProfiles();let m=l.filter(u=>u&&u.name).length;o.innerHTML=`
        <div class="modal-box modal-new-game">
          <div class="modal-head">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <h3 style="font-size: 1.15rem; font-weight: 800; letter-spacing: -0.02em;">\u{1F3B2} ${e.newGameTitle}</h3>
            </div>
            <button class="btn-pill modal-close">\u2715</button>
          </div>

          <!-- Circular Seating Table 2x2 Grid with Drag & Drop Physics -->
          <div class="table-seating-container">
            <div class="leaderboard-grid seating-modal-grid" style="margin-bottom: 0;">
              ${[0,1,2,3].map(u=>{let p=l[u],b=!!(p&&p.name),S=u===0,v=r===u,h="player-card seat-card-interactive";return b?h+=" is-filled":h+=" is-placeholder",v&&(h+=" is-active-target"),`
                  <div class="${h}" data-player-idx="${u}" data-seat-idx="${u}" title="${b?e.dragToSwapSeats:s?"\u05DC\u05D7\u05E5 \u05DC\u05D1\u05D7\u05D9\u05E8\u05EA \u05E9\u05D7\u05E7\u05DF":"Tap to assign player"}">
                    <div class="seat-top-row">
                      <span>${e.seatNumber} #${u+1}</span>
                      ${S?`<span class="tag-dealer" style="position: static;">${e.dealer.toUpperCase()}</span>`:""}
                      ${b?`<button type="button" class="btn-clear-seat" data-seat-idx="${u}" title="${e.clearSeat}">\u2715</button>`:""}
                    </div>

                    <div style="margin: 2px 0;">
                      ${b?`
                        <div class="seat-avatar-bubble" style="border-color: ${p.color}; background: ${p.color}24;">
                          ${p.avatar}
                        </div>
                      `:`
                        <div class="seat-avatar-placeholder">
                          +
                        </div>
                      `}
                    </div>

                    <div class="seat-player-name">
                      ${b?p.name:e.emptySeatPlaceholder}
                    </div>

                    <div class="seat-action-hint" style="color: ${b?"var(--accent-primary)":"var(--text-muted)"};">
                      ${b?s?"\u05D2\u05E8\u05D5\u05E8 \u05DC\u05D4\u05D7\u05DC\u05E4\u05D4":"Drag to swap":v?s?"\u05D9\u05E2\u05D3 \u05DC\u05D1\u05D7\u05D9\u05E8\u05D4":"Target seat":s?"\u05DC\u05D7\u05E5 \u05DC\u05D1\u05D7\u05D9\u05E8\u05D4":"Tap to pick"}
                    </div>
                  </div>
                `}).join("")}
            </div>
          </div>

          <!-- Quick Picker Roster Section (Wrapped, fits mobile perfectly) -->
          <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.65rem 0.75rem; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.4rem;">
              <span style="font-size: 0.74rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">
                \u{1F465} ${e.quickPick}
              </span>
              <div style="display: flex; align-items: center; gap: 0.3rem; flex-wrap: wrap;">
                ${a?`
                  <button type="button" class="btn-pill btn-quick-action" id="btn-use-last-lineup" title="${e.useLastLineup}">
                    ${e.useLastLineup}
                  </button>
                `:""}
                <button type="button" class="btn-pill btn-quick-action" id="btn-add-profile-from-new" title="${e.addProfile}">
                  ${e.addProfile}
                </button>
                <button type="button" class="btn-pill btn-quick-action" id="btn-clear-all-seats" title="${e.clearAllSeats}">
                  \u{1F5D1}\uFE0F ${e.clearAllSeats}
                </button>
                <button type="button" class="btn-pill btn-quick-action" id="btn-manage-profiles-from-new" title="${e.playerProfiles}">
                  \u2699\uFE0F
                </button>
              </div>
            </div>

            <div style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.4rem;">
              ${e.quickPickSub}
            </div>

            <!-- Wrapped Roster Chips (NO horizontal scrolling overflow) -->
            <div class="roster-chips-wrap" id="roster-chips-container">
              ${n.map(u=>{let p=l.findIndex(S=>S&&S.name&&S.name.trim().toLowerCase()===u.name.trim().toLowerCase()),b=p>=0;return`
                  <button type="button" class="profile-chip ${b?"is-assigned":""}" data-prof-id="${u.id}">
                    <span class="chip-avatar" style="border-color: ${u.color}; background: ${u.color}22;">${u.avatar}</span>
                    <span class="chip-name">${u.name}</span>
                    ${b?`<span class="chip-seat-badge">S${p+1}</span>`:""}
                  </button>
                `}).join("")}
            </div>
          </div>

          <!-- Mode & Match Options -->
          <div class="new-game-options-box" style="margin-bottom: 0.65rem; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <label style="display: flex; align-items: center; gap: 0.65rem; cursor: pointer;">
              <input type="checkbox" id="chk-new-game-simplified" ${t.simplifiedMode?"checked":""} style="width: 18px; height: 18px; accent-color: var(--accent-primary);">
              <div>
                <div style="font-size: 0.82rem; font-weight: 700; color: white;">${e.simplified}</div>
                <div style="font-size: 0.7rem; color: var(--text-secondary);">${s?"\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D5\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA (\u05DC\u05DC\u05D0 \u05DE\u05DB\u05E8\u05D6 \u05E9\u05DC\u05D9\u05D8)":"Direct Bids & Tricks (Skip trump & suit auction)"}</div>
              </div>
            </label>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.85rem;">
            <div>
              <label style="display: block; font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.2rem;">
                ${e.scoringRules}
              </label>
              <select class="select-field" id="new-game-rule-select" style="margin-bottom: 0; padding: 5px 8px; font-size: 0.78rem; min-height: 36px;">
                ${Object.values(U).map(u=>`
                  <option value="${u.id}">${s?u.nameHe:u.nameEn}</option>
                `).join("")}
              </select>
            </div>

            <div>
              <label style="display: block; font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.2rem;">
                ${e.gameLimit}
              </label>
              <select class="select-field" id="new-game-target-select" style="margin-bottom: 0; padding: 5px 8px; font-size: 0.78rem; min-height: 36px;">
                <option value="UNLIMITED">${e.freePlay}</option>
                <option value="13_ROUNDS">${e.deals13}</option>
                <option value="16_ROUNDS">${e.deals16}</option>
                <option value="TARGET_500">${e.target500}</option>
                <option value="TARGET_1000">${e.target1000}</option>
              </select>
            </div>
          </div>

          <!-- Dialog Actions -->
          <div style="display: flex; gap: 0.45rem;">
            <button type="button" class="btn-outline modal-close" style="flex: 1;">${e.cancel}</button>
            <button type="button" class="btn-block btn-hero-start" id="btn-start-new-game" style="flex: 2; font-size: 0.95rem; ${m<4?"opacity: 0.6;":""}">
              ${e.startGame} (${m}/4) \u2192
            </button>
          </div>

          ${i.length>0?`
            <div style="margin-top: 0.75rem; padding-top: 0.6rem; border-top: 1px solid var(--border-subtle); text-align: center;">
              <button type="button" class="btn-outline" id="btn-open-recent-from-new" style="font-size: 0.75rem; border-color: rgba(16, 185, 129, 0.4); color: #a7f3d0; padding: 3px 10px;">
                ${e.orResume} (${i.length}) \u2192
              </button>
            </div>
          `:""}
        </div>
      `,c()},c=()=>{let m=()=>o.remove();o.querySelectorAll(".modal-close").forEach(h=>h.addEventListener("click",m)),this.attachSeatingDragDrop({grid:o.querySelector(".seating-modal-grid"),getCards:()=>Array.from(o.querySelectorAll(".seat-card-interactive")),onSwap:(h,g)=>{let y=l[h];l[h]=l[g],l[g]=y,r=g,d()},onTap:h=>{r=h,d()}}),o.querySelectorAll(".btn-clear-seat").forEach(h=>{h.addEventListener("click",g=>{g.stopPropagation();let y=parseInt(h.dataset.seatIdx,10);l[y]=null,r=y,d()})}),this.attachRosterChipDragDrop({rosterContainer:o.querySelector("#roster-chips-container"),getSeatCards:()=>Array.from(o.querySelectorAll(".seat-card-interactive")),onAssignToSeat:(h,g)=>{let y=M.getProfile(h);if(!y)return;let f=l.findIndex(I=>I&&I.name&&I.name.trim().toLowerCase()===y.name.trim().toLowerCase());f>=0&&f!==g&&(l[f]=null),l[g]={name:y.name,color:y.color,avatar:y.avatar,baselineScore:0};let w=l.findIndex((I,E)=>!I||!I.name);w>=0?r=w:r=(g+1)%4,d()}}),o.querySelectorAll(".profile-chip").forEach(h=>{h.addEventListener("click",()=>{let g=h.dataset.profId,y=M.getProfile(g);if(!y)return;let f=l.findIndex(E=>E&&E.name&&E.name.trim().toLowerCase()===y.name.trim().toLowerCase());if(f>=0){r=f,d();return}let w=r;if(l[w]&&l[w].name){let E=l.findIndex(A=>!A||!A.name);E>=0&&(w=E)}l[w]={name:y.name,color:y.color,avatar:y.avatar,baselineScore:0};let I=l.findIndex((E,A)=>!E||!E.name);if(I>=0?r=I:r=(w+1)%4,typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(12)}catch{}d()})});let u=o.querySelector("#btn-clear-all-seats");u&&u.addEventListener("click",()=>{l=[null,null,null,null],r=0,d()});let p=o.querySelector("#btn-use-last-lineup");p&&p.addEventListener("click",()=>{let h=M.getLastLineup();h&&Array.isArray(h)&&h.length===4&&(l=h.map((g,y)=>({name:g.name,avatar:g.avatar||N[y%N.length],color:g.color||G[y%G.length],baselineScore:0})),d())});let b=o.querySelector("#btn-add-profile-from-new");b&&b.addEventListener("click",()=>{this.showCreateEditProfileModal(null,h=>{if(h){let g=r;if(l[g]&&l[g].name){let f=l.findIndex(w=>!w||!w.name);f>=0&&(g=f)}l[g]={name:h.name,color:h.color,avatar:h.avatar,baselineScore:0};let y=l.findIndex((f,w)=>!f||!f.name);y>=0?r=y:r=(g+1)%4,d()}})});let S=o.querySelector("#btn-manage-profiles-from-new");S&&S.addEventListener("click",()=>{this.showProfilesModal(()=>{d()})});let v=o.querySelector("#btn-open-recent-from-new");v&&v.addEventListener("click",()=>{m(),this.showSavedGamesModal()}),o.querySelector("#btn-start-new-game").addEventListener("click",()=>{if(l.filter(L=>L&&L.name).length<4){let L=l.findIndex($=>!$||!$.name);L>=0&&(r=L,d()),alert(e.mustChoose4Players);return}let g=o.querySelector("#chk-new-game-simplified").checked,y=o.querySelector("#new-game-rule-select").value,f=o.querySelector("#new-game-target-select").value,w=l.map((L,$)=>({id:`p${$}`,name:L.name.trim(),color:L.color||G[$%G.length],avatar:L.avatar||N[$%N.length]})),I=l.map(L=>parseInt(L.baselineScore,10)||0);w.forEach(L=>{M.saveProfile({name:L.name,color:L.color,avatar:L.avatar})}),M.saveLastLineup(w);let E=null,A=null;f==="13_ROUNDS"?E=13:f==="16_ROUNDS"?E=16:f==="TARGET_500"?A=500:f==="TARGET_1000"&&(A=1e3),this.app.startNewGame({players:w,rules:{...U[y]},maxRounds:E,targetPoints:A,simplifiedMode:g,initialScores:I}),m()})};d(),document.body.appendChild(o)}showProfilesModal(e=null){let s=this.app.i18n,t=s.lang==="he",i=document.createElement("div");i.className="modal-overlay";let n=()=>{let l=M.getProfiles();i.innerHTML=`
        <div class="modal-box" style="max-width: 500px;">
          <div class="modal-head">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <h3 style="font-size: 1.15rem; font-weight: 800;">\u{1F465} ${s.playerProfiles}</h3>
            </div>
            <button class="btn-pill modal-close">\u2715</button>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
            <span style="font-size: 0.78rem; color: var(--text-secondary);">
              ${l.length} ${s.savedProfiles}
            </span>
            <button type="button" class="btn-pill btn-share" id="btn-add-profile-main" style="height: 32px; font-size: 0.8rem; padding: 0 12px;">
              ${s.addProfile}
            </button>
          </div>

          <div class="profiles-list-container" style="display: flex; flex-direction: column; gap: 0.55rem; max-height: 52vh; overflow-y: auto; padding-right: 2px;">
            ${l.map(r=>{let o=r.gamesPlayed>0?Math.round(r.wins/r.gamesPlayed*100):0,d=r.zeroBids>0?Math.round(r.zeroHits/r.zeroBids*100):0,c=r.gamesPlayed>0?Math.round(r.totalScore/r.gamesPlayed):0;return`
                <div class="profile-card-row" data-prof-id="${r.id}">
                  <div style="display: flex; align-items: center; gap: 0.65rem; flex: 1; min-width: 0;">
                    <div class="profile-avatar-circle" style="border-color: ${r.color}; background: ${r.color}22;">
                      ${r.avatar}
                    </div>
                    <div style="min-width: 0; flex: 1;">
                      <div style="font-weight: 800; font-size: 0.92rem; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${r.name}
                      </div>
                      <div class="profile-stats-badges">
                        <span class="stat-badge" title="${s.matchesPlayed}">${r.gamesPlayed||0} ${s.matchesPlayed}</span>
                        <span class="stat-badge highlight" title="${s.winRatio}">\u{1F3C6} ${o}%</span>
                        ${r.zeroBids>0?`
                          <span class="stat-badge" title="${s.zeroHitsStats}">0\uFE0F\u20E3 ${d}%</span>
                        `:""}
                        <span class="stat-badge" title="${s.totalPoints}">\u2B50 ${r.totalScore||0}</span>
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0;">
                    <button type="button" class="btn-pill btn-edit-prof" data-prof-id="${r.id}" title="${s.editTitle}" style="height: 28px; padding: 0 8px; font-size: 0.72rem;">
                      \u270F\uFE0F
                    </button>
                    <button type="button" class="btn-pill btn-delete-prof" data-prof-id="${r.id}" title="${s.deleteProfileBtn}" style="height: 28px; padding: 0 8px; font-size: 0.72rem; color: var(--danger); border-color: rgba(239, 68, 68, 0.3);">
                      \u{1F5D1}\uFE0F
                    </button>
                  </div>
                </div>
              `}).join("")}
          </div>

          <button type="button" class="btn-block modal-close" style="margin-top: 1rem;">
            ${s.close}
          </button>
        </div>
      `,a()},a=()=>{let l=()=>{i.remove(),e&&e()};i.querySelectorAll(".modal-close").forEach(o=>o.addEventListener("click",l));let r=i.querySelector("#btn-add-profile-main");r&&r.addEventListener("click",()=>{this.showCreateEditProfileModal(null,()=>n())}),i.querySelectorAll(".btn-edit-prof").forEach(o=>{o.addEventListener("click",()=>{let d=M.getProfile(o.dataset.profId);d&&this.showCreateEditProfileModal(d,()=>n())})}),i.querySelectorAll(".btn-delete-prof").forEach(o=>{o.addEventListener("click",()=>{let d=M.getProfile(o.dataset.profId);d&&confirm(s.deleteProfileConfirm.replace("{name}",d.name))&&(M.deleteProfile(d.id),n())})})};n(),document.body.appendChild(i)}showCreateEditProfileModal(e=null,s=null){let t=this.app.i18n,i=t.lang==="he",n=!!e,a=e?e.avatar:N[Math.floor(Math.random()*N.length)],l=e?e.color:G[Math.floor(Math.random()*G.length)],r=document.createElement("div");r.className="modal-overlay",r.style.zIndex="300";let o=()=>{r.innerHTML=`
        <div class="modal-box" style="max-width: 420px;">
          <div class="modal-head">
            <h3 style="font-size: 1.05rem; font-weight: 800;">
              ${n?t.editProfileTitle:t.createProfileTitle}
            </h3>
            <button class="btn-pill modal-close">\u2715</button>
          </div>

          <!-- Avatar Preview with selected color -->
          <div style="display: flex; justify-content: center; margin: 0.85rem 0;">
            <div class="profile-avatar-preview" style="border-color: ${l}; background: ${l}22;">
              ${a}
            </div>
          </div>

          <div style="margin-bottom: 0.85rem;">
            <label style="display: block; font-size: 0.74rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
              ${t.playerName}
            </label>
            <input type="text" class="input-field" id="prof-modal-name" value="${e?e.name:""}" placeholder="${t.playerNamePlaceholder}" maxlength="24" autofocus style="margin-bottom: 0;" />
          </div>

          <!-- Avatar Grid -->
          <div style="margin-bottom: 0.85rem;">
            <label style="display: block; font-size: 0.74rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
              ${t.chooseAvatar}
            </label>
            <div class="emoji-picker-grid">
              ${N.map(c=>`
                <button type="button" class="emoji-option-btn ${c===a?"is-selected":""}" data-avatar="${c}">
                  ${c}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Color Swatches -->
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.74rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
              ${t.chooseColor}
            </label>
            <div class="color-picker-swatches">
              ${G.map(c=>`
                <button type="button" class="color-swatch-btn ${c===l?"is-selected":""}" data-color="${c}" style="background: ${c};"></button>
              `).join("")}
            </div>
          </div>

          <div style="display: flex; gap: 0.4rem; margin-top: 1rem;">
            <button type="button" class="btn-outline modal-close" style="flex: 1;">${t.cancel}</button>
            <button type="button" class="btn-block" id="btn-save-prof-confirm" style="flex: 2;">${t.saveProfileBtn}</button>
          </div>
        </div>
      `,d()},d=()=>{let c=()=>r.remove();r.querySelectorAll(".modal-close").forEach(m=>m.addEventListener("click",c)),r.querySelectorAll(".emoji-option-btn").forEach(m=>{m.addEventListener("click",()=>{a=m.dataset.avatar,o()})}),r.querySelectorAll(".color-swatch-btn").forEach(m=>{m.addEventListener("click",()=>{l=m.dataset.color,o()})}),r.querySelector("#btn-save-prof-confirm").addEventListener("click",()=>{let m=r.querySelector("#prof-modal-name").value.trim();if(!m){r.querySelector("#prof-modal-name").focus();return}let u=M.saveProfile({id:e?.id,name:m,avatar:a,color:l});c(),s&&s(u)})};o(),document.body.appendChild(r)}showAvatarPickerModal(e,s="\u{1F98A}",t="#6366f1"){let i=this.app.i18n,n=s,a=t,l=document.createElement("div");l.className="modal-overlay",l.style.zIndex="350",l.innerHTML=`
      <div class="modal-box" style="max-width: 380px;">
        <div class="modal-head">
          <h3 style="font-size: 1rem; font-weight: 800;">${i.chooseAvatar} & ${i.chooseColor}</h3>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div style="display: flex; justify-content: center; margin: 0.75rem 0;">
          <div id="quick-avatar-preview" class="profile-avatar-preview" style="border-color: ${a}; background: ${a}22;">
            ${n}
          </div>
        </div>

        <div class="emoji-picker-grid" style="margin-bottom: 0.85rem;">
          ${N.map(o=>`
            <button type="button" class="emoji-option-btn ${o===n?"is-selected":""}" data-avatar="${o}">
              ${o}
            </button>
          `).join("")}
        </div>

        <div class="color-picker-swatches" style="margin-bottom: 1rem;">
          ${G.map(o=>`
            <button type="button" class="color-swatch-btn ${o===a?"is-selected":""}" data-color="${o}" style="background: ${o};"></button>
          `).join("")}
        </div>

        <div style="display: flex; gap: 0.4rem;">
          <button type="button" class="btn-outline modal-close" style="flex: 1;">${i.cancel}</button>
          <button type="button" class="btn-block" id="btn-quick-avatar-apply" style="flex: 2;">${i.done}</button>
        </div>
      </div>
    `;let r=()=>l.remove();l.querySelectorAll(".modal-close").forEach(o=>o.addEventListener("click",r)),l.querySelectorAll(".emoji-option-btn").forEach(o=>{o.addEventListener("click",()=>{n=o.dataset.avatar,l.querySelectorAll(".emoji-option-btn").forEach(c=>c.classList.toggle("is-selected",c===o));let d=l.querySelector("#quick-avatar-preview");d&&(d.textContent=n)})}),l.querySelectorAll(".color-swatch-btn").forEach(o=>{o.addEventListener("click",()=>{a=o.dataset.color,l.querySelectorAll(".color-swatch-btn").forEach(c=>c.classList.toggle("is-selected",c===o));let d=l.querySelector("#quick-avatar-preview");d&&(d.style.borderColor=a,d.style.background=`${a}22`)})}),l.querySelector("#btn-quick-avatar-apply").addEventListener("click",()=>{r(),e&&e(n,a)}),document.body.appendChild(l)}showStatsModal(){let e=this.app.i18n,s=this.app.session,t=me(s),i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">${e.gameStats}</h3>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; margin-bottom: 0.85rem;">
          <div style="background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.68rem; color: var(--text-muted);">${e.deals}</div>
            <div style="font-size: 1.15rem; font-weight: 800;">${t.numRounds}</div>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.68rem; color: var(--text-muted);">${e.over}</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #a5b4fc;">${t.overRoundsCount}</div>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.68rem; color: var(--text-muted);">${e.under}</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #6ee7b7;">${t.underRoundsCount}</div>
          </div>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
          ${e.playerAccuracy}
        </div>

        <div class="stats-players-grid" style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1rem;">
          ${t.playerStats.map(a=>`
            <div style="background: rgba(0,0,0,0.2); padding: 0.6rem 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.2rem;">
                <span style="font-weight: 700; font-size: 0.82rem;">
                  <span class="player-dot" style="background: ${a.player.color};"></span>
                  ${a.player.name}
                </span>
                <span style="font-weight: 800; font-size: 0.82rem; color: ${a.hitRate>=50?"var(--success)":"var(--warning)"};">${a.hitRate}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted);">
                <span>${e.made}: ${a.madeBidsCount}/${a.totalBidsCount}</span>
                <span>${e.avgTricksPerDeal}: ${a.avgTricksPerRound}</span>
                <span>${e.passSuccess}: ${a.passSuccess}/${a.passAttempts}</span>
              </div>
            </div>
          `).join("")}
        </div>

        <button class="btn-block modal-close">
          ${e.done}
        </button>
      </div>
    `,document.body.appendChild(i);let n=()=>i.remove();i.querySelectorAll(".modal-close").forEach(a=>a.addEventListener("click",n))}showExportModal(){let e=this.app.i18n,s=this.app.session,t=s.exportJson(),i=s.getRankings(),n=`Israeli Whist Match Results
`;n+=`Rounds: ${s.completedRounds.length}

`,i.forEach((r,o)=>{n+=`#${o+1} ${r.player.name}: ${r.score>=0?"+":""}${r.score} pts
`});let a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">${e.exportShare}</h3>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div style="margin-bottom: 0.85rem;">
          <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.3rem;">Text Summary</label>
          <textarea class="input-field" id="txt-share-summary" rows="5" readonly style="font-family: monospace; font-size: 0.78rem; resize: none;">${n}</textarea>
          <button class="btn-outline" id="btn-copy-share">Copy Summary</button>
        </div>

        <div style="margin-bottom: 0.85rem;">
          <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.3rem;">JSON Data</label>
          <textarea class="input-field" id="txt-json-export" rows="3" readonly style="font-family: monospace; font-size: 0.72rem; resize: none;">${t}</textarea>
          <button class="btn-outline" id="btn-copy-json">Copy JSON</button>
        </div>

        <button class="btn-block modal-close">
          ${e.done}
        </button>
      </div>
    `,document.body.appendChild(a);let l=()=>a.remove();a.querySelectorAll(".modal-close").forEach(r=>r.addEventListener("click",l)),a.querySelector("#btn-copy-share").addEventListener("click",()=>{navigator.clipboard.writeText(n),alert(e.copied||"Copied to clipboard.")}),a.querySelector("#btn-copy-json").addEventListener("click",()=>{navigator.clipboard.writeText(t),alert(e.copied||"JSON copied to clipboard.")})}showBaselineModal(){let e=this.app.i18n,s=e.lang==="he",t=this.app.session,i=t.initialScores||[0,0,0,0],n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
      <div class="modal-box" style="max-width: 400px;">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">\u{1F3AF} ${e.baselineScores}</h3>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.4;">
          ${e.baselineDesc}
        </div>

        <div class="baseline-inputs-grid" style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.25rem;">
          ${t.players.map((l,r)=>`
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="player-dot" style="background: ${l.color};"></span>
                <span style="font-weight: 700; font-size: 0.9rem;">${l.name}</span>
              </div>
              <input type="number" class="input-field baseline-score-input" data-p-idx="${r}" value="${i[r]||0}" style="width: 90px; text-align: center; margin-bottom: 0; font-weight: 700; font-size: 0.95rem; font-family: monospace;" />
            </div>
          `).join("")}
        </div>

        <div style="display: flex; gap: 0.4rem;">
          <button class="btn-outline modal-close" style="flex: 1;">${e.cancel}</button>
          <button class="btn-block" id="btn-save-baseline" style="flex: 1;">${e.saveBaseline}</button>
        </div>
      </div>
    `,document.body.appendChild(n);let a=()=>n.remove();n.querySelectorAll(".modal-close").forEach(l=>l.addEventListener("click",a)),n.querySelector("#btn-save-baseline").addEventListener("click",()=>{let l=n.querySelectorAll(".baseline-score-input"),r=[];l.forEach(o=>{r.push(parseInt(o.value,10)||0)}),t.setInitialScores(r),a()})}showEditDealModal(e){let s=this.app.i18n,t=s.lang==="he",i=this.app.session;if(e<0||e>=i.completedRounds.length)return;let n=i.completedRounds[e],a=[...n.bets],l=[...n.tricks],r=n.dealerIndex,o=document.createElement("div");o.className="modal-overlay";let d=()=>{let p=l.reduce((g,y)=>g+(parseInt(y,10)||0),0),b=a.reduce((g,y)=>g+(parseInt(y,10)||0),0),S=n.trump&&n.trump.isPasRound,v=g=>!n.simplified&&n.trump&&n.trump.winnerIndex===g,h=[];for(let g=0;g<4;g++){let y=parseInt(a[g],10)||0,f=parseInt(l[g],10)||0,w=V(y,f,v(g),S,i.rules,b);h.push(w)}return{sumTricks:p,sumBets:b,playerScores:h}},c=()=>{let{sumTricks:p,sumBets:b,playerScores:S}=d(),v=o.querySelector("#edit-tricks-sum-badge"),h=o.querySelector("#edit-bets-sum-badge"),g=o.querySelector("#edit-hook-warning"),y=o.querySelector("#btn-save-edit-deal");if(v&&(v.textContent=`${t?"\u05E1\u05DA \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA":"Tricks"}: ${p}/13`,p===13?(v.style.background="rgba(16, 185, 129, 0.2)",v.style.color="#a7f3d0",v.style.borderColor="rgba(16, 185, 129, 0.4)"):(v.style.background="rgba(239, 68, 68, 0.2)",v.style.color="#fca5a5",v.style.borderColor="rgba(239, 68, 68, 0.4)")),h&&(h.textContent=`${t?"\u05E1\u05DA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA":"Bids"}: ${b}`),g&&(b===13&&i.rules.enforceHookRule?g.style.display="block":g.style.display="none"),S.forEach((f,w)=>{let I=o.querySelector(`.edit-p-score-${w}`);if(I){let E=f.score>=0?`+${f.score}`:`${f.score}`;I.textContent=E,I.style.color=f.made?"var(--success)":"var(--danger)"}}),y){let f=p===13;y.disabled=!f,y.style.opacity=f?"1":"0.4",y.style.cursor=f?"pointer":"not-allowed"}};o.innerHTML=`
      <div class="modal-box modal-box-wide">
        <div class="modal-head">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700;">
              ${s.editDealTitle.replace("{num}",n.roundNumber)}
            </h3>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
              ${s.editDealSub}
            </div>
          </div>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div style="margin: 0.75rem 0 0.85rem; display: flex; align-items: center; justify-content: space-between; gap: 8px; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary);">
            \u{1F0CF} ${s.currentDealer}:
          </label>
          <select id="edit-deal-dealer" class="select-field" style="width: auto; margin-bottom: 0; padding: 4px 8px; font-size: 0.82rem;">
            ${i.players.map((p,b)=>`
              <option value="${b}" ${b===r?"selected":""}>${p.name}</option>
            `).join("")}
          </select>
        </div>

        <div style="display: flex; gap: 8px; margin-bottom: 0.85rem;">
          <div id="edit-tricks-sum-badge" style="flex: 1; padding: 6px; text-align: center; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 700; border: 1px solid;"></div>
          <div id="edit-bets-sum-badge" style="flex: 1; padding: 6px; text-align: center; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 700; background: rgba(255,255,255,0.05); color: var(--text-secondary); border: 1px solid var(--border-subtle);"></div>
        </div>

        <div id="edit-hook-warning" style="display: none; margin-bottom: 0.85rem; padding: 6px 10px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: var(--radius-sm); font-size: 0.75rem; color: #fde68a;">
          \u26A0\uFE0F ${s.hookWarning}
        </div>

        <div class="edit-deal-players-grid" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem;">
          ${i.players.map((p,b)=>`
            <div class="edit-deal-player-row" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 6px; min-width: 85px; flex: 1;">
                <span class="player-dot" style="background: ${p.color};"></span>
                <span style="font-size: 0.85rem; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.name}</span>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">B:</span>
                  <input type="number" min="0" max="13" class="input-field edit-deal-bid" data-p-idx="${b}" value="${a[b]}" style="width: 48px; margin-bottom: 0; padding: 4px; text-align: center; font-size: 0.85rem; font-weight: 700;" />
                </div>

                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">T:</span>
                  <input type="number" min="0" max="13" class="input-field edit-deal-trick" data-p-idx="${b}" value="${l[b]}" style="width: 48px; margin-bottom: 0; padding: 4px; text-align: center; font-size: 0.85rem; font-weight: 700;" />
                </div>

                <div class="edit-p-score-${b} signed-score" dir="ltr" style="min-width: 45px; text-align: center; font-size: 0.85rem; font-weight: 800; direction: ltr; unicode-bidi: isolate;">
                  \u2014
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <button class="btn-pill" id="btn-delete-deal" style="color: var(--danger); font-size: 0.75rem; height: 38px; padding: 0 10px;">
            \u{1F5D1}\uFE0F ${s.deleteDeal}
          </button>
          <div style="display: flex; gap: 6px;">
            <button class="btn-outline modal-close" style="height: 38px; padding: 0 12px;">${s.cancel}</button>
            <button class="btn-block" id="btn-save-edit-deal" style="height: 38px; padding: 0 16px;">${s.saveDeal}</button>
          </div>
        </div>
      </div>
    `,document.body.appendChild(o);let m=()=>o.remove();o.querySelectorAll(".modal-close").forEach(p=>p.addEventListener("click",m)),o.querySelectorAll(".edit-deal-bid").forEach(p=>{p.addEventListener("input",b=>{let S=parseInt(b.target.dataset.pIdx,10),v=parseInt(b.target.value,10);isNaN(v)&&(v=0),v<0&&(v=0),v>13&&(v=13),a[S]=v,c()})}),o.querySelectorAll(".edit-deal-trick").forEach(p=>{p.addEventListener("input",b=>{let S=parseInt(b.target.dataset.pIdx,10),v=parseInt(b.target.value,10);isNaN(v)&&(v=0),v<0&&(v=0),v>13&&(v=13),l[S]=v,c()})});let u=o.querySelector("#edit-deal-dealer");u&&u.addEventListener("change",p=>{r=parseInt(p.target.value,10)}),o.querySelector("#btn-save-edit-deal").addEventListener("click",()=>{let{sumTricks:p}=d();if(p!==13){alert(s.invalidTricksSum.replace("{sum}",p));return}i.editCompletedRound(e,{bets:a,tricks:l,dealerIndex:r}),m()}),o.querySelector("#btn-delete-deal").addEventListener("click",()=>{confirm(s.deleteDealConfirm.replace("{num}",n.roundNumber))&&(i.deleteCompletedRound(e),m())}),c()}};var ne={lang:"en",dir:"ltr",appName:"Whist",appTitle:"Israeli Whist Scorekeeper",landingSubtitle:"Real-time multiplayer scoring, 1-tap bidding, automatic dealer rotation & statistics.",startNewMatch:"\u{1F3B2} Start New Match",joinRoom:"Join \u2192",roomCodePlaceholder:"Enter Room Code (e.g. W-KY9G)",recentMatches:"Recent Matches",resumeMatch:"Resume Match \u2192",quickRulesTitle:"\u{1F4D6} Quick Rules & Scoring Summary",lobby:"\u{1F3E0} Lobby",share:"Share",menu:"Menu \u2630",tabActiveDeal:"Active Deal",tabHistory:"History",tabChart:"Chart",simplified:"\u26A1 Simplified",fullTrump:"Full Trump",deal:"Deal",dealer:"Dealer",lead:"Lead",trumpMaker:"Trump Maker",lastBidder:"Last Bidder",bid:"Bid",tricks:"Tricks",stageTrump:"1. Trump Auction",stageBets:"1. Player Bids",stageBetsFull:"2. Player Bids",stageTricks:"2. Actual Tricks",stageTricksFull:"3. Actual Tricks",auctionWinner:"1. Auction Winner",denomination:"2. Denomination / Suit",winningTarget:"3. Winning Target (Tricks)",pasRound:"All 4 Passed (Pas Round)",confirmTrump:"Confirm Trump & Enter Bids \u2192",editTrump:"Edit Trump",totalBids:"Total Bids",hookViolation:"\u26A0\uFE0F Total equals 13 (Hook Violation). Total bids must be \u2260 13 to proceed.",lastBidderCannotBid:"cannot bid",enterTricksBtn:"Enter Actual Tricks \u2192",tricksValid:"\u2713 13 Tricks Total",remainingToAssign:"Remaining to Assign",autoFillBids:"\u26A1 Auto-Fill Bids",exact:"\u2713 Exact",editBids:"\u2190 Edit Bids",calculateNextDeal:"Calculate & Next Deal \u2713",roundScoreCalc:"Round Score Calculation",rank:"Rank",noDeals:"No Deals Recorded",noDealsSub:"Start Deal 1 above to record score history.",historyTitle:"History",deals:"Deals",undoLastDeal:"Undo Last Deal",undoConfirm:"Undo the last completed deal?",dragToReorder:"Drag player cards to swap seats",doneReordering:"Done \u2713",menuTitle:"Menu & Settings",reorganizeSeating:"\u{1FA91} Reorganize Seating",reorganizeDesc:"Long press player card or drag to swap seats",editPlayersSettings:"\u270F\uFE0F Edit Players & Settings",editPlayersDesc:"Rename players, change dealer, or adjust rules",modeToggleTitle:"Mode",savedGames:"\u{1F4C2} Saved Games",savedGamesDesc:"Resume previous matches with date & scores",statsAccuracy:"\u{1F4CA} Player Stats & Accuracy",exportShare:"\u{1F4E4} Export / Share Text",startNewGameMenu:"\u{1F3B2} Start New Game",returnToLobby:"\u{1F3E0} Return to Lobby / Home",close:"Close",done:"Done",cancel:"Cancel",saveChanges:"Save Changes \u2713",reorganizeTitle:"Reorganize Player Seating",reorganizeSub:"Drag & drop or tap two players to swap seats, or rotate clockwise.",rotateClockwise:"\u21BB Rotate Clockwise",rotateCounterClockwise:"\u21BA Counter-Clockwise",swapSeatsHint:"Drag a player or tap any two to swap seats",seatNumber:"Seat",doneSeating:"Save Seating \u2713",tapToSwap:"Tap to swap with",editTitle:"Edit Players & Settings",playerNames:"Player Names",currentDealer:"Current Dealer",gameMode:"Game Mode",simplifiedOpt:"\u26A1 Simplified (Direct Bids & Tricks)",fullOpt:"\u{1F3B4} Full (With Trump Auction & Suits)",scoringRules:"Scoring Rules Preset",enforceHook:"Enforce Hook Rule (Total Bets \u2260 13)",newGameTitle:"New Game Session",newGameSub:"Configure players and start a fresh deal.",gameLimit:"Game Limit",freePlay:"Free Play (Unlimited Deals)",deals13:"13 Deals",deals16:"16 Deals (4 Deals per Player)",target500:"First to 500 Points",target1000:"First to 1000 Points",startGame:"Start Game",orResume:"\u{1F4C2} Or Resume from Saved Games",shareTitle:"Share Game Session",shareSub:"Real-time live multi-device sync",scanQr:"Scan QR code with phone camera to join",shareUrlLabel:"Direct Shareable URL",copy:"Copy",copied:"Copied!",shareMobile:"Share (Mobile)",gameStats:"Game Statistics",over:"Over",under:"Under",playerAccuracy:"Player Accuracy",made:"Made",avgTricksPerDeal:"Avg Tricks",zeroSuccess:"Zero",passSuccess:"Zero",noSavedGames:"No Saved Games Yet",noSavedGamesSub:"Completed and active games will automatically appear here.",deleteConfirm:"Remove room from saved games?",delete:"Delete",currentGame:"Current Game",editDeal:"Edit Deal",editDealTitle:"Edit Deal #{num}",editDealSub:"Modify bids, tricks, and dealer. All subsequent totals will recalculate automatically.",saveDeal:"Save & Recalculate \u2713",baselineScores:"Baseline / Starting Scores",baselineDesc:"Set custom starting scores to continue a game recorded elsewhere.",setBaseline:"Set Baseline",baselineRow:"Baseline",saveBaseline:"Save Baseline \u2713",invalidTricksSum:"Sum of tricks must equal 13 (currently {sum})",hookWarning:"Total bids cannot equal 13 (Hook rule)",deleteDeal:"Delete Deal",deleteDealConfirm:"Are you sure you want to delete Deal #{num}? All subsequent totals will recalculate.",playerProfiles:"Player Profiles",savedProfiles:"Saved Profiles",quickPick:"Quick Pick Players",quickPickSub:"Drag player cards to swap seats, or drag/tap below to assign.",emptySeatPlaceholder:"+ Choose Player",emptySeat:"Empty Seat",clearSeat:"Clear seat",clearAllSeats:"Clear All",tapToSwapSeats:"Drag card to swap",dragToSwapSeats:"Drag to swap",mustChoose4Players:"Please choose all 4 players to start the game",tableEmblem:"\u2660 \u2665 \u2666 \u2663",seat1:"Seat 1",seat2:"Seat 2",seat3:"Seat 3",seat4:"Seat 4",useLastLineup:"\u26A1 Use Last Lineup",addProfile:"+ New Player",createProfileTitle:"Create Player Profile",editProfileTitle:"Edit Player Profile",playerName:"Player Name",playerNamePlaceholder:"e.g. Omer",chooseAvatar:"Choose Avatar",chooseColor:"Player Color",saveProfileBtn:"Save Profile \u2713",deleteProfileBtn:"Delete Profile",deleteProfileConfirm:"Delete profile for {name}?",careerStats:"Career Statistics",matchesPlayed:"Matches",winRatio:"Win Rate",totalPoints:"Total Points",zeroHitsStats:"Zero (0) Hits",manageProfilesMenu:"\u{1F465} Player Profiles & Roster",manageProfilesDesc:"Saved players, custom avatars & career stats",switchLang:"\u05E2\u05D1\u05E8\u05D9\u05EA"};var re={lang:"he",dir:"rtl",appName:"\u05D5\u05D5\u05D9\u05E1\u05D8",appTitle:"\u05DC\u05D5\u05D7 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D5\u05D5\u05D9\u05E1\u05D8 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9",landingSubtitle:"\u05E8\u05D9\u05E9\u05D5\u05DD \u05E0\u05D9\u05E7\u05D5\u05D3 \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA \u05DC\u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05DE\u05E8\u05D5\u05D1\u05D9\u05DD, \u05D4\u05D6\u05E0\u05EA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D1\u05DC\u05D7\u05D9\u05E6\u05D4 \u05D0\u05D7\u05EA, \u05E1\u05D9\u05D1\u05D5\u05D1 \u05DE\u05D7\u05DC\u05E7 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9 \u05D5\u05E1\u05D8\u05D8\u05D9\u05E1\u05D8\u05D9\u05E7\u05D4.",startNewMatch:"\u{1F3B2} \u05D4\u05EA\u05D7\u05DC \u05DE\u05E9\u05D7\u05E7 \u05D7\u05D3\u05E9",joinRoom:"\u05D4\u05E6\u05D8\u05E8\u05E3 \u2190",roomCodePlaceholder:"\u05D4\u05D6\u05DF \u05E7\u05D5\u05D3 \u05D7\u05D3\u05E8 (\u05DC\u05D3\u05D5\u05D2\u05DE\u05D4: W-KY9G)",recentMatches:"\u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",resumeMatch:"\u05D4\u05DE\u05E9\u05DA \u05DE\u05E9\u05D7\u05E7 \u2190",quickRulesTitle:"\u{1F4D6} \u05D7\u05D5\u05E7\u05D9 \u05D4\u05DE\u05E9\u05D7\u05E7 \u05D5\u05E9\u05D9\u05D8\u05EA \u05D4\u05E0\u05D9\u05E7\u05D5\u05D3",lobby:"\u{1F3E0} \u05DC\u05D5\u05D1\u05D9",share:"\u05E9\u05D9\u05EA\u05D5\u05E3",menu:"\u05EA\u05E4\u05E8\u05D9\u05D8 \u2630",tabActiveDeal:"\u05E1\u05D9\u05D1\u05D5\u05D1 \u05E4\u05E2\u05D9\u05DC",tabHistory:"\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4",tabChart:"\u05EA\u05E8\u05E9\u05D9\u05DD",simplified:"\u26A1 \u05DE\u05E4\u05D5\u05E9\u05D8",fullTrump:"\u05DE\u05DB\u05E8\u05D6 \u05E9\u05DC\u05D9\u05D8 \u05DE\u05DC\u05D0",deal:"\u05E1\u05D9\u05D1\u05D5\u05D1",dealer:"\u05DE\u05D7\u05DC\u05E7",lead:"\u05E8\u05D0\u05E9\u05D5\u05DF",trumpMaker:"\u05E7\u05D5\u05D1\u05E2 \u05D4\u05E9\u05DC\u05D9\u05D8",lastBidder:"\u05DE\u05DB\u05E8\u05D9\u05D6 \u05D0\u05D7\u05E8\u05D5\u05DF",bid:"\u05D4\u05DB\u05E8\u05D6\u05D4",tricks:"\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA",stageTrump:"1. \u05DE\u05DB\u05E8\u05D6 \u05E9\u05DC\u05D9\u05D8",stageBets:"1. \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD",stageBetsFull:"2. \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD",stageTricks:"2. \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D1\u05E4\u05D5\u05E2\u05DC",stageTricksFull:"3. \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D1\u05E4\u05D5\u05E2\u05DC",auctionWinner:"1. \u05D6\u05D5\u05DB\u05D4 \u05D1\u05DE\u05DB\u05E8\u05D6",denomination:"2. \u05E1\u05D3\u05E8\u05D4 / \u05E9\u05DC\u05D9\u05D8",winningTarget:"3. \u05D9\u05E2\u05D3 \u05D6\u05DB\u05D9\u05D9\u05D4 (\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA)",pasRound:"\u05DB\u05DC \u05D4-4 \u05D0\u05DE\u05E8\u05D5 \u05E4\u05D0\u05E1 (\u05E1\u05D9\u05D1\u05D5\u05D1 \u05E4\u05D0\u05E1)",confirmTrump:"\u05D0\u05E9\u05E8 \u05E9\u05DC\u05D9\u05D8 \u05D5\u05E2\u05D1\u05D5\u05E8 \u05DC\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u2190",editTrump:"\u05E2\u05E8\u05D5\u05DA \u05E9\u05DC\u05D9\u05D8",totalBids:"\u05E1\u05DA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA",hookViolation:"\u26A0\uFE0F \u05E1\u05DA \u05D4\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D4\u05D5\u05D0 \u05D1\u05D3\u05D9\u05D5\u05E7 13 (\u05D7\u05D5\u05E7 \u05D4\u05DE\u05D7\u05DC\u05E7). \u05D9\u05E9 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05D4\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05DB\u05D3\u05D9 \u05DC\u05D4\u05DE\u05E9\u05D9\u05DA.",lastBidderCannotBid:"\u05DC\u05D0 \u05D9\u05DB\u05D5\u05DC \u05DC\u05D4\u05DB\u05E8\u05D9\u05D6",enterTricksBtn:"\u05D4\u05D6\u05DF \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D1\u05E4\u05D5\u05E2\u05DC \u2190",tricksValid:"\u2713 13 \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D1\u05E1\u05DA \u05D4\u05DB\u05DC",remainingToAssign:"\u05E0\u05D5\u05EA\u05E8\u05D5 \u05DC\u05D7\u05DC\u05D5\u05E7\u05D4",autoFillBids:"\u26A1 \u05DE\u05D9\u05DC\u05D5\u05D9 \u05DC\u05E4\u05D9 \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA",exact:"\u2713 \u05DE\u05D3\u05D5\u05D9\u05E7",editBids:"\u2190 \u05E2\u05E8\u05D5\u05DA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA",calculateNextDeal:"\u05D7\u05E9\u05D1 \u05E0\u05D9\u05E7\u05D5\u05D3 \u05D5\u05E1\u05D9\u05D1\u05D5\u05D1 \u05D4\u05D1\u05D0 \u2713",roundScoreCalc:"\u05D7\u05D9\u05E9\u05D5\u05D1 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D4\u05E1\u05D9\u05D1\u05D5\u05D1",rank:"\u05DE\u05E7\u05D5\u05DD",noDeals:"\u05D8\u05E8\u05DD \u05E0\u05E8\u05E9\u05DE\u05D5 \u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD",noDealsSub:"\u05D4\u05EA\u05D7\u05DC \u05D0\u05EA \u05E1\u05D9\u05D1\u05D5\u05D1 1 \u05DC\u05DE\u05E2\u05DC\u05D4 \u05DB\u05D3\u05D9 \u05DC\u05E8\u05E9\u05D5\u05DD \u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D9\u05EA \u05E0\u05D9\u05E7\u05D5\u05D3.",historyTitle:"\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4",deals:"\u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD",undoLastDeal:"\u05D1\u05D8\u05DC \u05E1\u05D9\u05D1\u05D5\u05D1 \u05D0\u05D7\u05E8\u05D5\u05DF",undoConfirm:"\u05DC\u05D1\u05D8\u05DC \u05D0\u05EA \u05D4\u05E1\u05D9\u05D1\u05D5\u05D1 \u05D4\u05D0\u05D7\u05E8\u05D5\u05DF \u05E9\u05D4\u05D5\u05E9\u05DC\u05DD?",dragToReorder:"\u05D2\u05E8\u05D5\u05E8 \u05DB\u05E8\u05D8\u05D9\u05E1 \u05E9\u05D7\u05E7\u05DF \u05DC\u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05E7\u05D5\u05DD \u05D9\u05E9\u05D9\u05D1\u05D4",doneReordering:"\u05E1\u05D9\u05D5\u05DD \u2713",menuTitle:"\u05EA\u05E4\u05E8\u05D9\u05D8 \u05D5\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA",reorganizeSeating:"\u{1FA91} \u05E1\u05D9\u05D3\u05D5\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA \u05D9\u05E9\u05D9\u05D1\u05D4",reorganizeDesc:"\u05DC\u05D7\u05D9\u05E6\u05D4 \u05D0\u05E8\u05D5\u05DB\u05D4 \u05E2\u05DC \u05E9\u05D7\u05E7\u05DF \u05D5\u05D2\u05E8\u05D9\u05E8\u05D4 \u05DC\u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA",editPlayersSettings:"\u270F\uFE0F \u05E2\u05E8\u05D9\u05DB\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05D5\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA",editPlayersDesc:"\u05E9\u05D9\u05E0\u05D5\u05D9 \u05E9\u05DE\u05D5\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD, \u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05D7\u05DC\u05E7 \u05D0\u05D5 \u05D4\u05EA\u05D0\u05DE\u05EA \u05D7\u05D5\u05E7\u05D9\u05DD",modeToggleTitle:"\u05DE\u05E6\u05D1 \u05DE\u05E9\u05D7\u05E7",savedGames:"\u{1F4C2} \u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05E9\u05DE\u05D5\u05E8\u05D9\u05DD",savedGamesDesc:"\u05D4\u05DE\u05E9\u05DA \u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05E7\u05D5\u05D3\u05DE\u05D9\u05DD \u05E2\u05DD \u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05E0\u05D9\u05E7\u05D5\u05D3",statsAccuracy:"\u{1F4CA} \u05E1\u05D8\u05D8\u05D9\u05E1\u05D8\u05D9\u05E7\u05D4 \u05D5\u05D3\u05D9\u05D5\u05E7",exportShare:"\u{1F4E4} \u05D9\u05D9\u05E6\u05D5\u05D0 / \u05E9\u05D9\u05EA\u05D5\u05E3 \u05D8\u05E7\u05E1\u05D8",startNewGameMenu:"\u{1F3B2} \u05D4\u05EA\u05D7\u05DC \u05DE\u05E9\u05D7\u05E7 \u05D7\u05D3\u05E9",returnToLobby:"\u{1F3E0} \u05D7\u05D6\u05E8\u05D4 \u05DC\u05DC\u05D5\u05D1\u05D9 \u05D4\u05E8\u05D0\u05E9\u05D9",close:"\u05E1\u05D2\u05D5\u05E8",done:"\u05E1\u05D9\u05D5\u05DD",cancel:"\u05D1\u05D9\u05D8\u05D5\u05DC",saveChanges:"\u05E9\u05DE\u05D5\u05E8 \u05E9\u05D9\u05E0\u05D5\u05D9\u05D9\u05DD \u2713",reorganizeTitle:"\u05E1\u05D9\u05D3\u05D5\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA \u05D9\u05E9\u05D9\u05D1\u05D4",reorganizeSub:"\u05D2\u05E8\u05D5\u05E8 \u05D5\u05E9\u05D7\u05E8\u05E8 \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05DC\u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA, \u05D0\u05D5 \u05E1\u05D5\u05D1\u05D1 \u05E2\u05DD \u05D4\u05E9\u05E2\u05D5\u05DF.",rotateClockwise:"\u21BB \u05E1\u05D9\u05D1\u05D5\u05D1 \u05E2\u05DD \u05D4\u05E9\u05E2\u05D5\u05DF",rotateCounterClockwise:"\u21BA \u05E0\u05D2\u05D3 \u05D4\u05E9\u05E2\u05D5\u05DF",swapSeatsHint:"\u05D2\u05E8\u05D5\u05E8 \u05E9\u05D7\u05E7\u05DF \u05D0\u05D5 \u05D4\u05E7\u05E9 \u05E2\u05DC \u05E9\u05E0\u05D9\u05D9\u05DD \u05DC\u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA",seatNumber:"\u05DE\u05E7\u05D5\u05DD",doneSeating:"\u05E9\u05DE\u05D5\u05E8 \u05E1\u05D9\u05D3\u05D5\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA \u2713",tapToSwap:"\u05D4\u05E7\u05E9 \u05DC\u05D4\u05D7\u05DC\u05E4\u05D4 \u05E2\u05DD",editTitle:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05D5\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA",playerNames:"\u05E9\u05DE\u05D5\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD",currentDealer:"\u05DE\u05D7\u05DC\u05E7 \u05E0\u05D5\u05DB\u05D7\u05D9",gameMode:"\u05DE\u05E6\u05D1 \u05DE\u05E9\u05D7\u05E7",simplifiedOpt:"\u26A1 \u05DE\u05E4\u05D5\u05E9\u05D8 (\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D5\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA)",fullOpt:"\u{1F3B4} \u05DE\u05DC\u05D0 (\u05DB\u05D5\u05DC\u05DC \u05DE\u05DB\u05E8\u05D6 \u05E9\u05DC\u05D9\u05D8 \u05D5\u05E1\u05D3\u05E8\u05D5\u05EA)",scoringRules:"\u05E2\u05E8\u05DB\u05EA \u05D7\u05D5\u05E7\u05D9 \u05E0\u05D9\u05E7\u05D5\u05D3",enforceHook:"\u05D0\u05DB\u05D5\u05E3 \u05D0\u05EA \u05D7\u05D5\u05E7 \u05D4\u05DE\u05D7\u05DC\u05E7 (\u05E1\u05DA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u2260 13)",newGameTitle:"\u05DE\u05E9\u05D7\u05E7 \u05D7\u05D3\u05E9",newGameSub:"\u05D4\u05D2\u05D3\u05E8 \u05D0\u05EA \u05D4\u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05D5\u05D4\u05EA\u05D7\u05DC \u05E1\u05D9\u05D1\u05D5\u05D1 \u05E8\u05D0\u05E9\u05D5\u05DF.",gameLimit:"\u05D4\u05D2\u05D1\u05DC\u05EA \u05DE\u05E9\u05D7\u05E7",freePlay:"\u05DE\u05E9\u05D7\u05E7 \u05D7\u05D5\u05E4\u05E9\u05D9 (\u05DC\u05DC\u05D0 \u05D4\u05D2\u05D1\u05DC\u05EA \u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD)",deals13:"13 \u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD",deals16:"16 \u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD (4 \u05DC\u05DB\u05DC \u05E9\u05D7\u05E7\u05DF)",target500:"\u05D4\u05E8\u05D0\u05E9\u05D5\u05DF \u05DC-500 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA",target1000:"\u05D4\u05E8\u05D0\u05E9\u05D5\u05DF \u05DC-1000 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA",startGame:"\u05D4\u05EA\u05D7\u05DC \u05DE\u05E9\u05D7\u05E7",orResume:"\u{1F4C2} \u05D0\u05D5 \u05D4\u05DE\u05E9\u05DA \u05DE\u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05E9\u05DE\u05D5\u05E8\u05D9\u05DD",shareTitle:"\u05E9\u05D9\u05EA\u05D5\u05E3 \u05D7\u05D3\u05E8 \u05DE\u05E9\u05D7\u05E7",shareSub:"\u05E1\u05E0\u05DB\u05E8\u05D5\u05DF \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA \u05D1\u05D9\u05DF \u05DE\u05DB\u05E9\u05D9\u05E8\u05D9\u05DD \u05DE\u05E8\u05D5\u05D1\u05D9\u05DD",scanQr:"\u05E1\u05E8\u05D5\u05E7 \u05D0\u05EA \u05E7\u05D5\u05D3 \u05D4-QR \u05D1\u05DE\u05E6\u05DC\u05DE\u05EA \u05D4\u05D8\u05DC\u05E4\u05D5\u05DF \u05DB\u05D3\u05D9 \u05DC\u05D4\u05E6\u05D8\u05E8\u05E3",shareUrlLabel:"\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D9\u05E9\u05D9\u05E8 \u05DC\u05E9\u05D9\u05EA\u05D5\u05E3",copy:"\u05D4\u05E2\u05EA\u05E7",copied:"\u05D4\u05D5\u05E2\u05EA\u05E7!",shareMobile:"\u05E9\u05EA\u05E3 \u05D1\u05E0\u05D9\u05D9\u05D3",gameStats:"\u05E1\u05D8\u05D8\u05D9\u05E1\u05D8\u05D9\u05E7\u05EA \u05DE\u05E9\u05D7\u05E7",over:"\u05D0\u05D5\u05D1\u05E8 (\u05DE\u05E2\u05DC 13)",under:"\u05D0\u05E0\u05D3\u05E8 (\u05DE\u05EA\u05D7\u05EA \u05DC-13)",playerAccuracy:"\u05D3\u05D9\u05D5\u05E7 \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD",made:"\u05E4\u05D2\u05D9\u05E2\u05D5\u05EA \u05DE\u05D3\u05D5\u05D9\u05E7\u05D5\u05EA",avgTricksPerDeal:"\u05DE\u05DE\u05D5\u05E6\u05E2 \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05DC\u05E1\u05D9\u05D1\u05D5\u05D1",zeroSuccess:"\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA 0 \u05DE\u05D5\u05E6\u05DC\u05D7\u05D5\u05EA",passSuccess:"\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA 0 \u05DE\u05D5\u05E6\u05DC\u05D7\u05D5\u05EA",noSavedGames:"\u05D0\u05D9\u05DF \u05E2\u05D3\u05D9\u05D9\u05DF \u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05E9\u05DE\u05D5\u05E8\u05D9\u05DD",noSavedGamesSub:"\u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD \u05D5\u05E9\u05D4\u05D5\u05E9\u05DC\u05DE\u05D5 \u05D9\u05D5\u05E4\u05D9\u05E2\u05D5 \u05DB\u05D0\u05DF \u05D1\u05D0\u05D5\u05E4\u05DF \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9.",deleteConfirm:"\u05DC\u05D4\u05E1\u05D9\u05E8 \u05D0\u05EA \u05D4\u05D7\u05D3\u05E8 \u05DE\u05D4\u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05D4\u05E9\u05DE\u05D5\u05E8\u05D9\u05DD?",delete:"\u05DE\u05D7\u05E7",currentGame:"\u05DE\u05E9\u05D7\u05E7 \u05E4\u05E2\u05D9\u05DC",editDeal:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05E1\u05D9\u05D1\u05D5\u05D1",editDealTitle:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05E1\u05D9\u05D1\u05D5\u05D1 #{num}",editDealSub:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA, \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D5\u05DE\u05D7\u05DC\u05E7. \u05DB\u05DC \u05D4\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D5\u05D4\u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD \u05D9\u05D7\u05D5\u05E9\u05D1\u05D5 \u05DE\u05D7\u05D3\u05E9 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05EA.",saveDeal:"\u05E9\u05DE\u05D5\u05E8 \u05D5\u05D7\u05E9\u05D1 \u05DE\u05D7\u05D3\u05E9 \u2713",baselineScores:"\u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05EA\u05D7\u05DC\u05EA\u05D9 / \u05E4\u05EA\u05D9\u05D7\u05D4",baselineDesc:"\u05D4\u05D2\u05D3\u05E8\u05EA \u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05EA\u05D7\u05DC\u05EA\u05D9 \u05DC\u05DE\u05E9\u05D7\u05E7 \u05E9\u05E0\u05E8\u05E9\u05DD \u05D1\u05DE\u05E7\u05D5\u05DD \u05D0\u05D7\u05E8 \u05D5\u05DE\u05DE\u05E9\u05D9\u05DA \u05DB\u05D0\u05DF.",setBaseline:"\u05E0\u05D9\u05E7\u05D5\u05D3 \u05E4\u05EA\u05D9\u05D7\u05D4",baselineRow:"\u05E0\u05D9\u05E7\u05D5\u05D3 \u05E4\u05EA\u05D9\u05D7\u05D4",saveBaseline:"\u05E9\u05DE\u05D5\u05E8 \u05E0\u05D9\u05E7\u05D5\u05D3 \u05E4\u05EA\u05D9\u05D7\u05D4 \u2713",invalidTricksSum:"\u05E1\u05DA \u05D4\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05D1\u05D3\u05D9\u05D5\u05E7 13 (\u05DB\u05E8\u05D2\u05E2 {sum})",hookWarning:"\u05E1\u05DA \u05DB\u05DC \u05D4\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D0\u05D9\u05E0\u05D5 \u05D9\u05DB\u05D5\u05DC \u05DC\u05D4\u05D9\u05D5\u05EA 13 (\u05D7\u05D5\u05E7 \u05D4\u05D4\u05D5\u05E7)",deleteDeal:"\u05DE\u05D7\u05E7 \u05E1\u05D9\u05D1\u05D5\u05D1",deleteDealConfirm:"\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05E1\u05D9\u05D1\u05D5\u05D1 #{num}? \u05DB\u05DC \u05D4\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D4\u05D1\u05D0\u05D5\u05EA \u05D9\u05D7\u05D5\u05E9\u05D1\u05D5 \u05DE\u05D7\u05D3\u05E9.",playerProfiles:"\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC\u05D9 \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD",savedProfiles:"\u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05E9\u05DE\u05D5\u05E8\u05D9\u05DD",quickPick:"\u05D1\u05D7\u05D9\u05E8\u05D4 \u05DE\u05D4\u05D9\u05E8\u05D4 \u05E9\u05DC \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD",quickPickSub:"\u05D2\u05E8\u05D5\u05E8 \u05DB\u05E8\u05D8\u05D9\u05E1 \u05E9\u05D7\u05E7\u05DF \u05DC\u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05E7\u05D5\u05DD, \u05D0\u05D5 \u05D2\u05E8\u05D5\u05E8/\u05D1\u05D7\u05E8 \u05E9\u05D7\u05E7\u05DF \u05DC\u05D4\u05E6\u05D1\u05D4.",emptySeatPlaceholder:"+ \u05D1\u05D7\u05E8 \u05E9\u05D7\u05E7\u05DF",emptySeat:"\u05DB\u05D9\u05E1\u05D0 \u05E8\u05D9\u05E7",clearSeat:"\u05E0\u05E7\u05D4 \u05DB\u05D9\u05E1\u05D0",clearAllSeats:"\u05E0\u05E7\u05D4 \u05D4\u05DB\u05DC",tapToSwapSeats:"\u05D2\u05E8\u05D5\u05E8 \u05DC\u05D4\u05D7\u05DC\u05E4\u05D4",dragToSwapSeats:"\u05D2\u05E8\u05D5\u05E8 \u05DC\u05D4\u05D7\u05DC\u05E4\u05D4",mustChoose4Players:"\u05D9\u05E9 \u05DC\u05D1\u05D7\u05D5\u05E8 4 \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05DB\u05D3\u05D9 \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05DE\u05E9\u05D7\u05E7",tableEmblem:"\u2660 \u2665 \u2666 \u2663",seat1:"\u05DB\u05D9\u05E1\u05D0 1",seat2:"\u05DB\u05D9\u05E1\u05D0 2",seat3:"\u05DB\u05D9\u05E1\u05D0 3",seat4:"\u05DB\u05D9\u05E1\u05D0 4",useLastLineup:"\u26A1 \u05D4\u05E8\u05DB\u05D1 \u05DE\u05E9\u05D7\u05E7 \u05E7\u05D5\u05D3\u05DD",addProfile:"+ \u05E9\u05D7\u05E7\u05DF \u05D7\u05D3\u05E9",createProfileTitle:"\u05D9\u05E6\u05D9\u05E8\u05EA \u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05E9\u05D7\u05E7\u05DF",editProfileTitle:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05E9\u05D7\u05E7\u05DF",playerName:"\u05E9\u05DD \u05D4\u05E9\u05D7\u05E7\u05DF",playerNamePlaceholder:"\u05DC\u05D3\u05D5\u05D2\u05DE\u05D4: \u05E2\u05D5\u05DE\u05E8",chooseAvatar:"\u05D1\u05D7\u05E8 \u05D0\u05D5\u05D5\u05D8\u05D0\u05E8 / \u05D0\u05D9\u05DE\u05D5\u05D2\u05F3\u05D9",chooseColor:"\u05E6\u05D1\u05E2 \u05E9\u05D7\u05E7\u05DF",saveProfileBtn:"\u05E9\u05DE\u05D5\u05E8 \u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u2713",deleteProfileBtn:"\u05DE\u05D7\u05E7 \u05E4\u05E8\u05D5\u05E4\u05D9\u05DC",deleteProfileConfirm:"\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05D4\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05E9\u05DC {name}?",careerStats:"\u05E1\u05D8\u05D8\u05D9\u05E1\u05D8\u05D9\u05E7\u05EA \u05E7\u05E8\u05D9\u05D9\u05E8\u05D4",matchesPlayed:"\u05DE\u05E9\u05D7\u05E7\u05D9\u05DD",winRatio:"\u05D0\u05D7\u05D5\u05D6 \u05E0\u05D9\u05E6\u05D7\u05D5\u05E0\u05D5\u05EA",totalPoints:"\u05E1\u05DA \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA",zeroHitsStats:"\u05D4\u05E6\u05DC\u05D7\u05D4 \u05D1\u05D0\u05E4\u05E1 (0)",manageProfilesMenu:"\u{1F465} \u05E4\u05E8\u05D5\u05E4\u05D9\u05DC\u05D9 \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05D5\u05E0\u05D1\u05D7\u05E8\u05EA",manageProfilesDesc:"\u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05E9\u05DE\u05D5\u05E8\u05D9\u05DD, \u05D0\u05D5\u05D5\u05D8\u05D0\u05E8\u05D9\u05DD \u05D5\u05E1\u05D8\u05D8\u05D9\u05E1\u05D8\u05D9\u05E7\u05EA \u05E7\u05E8\u05D9\u05D9\u05E8\u05D4",switchLang:"English"};var ie=class{constructor(){window.__ISRAELI_WHIST_APP__=this,this.initLanguage();let e=new URLSearchParams(window.location.search),s=e.get("game")||e.get("room")||(window.location.hash.length>1?window.location.hash.replace("#","").trim():null),t=!!s;this.session=this.loadInitialSession(s),this.initElements(),this.initControllers(),this.initSyncManager(),this.bindGlobalEvents(),this.updateStaticI18n(),z.syncWithServer(()=>{this.landingContainer&&this.landingContainer.style.display!=="none"&&this.landingView.render()}),t?(this.showGameView(),this.fetchRoomStateFromServer(s)):this.showLandingView(),this.bindSessionListeners(this.session)}loadInitialSession(e){if(e){let t=z.getRecentGames().find(i=>i.roomId===e||i.id===e);if(t&&t.fullState)return new O(t.fullState)}return O.loadFromStorage()}async fetchRoomStateFromServer(e){if(e)try{let t=`${z.getBasePath()}/api/session/${e}`,i=await fetch(t);if(i.ok){let n=await i.json();n&&n.success&&n.session&&this.applyRemoteState(n.session)}}catch(s){console.warn("REST session fetch failed, relying on WebSocket:",s)}}bindSessionListeners(e){e&&e.subscribe(()=>{this.roundView.updateSession(this.session),this.scoreboard.updateSession(this.session),this.chartView.updateSession(this.session),this.syncManager&&this.syncManager.broadcastLocalState(),this.archiveCurrentGame()})}initLanguage(){let e=null;try{e=localStorage.getItem("israeli_whist_lang")}catch{}!e&&typeof navigator<"u"&&navigator.language&&navigator.language.startsWith("he")&&(e="he"),this.i18n=e==="he"?re:ne,document.documentElement.lang=this.i18n.lang,document.documentElement.dir=this.i18n.dir}setLanguage(e){this.i18n=e==="he"?re:ne,document.documentElement.lang=this.i18n.lang,document.documentElement.dir=this.i18n.dir;try{localStorage.setItem("israeli_whist_lang",e)}catch{}this.updateStaticI18n(),this.landingView.render(),this.roundView.updateI18n(this.i18n),this.scoreboard.updateI18n(this.i18n),this.chartView.render()}updateStaticI18n(){let e=this.i18n;this.btnBrandHome&&(this.btnBrandHome.textContent=e.appName),this.btnLangToggle&&(this.btnLangToggle.textContent=e.lang==="he"?"EN":"\u05E2\u05D1"),this.btnShare&&(this.btnShare.textContent=e.share),this.btnMenu&&(this.btnMenu.textContent=e.menu);let s=document.getElementById("tab-btn-round"),t=document.getElementById("tab-btn-history"),i=document.getElementById("tab-btn-chart");s&&(s.textContent=e.tabActiveDeal),t&&(t.textContent=e.tabHistory),i&&(i.textContent=e.tabChart)}initElements(){if(this.landingContainer=document.getElementById("landing-view-container"),this.gameContainer=document.getElementById("game-view-container"),this.leaderboardContainer=document.getElementById("leaderboard-section"),this.roundContainer=document.getElementById("round-view-container"),this.historyContainer=document.getElementById("history-view-container"),this.chartContainer=document.getElementById("chart-view-container"),this.roomCodeDisplay=document.getElementById("room-code-display"),this.syncIndicator=document.getElementById("sync-indicator"),this.btnBrandHome=document.getElementById("btn-brand-home"),this.btnLangToggle=document.getElementById("btn-lang-toggle"),this.btnShare=document.getElementById("btn-open-share"),this.btnMenu=document.getElementById("btn-open-menu"),z.getBasePath()==="/whist-dev"&&this.btnBrandHome&&!document.getElementById("dev-env-badge")){let e=document.createElement("span");e.id="dev-env-badge",e.className="dev-badge",e.textContent="DEV",this.btnBrandHome.parentNode.insertBefore(e,this.btnBrandHome.nextSibling)}}initControllers(){this.dialogs=new se(this),this.landingView=new Q(this,this.landingContainer),this.roundView=new K(this.session,this.roundContainer,this.i18n,()=>{this.session.status==="FINISHED"&&M.recordGameCompletion(this.session),this.scoreboard.render(),this.chartView.render()}),this.scoreboard=new ee(this.session,this.leaderboardContainer,this.historyContainer,this.i18n,()=>{this.session.undoLastRound(),this.roundView.render(),this.scoreboard.render(),this.chartView.render()},e=>{this.dialogs.showReorganizeSeatingModal(e)},e=>{this.dialogs.showEditDealModal(e)},()=>{this.dialogs.showBaselineModal()}),this.chartView=new te(this.session,this.chartContainer,this.i18n)}initSyncManager(){this.syncManager=new X(this,e=>{this.applyRemoteState(e)}),this.syncManager.subscribe(e=>{this.roomCodeDisplay&&(this.roomCodeDisplay.textContent=e.roomId||"W-..."),this.syncIndicator&&(this.syncIndicator.style.background=e.connected?"#10b981":"#ef4444",this.syncIndicator.style.boxShadow=e.connected?"0 0 8px #10b981":"none",this.syncIndicator.title=e.connected?`Connected (${e.userCount} online)`:"Connecting...")}),this.syncManager.notify()}showLandingView(){this.landingContainer&&(this.landingContainer.style.display="block"),this.gameContainer&&(this.gameContainer.style.display="none"),this.landingView.render();let e=new URL(window.location.href);e.searchParams.delete("game"),e.searchParams.delete("room"),e.hash="",window.history.replaceState({},"",e.toString())}showGameView(){this.landingContainer&&(this.landingContainer.style.display="none"),this.gameContainer&&(this.gameContainer.style.display="block"),this.syncManager&&this.syncManager.updateUrl(this.syncManager.roomId),this.roundView.updateSession(this.session),this.scoreboard.updateSession(this.session),this.chartView.updateSession(this.session)}joinRoomByCode(e){e&&(this.syncManager&&this.syncManager.joinRoom(e),this.showGameView(),this.fetchRoomStateFromServer(e))}archiveCurrentGame(){if(this.session){let e=this.syncManager?this.syncManager.roomId:this.session.id;z.saveGameToArchive(this.session,e)}}startNewGame(e={}){this.session&&(this.session.completedRounds&&this.session.completedRounds.length>0&&M.recordGameCompletion(this.session),this.archiveCurrentGame());let s="game_"+Date.now();this.syncManager&&(s=this.syncManager.createNewRoom());let t=new O({id:s,...e});this.setSession(t),this.showGameView()}applyRemoteState(e){e&&(this.session=new O(e),this.session.saveToStorage(),this.roundView.updateSession(this.session),this.scoreboard.updateSession(this.session),this.chartView.updateSession(this.session),this.archiveCurrentGame(),this.bindSessionListeners(this.session))}setSession(e){this.session=e,this.session.saveToStorage(),this.roundView.updateSession(this.session),this.scoreboard.updateSession(this.session),this.chartView.updateSession(this.session),this.archiveCurrentGame(),this.syncManager&&this.syncManager.broadcastLocalState(),this.bindSessionListeners(this.session)}resumeGameFromArchive(e){!e||!e.fullState||(this.session=new O(e.fullState),this.session.saveToStorage(),this.syncManager&&e.roomId&&this.syncManager.joinRoom(e.roomId),this.showGameView(),this.bindSessionListeners(this.session))}bindGlobalEvents(){this.btnShare&&this.btnShare.addEventListener("click",()=>this.dialogs.showShareModal());let e=document.getElementById("btn-room-badge");e&&e.addEventListener("click",()=>this.dialogs.showShareModal()),this.btnMenu&&this.btnMenu.addEventListener("click",()=>this.dialogs.showMenuModal()),this.btnLangToggle&&this.btnLangToggle.addEventListener("click",()=>{let i=this.i18n.lang==="he"?"en":"he";this.setLanguage(i)}),this.btnBrandHome&&this.btnBrandHome.addEventListener("click",()=>this.showLandingView());let s=document.querySelectorAll(".tab-item"),t=document.querySelectorAll(".tab-panel");s.forEach(i=>{i.addEventListener("click",()=>{s.forEach(l=>l.classList.remove("active")),t.forEach(l=>{l.classList.remove("active"),l.style.display="none"}),i.classList.add("active");let n=i.dataset.tab,a=document.getElementById(n);a&&(a.classList.add("active"),a.style.display="block")})})}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.app=new ie}):window.app=new ie;
