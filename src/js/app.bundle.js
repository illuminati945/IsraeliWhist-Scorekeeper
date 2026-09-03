var z={STANDARD:{id:"STANDARD",nameEn:"Standard Israeli Whist (Quadratic)",nameHe:"Standard Israeli Whist",descriptionEn:"Exact Made: +10 + Bid\xB2 | Miss: -10 \xD7 diff | Zero: +50 down / +30 up, -50 + 10/trick | Hook Rule: On",descriptionHe:"\u05DE\u05D3\u05D5\u05D9\u05E7: 10 + \u05D4\u05DB\u05E8\u05D6\u05D4\xB2 | \u05D4\u05D7\u05D8\u05D0\u05D4: 10- \u05DC\u05DB\u05DC \u05D4\u05E4\u05E8\u05E9 | \u05D0\u05E4\u05E1: 50+ \u05D1\u05D7\u05E1\u05E8 / 30+ \u05D1\u05D9\u05EA\u05E8, 50- \u05D5-10+ \u05DC\u05DB\u05DC \u05DC\u05E7\u05D9\u05D7\u05D4 \u05E0\u05D5\u05E1\u05E4\u05EA | \u05D7\u05D5\u05E7 \u05D4\u05D4\u05D5\u05E7",bidMadeFormula:"QUADRATIC",missPenaltyRate:10,useProgressivePenalty:!1,passMadeScoreDown:50,passMadeScoreUp:30,passMadeScore:50,passMissPenalty:50,passMissBonusPerTrick:10,pasRoundTrickPenalty:10,pasRoundZeroBonus:50,enforceHookRule:!0,trumpMakerMissDoublePenalty:!1},PROGRESSIVE:{id:"PROGRESSIVE",nameEn:"Progressive Penalty (Tournament)",nameHe:"Progressive Penalty (Tournament)",descriptionEn:"Exact Made: +10 + Bid\xB2 | Miss: -5/-10/-15/-20 per trick by bid | Zero: +50 down / +30 up, -50 + 10/trick",descriptionHe:"\u05DE\u05D3\u05D5\u05D9\u05E7: 10 + \u05D4\u05DB\u05E8\u05D6\u05D4\xB2 | \u05D4\u05D7\u05D8\u05D0\u05D4 \u05E4\u05E8\u05D5\u05D2\u05E8\u05E1\u05D9\u05D1\u05D9\u05EA \u05DC\u05E4\u05D9 \u05D4\u05DB\u05E8\u05D6\u05D4 | \u05D0\u05E4\u05E1: 50+ \u05D1\u05D7\u05E1\u05E8 / 30+ \u05D1\u05D9\u05EA\u05E8, 50- \u05D5-10+ \u05DC\u05DB\u05DC \u05DC\u05E7\u05D9\u05D7\u05D4 \u05E0\u05D5\u05E1\u05E4\u05EA",bidMadeFormula:"QUADRATIC",missPenaltyRate:10,useProgressivePenalty:!0,progressiveRates:{1:5,2:5,3:5,4:5,5:10,6:15,7:20},passMadeScoreDown:50,passMadeScoreUp:30,passMadeScore:50,passMissPenalty:50,passMissBonusPerTrick:10,pasRoundTrickPenalty:10,pasRoundZeroBonus:50,enforceHookRule:!0,trumpMakerMissDoublePenalty:!1},CLASSIC_LINEAR:{id:"CLASSIC_LINEAR",nameEn:"Classic Linear (10 + 10xBid)",nameHe:"Classic Linear (10 + 10xBid)",descriptionEn:"Exact Made: +10 + (Bid \xD7 10) | Miss: -10 \xD7 diff | Zero: +50 down / +30 up, -50 + 10/trick",descriptionHe:"\u05DE\u05D3\u05D5\u05D9\u05E7: 10 + (10 \xD7 \u05D4\u05DB\u05E8\u05D6\u05D4) | \u05D4\u05D7\u05D8\u05D0\u05D4: 10- \u05DC\u05DB\u05DC \u05D4\u05E4\u05E8\u05E9 | \u05D0\u05E4\u05E1: 50+ \u05D1\u05D7\u05E1\u05E8 / 30+ \u05D1\u05D9\u05EA\u05E8, 50- \u05D5-10+ \u05DC\u05DB\u05DC \u05DC\u05E7\u05D9\u05D7\u05D4 \u05E0\u05D5\u05E1\u05E4\u05EA",bidMadeFormula:"LINEAR_10",missPenaltyRate:10,useProgressivePenalty:!1,passMadeScoreDown:50,passMadeScoreUp:30,passMissPenalty:50,passMissBonusPerTrick:10,pasRoundTrickPenalty:10,pasRoundZeroBonus:50,enforceHookRule:!0,trumpMakerMissDoublePenalty:!1}},ie=[{id:"NT",symbol:"NT",nameEn:"No Trump",color:"#6366f1",rank:5},{id:"SPADES",symbol:"\u2660",nameEn:"Spades",color:"#94a3b8",rank:4},{id:"HEARTS",symbol:"\u2665",nameEn:"Hearts",color:"#f43f5e",rank:3},{id:"DIAMONDS",symbol:"\u2666",nameEn:"Diamonds",color:"#fbbf24",rank:2},{id:"CLUBS",symbol:"\u2663",nameEn:"Clubs",color:"#34d399",rank:1}];function j(f,e,s=!1,t=!1,i=z.STANDARD,r=13){if(t)if(e===0){let o=i.pasRoundZeroBonus||50;return{score:o,made:!0,delta:0,explanation:`0 tricks taken: +${o} bonus`}}else{let o=-(e*(i.pasRoundTrickPenalty||10));return{score:o,made:!1,delta:e,explanation:`${e} tricks taken \xD7 -${i.pasRoundTrickPenalty||10} = ${o}`}}if(f===e)if(f===0){let o=r>13,d=i.passMadeScoreDown??(i.passMadeScore||50),c=i.passMadeScoreUp??(i.passMadeScoreOver||30),p=o?c:d;return{score:p,made:!0,delta:0,explanation:`Bid 0 made (${o?"Up / \u05D9\u05EA\u05E8":"Down / \u05D7\u05E1\u05E8"}): +${p} pts`}}else{let o=0;return i.bidMadeFormula==="QUADRATIC"?o=10+f*f:i.bidMadeFormula==="LINEAR_10"?o=10+f*10:o=10+f*f,{score:o,made:!0,delta:0,explanation:`Bid ${f} made: 10 + (${f}\xB2) = +${o} pts`}}let n=Math.abs(e-f);if(f===0){let o=i.passMissPenalty??50,d=i.passMissBonusPerTrick??10,c=-o+(e-1)*d,p=e===1?`Bid 0 missed (1 trick): -${o} pts`:`Bid 0 missed (${e} tricks): -${o} + ${(e-1)*d} = ${c>=0?"+":""}${c} pts`;return{score:c,made:!1,delta:n,explanation:p}}let l=i.missPenaltyRate||10;if(i.useProgressivePenalty&&i.progressiveRates){let o=Math.min(Math.max(f,1),7);l=i.progressiveRates[o]||10}let a=-(n*l);return s&&i.trumpMakerMissDoublePenalty&&(a*=2),{score:a,made:!1,delta:n,explanation:`Bid ${f}, took ${e} (${n} diff \xD7 -${l}): ${a} pts`}}function F(f){let e=f.reduce((s,t)=>s+(typeof t=="number"&&!isNaN(t)?t:0),0);return f.length===4&&f.every(s=>typeof s=="number"&&!isNaN(s))?e===13?{isValid:!1,sum:e,status:"HOOK_VIOLATION"}:{isValid:!0,sum:e,status:e>13?"OVER":"UNDER"}:{isValid:!0,sum:e,status:e>13?"OVER":"UNDER"}}function ne(f){return f.length!==4?!1:f.reduce((s,t)=>s+(typeof t=="number"&&!isNaN(t)?t:0),0)===13}var ee="israeli_whist_current_game_v2",G=class f{constructor(e={}){this.id=e.id||"game_"+Date.now(),this.createdAt=e.createdAt||new Date().toISOString(),this.rules=e.rules||{...z.STANDARD},this.targetPoints=e.targetPoints||null,this.maxRounds=e.maxRounds||null,this.simplifiedMode=e.simplifiedMode!==void 0?e.simplifiedMode:!0,this.players=e.players||[{id:"p0",name:"Player 1",color:"#6366f1",initial:"1"},{id:"p1",name:"Player 2",color:"#10b981",initial:"2"},{id:"p2",name:"Player 3",color:"#f59e0b",initial:"3"},{id:"p3",name:"Player 4",color:"#ec4899",initial:"4"}],this.currentDealerIndex=e.currentDealerIndex??0,this.roundNumber=e.roundNumber||1,this.completedRounds=e.completedRounds||[],this.initialScores=Array.isArray(e.initialScores)?e.initialScores.map(s=>parseInt(s,10)||0):[0,0,0,0],this.activeRound=e.activeRound||this.initDraftRound(),this.status=e.status||"IN_PROGRESS",this.listeners=[]}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(s=>s!==e)}}notify(){this.saveToStorage();for(let e of this.listeners)e(this)}initDraftRound(){let e=this.currentDealerIndex,s=(e+1)%4;return{roundNumber:this.roundNumber,dealerIndex:e,leadBidderIndex:s,stage:this.simplifiedMode?"BETS":"TRUMP",trump:{winnerIndex:null,suitId:"NT",bidAmount:0,isPasRound:!1},bets:[null,null,null,null],tricks:[null,null,null,null],scores:[0,0,0,0],roundTotalBets:0,bettingMode:null,timestamp:new Date().toISOString()}}setSimplifiedMode(e){this.simplifiedMode=e,this.activeRound&&(e&&this.activeRound.stage==="TRUMP"?this.activeRound.stage="BETS":!e&&this.activeRound.stage==="BETS"&&this.activeRound.bets.every(s=>s===null)&&(this.activeRound.stage="TRUMP")),this.notify()}getFirstBidderIndex(){return!this.simplifiedMode&&this.activeRound.trump.winnerIndex!==null&&!this.activeRound.trump.isPasRound?this.activeRound.trump.winnerIndex:(this.currentDealerIndex+1)%4}getLastBidderIndex(){return this.simplifiedMode?null:(this.getFirstBidderIndex()+3)%4}getBiddingOrder(){let e=this.getFirstBidderIndex();return[e,(e+1)%4,(e+2)%4,(e+3)%4]}getForbiddenBetForLastBidder(){if(this.simplifiedMode)return null;let e=this.getLastBidderIndex();if(e===null)return null;let s=[];for(let t=0;t<4;t++)t!==e&&typeof this.activeRound.bets[t]=="number"&&!isNaN(this.activeRound.bets[t])&&s.push(this.activeRound.bets[t]);if(s.length===3){let i=13-s.reduce((r,n)=>r+n,0);if(i>=0&&i<=13)return i}return null}setTrump(e,s,t,i=!1){this.activeRound.trump={winnerIndex:i?null:e,suitId:i?"NT":s,bidAmount:i?0:t,isPasRound:i},!i&&e!==null&&typeof e=="number"&&(this.activeRound.bets[e]===null||this.activeRound.bets[e]<t)&&(this.activeRound.bets[e]=t),this.activeRound.stage="BETS",this.notify()}setBet(e,s){if(e<0||e>3)return;this.activeRound.bets[e]=s;let t=this.activeRound.bets.filter(r=>typeof r=="number"&&!isNaN(r)),i=t.reduce((r,n)=>r+n,0);if(this.activeRound.roundTotalBets=i,t.length===4){let r=F(this.activeRound.bets);this.activeRound.bettingMode=r.status}else this.activeRound.bettingMode=i>13?"OVER":"UNDER";this.notify()}proceedToTricks(){if(this.activeRound.bets.filter(s=>typeof s=="number"&&!isNaN(s)).length!==4&&!this.activeRound.trump.isPasRound)throw new Error("All 4 players must submit bets.");if(this.rules.enforceHookRule&&!this.activeRound.trump.isPasRound&&!F(this.activeRound.bets).isValid)throw new Error("Total bets cannot equal 13 (Hook Rule). Please adjust the bids.");this.activeRound.stage="TRICKS",this.notify()}setTricks(e,s){e<0||e>3||(this.activeRound.tricks[e]=s,this.notify())}autoFillTricksFromBids(){let e=[],s=-1;for(let t=0;t<4;t++)typeof this.activeRound.tricks[t]=="number"&&!isNaN(this.activeRound.tricks[t])?e.push(this.activeRound.tricks[t]):s=t;if(e.length===3&&s!==-1){let t=13-e.reduce((i,r)=>i+r,0);if(t>=0&&t<=13)return this.activeRound.tricks[s]=t,this.notify(),!0}for(let t=0;t<4;t++){let i=this.activeRound.bets[t];this.activeRound.tricks[t]=typeof i=="number"&&!isNaN(i)?i:0}return this.notify(),!0}commitRound(){let e=this.activeRound.tricks;if(!ne(e))throw new Error("Total tricks must equal 13.");let s=[],t=this.activeRound.trump.isPasRound,i=this.activeRound.bets.reduce((n,l)=>n+(typeof l=="number"?l:0),0);for(let n=0;n<4;n++){let l=t?0:this.activeRound.bets[n],a=e[n],o=n===this.activeRound.trump.winnerIndex,d=j(l,a,o,t,this.rules,i);s.push({playerIndex:n,bid:l,tricks:a,score:d.score,made:d.made,delta:d.delta,explanation:d.explanation})}let r={...this.activeRound,simplified:this.simplifiedMode,results:s,scores:s.map(n=>n.score),cumulativeScores:this.calculateCumulativeAfterRound(s.map(n=>n.score)),completedAt:new Date().toISOString()};return this.completedRounds.push(r),this.checkGameEnd(),this.status!=="FINISHED"&&(this.currentDealerIndex=(this.currentDealerIndex+1)%4,this.roundNumber+=1,this.activeRound=this.initDraftRound()),this.notify(),r}calculateCumulativeAfterRound(e){return this.getCumulativeScores().map((t,i)=>t+e[i])}getCumulativeScores(){let e=[...this.initialScores];for(let s of this.completedRounds)for(let t=0;t<4;t++)e[t]+=s.scores&&typeof s.scores[t]=="number"?s.scores[t]:0;return e}setInitialScores(e){Array.isArray(e)&&e.length===4&&(this.initialScores=e.map(s=>parseInt(s,10)||0),this.recalculateAllScores())}recalculateAllScores(){let e=[...this.initialScores];for(let s=0;s<this.completedRounds.length;s++){let t=this.completedRounds[s],i=t.trump&&t.trump.isPasRound,r=a=>!t.simplified&&t.trump&&t.trump.winnerIndex===a,n=(t.bets||[]).reduce((a,o)=>a+(typeof o=="number"?o:0),0),l=[];for(let a=0;a<4;a++){let o=t.bets&&typeof t.bets[a]=="number"?t.bets[a]:0,d=t.tricks&&typeof t.tricks[a]=="number"?t.tricks[a]:0,c=j(o,d,r(a),i,this.rules,n);l.push({playerIndex:a,bid:o,tricks:d,score:c.score,made:c.made,explanation:c.explanation})}t.results=l,t.scores=l.map(a=>a.score),t.roundTotalBets=n,e=e.map((a,o)=>a+t.scores[o]),t.cumulativeScores=[...e]}this.checkGameEnd(),this.notify()}editCompletedRound(e,s={}){if(e<0||e>=this.completedRounds.length)throw new Error(`Invalid round index: ${e}`);let t=this.completedRounds[e];if(Array.isArray(s.bets)&&(t.bets=s.bets.map(i=>parseInt(i,10)||0),t.roundTotalBets=t.bets.reduce((i,r)=>i+r,0)),Array.isArray(s.tricks)){t.tricks=s.tricks.map(r=>parseInt(r,10)||0);let i=t.tricks.reduce((r,n)=>r+n,0);if(i!==13)throw new Error(`Total tricks must equal 13 (sum is ${i})`)}return s.dealerIndex!==void 0&&s.dealerIndex>=0&&s.dealerIndex<4&&(t.dealerIndex=s.dealerIndex,t.leadBidderIndex=(t.dealerIndex+1)%4),s.trump&&(t.trump={...t.trump,...s.trump}),this.recalculateAllScores(),t}deleteCompletedRound(e){if(e<0||e>=this.completedRounds.length)throw new Error(`Invalid round index: ${e}`);this.completedRounds.splice(e,1),this.completedRounds.forEach((s,t)=>{s.roundNumber=t+1}),this.roundNumber=this.completedRounds.length+1,this.activeRound&&(this.activeRound.roundNumber=this.roundNumber),this.recalculateAllScores()}getRankings(){let e=this.getCumulativeScores();return this.players.map((s,t)=>({index:t,player:s,score:e[t]})).sort((s,t)=>t.score-s.score)}checkGameEnd(){if(this.maxRounds&&this.completedRounds.length>=this.maxRounds){this.status="FINISHED";return}this.targetPoints&&this.getCumulativeScores().some(s=>s>=this.targetPoints)&&(this.status="FINISHED")}undoLastRound(){if(this.completedRounds.length===0)return!1;let e=this.completedRounds.pop();return this.roundNumber=e.roundNumber,this.currentDealerIndex=e.dealerIndex,this.activeRound={roundNumber:e.roundNumber,dealerIndex:e.dealerIndex,leadBidderIndex:e.leadBidderIndex,stage:"TRICKS",trump:{...e.trump},bets:[...e.bets],tricks:[...e.tricks],scores:[0,0,0,0],roundTotalBets:e.roundTotalBets,bettingMode:e.bettingMode,timestamp:e.timestamp},this.status="IN_PROGRESS",this.notify(),!0}updatePlayer(e,s,t){e>=0&&e<4&&(this.players[e]={...this.players[e],name:s||this.players[e].name,color:t||this.players[e].color},this.notify())}reorderPlayers(e){if(!Array.isArray(e)||e.length!==4)return;let s=[...this.players];this.players=e.map(i=>s[i]);let t=i=>i!=null&&i>=0&&i<4?e.indexOf(i):i;if(this.currentDealerIndex=t(this.currentDealerIndex),this.activeRound){if(this.activeRound.dealerIndex=t(this.activeRound.dealerIndex),this.activeRound.leadBidderIndex=(this.activeRound.dealerIndex+1)%4,this.activeRound.trump&&this.activeRound.trump.winnerIndex!==null&&(this.activeRound.trump.winnerIndex=t(this.activeRound.trump.winnerIndex)),Array.isArray(this.activeRound.bets)&&this.activeRound.bets.length===4){let i=[...this.activeRound.bets];this.activeRound.bets=e.map(r=>i[r])}if(Array.isArray(this.activeRound.tricks)&&this.activeRound.tricks.length===4){let i=[...this.activeRound.tricks];this.activeRound.tricks=e.map(r=>i[r])}if(Array.isArray(this.activeRound.scores)&&this.activeRound.scores.length===4){let i=[...this.activeRound.scores];this.activeRound.scores=e.map(r=>i[r])}}for(let i of this.completedRounds){if(i.dealerIndex=t(i.dealerIndex),i.leadBidderIndex!==void 0&&(i.leadBidderIndex=t(i.leadBidderIndex)),i.trump&&i.trump.winnerIndex!==null&&(i.trump.winnerIndex=t(i.trump.winnerIndex)),Array.isArray(i.scores)&&i.scores.length===4){let r=[...i.scores];i.scores=e.map(n=>r[n])}if(Array.isArray(i.cumulativeScores)&&i.cumulativeScores.length===4){let r=[...i.cumulativeScores];i.cumulativeScores=e.map(n=>r[n])}if(Array.isArray(i.results))for(let r of i.results)r.playerIndex=t(r.playerIndex)}if(Array.isArray(this.initialScores)&&this.initialScores.length===4){let i=[...this.initialScores];this.initialScores=e.map(r=>i[r])}this.notify()}swapPlayers(e,s){if(e===s||e<0||e>3||s<0||s>3)return;let t=this.players[e];if(this.players[e]=this.players[s],this.players[s]=t,Array.isArray(this.initialScores)&&this.initialScores.length===4){let r=this.initialScores[e];this.initialScores[e]=this.initialScores[s],this.initialScores[s]=r}let i=r=>r===e?s:r===s?e:r;if(this.currentDealerIndex=i(this.currentDealerIndex),this.activeRound){this.activeRound.dealerIndex=i(this.activeRound.dealerIndex),this.activeRound.leadBidderIndex=(this.activeRound.dealerIndex+1)%4,this.activeRound.trump&&this.activeRound.trump.winnerIndex!==null&&(this.activeRound.trump.winnerIndex=i(this.activeRound.trump.winnerIndex));let r=n=>{if(Array.isArray(n)&&n.length===4){let l=n[e];n[e]=n[s],n[s]=l}};r(this.activeRound.bets),r(this.activeRound.tricks),r(this.activeRound.scores)}for(let r of this.completedRounds){if(r.dealerIndex=i(r.dealerIndex),r.leadBidderIndex!==void 0&&(r.leadBidderIndex=i(r.leadBidderIndex)),r.trump&&r.trump.winnerIndex!==null&&(r.trump.winnerIndex=i(r.trump.winnerIndex)),Array.isArray(r.scores)&&r.scores.length===4){let n=r.scores[e];r.scores[e]=r.scores[s],r.scores[s]=n}if(Array.isArray(r.cumulativeScores)&&r.cumulativeScores.length===4){let n=r.cumulativeScores[e];r.cumulativeScores[e]=r.cumulativeScores[s],r.cumulativeScores[s]=n}if(Array.isArray(r.results))for(let n of r.results)n.playerIndex=i(n.playerIndex)}this.notify()}rotateSeatingClockwise(){let e=this.players[3];this.players=[e,this.players[0],this.players[1],this.players[2]];let s=t=>t!=null?(t+1)%4:t;if(this.currentDealerIndex=s(this.currentDealerIndex),this.activeRound){this.activeRound.dealerIndex=s(this.activeRound.dealerIndex),this.activeRound.leadBidderIndex=(this.activeRound.dealerIndex+1)%4,this.activeRound.trump&&this.activeRound.trump.winnerIndex!==null&&(this.activeRound.trump.winnerIndex=s(this.activeRound.trump.winnerIndex));let t=i=>[i[3],i[0],i[1],i[2]];this.activeRound.bets=t(this.activeRound.bets),this.activeRound.tricks=t(this.activeRound.tricks),this.activeRound.scores=t(this.activeRound.scores)}for(let t of this.completedRounds)if(t.dealerIndex=s(t.dealerIndex),t.leadBidderIndex!==void 0&&(t.leadBidderIndex=s(t.leadBidderIndex)),t.trump&&t.trump.winnerIndex!==null&&(t.trump.winnerIndex=s(t.trump.winnerIndex)),Array.isArray(t.scores)&&(t.scores=[t.scores[3],t.scores[0],t.scores[1],t.scores[2]]),Array.isArray(t.cumulativeScores)&&(t.cumulativeScores=[t.cumulativeScores[3],t.cumulativeScores[0],t.cumulativeScores[1],t.cumulativeScores[2]]),Array.isArray(t.results))for(let i of t.results)i.playerIndex=s(i.playerIndex);this.notify()}rotateSeatingCounterClockwise(){let e=this.players[0];this.players=[this.players[1],this.players[2],this.players[3],e];let s=t=>t!=null?(t+3)%4:t;if(this.currentDealerIndex=s(this.currentDealerIndex),this.activeRound){this.activeRound.dealerIndex=s(this.activeRound.dealerIndex),this.activeRound.leadBidderIndex=(this.activeRound.dealerIndex+1)%4,this.activeRound.trump&&this.activeRound.trump.winnerIndex!==null&&(this.activeRound.trump.winnerIndex=s(this.activeRound.trump.winnerIndex));let t=i=>[i[1],i[2],i[3],i[0]];this.activeRound.bets=t(this.activeRound.bets),this.activeRound.tricks=t(this.activeRound.tricks),this.activeRound.scores=t(this.activeRound.scores)}for(let t of this.completedRounds)if(t.dealerIndex=s(t.dealerIndex),t.leadBidderIndex!==void 0&&(t.leadBidderIndex=s(t.leadBidderIndex)),t.trump&&t.trump.winnerIndex!==null&&(t.trump.winnerIndex=s(t.trump.winnerIndex)),Array.isArray(t.scores)&&(t.scores=[t.scores[1],t.scores[2],t.scores[3],t.scores[0]]),Array.isArray(t.cumulativeScores)&&(t.cumulativeScores=[t.cumulativeScores[1],t.cumulativeScores[2],t.cumulativeScores[3],t.cumulativeScores[0]]),Array.isArray(t.results))for(let i of t.results)i.playerIndex=s(i.playerIndex);this.notify()}saveToStorage(){if(!(typeof localStorage>"u"))try{let e=JSON.stringify({id:this.id,createdAt:this.createdAt,rules:this.rules,targetPoints:this.targetPoints,maxRounds:this.maxRounds,simplifiedMode:this.simplifiedMode,players:this.players,currentDealerIndex:this.currentDealerIndex,roundNumber:this.roundNumber,completedRounds:this.completedRounds,initialScores:this.initialScores,activeRound:this.activeRound,status:this.status});localStorage.setItem(ee,e)}catch(e){console.warn("LocalStorage save failed:",e)}}static loadFromStorage(){if(typeof localStorage>"u")return new f;try{let e=localStorage.getItem(ee);if(e){let s=JSON.parse(e);return new f(s)}}catch(e){console.warn("LocalStorage load failed:",e)}return new f}static clearStorage(){if(!(typeof localStorage>"u"))try{localStorage.removeItem(ee)}catch(e){console.warn("LocalStorage clear failed:",e)}}exportJson(){return JSON.stringify({app:"Israeli Whist Scorekeeper",version:"1.0.0",exportedAt:new Date().toISOString(),session:{id:this.id,createdAt:this.createdAt,rules:this.rules,targetPoints:this.targetPoints,maxRounds:this.maxRounds,simplifiedMode:this.simplifiedMode,players:this.players,initialScores:this.initialScores,completedRounds:this.completedRounds,scores:this.getCumulativeScores(),rankings:this.getRankings()}},null,2)}};var O=class{constructor(e,s){this.app=e,this.onRemoteUpdate=s,this.roomId=this.detectRoomIdFromUrl(),this.ws=null,this.connected=!1,this.userCount=1,this.listeners=[],this.isApplyingRemote=!1,this.init()}detectRoomIdFromUrl(){let e=new URLSearchParams(window.location.search),s=e.get("game")||e.get("room");return!s&&window.location.hash&&(s=window.location.hash.replace("#","").trim()),s||this.generateFallbackCode()}generateFallbackCode(){let e="23456789ABCDEFGHJKLMNPQRSTUVWXYZ",s="";for(let t=0;t<4;t++)s+=e.charAt(Math.floor(Math.random()*e.length));return`W-${s}`}updateUrl(e){if(!e)return;let s=new URL(window.location.href);s.searchParams.set("game",e),window.history.replaceState({roomId:e},"",s.toString())}getShareUrl(){let e=new URL(window.location.href);return e.searchParams.set("game",this.roomId),e.toString()}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(s=>s!==e)}}notify(){for(let e of this.listeners)e({roomId:this.roomId,connected:this.connected,userCount:this.userCount,shareUrl:this.getShareUrl()})}init(){this.connectWebSocket()}connectWebSocket(){let e=window.location,s=e.protocol==="https:"?"wss:":"ws:",t=`${s}//${e.host}/whist/ws`;(e.pathname==="/"||!e.pathname.startsWith("/whist"))&&(t=`${s}//${e.host}/ws`);try{this.ws=new WebSocket(t),this.ws.onopen=()=>{this.connected=!0,this.notify(),this.joinRoom(this.roomId)},this.ws.onmessage=i=>{try{let r=JSON.parse(i.data);this.handleMessage(r)}catch(r){console.warn("Sync parse error:",r)}},this.ws.onclose=()=>{this.connected=!1,this.notify(),setTimeout(()=>this.connectWebSocket(),3e3)},this.ws.onerror=i=>{console.warn("WebSocket connection error:",i),this.connected=!1,this.notify()}}catch(i){console.warn("WebSocket init error:",i)}}joinRoom(e){this.roomId=e,this.updateUrl(e),this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"JOIN",roomId:e})),this.notify()}createNewRoom(){let e=this.generateFallbackCode();return this.roomId=e,this.updateUrl(e),this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:"JOIN",roomId:e})),this.notify(),e}hasMeaningfulLocalState(){if(!this.app||!this.app.session)return!1;let e=this.app.session;if(e.completedRounds&&e.completedRounds.length>0||e.initialScores&&e.initialScores.some(i=>i!==0))return!0;let s=(i,r)=>!i||i===`Player ${r+1}`||i===`\u05E9\u05D7\u05E7\u05DF ${r+1}`;return!!((e.players||[]).some((i,r)=>!s(i.name,r))||e.activeRound&&(e.activeRound.bets&&e.activeRound.bets.some(i=>i!==null)||e.activeRound.tricks&&e.activeRound.tricks.some(i=>i!==null)))}handleMessage(e){e.type==="JOINED"?(this.userCount=e.userCount||1,this.notify(),e.state?(this.isApplyingRemote=!0,this.onRemoteUpdate(e.state),this.isApplyingRemote=!1):this.hasMeaningfulLocalState()&&this.broadcastLocalState()):e.type==="USER_COUNT_CHANGED"?(this.userCount=e.userCount||1,this.notify()):e.type==="STATE_UPDATED"&&(e.state&&(this.isApplyingRemote=!0,this.onRemoteUpdate(e.state),this.isApplyingRemote=!1),e.userCount&&(this.userCount=e.userCount,this.notify()))}broadcastLocalState(){if(this.isApplyingRemote||!this.ws||this.ws.readyState!==WebSocket.OPEN||!this.hasMeaningfulLocalState())return;let e={id:this.app.session.id,createdAt:this.app.session.createdAt,rules:this.app.session.rules,targetPoints:this.app.session.targetPoints,maxRounds:this.app.session.maxRounds,simplifiedMode:this.app.session.simplifiedMode,players:this.app.session.players,currentDealerIndex:this.app.session.currentDealerIndex,roundNumber:this.app.session.roundNumber,completedRounds:this.app.session.completedRounds,initialScores:this.app.session.initialScores,activeRound:this.app.session.activeRound,status:this.app.session.status};this.ws.send(JSON.stringify({type:"SYNC_STATE",roomId:this.roomId,state:e}))}switchRoom(e){this.joinRoom(e)}};var V="israeli_whist_recent_games_v1";var q=[],M=class{static getRecentGames(){if(q&&q.length>0)return q;if(typeof localStorage>"u")return[];try{let e=localStorage.getItem(V);if(e)return q=JSON.parse(e),q}catch(e){console.warn("Failed to read recent games archive:",e)}return[]}static async syncWithServer(e=null){try{let t=typeof window<"u"?window.location:null,i="/whist/api/recent-games";t&&(t.pathname==="/"||!t.pathname.startsWith("/whist"))&&(i="/api/recent-games");let r=await fetch(i);if(r.ok){let n=await r.json();if(n&&n.success&&Array.isArray(n.games)){let l=n.games,a=this.getRecentGames(),o=new Map;a.forEach(c=>{c&&c.roomId&&o.set(c.roomId,c)}),l.forEach(c=>{c&&c.roomId&&o.set(c.roomId,c)});let d=Array.from(o.values()).sort((c,p)=>new Date(p.updatedAt||p.createdAt)-new Date(c.updatedAt||c.createdAt)).slice(0,10);if(q=d,typeof localStorage<"u")try{localStorage.setItem(V,JSON.stringify(d))}catch{}return e&&e(d),d}}}catch(t){console.warn("Error syncing recent games with server:",t)}let s=this.getRecentGames();return e&&e(s),s}static saveGameToArchive(e,s){if(!e)return;let t=e.completedRounds?e.completedRounds.length:0,i=(a,o)=>!a||a===`Player ${o+1}`||a===`\u05E9\u05D7\u05E7\u05DF ${o+1}`,r=(e.players||[]).some((a,o)=>!i(a.name,o)),n=e.initialScores&&e.initialScores.some(a=>a!==0),l=e.activeRound&&(e.activeRound.bets&&e.activeRound.bets.some(a=>a!==null)||e.activeRound.tricks&&e.activeRound.tricks.some(a=>a!==null));if(!(t===0&&!r&&!l&&!n))try{let a=this.getRecentGames(),o=e.getCumulativeScores(),d=e.getRankings(),c=d.length>0?d[0]:null,p={roomId:s||e.id||"W-LOCAL",id:e.id,createdAt:e.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),roundNumber:e.roundNumber,completedRoundsCount:e.completedRounds?e.completedRounds.length:0,status:e.status||"IN_PROGRESS",simplifiedMode:e.simplifiedMode,players:e.players.map((u,S)=>({name:u.name,color:u.color,score:o[S]||0})),leaderName:c?c.player.name:e.players[0].name,leaderScore:c?c.score:0,fullState:{id:e.id,createdAt:e.createdAt,rules:e.rules,targetPoints:e.targetPoints,maxRounds:e.maxRounds,simplifiedMode:e.simplifiedMode,players:e.players,currentDealerIndex:e.currentDealerIndex,roundNumber:e.roundNumber,completedRounds:e.completedRounds,initialScores:e.initialScores,activeRound:e.activeRound,status:e.status}},h=a.filter(u=>u.roomId!==p.roomId&&u.id!==p.id),m=[p,...h].slice(0,10);q=m,typeof localStorage<"u"&&localStorage.setItem(V,JSON.stringify(m));let g=typeof window<"u"?window.location:null,v=`/whist/api/session/${p.roomId}`;g&&(g.pathname==="/"||!g.pathname.startsWith("/whist"))&&(v=`/api/session/${p.roomId}`),fetch(v,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p.fullState)}).then(u=>u.json()).then(u=>{u&&u.rejected&&u.session&&typeof window<"u"&&window.__ISRAELI_WHIST_APP__&&(console.warn("[Sync] Server had an authoritative session; restoring state locally."),window.__ISRAELI_WHIST_APP__.applyRemoteState(u.session))}).catch(()=>{})}catch(a){console.warn("Failed to save game to archive:",a)}}static deleteGame(e){try{let t=this.getRecentGames().filter(n=>n.roomId!==e&&n.id!==e);q=t,typeof localStorage<"u"&&localStorage.setItem(V,JSON.stringify(t));let i=typeof window<"u"?window.location:null,r=`/whist/api/delete-session/${e}`;i&&(i.pathname==="/"||!i.pathname.startsWith("/whist"))&&(r=`/api/delete-session/${e}`),fetch(r).catch(()=>{})}catch(s){console.warn("Failed to delete game from archive:",s)}}static formatTimestamp(e){if(!e)return"";try{let s=new Date(e),t=new Date,i=s.toDateString()===t.toDateString(),r=s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return i?`Today at ${r}`:`${s.toLocaleDateString([],{month:"short",day:"numeric"})} \u2022 ${r}`}catch{return e}}};var W=class{constructor(e,s){this.app=e,this.container=s}render(){if(!this.container)return;let e=this.app.i18n,s=e.lang==="he",t=M.getRecentGames(),i=`
      <div class="landing-hero">
        <div class="landing-badge">\u2660\uFE0F \u2665\uFE0F \u2663\uFE0F \u2666\uFE0F ${s?"\u05D5\u05D5\u05D9\u05E1\u05D8 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9":"ISRAELI WHIST"}</div>
        <h1 class="landing-title">${s?"\u05DE\u05D7\u05E9\u05D1\u05D5\u05DF \u05E0\u05D9\u05E7\u05D5\u05D3":"Scorekeeper"}</h1>
        <p class="landing-subtitle">
          ${e.landingSubtitle}
        </p>

        <div class="landing-actions">
          <button class="btn-block btn-hero-start" id="landing-btn-new-game">
            ${e.startNewMatch}
          </button>
          
          <div class="join-box">
            <input type="text" class="input-field join-input" id="landing-txt-room" placeholder="${e.roomCodePlaceholder}" maxlength="12" />
            <button class="btn-pill btn-share" id="landing-btn-join" style="height: 42px; padding: 0 16px; font-size: 0.85rem;">
              ${e.joinRoom}
            </button>
          </div>
        </div>
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
            ${t.slice(0,5).map((r,n)=>{let l=M.formatTimestamp(r.updatedAt||r.createdAt);return`
                <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="room-pill" style="font-size: 0.7rem;">${r.roomId}</span>
                      <span style="font-size: 0.72rem; color: var(--text-secondary);">${l}</span>
                    </div>
                    <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted);">
                      ${r.completedRoundsCount} ${e.deals}
                    </span>
                  </div>

                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem;">
                    ${r.players.map(a=>`
                      <span style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.75rem; display: inline-flex; align-items: center; gap: 3px;">
                        <span class="player-dot" style="background: ${a.color};"></span>
                        <span>${a.name}:</span>
                        <strong class="signed-score" dir="ltr" style="color: ${a.score>=0?"var(--success)":"var(--danger)"}; direction: ltr; unicode-bidi: isolate;">${a.score>=0?"+":""}${a.score}</strong>
                      </span>
                    `).join("")}
                  </div>

                  <div style="display: flex; justify-content: flex-end;">
                    <button class="btn-pill btn-share btn-landing-resume" data-game-idx="${n}" style="font-size: 0.75rem; padding: 0 12px; height: 30px;">
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
    `;this.container.innerHTML=i,this.bindEvents(t)}bindEvents(e){let s=this.container.querySelector("#landing-btn-new-game");s&&s.addEventListener("click",()=>{this.app.dialogs.showNewGameModal()});let t=this.container.querySelector("#landing-btn-join"),i=this.container.querySelector("#landing-txt-room");if(t&&i){let a=()=>{let o=i.value.trim().toUpperCase();if(!o){alert("Please enter a valid room code or link");return}if(o.includes("game=")){let d=o.match(/game=([A-Za-z0-9_-]+)/);d&&(o=d[1])}!o.startsWith("W-")&&o.length===4&&(o=`W-${o}`),this.app.joinRoomByCode(o)};t.addEventListener("click",a),i.addEventListener("keydown",o=>{o.key==="Enter"&&a()})}this.container.querySelectorAll(".btn-landing-resume").forEach(a=>{a.addEventListener("click",()=>{let o=parseInt(a.dataset.gameIdx,10),d=e[o];d&&this.app.resumeGameFromArchive(d)})});let r=this.container.querySelector("#landing-rules-toggle"),n=this.container.querySelector("#landing-rules-body"),l=this.container.querySelector("#landing-rules-arrow");r&&n&&r.addEventListener("click",()=>{let a=n.style.display==="none";n.style.display=a?"block":"none",l&&(l.textContent=a?"\u25B2":"\u25BC")})}};function T(){if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(8)}catch{}}var J=class{constructor(e,s,t,i){this.session=e,this.container=s,this.i18n=t,this.onRoundComplete=i,this.render()}updateSession(e){this.session=e,this.render()}updateI18n(e){this.i18n=e,this.render()}render(){if(!this.container)return;let e=this.i18n,s=this.session.activeRound,t=s.stage,i=this.session.simplifiedMode,r="";i?r=t==="BETS"?e.stageBets:e.stageTricks:r=t==="TRUMP"?e.stageTrump:t==="BETS"?e.stageBetsFull:e.stageTricksFull;let n=`
      <div class="card">
        <div class="stage-header">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <div class="stage-title">${r}</div>
            <button class="btn-pill" id="btn-toggle-simplified" title="Toggle Mode" style="font-size: 0.72rem; height: 26px; padding: 0 8px; background: ${i?"rgba(16, 185, 129, 0.15)":"rgba(99, 102, 241, 0.15)"}; border-color: ${i?"rgba(16, 185, 129, 0.4)":"rgba(99, 102, 241, 0.4)"}; color: ${i?"#a7f3d0":"#c7d2fe"};">
              ${i?e.simplified:e.fullTrump}
            </button>
          </div>
          <div class="round-pill">
            ${e.deal} #${this.session.roundNumber}
          </div>
        </div>
    `;t==="TRUMP"&&!i?n+=this.renderTrumpStage(s):t==="BETS"?n+=this.renderBetsStage(s,i):t==="TRICKS"&&(n+=this.renderTricksStage(s,i)),n+="</div>",this.container.innerHTML=n,this.bindEvents(t,i)}renderTrumpStage(e){let s=this.i18n,t=s.lang==="he",i=this.session.players[e.dealerIndex],r=this.session.players[e.leadBidderIndex];return`
      <div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.85rem; display: flex; justify-content: space-between;">
          <span>${s.dealer}: <strong>${i.name}</strong></span>
          <span>${s.lead}: <strong>${r.name}</strong></span>
        </div>

        <div class="trump-stage-layout">
          <div class="trump-stage-col">
            <div class="stage-section-title">${s.auctionWinner}</div>
            <div class="trump-grid-2x2">
              ${this.session.players.map((n,l)=>`
                <button class="btn-outline trump-player-btn ${e.trump.winnerIndex===l?"active":""}" 
                        data-player-idx="${l}"
                        style="${e.trump.winnerIndex===l?"border-color: var(--accent-primary); background: var(--accent-primary); color: white;":""}">
                  <span class="player-dot" style="background: ${n.color};"></span>
                  <span>${n.name}</span>
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
              ${ie.map(n=>`
                <div class="suit-option ${e.trump.suitId===n.id&&!e.trump.isPasRound?"active":""}" data-suit-id="${n.id}">
                  <span class="suit-symbol" style="color: ${e.trump.suitId===n.id?"#ffffff":n.color}">${n.symbol}</span>
                  <span class="suit-label">${t?n.nameHe:n.nameEn}</span>
                </div>
              `).join("")}
            </div>

            <div class="stage-section-title">${s.winningTarget}</div>
            <div class="trump-targets-grid">
              ${[5,6,7,8,9,10,11,12,13].map(n=>`
                <button class="chip ${e.trump.bidAmount===n&&!e.trump.isPasRound?"active":""} trump-target-chip" data-amount="${n}">
                  ${n}
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <button class="btn-block" id="btn-confirm-trump" ${e.trump.winnerIndex===null&&!e.trump.isPasRound?"disabled":""}>
          ${s.confirmTrump}
        </button>
      </div>
    `}renderBetsStage(e,s){let t=this.i18n,i=this.session.getLastBidderIndex(),r=i!==null?this.session.players[i]:null,n=this.session.getForbiddenBetForLastBidder(),l=F(e.bets),a=e.bets.reduce((h,m)=>h+(typeof m=="number"&&!isNaN(m)?m:0),0),o=e.bets.every(h=>typeof h=="number"&&!isNaN(h)),d=this.session.players[e.dealerIndex],c=e.trump.winnerIndex!==null?this.session.players[e.trump.winnerIndex]:null,p="";return s?o&&a===13?p=t.hookViolation:p=`${t.totalBids}: <strong>${a}</strong> (${a>13?t.over:a<13?t.under:"13"})`:n!==null&&r?p=`${t.totalBids}: <strong>${a}</strong> \u2022 ${t.lastBidder} (${r.name}) ${t.lastBidderCannotBid} <strong>${n}</strong>`:p=`${t.totalBids}: <strong>${a}</strong> (${l.status==="OVER"?t.over:l.status==="UNDER"?t.under:"13"})`,`
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <div style="font-size: 0.82rem; color: var(--text-secondary);">
            ${s?`${t.dealer}: <strong>${d.name}</strong>`:`${t.trumpMaker}: <strong>${c?c.name:"\u2014"}</strong> (${t.lastBidder}: <strong>${r?r.name:""}</strong>)`}
          </div>
          ${s?"":`
            <button class="btn-nav" id="btn-back-to-trump" style="font-size: 0.75rem; min-height: 26px; padding: 2px 8px;">${t.editTrump}</button>
          `}
        </div>

        <!-- Hook Banner -->
        <div class="hook-banner ${l.status}">
          <div>
            <span>${p}</span>
          </div>
        </div>

        <!-- Player Input Cards -->
        <div class="round-inputs-grid">
          ${this.session.players.map((h,m)=>{let g=m===e.dealerIndex,v=!s&&m===i,u=!s&&m===e.trump.winnerIndex,S=e.bets[m],x=!s&&v&&n!==null;return`
              <div class="input-row ${g?"dealer-row":""}" data-player-idx="${m}">
                <div class="input-row-header">
                  <div class="input-row-name">
                    <span class="player-dot" style="background: ${h.color};"></span>
                    <span>${h.name}</span>
                    ${u?`<span style="font-size: 0.62rem; background: #fbbf24; color: black; padding: 1px 5px; border-radius: 4px; font-weight: 800;">${t.trumpMaker.toUpperCase()}</span>`:""}
                    ${v?`<span class="tag-dealer" style="position:static; background: #e11d48;">${t.lastBidder.toUpperCase()}</span>`:""}
                    ${g&&!u&&!v?`<span class="tag-dealer" style="position:static;">${t.dealer.toUpperCase()}</span>`:""}
                  </div>
                  
                  <div class="stepper">
                    <button class="stepper-btn btn-bet-dec" data-player-idx="${m}" ${S===null||S<=0?"disabled":""}>\u2212</button>
                    <span class="stepper-val">${S!==null?S:"\u2014"}</span>
                    <button class="stepper-btn btn-bet-inc" data-player-idx="${m}" ${S>=13?"disabled":""}>+</button>
                  </div>
                </div>

                <div class="chips-row">
                  ${[0,1,2,3,4,5,6,7,8].map(w=>`
                    <button class="chip ${S===w?"active":""} ${x&&n===w?"forbidden":""}" 
                            data-player-idx="${m}" data-amount="${w}">
                      ${w===0?"0":w}
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
    `}renderTricksStage(e,s){let t=this.i18n,i=e.tricks,r=i.reduce((a,o)=>a+(typeof o=="number"&&!isNaN(o)?o:0),0),n=r===13&&i.every(a=>typeof a=="number"&&!isNaN(a)),l=13-r;return`
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: ${n?"var(--success)":"var(--warning)"};">
            ${n?t.tricksValid:`${t.remainingToAssign}: ${l}`}
          </div>
          <button class="btn-pill" id="btn-auto-fill-tricks" style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.2); border-color: rgba(99, 102, 241, 0.4); color: #c7d2fe;">
            ${t.autoFillBids}
          </button>
        </div>

        <div class="round-inputs-grid">
          ${this.session.players.map((a,o)=>{let d=e.bets[o],c=i[o],p=c!==null&&d!==null&&c===d;return`
              <div class="input-row" data-player-idx="${o}" style="${p?"border-color: rgba(16, 185, 129, 0.4);":""}">
                <div class="input-row-header">
                  <div class="input-row-name">
                    <span class="player-dot" style="background: ${a.color};"></span>
                    <span>${a.name}</span>
                    <span class="input-row-sub">
                      (${t.bid||"Bid"}: <strong>${d!==null?d:"\u2014"}</strong>)
                    </span>
                    ${p?`<span style="color: var(--success); font-size: 0.72rem; font-weight: 700; margin-left: 2px;">${t.exact}</span>`:""}
                  </div>

                  <div class="stepper">
                    <button class="stepper-btn btn-trick-dec" data-player-idx="${o}" ${c===null||c<=0?"disabled":""}>\u2212</button>
                    <span class="stepper-val">${c!==null?c:"\u2014"}</span>
                    <button class="stepper-btn btn-trick-inc" data-player-idx="${o}" ${c>=13?"disabled":""}>+</button>
                  </div>
                </div>

                <div class="chips-row">
                  ${[0,1,2,3,4,5,6,7,8].map(h=>`
                    <button class="chip ${c===h?"active":""}" 
                            data-trick-player-idx="${o}" data-amount="${h}">
                      ${h}
                    </button>
                  `).join("")}
                </div>
              </div>
            `}).join("")}
        </div>

        ${n?this.renderScorePreview(e):""}

        <div style="display: flex; gap: 0.4rem; margin-top: 0.85rem;">
          <button class="btn-outline" id="btn-back-to-bets" style="flex: 1;">
            ${t.editBids}
          </button>
          <button class="btn-block" id="btn-commit-round" style="flex: 2;" ${n?"":"disabled"}>
            ${t.calculateNextDeal}
          </button>
        </div>
      </div>
    `}renderScorePreview(e){let s=this.i18n,t=e.bets.reduce((r,n)=>r+(typeof n=="number"?n:0),0),i=e.trump?e.trump.isPasRound:!1;return`
      <div class="breakdown-box">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${s.roundScoreCalc}
        </div>
        <div class="breakdown-items-grid">
          ${this.session.players.map((r,n)=>{let l=j(e.bets[n]||0,e.tricks[n]||0,n===(e.trump?e.trump.winnerIndex:null),i,this.session.rules,t);return`
              <div class="breakdown-item">
                <div>
                  <div style="font-size: 0.82rem; font-weight: 700;">${r.name}</div>
                  <div style="font-size: 0.72rem; color: var(--text-secondary);">${l.explanation}</div>
                </div>
                <span class="score-badge signed-score ${l.score>=0?"plus":"minus"}" dir="ltr" style="direction: ltr; unicode-bidi: isolate;">
                  ${l.score>=0?`+${l.score}`:l.score}
                </span>
              </div>
            `}).join("")}
        </div>
      </div>
    `}bindEvents(e,s){let t=this.container.querySelector("#btn-toggle-simplified");if(t&&t.addEventListener("click",()=>{T(),this.session.setSimplifiedMode(!this.session.simplifiedMode),this.render()}),e==="TRUMP"&&!s){this.container.querySelectorAll(".trump-player-btn").forEach(n=>{n.addEventListener("click",()=>{T();let l=parseInt(n.dataset.playerIdx,10);this.session.activeRound.trump.winnerIndex=l,this.session.activeRound.trump.isPasRound=!1,this.render()})}),this.container.querySelectorAll(".suit-option").forEach(n=>{n.addEventListener("click",()=>{T();let l=n.dataset.suitId;this.session.activeRound.trump.suitId=l,this.session.activeRound.trump.isPasRound=!1,this.render()})}),this.container.querySelectorAll(".trump-target-chip").forEach(n=>{n.addEventListener("click",()=>{T(),this.session.activeRound.trump.bidAmount=parseInt(n.dataset.amount,10),this.session.activeRound.trump.isPasRound=!1,this.render()})});let i=this.container.querySelector("#chk-pas-round");i&&i.addEventListener("change",n=>{T(),this.session.activeRound.trump.isPasRound=n.target.checked,n.target.checked&&(this.session.activeRound.trump.winnerIndex=null),this.render()});let r=this.container.querySelector("#btn-confirm-trump");r&&r.addEventListener("click",()=>{T();let n=this.session.activeRound.trump;this.session.setTrump(n.winnerIndex,n.suitId,n.bidAmount,n.isPasRound),this.render()})}else if(e==="BETS"){this.container.querySelectorAll(".chip[data-player-idx]").forEach(n=>{n.addEventListener("click",()=>{T();let l=parseInt(n.dataset.playerIdx,10),a=parseInt(n.dataset.amount,10);this.session.setBet(l,a),this.render()})}),this.container.querySelectorAll(".btn-bet-dec").forEach(n=>{n.addEventListener("click",()=>{T();let l=parseInt(n.dataset.playerIdx,10),a=this.session.activeRound.bets[l]||0;a>0&&(this.session.setBet(l,a-1),this.render())})}),this.container.querySelectorAll(".btn-bet-inc").forEach(n=>{n.addEventListener("click",()=>{T();let l=parseInt(n.dataset.playerIdx,10),a=this.session.activeRound.bets[l]??-1;a<13&&(this.session.setBet(l,a+1),this.render())})});let i=this.container.querySelector("#btn-back-to-trump");i&&i.addEventListener("click",()=>{T(),this.session.activeRound.stage="TRUMP",this.render()});let r=this.container.querySelector("#btn-proceed-to-tricks");r&&r.addEventListener("click",()=>{T();try{this.session.proceedToTricks(),this.render()}catch(n){alert(n.message)}})}else if(e==="TRICKS"){this.container.querySelectorAll(".chip[data-trick-player-idx]").forEach(l=>{l.addEventListener("click",()=>{T();let a=parseInt(l.dataset.trickPlayerIdx,10),o=parseInt(l.dataset.amount,10);this.session.setTricks(a,o),this.render()})}),this.container.querySelectorAll(".btn-trick-dec").forEach(l=>{l.addEventListener("click",()=>{T();let a=parseInt(l.dataset.playerIdx,10),o=this.session.activeRound.tricks[a]||0;o>0&&(this.session.setTricks(a,o-1),this.render())})}),this.container.querySelectorAll(".btn-trick-inc").forEach(l=>{l.addEventListener("click",()=>{T();let a=parseInt(l.dataset.playerIdx,10),o=this.session.activeRound.tricks[a]??-1;o<13&&(this.session.setTricks(a,o+1),this.render())})});let i=this.container.querySelector("#btn-auto-fill-tricks");i&&i.addEventListener("click",()=>{T(),this.session.autoFillTricksFromBids(),this.render()});let r=this.container.querySelector("#btn-back-to-bets");r&&r.addEventListener("click",()=>{T(),this.session.activeRound.stage="BETS",this.render()});let n=this.container.querySelector("#btn-commit-round");n&&n.addEventListener("click",()=>{T();try{this.session.commitRound(),this.onRoundComplete&&this.onRoundComplete(),this.render()}catch(l){alert(l.message)}})}}};var Y=class{constructor(e,s,t,i,r,n,l,a){this.session=e,this.leaderboardContainer=s,this.historyContainer=t,this.i18n=i,this.onUndo=r,this.onReorganizeSeating=n,this.onEditDeal=l,this.onSetBaseline=a,this.isJiggleMode=!1,this.isDragging=!1,document.addEventListener("pointerup",o=>{this.isJiggleMode&&!this.isDragging&&(o.target.closest(".player-card")||this.setJiggleMode(!1))}),this.render()}updateSession(e){this.session=e,!this.isDragging&&!this.isJiggleMode&&this.render()}updateI18n(e){this.i18n=e,!this.isDragging&&!this.isJiggleMode&&this.render()}setJiggleMode(e){if(this.isJiggleMode=e,this.leaderboardContainer){let s=this.leaderboardContainer.querySelector(".leaderboard-grid");s&&s.classList.toggle("is-jiggling",e)}e||this.renderLeaderboard()}render(){this.renderLeaderboard(),this.renderHistoryTable()}renderLeaderboard(){if(!this.leaderboardContainer)return;let e=this.i18n,s=this.session.getRankings(),t=this.session.getCumulativeScores(),i=s.length>0?s[0].score:0,r=this.session.currentDealerIndex,n=`
      <div class="leaderboard-grid ${this.isJiggleMode?"is-jiggling":""}">
        ${this.session.players.map((l,a)=>{let o=t[a],d=s.findIndex(h=>h.index===a),c=o===i&&this.session.completedRounds.length>0,p=a===r;return`
            <div class="player-card ${c?"is-leader":""} ${p?"is-dealer":""}" 
                 data-player-idx="${a}" 
                 title="Long-press to lift and reorder seating">
              ${p?`<span class="tag-dealer">${e.dealer.toUpperCase()}</span>`:""}
              <div class="player-card-inner">
                <div class="player-title">
                  <span class="player-dot" style="background: ${l.color};"></span>
                  <span>${l.name}</span>
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
    `;this.leaderboardContainer.innerHTML=n,this.bindLeaderboardEvents()}bindLeaderboardEvents(){if(!this.leaderboardContainer)return;let e=this.leaderboardContainer.querySelector(".leaderboard-grid");Array.from(this.leaderboardContainer.querySelectorAll(".player-card")).forEach(t=>{let i=null,r=0,n=0,l=0,a=0,o=0,d=0,c=0,p=!1,h=null,m=null,g=[],v=null,u=null,S=(b=25)=>{if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(b)}catch{}},x=()=>Array.from(e.querySelectorAll(".player-card")).map(R=>{let $=R.getBoundingClientRect();return{left:$.left,top:$.top,width:$.width,height:$.height,centerX:$.left+$.width/2,centerY:$.top+$.height/2}}),w=b=>{if(b==null)return;let R=Array.from(e.querySelectorAll(".player-card")),$=[0,1,2,3],[k]=$.splice(h,1);$.splice(b,0,k),R.forEach((H,L)=>{if(L===h)return;let A=$.indexOf(L),P=g[L],N=g[A];if(P&&N){let K=N.left-P.left,B=N.top-P.top;H.style.transform=`translate3d(${K}px, ${B}px, 0)`}})},y=()=>{Array.from(e.querySelectorAll(".player-card")).forEach(R=>{R.style.transform="",R.style.zIndex=""})},I=()=>{if(!p)return;let b=l-r,R=a-n;d+=(c-d)*.18,t.style.transform=`translate3d(${b}px, ${R-8}px, 0) scale(1.12) rotate(${d.toFixed(2)}deg)`;let $=g[h],k=$.centerX+b,H=$.centerY+R,L=m,A=1/0;g.forEach((P,N)=>{let _=Math.hypot(k-P.centerX,H-P.centerY)*(N===m?.75:1);_<A&&(A=_,L=N)}),L!==m&&(m=L,S(18),w(m)),u=requestAnimationFrame(I)},E=(b,R)=>{this.isDragging||(this.isDragging=!0,p=!0,h=parseInt(t.dataset.playerIdx,10),m=h,g=x(),this.setJiggleMode(!0),t.classList.remove("card-pressing"),t.classList.add("is-lifted"),t.style.zIndex="500",S([40,60,40]),l=b,a=R,o=b,d=0,c=0,t.style.transform=`translate3d(${b-r}px, ${R-n-8}px, 0) scale(1.12)`,u=requestAnimationFrame(I))},C=b=>{if(v!==null&&b.pointerId!==v)return;let R=b.clientX,$=b.clientY;if(!p){(Math.abs(R-r)>10||Math.abs($-n)>10)&&(i&&(clearTimeout(i),i=null),t.classList.remove("card-pressing"));return}b.preventDefault(),b.stopPropagation(),l=R,a=$;let k=R-o;o=R,c=Math.max(-7,Math.min(7,k*.4))},D=b=>{if(!(v!==null&&b.pointerId!==v)){if(i&&(clearTimeout(i),i=null),t.classList.remove("card-pressing"),v=null,u&&(cancelAnimationFrame(u),u=null),p){p=!1,this.isDragging=!1;let R=m,$=g[h],k=g[R];if($&&k&&h!==R){let H=k.left-$.left,L=k.top-$.top;t.classList.add("is-dropping"),t.style.transform=`translate3d(${H}px, ${L}px, 0) scale(1.0) rotate(0deg)`,S(30);let A=[0,1,2,3],[P]=A.splice(h,1);A.splice(R,0,P),this.session.reorderPlayers(A),setTimeout(()=>{t.classList.remove("is-lifted","is-dropping");let N=Array.from(e.querySelectorAll(".player-card"));A.map(B=>N[B]).forEach((B,_)=>{B.dataset.playerIdx=_,B.style.transform="",B.style.zIndex="",e.appendChild(B)}),y()},260)}else t.classList.remove("is-lifted"),y()}window.removeEventListener("pointermove",C),window.removeEventListener("pointerup",D),window.removeEventListener("pointercancel",D)}},U=b=>{this.isDragging||(v=b.pointerId,r=b.clientX,n=b.clientY,l=b.clientX,a=b.clientY,o=b.clientX,t.classList.add("card-pressing"),window.addEventListener("pointermove",C,{passive:!1}),window.addEventListener("pointerup",D),window.addEventListener("pointercancel",D),this.isJiggleMode?E(r,n):i=setTimeout(()=>{E(r,n)},260))};t.addEventListener("pointerdown",U),t.addEventListener("contextmenu",b=>b.preventDefault())})}renderHistoryTable(){if(!this.historyContainer)return;let e=this.i18n,s=this.session.completedRounds,t=this.session.initialScores&&this.session.initialScores.some(a=>a!==0);if(s.length===0){this.historyContainer.innerHTML=`
        <div class="card" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <div style="font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem;">${e.noDeals}</div>
          <div style="font-size: 0.85rem; margin-bottom: 1rem;">${e.noDealsSub}</div>
          <button class="btn-pill" id="btn-set-baseline-empty" style="font-size: 0.8rem; height: 32px; padding: 0 14px; margin: 0 auto;">
            \u{1F3AF} ${e.setBaseline}
          </button>
        </div>
      `;let a=this.historyContainer.querySelector("#btn-set-baseline-empty");a&&a.addEventListener("click",()=>{this.onSetBaseline&&this.onSetBaseline()});return}let i=`
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
                ${this.session.players.map(a=>`
                  <th style="min-width: 85px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 3px;">
                      <span class="player-dot" style="background: ${a.color};"></span>
                      <span>${a.name}</span>
                    </div>
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              ${s.map((a,o)=>{let d=this.session.players[a.dealerIndex];return`
                  <tr>
                    <td style="font-weight: 700;">
                      <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
                        <span>#${a.roundNumber}</span>
                        <button class="btn-pill btn-edit-deal" data-round-idx="${o}" title="${e.editDeal}" style="padding: 1px 5px; font-size: 0.68rem; height: 22px; cursor: pointer;">\u270F\uFE0F</button>
                      </div>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; justify-content: center; gap: 4px; white-space: nowrap;">
                        <span class="player-dot" style="background: ${d.color};"></span>
                        <span style="font-weight: 600;">${d.name}</span>
                      </div>
                    </td>
                    ${this.session.players.map((c,p)=>{let h=a.results.find(u=>u.playerIndex===p);if(!h)return"<td>\u2014</td>";let m=h.score>=0?`+${h.score}`:h.score,g=h.made,v=a.cumulativeScores?a.cumulativeScores[p]:"\u2014";return`
                        <td>
                          <div style="font-size: 0.72rem; color: var(--text-muted); direction: ltr; unicode-bidi: isolate;">
                            B:${h.bid} / T:${h.tricks}
                          </div>
                          <div class="score-delta signed-score" dir="ltr" style="font-weight: 800; direction: ltr; unicode-bidi: isolate; color: ${g?"var(--success)":"var(--danger)"};">
                            ${m}
                          </div>
                          <div class="score-cum signed-score" dir="ltr" style="font-size: 0.68rem; direction: ltr; unicode-bidi: isolate; color: var(--text-secondary);">
                            (${v})
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
                  ${this.session.players.map((a,o)=>{let d=this.session.initialScores&&this.session.initialScores[o]||0,c=d>=0?`+${d}`:`${d}`;return`
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
    `;this.historyContainer.innerHTML=i;let r=this.historyContainer.querySelector("#btn-undo-round");r&&r.addEventListener("click",()=>{confirm(e.undoConfirm)&&this.onUndo&&this.onUndo()});let n=this.historyContainer.querySelector("#btn-set-baseline");n&&n.addEventListener("click",()=>{this.onSetBaseline&&this.onSetBaseline()});let l=this.historyContainer.querySelector(".btn-edit-baseline");l&&l.addEventListener("click",()=>{this.onSetBaseline&&this.onSetBaseline()}),this.historyContainer.querySelectorAll(".btn-edit-deal").forEach(a=>{a.addEventListener("click",()=>{let o=parseInt(a.dataset.roundIdx,10);!isNaN(o)&&this.onEditDeal&&this.onEditDeal(o)})})}};var X=class{constructor(e,s,t){this.session=e,this.container=s,this.i18n=t,this.render()}updateSession(e){this.session=e,this.render()}updateI18n(e){this.i18n=e,this.render()}render(){if(!this.container)return;let e=this.session.completedRounds;if(e.length===0){this.container.innerHTML="";return}let s=this.session.players,t=["Start",...e.map(y=>`R${y.roundNumber}`)],i=t.length,r=s.map((y,I)=>{let E=this.session.initialScores&&this.session.initialScores[I]||0,C=[E];return e.forEach(D=>{let U=D.results.find(b=>b.playerIndex===I);E+=U?U.score:0,C.push(E)}),{player:y,points:C}}),n=0,l=0;r.forEach(y=>{y.points.forEach(I=>{I<n&&(n=I),I>l&&(l=I)})});let a=20;n=Math.floor((n-a)/20)*20,l=Math.ceil((l+a)/20)*20,n===l&&(l+=50);let o=600,d=240,c=40,p=20,h=20,m=30,g=o-c-p,v=d-h-m,u=y=>c+y/(i-1||1)*g,S=y=>h+v-(y-n)/(l-n)*v,x=S(0),w=`
      <div class="card">
        <h3 style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1rem;">
          Score Progression
        </h3>
        <div style="overflow-x: auto;">
          <svg viewBox="0 0 ${o} ${d}" style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0 auto;">
            <!-- Zero axis -->
            <line x1="${c}" y1="${x}" x2="${o-p}" y2="${x}" stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-dasharray="3 3" />
            <text x="${c-6}" y="${x+3}" fill="var(--text-muted)" font-size="9" text-anchor="end">0</text>
            <text x="${c-6}" y="${h+6}" fill="var(--text-muted)" font-size="9" text-anchor="end">${l}</text>
            <text x="${c-6}" y="${d-m}" fill="var(--text-muted)" font-size="9" text-anchor="end">${n}</text>

            ${t.map((y,I)=>`
              <text x="${u(I)}" y="${d-10}" fill="var(--text-muted)" font-size="9" text-anchor="middle">${y}</text>
            `).join("")}

            ${r.map(y=>{let I=y.points.map((E,C)=>`${u(C)},${S(E)}`).join(" ");return`
                <polyline fill="none" stroke="${y.player.color}" stroke-width="2" points="${I}" />
                ${y.points.map((E,C)=>`
                  <circle cx="${u(C)}" cy="${S(E)}" r="3.5" fill="${y.player.color}" stroke="#111827" stroke-width="1.5">
                    <title>${y.player.name}: ${E}</title>
                  </circle>
                `).join("")}
              `}).join("")}
          </svg>
        </div>

        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 0.75rem; flex-wrap: wrap;">
          ${s.map(y=>`
            <div style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.8rem;">
              <span class="player-dot" style="background: ${y.color};"></span>
              <span>${y.name}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;this.container.innerHTML=w}};function re(f){let e=f.completedRounds,s=e.length,i=f.players.map((o,d)=>{let c=0,p=0,h=0,m=0,g=0,v=0,u=0,S=0,x=0,w=-1/0,y=1/0,I=[0],E=0;e.forEach($=>{let k=$.results.find(H=>H.playerIndex===d);k&&(c+=k.score,E+=k.score,I.push(E),h++,m+=k.bid||0,g+=k.tricks||0,k.made&&p++,k.bid===0&&(v++,k.made&&u++),$.trump.winnerIndex===d&&(S++,k.made&&x++),k.score>w&&(w=k.score),k.score<y&&(y=k.score))});let C=h>0?p/h*100:0,D=s>0?g/s:0,U=h>0?m/h:0,b=v>0?u/v*100:0,R=S>0?x/S*100:0;return{player:o,pIdx:d,totalScore:c,madeBidsCount:p,totalBidsCount:h,hitRate:Math.round(C*10)/10,totalTricksWon:g,avgTricksPerRound:Math.round(D*10)/10,avgBidPerRound:Math.round(U*10)/10,zeroAttempts:v,zeroSuccess:u,zeroRate:Math.round(b*10)/10,passAttempts:v,passSuccess:u,passRate:Math.round(b*10)/10,trumpMakerCount:S,trumpMakerSuccess:x,trumpRate:Math.round(R*10)/10,highestSingleRound:w===-1/0?0:w,lowestSingleRound:y===1/0?0:y,roundScoresHistory:I}}),r=0,n=0,l=0;e.forEach(o=>{o.trump.isPasRound?l++:o.roundTotalBets>13?r++:o.roundTotalBets<13&&n++});let a=[...i].sort((o,d)=>d.totalScore-o.totalScore);return{numRounds:s,rankings:a,playerStats:i,overRoundsCount:r,underRoundsCount:n,pasRoundsCount:l,mostAccuratePlayer:[...i].sort((o,d)=>d.hitRate-o.hitRate)[0],mostAggressiveBidder:[...i].sort((o,d)=>d.avgBidPerRound-o.avgBidPerRound)[0],masterOfZero:[...i].sort((o,d)=>d.zeroSuccess-o.zeroSuccess)[0],masterOfPass:[...i].sort((o,d)=>d.zeroSuccess-o.zeroSuccess)[0]}}var Z=class{constructor(e){this.app=e}showMenuModal(){let e=this.app.i18n,s=e.lang==="he",t=this.app.session.simplifiedMode,i=M.getRecentGames(),r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
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
    `,document.body.appendChild(r);let n=()=>r.remove();r.querySelectorAll(".modal-close").forEach(l=>l.addEventListener("click",n)),r.querySelector("#menu-opt-toggle-lang").addEventListener("click",()=>{n(),this.app.setLanguage(s?"en":"he")}),r.querySelector("#menu-opt-home-lobby").addEventListener("click",()=>{n(),this.app.showLandingView()}),r.querySelector("#menu-opt-baseline").addEventListener("click",()=>{n(),this.showBaselineModal()}),r.querySelector("#menu-opt-saved-games").addEventListener("click",()=>{n(),this.showSavedGamesModal()}),r.querySelector("#menu-opt-edit-players").addEventListener("click",()=>{n(),this.showEditSettingsModal()}),r.querySelector("#menu-opt-toggle-mode").addEventListener("click",()=>{this.app.session.setSimplifiedMode(!this.app.session.simplifiedMode),n()}),r.querySelector("#menu-opt-new-game").addEventListener("click",()=>{n(),this.showNewGameModal()}),r.querySelector("#menu-opt-share").addEventListener("click",()=>{n(),this.showShareModal()}),r.querySelector("#menu-opt-stats").addEventListener("click",()=>{n(),this.showStatsModal()}),r.querySelector("#menu-opt-export").addEventListener("click",()=>{n(),this.showExportModal()})}showReorganizeSeatingModal(e=null){let s=this.app.i18n,t=this.app.session,i=e!==null?e:null,r=document.createElement("div");r.className="modal-overlay";let n=()=>{let l=d=>t.currentDealerIndex===d;r.innerHTML=`
        <div class="modal-box" style="max-width: 460px;">
          <div class="modal-head">
            <div>
              <h3 style="font-size: 1.1rem; font-weight: 700;">${s.reorganizeTitle}</h3>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${s.reorganizeSub}</div>
            </div>
            <button class="btn-pill modal-close">\u2715</button>
          </div>

          <!-- Circular Seating Table 2x2 Grid -->
          <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1rem 0.75rem; margin: 0.75rem 0; position: relative;">
            
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(99, 102, 241, 0.12); border: 1px dashed rgba(99, 102, 241, 0.35); border-radius: 50%; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; color: #a5b4fc; text-align: center; pointer-events: none;">
              TABLE<br>\u21BB
            </div>

            <div class="leaderboard-grid seating-modal-grid" style="margin-bottom: 0;">
              ${t.players.map((d,c)=>{let p=i===c,h=l(c);return`
                  <div class="player-card seat-swap-card ${p?"seat-selected":""} ${h?"is-dealer":""}" 
                       data-seat-idx="${c}" 
                       style="cursor: pointer; transition: all 0.18s ease; ${p?"border: 2px solid #fbbf24; background: rgba(251, 191, 36, 0.15); transform: scale(1.04);":""}">
                    ${h?`<span class="tag-dealer">${s.dealer.toUpperCase()}</span>`:""}
                    <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; margin-bottom: 2px;">
                      ${s.seatNumber} #${c+1}
                    </div>
                    <div class="player-title" style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">
                      <span class="player-dot" style="background: ${d.color}; width: 9px; height: 9px;"></span>
                      <span>${d.name}</span>
                    </div>
                    <div style="font-size: 0.72rem; color: ${p?"#fde68a":"var(--accent-primary)"}; font-weight: 700; margin-top: 4px;">
                      ${p?"\u2713 Selected":"Tap to Swap"}
                    </div>
                  </div>
                `}).join("")}
            </div>
          </div>

          <!-- Swap Hint Banner -->
          <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.75rem; text-align: center; color: #c7d2fe; margin-bottom: 0.85rem;">
            ${i!==null?`${s.tapToSwap} <strong>${t.players[i].name}</strong>`:s.swapSeatsHint}
          </div>

          <!-- 1-Tap Table Rotation Controls -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; margin-bottom: 0.85rem;">
            <button class="btn-outline" id="btn-rot-ccw" style="font-size: 0.78rem; min-height: 38px;">
              ${s.rotateCounterClockwise}
            </button>
            <button class="btn-outline" id="btn-rot-cw" style="font-size: 0.78rem; min-height: 38px;">
              ${s.rotateClockwise}
            </button>
          </div>

          <button class="btn-block modal-close">
            ${s.doneSeating}
          </button>
        </div>
      `,r.querySelectorAll(".modal-close").forEach(d=>d.addEventListener("click",()=>r.remove())),r.querySelectorAll(".seat-swap-card").forEach(d=>{d.addEventListener("click",()=>{if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(15)}catch{}let c=parseInt(d.dataset.seatIdx,10);i===null?(i=c,n()):i===c?(i=null,n()):(t.swapPlayers(i,c),i=null,n())})});let a=r.querySelector("#btn-rot-cw");a&&a.addEventListener("click",()=>{if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(15)}catch{}t.rotateSeatingClockwise(),n()});let o=r.querySelector("#btn-rot-ccw");o&&o.addEventListener("click",()=>{if(typeof navigator<"u"&&navigator.vibrate)try{navigator.vibrate(15)}catch{}t.rotateSeatingCounterClockwise(),n()})};n(),document.body.appendChild(r)}showSavedGamesModal(){let e=this.app.i18n,s=e.lang==="he",t=M.getRecentGames(),i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
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
            ${t.map((n,l)=>{let a=M.formatTimestamp(n.updatedAt||n.createdAt),o=this.app.syncManager&&this.app.syncManager.roomId===n.roomId;return`
                <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid ${o?"var(--accent-primary)":"var(--border-subtle)"}; border-radius: var(--radius-md); padding: 0.75rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="room-pill" style="font-size: 0.7rem;">${n.roomId}</span>
                      <span style="font-size: 0.72rem; color: var(--text-secondary);">${a}</span>
                      ${o?`<span style="font-size: 0.65rem; background: var(--accent-primary); color: white; padding: 1px 5px; border-radius: 4px; font-weight: 800;">${e.currentGame}</span>`:""}
                    </div>
                    <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted);">
                      ${n.completedRoundsCount} ${e.deals}
                    </span>
                  </div>

                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem;">
                    ${n.players.map(d=>`
                      <span style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.75rem; display: inline-flex; align-items: center; gap: 3px;">
                        <span class="player-dot" style="background: ${d.color};"></span>
                        <span>${d.name}:</span>
                        <strong class="signed-score" dir="ltr" style="color: ${d.score>=0?"var(--success)":"var(--danger)"}; direction: ltr; unicode-bidi: isolate;">${d.score>=0?"+":""}${d.score}</strong>
                      </span>
                    `).join("")}
                  </div>

                  <div style="display: flex; gap: 0.4rem; justify-content: flex-end;">
                    <button class="btn-pill btn-delete-game" data-room-id="${n.roomId}" style="color: var(--danger); border-color: rgba(239, 68, 68, 0.3); font-size: 0.72rem;">
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
    `,document.body.appendChild(i);let r=()=>i.remove();i.querySelectorAll(".modal-close").forEach(n=>n.addEventListener("click",r)),i.querySelectorAll(".btn-resume-game").forEach(n=>{n.addEventListener("click",()=>{let l=parseInt(n.dataset.gameIdx,10),a=t[l];a&&(this.app.resumeGameFromArchive(a),r())})}),i.querySelectorAll(".btn-delete-game").forEach(n=>{n.addEventListener("click",l=>{l.stopPropagation();let a=n.dataset.roomId;confirm(`${e.deleteConfirm} (${a})`)&&(M.deleteGame(a),r(),this.showSavedGamesModal())})})}showEditSettingsModal(e=null){let s=this.app.i18n,t=s.lang==="he",i=this.app.session,r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.1rem; font-weight: 700;">${s.editTitle}</h3>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
          ${s.playerNames}
        </div>
        <div class="modal-players-grid" style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1rem;">
          ${i.players.map((l,a)=>`
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="player-dot" style="background: ${l.color};"></span>
              <input type="text" class="input-field edit-player-name-input" data-p-idx="${a}" value="${l.name}" placeholder="${t?`\u05E9\u05D7\u05E7\u05DF ${a+1}`:`Player ${a+1}`}" style="margin-bottom:0;" />
            </div>
          `).join("")}
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${s.currentDealer}
        </div>
        <select class="select-field" id="edit-dealer-select" style="margin-bottom: 0.85rem;">
          ${i.players.map((l,a)=>`
            <option value="${a}" ${i.currentDealerIndex===a?"selected":""}>
              ${l.name} (${t?`\u05E9\u05D7\u05E7\u05DF ${a+1}`:`Player ${a+1}`})
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
          ${Object.values(z).map(l=>`
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
    `,document.body.appendChild(r);let n=()=>r.remove();if(r.querySelectorAll(".modal-close").forEach(l=>l.addEventListener("click",n)),e!==null){let l=r.querySelector(`.edit-player-name-input[data-p-idx="${e}"]`);l&&setTimeout(()=>{l.focus(),l.select()},100)}r.querySelector("#btn-save-settings").addEventListener("click",()=>{let l=r.querySelectorAll(".edit-player-name-input"),a=parseInt(r.querySelector("#edit-dealer-select").value,10),o=r.querySelector("#edit-mode-select").value==="SIMPLIFIED",d=r.querySelector("#edit-rule-select").value,c=r.querySelector("#chk-edit-hook").checked;i.players.forEach((p,h)=>{let m=l[h].value.trim();m&&(p.name=m)}),i.currentDealerIndex=a,i.activeRound&&(i.activeRound.dealerIndex=a,i.activeRound.leadBidderIndex=(a+1)%4),i.rules={...z[d],enforceHookRule:c},i.setSimplifiedMode(o),i.notify(),n()})}showShareModal(){let e=this.app.i18n,s=this.app.syncManager;this.app.session&&(this.app.archiveCurrentGame(),s&&s.broadcastLocalState());let t=s?s.getShareUrl():window.location.href,i=s?s.roomId:"Local",r=`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(t)}`,n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
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
              <img src="${r}" alt="Game QR Code" width="150" height="150" style="display: block;" />
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
    `,document.body.appendChild(n);let l=()=>n.remove();n.querySelectorAll(".modal-close").forEach(o=>o.addEventListener("click",l)),n.querySelector("#btn-copy-url").addEventListener("click",()=>{navigator.clipboard.writeText(t);let o=n.querySelector("#btn-copy-url");o.textContent=e.copied,setTimeout(()=>o.textContent=e.copy,2e3)});let a=n.querySelector("#btn-native-share");a&&a.addEventListener("click",()=>{navigator.share({title:e.appTitle,text:`${e.shareTitle} (${i})`,url:t}).catch(()=>{})})}showNewGameModal(){let e=this.app.i18n,s=e.lang==="he",t=this.app.session,i=M.getRecentGames(),r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">${e.newGameTitle}</h3>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.85rem;">
          ${e.newGameSub}
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
          ${e.playerNames}
        </div>
        <div class="modal-players-grid" style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 0.85rem;">
          ${t.players.map((a,o)=>`
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="player-dot" style="background: ${a.color};"></span>
              <input type="text" class="input-field player-name-input" data-p-idx="${o}" value="${a.name}" placeholder="${s?`\u05E9\u05D7\u05E7\u05DF ${o+1}`:`Player ${o+1}`}" style="margin-bottom:0;" />
            </div>
          `).join("")}
        </div>

        <div style="margin-bottom: 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">
              \u{1F3AF} ${e.baselineScores}
            </div>
            <span style="font-size: 0.7rem; color: var(--text-muted);">${s?"\u05E0\u05D9\u05E7\u05D5\u05D3 \u05E4\u05EA\u05D9\u05D7\u05D4 (\u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05E0\u05DC\u05D9)":"Starting scores (optional)"}</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.45rem;">
            ${t.players.map((a,o)=>`
              <div style="display: flex; align-items: center; gap: 0.3rem; background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <span class="player-dot" style="background: ${a.color};"></span>
                <span style="font-size: 0.75rem; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${a.name}</span>
                <input type="number" class="input-field new-game-baseline-input" data-p-idx="${o}" value="0" style="width: 65px; margin-bottom: 0; padding: 4px; text-align: center; font-size: 0.8rem; font-family: monospace;" />
              </div>
            `).join("")}
          </div>
        </div>

        <div style="margin-bottom: 0.85rem; padding: 0.65rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
            <input type="checkbox" id="chk-new-game-simplified" ${t.simplifiedMode?"checked":""} style="width: 18px; height: 18px;">
            <div>
              <div style="font-size: 0.85rem; font-weight: 700;">${e.simplified}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">${s?"\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D5\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA (\u05DC\u05DC\u05D0 \u05DE\u05DB\u05E8\u05D6 \u05E9\u05DC\u05D9\u05D8)":"Direct Bids & Tricks (Skip trump & suit selection)"}</div>
            </div>
          </label>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${e.scoringRules}
        </div>
        <select class="select-field" id="new-game-rule-select">
          ${Object.values(z).map(a=>`
            <option value="${a.id}" ${s?a.nameHe:a.nameEn}
            </option>
          `).join("")}
        </select>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${e.gameLimit}
        </div>
        <select class="select-field" id="new-game-target-select">
          <option value="UNLIMITED">${e.freePlay}</option>
          <option value="13_ROUNDS">${e.deals13}</option>
          <option value="16_ROUNDS">${e.deals16}</option>
          <option value="TARGET_500">${e.target500}</option>
          <option value="TARGET_1000">${e.target1000}</option>
        </select>

        <div style="display: flex; gap: 0.4rem; margin-top: 0.85rem;">
          <button class="btn-outline modal-close" style="flex: 1;">${e.cancel}</button>
          <button class="btn-block" id="btn-start-new-game" style="flex: 1;">${e.startGame}</button>
        </div>

        ${i.length>0?`
          <div style="margin-top: 1.25rem; padding-top: 0.85rem; border-top: 1px solid var(--border-subtle); text-align: center;">
            <button class="btn-outline" id="btn-open-recent-from-new" style="font-size: 0.8rem; border-color: rgba(16, 185, 129, 0.4); color: #a7f3d0;">
              ${e.orResume} (${i.length}) \u2192
            </button>
          </div>
        `:""}
      </div>
    `,document.body.appendChild(r);let n=()=>r.remove();r.querySelectorAll(".modal-close").forEach(a=>a.addEventListener("click",n));let l=r.querySelector("#btn-open-recent-from-new");l&&l.addEventListener("click",()=>{n(),this.showSavedGamesModal()}),r.querySelector("#btn-start-new-game").addEventListener("click",()=>{let a=r.querySelectorAll(".player-name-input"),o=r.querySelector("#chk-new-game-simplified").checked,d=r.querySelector("#new-game-rule-select").value,c=r.querySelector("#new-game-target-select").value,p=t.players.map((u,S)=>({...u,name:a[S].value.trim()||u.name})),h=r.querySelectorAll(".new-game-baseline-input"),m=[];h.forEach(u=>{m.push(parseInt(u.value,10)||0)});let g=null,v=null;c==="13_ROUNDS"?g=13:c==="16_ROUNDS"?g=16:c==="TARGET_500"?v=500:c==="TARGET_1000"&&(v=1e3),this.app.startNewGame({players:p,rules:{...z[d]},maxRounds:g,targetPoints:v,simplifiedMode:o,initialScores:m}),n()})}showStatsModal(){let e=this.app.i18n,s=this.app.session,t=re(s),i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
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
          ${t.playerStats.map(n=>`
            <div style="background: rgba(0,0,0,0.2); padding: 0.6rem 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.2rem;">
                <span style="font-weight: 700; font-size: 0.82rem;">
                  <span class="player-dot" style="background: ${n.player.color};"></span>
                  ${n.player.name}
                </span>
                <span style="font-weight: 800; font-size: 0.82rem; color: ${n.hitRate>=50?"var(--success)":"var(--warning)"};">${n.hitRate}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted);">
                <span>${e.made}: ${n.madeBidsCount}/${n.totalBidsCount}</span>
                <span>${e.avgTricksPerDeal}: ${n.avgTricksPerRound}</span>
                <span>${e.passSuccess}: ${n.passSuccess}/${n.passAttempts}</span>
              </div>
            </div>
          `).join("")}
        </div>

        <button class="btn-block modal-close">
          ${e.done}
        </button>
      </div>
    `,document.body.appendChild(i);let r=()=>i.remove();i.querySelectorAll(".modal-close").forEach(n=>n.addEventListener("click",r))}showExportModal(){let e=this.app.i18n,s=this.app.session,t=s.exportJson(),i=s.getRankings(),r=`Israeli Whist Match Results
`;r+=`Rounds: ${s.completedRounds.length}

`,i.forEach((a,o)=>{r+=`#${o+1} ${a.player.name}: ${a.score>=0?"+":""}${a.score} pts
`});let n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">${e.exportShare}</h3>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div style="margin-bottom: 0.85rem;">
          <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.3rem;">Text Summary</label>
          <textarea class="input-field" id="txt-share-summary" rows="5" readonly style="font-family: monospace; font-size: 0.78rem; resize: none;">${r}</textarea>
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
    `,document.body.appendChild(n);let l=()=>n.remove();n.querySelectorAll(".modal-close").forEach(a=>a.addEventListener("click",l)),n.querySelector("#btn-copy-share").addEventListener("click",()=>{navigator.clipboard.writeText(r),alert(e.copied||"Copied to clipboard.")}),n.querySelector("#btn-copy-json").addEventListener("click",()=>{navigator.clipboard.writeText(t),alert(e.copied||"JSON copied to clipboard.")})}showBaselineModal(){let e=this.app.i18n,s=e.lang==="he",t=this.app.session,i=t.initialScores||[0,0,0,0],r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
      <div class="modal-box" style="max-width: 400px;">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">\u{1F3AF} ${e.baselineScores}</h3>
          <button class="btn-pill modal-close">\u2715</button>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.4;">
          ${e.baselineDesc}
        </div>

        <div class="baseline-inputs-grid" style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.25rem;">
          ${t.players.map((l,a)=>`
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="player-dot" style="background: ${l.color};"></span>
                <span style="font-weight: 700; font-size: 0.9rem;">${l.name}</span>
              </div>
              <input type="number" class="input-field baseline-score-input" data-p-idx="${a}" value="${i[a]||0}" style="width: 90px; text-align: center; margin-bottom: 0; font-weight: 700; font-size: 0.95rem; font-family: monospace;" />
            </div>
          `).join("")}
        </div>

        <div style="display: flex; gap: 0.4rem;">
          <button class="btn-outline modal-close" style="flex: 1;">${e.cancel}</button>
          <button class="btn-block" id="btn-save-baseline" style="flex: 1;">${e.saveBaseline}</button>
        </div>
      </div>
    `,document.body.appendChild(r);let n=()=>r.remove();r.querySelectorAll(".modal-close").forEach(l=>l.addEventListener("click",n)),r.querySelector("#btn-save-baseline").addEventListener("click",()=>{let l=r.querySelectorAll(".baseline-score-input"),a=[];l.forEach(o=>{a.push(parseInt(o.value,10)||0)}),t.setInitialScores(a),n()})}showEditDealModal(e){let s=this.app.i18n,t=s.lang==="he",i=this.app.session;if(e<0||e>=i.completedRounds.length)return;let r=i.completedRounds[e],n=[...r.bets],l=[...r.tricks],a=r.dealerIndex,o=document.createElement("div");o.className="modal-overlay";let d=()=>{let m=l.reduce((x,w)=>x+(parseInt(w,10)||0),0),g=n.reduce((x,w)=>x+(parseInt(w,10)||0),0),v=r.trump&&r.trump.isPasRound,u=x=>!r.simplified&&r.trump&&r.trump.winnerIndex===x,S=[];for(let x=0;x<4;x++){let w=parseInt(n[x],10)||0,y=parseInt(l[x],10)||0,I=j(w,y,u(x),v,i.rules,g);S.push(I)}return{sumTricks:m,sumBets:g,playerScores:S}},c=()=>{let{sumTricks:m,sumBets:g,playerScores:v}=d(),u=o.querySelector("#edit-tricks-sum-badge"),S=o.querySelector("#edit-bets-sum-badge"),x=o.querySelector("#edit-hook-warning"),w=o.querySelector("#btn-save-edit-deal");if(u&&(u.textContent=`${t?"\u05E1\u05DA \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA":"Tricks"}: ${m}/13`,m===13?(u.style.background="rgba(16, 185, 129, 0.2)",u.style.color="#a7f3d0",u.style.borderColor="rgba(16, 185, 129, 0.4)"):(u.style.background="rgba(239, 68, 68, 0.2)",u.style.color="#fca5a5",u.style.borderColor="rgba(239, 68, 68, 0.4)")),S&&(S.textContent=`${t?"\u05E1\u05DA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA":"Bids"}: ${g}`),x&&(g===13&&i.rules.enforceHookRule?x.style.display="block":x.style.display="none"),v.forEach((y,I)=>{let E=o.querySelector(`.edit-p-score-${I}`);if(E){let C=y.score>=0?`+${y.score}`:`${y.score}`;E.textContent=C,E.style.color=y.made?"var(--success)":"var(--danger)"}}),w){let y=m===13;w.disabled=!y,w.style.opacity=y?"1":"0.4",w.style.cursor=y?"pointer":"not-allowed"}};o.innerHTML=`
      <div class="modal-box modal-box-wide">
        <div class="modal-head">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700;">
              ${s.editDealTitle.replace("{num}",r.roundNumber)}
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
            ${i.players.map((m,g)=>`
              <option value="${g}" ${g===a?"selected":""}>${m.name}</option>
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
          ${i.players.map((m,g)=>`
            <div class="edit-deal-player-row" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 6px; min-width: 85px; flex: 1;">
                <span class="player-dot" style="background: ${m.color};"></span>
                <span style="font-size: 0.85rem; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${m.name}</span>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">B:</span>
                  <input type="number" min="0" max="13" class="input-field edit-deal-bid" data-p-idx="${g}" value="${n[g]}" style="width: 48px; margin-bottom: 0; padding: 4px; text-align: center; font-size: 0.85rem; font-weight: 700;" />
                </div>

                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">T:</span>
                  <input type="number" min="0" max="13" class="input-field edit-deal-trick" data-p-idx="${g}" value="${l[g]}" style="width: 48px; margin-bottom: 0; padding: 4px; text-align: center; font-size: 0.85rem; font-weight: 700;" />
                </div>

                <div class="edit-p-score-${g} signed-score" dir="ltr" style="min-width: 45px; text-align: center; font-size: 0.85rem; font-weight: 800; direction: ltr; unicode-bidi: isolate;">
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
    `,document.body.appendChild(o);let p=()=>o.remove();o.querySelectorAll(".modal-close").forEach(m=>m.addEventListener("click",p)),o.querySelectorAll(".edit-deal-bid").forEach(m=>{m.addEventListener("input",g=>{let v=parseInt(g.target.dataset.pIdx,10),u=parseInt(g.target.value,10);isNaN(u)&&(u=0),u<0&&(u=0),u>13&&(u=13),n[v]=u,c()})}),o.querySelectorAll(".edit-deal-trick").forEach(m=>{m.addEventListener("input",g=>{let v=parseInt(g.target.dataset.pIdx,10),u=parseInt(g.target.value,10);isNaN(u)&&(u=0),u<0&&(u=0),u>13&&(u=13),l[v]=u,c()})});let h=o.querySelector("#edit-deal-dealer");h&&h.addEventListener("change",m=>{a=parseInt(m.target.value,10)}),o.querySelector("#btn-save-edit-deal").addEventListener("click",()=>{let{sumTricks:m}=d();if(m!==13){alert(s.invalidTricksSum.replace("{sum}",m));return}i.editCompletedRound(e,{bets:n,tricks:l,dealerIndex:a}),p()}),o.querySelector("#btn-delete-deal").addEventListener("click",()=>{confirm(s.deleteDealConfirm.replace("{num}",r.roundNumber))&&(i.deleteCompletedRound(e),p())}),c()}};var te={lang:"en",dir:"ltr",appName:"Whist",appTitle:"Israeli Whist Scorekeeper",landingSubtitle:"Real-time multiplayer scoring, 1-tap bidding, automatic dealer rotation & statistics.",startNewMatch:"\u{1F3B2} Start New Match",joinRoom:"Join \u2192",roomCodePlaceholder:"Enter Room Code (e.g. W-KY9G)",recentMatches:"Recent Matches",resumeMatch:"Resume Match \u2192",quickRulesTitle:"\u{1F4D6} Quick Rules & Scoring Summary",lobby:"\u{1F3E0} Lobby",share:"Share",menu:"Menu \u2630",tabActiveDeal:"Active Deal",tabHistory:"History",tabChart:"Chart",simplified:"\u26A1 Simplified",fullTrump:"Full Trump",deal:"Deal",dealer:"Dealer",lead:"Lead",trumpMaker:"Trump Maker",lastBidder:"Last Bidder",bid:"Bid",tricks:"Tricks",stageTrump:"1. Trump Auction",stageBets:"1. Player Bids",stageBetsFull:"2. Player Bids",stageTricks:"2. Actual Tricks",stageTricksFull:"3. Actual Tricks",auctionWinner:"1. Auction Winner",denomination:"2. Denomination / Suit",winningTarget:"3. Winning Target (Tricks)",pasRound:"All 4 Passed (Pas Round)",confirmTrump:"Confirm Trump & Enter Bids \u2192",editTrump:"Edit Trump",totalBids:"Total Bids",hookViolation:"\u26A0\uFE0F Total equals 13 (Hook Violation). Total bids must be \u2260 13 to proceed.",lastBidderCannotBid:"cannot bid",enterTricksBtn:"Enter Actual Tricks \u2192",tricksValid:"\u2713 13 Tricks Total",remainingToAssign:"Remaining to Assign",autoFillBids:"\u26A1 Auto-Fill Bids",exact:"\u2713 Exact",editBids:"\u2190 Edit Bids",calculateNextDeal:"Calculate & Next Deal \u2713",roundScoreCalc:"Round Score Calculation",rank:"Rank",noDeals:"No Deals Recorded",noDealsSub:"Start Deal 1 above to record score history.",historyTitle:"History",deals:"Deals",undoLastDeal:"Undo Last Deal",undoConfirm:"Undo the last completed deal?",dragToReorder:"Drag player cards to swap seats",doneReordering:"Done \u2713",menuTitle:"Menu & Settings",reorganizeSeating:"\u{1FA91} Reorganize Seating",reorganizeDesc:"Long press player card or drag to swap seats",editPlayersSettings:"\u270F\uFE0F Edit Players & Settings",editPlayersDesc:"Rename players, change dealer, or adjust rules",modeToggleTitle:"Mode",savedGames:"\u{1F4C2} Saved Games",savedGamesDesc:"Resume previous matches with date & scores",statsAccuracy:"\u{1F4CA} Player Stats & Accuracy",exportShare:"\u{1F4E4} Export / Share Text",startNewGameMenu:"\u{1F3B2} Start New Game",returnToLobby:"\u{1F3E0} Return to Lobby / Home",close:"Close",done:"Done",cancel:"Cancel",saveChanges:"Save Changes \u2713",reorganizeTitle:"Reorganize Player Seating",reorganizeSub:"Drag & drop or tap two players to swap seats, or rotate clockwise.",rotateClockwise:"\u21BB Rotate Clockwise",rotateCounterClockwise:"\u21BA Counter-Clockwise",swapSeatsHint:"Drag a player or tap any two to swap seats",seatNumber:"Seat",doneSeating:"Save Seating \u2713",tapToSwap:"Tap to swap with",editTitle:"Edit Players & Settings",playerNames:"Player Names",currentDealer:"Current Dealer",gameMode:"Game Mode",simplifiedOpt:"\u26A1 Simplified (Direct Bids & Tricks)",fullOpt:"\u{1F3B4} Full (With Trump Auction & Suits)",scoringRules:"Scoring Rules Preset",enforceHook:"Enforce Hook Rule (Total Bets \u2260 13)",newGameTitle:"New Game Session",newGameSub:"Configure players and start a fresh deal.",gameLimit:"Game Limit",freePlay:"Free Play (Unlimited Deals)",deals13:"13 Deals",deals16:"16 Deals (4 Deals per Player)",target500:"First to 500 Points",target1000:"First to 1000 Points",startGame:"Start Game",orResume:"\u{1F4C2} Or Resume from Saved Games",shareTitle:"Share Game Session",shareSub:"Real-time live multi-device sync",scanQr:"Scan QR code with phone camera to join",shareUrlLabel:"Direct Shareable URL",copy:"Copy",copied:"Copied!",shareMobile:"Share (Mobile)",gameStats:"Game Statistics",over:"Over",under:"Under",playerAccuracy:"Player Accuracy",made:"Made",avgTricksPerDeal:"Avg Tricks",zeroSuccess:"Zero",passSuccess:"Zero",noSavedGames:"No Saved Games Yet",noSavedGamesSub:"Completed and active games will automatically appear here.",deleteConfirm:"Remove room from saved games?",delete:"Delete",currentGame:"Current Game",editDeal:"Edit Deal",editDealTitle:"Edit Deal #{num}",editDealSub:"Modify bids, tricks, and dealer. All subsequent totals will recalculate automatically.",saveDeal:"Save & Recalculate \u2713",baselineScores:"Baseline / Starting Scores",baselineDesc:"Set custom starting scores to continue a game recorded elsewhere.",setBaseline:"Set Baseline",baselineRow:"Baseline",saveBaseline:"Save Baseline \u2713",invalidTricksSum:"Sum of tricks must equal 13 (currently {sum})",hookWarning:"Total bids cannot equal 13 (Hook rule)",deleteDeal:"Delete Deal",deleteDealConfirm:"Are you sure you want to delete Deal #{num}? All subsequent totals will recalculate.",switchLang:"\u05E2\u05D1\u05E8\u05D9\u05EA"};var se={lang:"he",dir:"rtl",appName:"\u05D5\u05D5\u05D9\u05E1\u05D8",appTitle:"\u05DC\u05D5\u05D7 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D5\u05D5\u05D9\u05E1\u05D8 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9",landingSubtitle:"\u05E8\u05D9\u05E9\u05D5\u05DD \u05E0\u05D9\u05E7\u05D5\u05D3 \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA \u05DC\u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05DE\u05E8\u05D5\u05D1\u05D9\u05DD, \u05D4\u05D6\u05E0\u05EA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D1\u05DC\u05D7\u05D9\u05E6\u05D4 \u05D0\u05D7\u05EA, \u05E1\u05D9\u05D1\u05D5\u05D1 \u05DE\u05D7\u05DC\u05E7 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9 \u05D5\u05E1\u05D8\u05D8\u05D9\u05E1\u05D8\u05D9\u05E7\u05D4.",startNewMatch:"\u{1F3B2} \u05D4\u05EA\u05D7\u05DC \u05DE\u05E9\u05D7\u05E7 \u05D7\u05D3\u05E9",joinRoom:"\u05D4\u05E6\u05D8\u05E8\u05E3 \u2190",roomCodePlaceholder:"\u05D4\u05D6\u05DF \u05E7\u05D5\u05D3 \u05D7\u05D3\u05E8 (\u05DC\u05D3\u05D5\u05D2\u05DE\u05D4: W-KY9G)",recentMatches:"\u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",resumeMatch:"\u05D4\u05DE\u05E9\u05DA \u05DE\u05E9\u05D7\u05E7 \u2190",quickRulesTitle:"\u{1F4D6} \u05D7\u05D5\u05E7\u05D9 \u05D4\u05DE\u05E9\u05D7\u05E7 \u05D5\u05E9\u05D9\u05D8\u05EA \u05D4\u05E0\u05D9\u05E7\u05D5\u05D3",lobby:"\u{1F3E0} \u05DC\u05D5\u05D1\u05D9",share:"\u05E9\u05D9\u05EA\u05D5\u05E3",menu:"\u05EA\u05E4\u05E8\u05D9\u05D8 \u2630",tabActiveDeal:"\u05E1\u05D9\u05D1\u05D5\u05D1 \u05E4\u05E2\u05D9\u05DC",tabHistory:"\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4",tabChart:"\u05EA\u05E8\u05E9\u05D9\u05DD",simplified:"\u26A1 \u05DE\u05E4\u05D5\u05E9\u05D8",fullTrump:"\u05DE\u05DB\u05E8\u05D6 \u05E9\u05DC\u05D9\u05D8 \u05DE\u05DC\u05D0",deal:"\u05E1\u05D9\u05D1\u05D5\u05D1",dealer:"\u05DE\u05D7\u05DC\u05E7",lead:"\u05E8\u05D0\u05E9\u05D5\u05DF",trumpMaker:"\u05E7\u05D5\u05D1\u05E2 \u05D4\u05E9\u05DC\u05D9\u05D8",lastBidder:"\u05DE\u05DB\u05E8\u05D9\u05D6 \u05D0\u05D7\u05E8\u05D5\u05DF",bid:"\u05D4\u05DB\u05E8\u05D6\u05D4",tricks:"\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA",stageTrump:"1. \u05DE\u05DB\u05E8\u05D6 \u05E9\u05DC\u05D9\u05D8",stageBets:"1. \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD",stageBetsFull:"2. \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD",stageTricks:"2. \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D1\u05E4\u05D5\u05E2\u05DC",stageTricksFull:"3. \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D1\u05E4\u05D5\u05E2\u05DC",auctionWinner:"1. \u05D6\u05D5\u05DB\u05D4 \u05D1\u05DE\u05DB\u05E8\u05D6",denomination:"2. \u05E1\u05D3\u05E8\u05D4 / \u05E9\u05DC\u05D9\u05D8",winningTarget:"3. \u05D9\u05E2\u05D3 \u05D6\u05DB\u05D9\u05D9\u05D4 (\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA)",pasRound:"\u05DB\u05DC \u05D4-4 \u05D0\u05DE\u05E8\u05D5 \u05E4\u05D0\u05E1 (\u05E1\u05D9\u05D1\u05D5\u05D1 \u05E4\u05D0\u05E1)",confirmTrump:"\u05D0\u05E9\u05E8 \u05E9\u05DC\u05D9\u05D8 \u05D5\u05E2\u05D1\u05D5\u05E8 \u05DC\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u2190",editTrump:"\u05E2\u05E8\u05D5\u05DA \u05E9\u05DC\u05D9\u05D8",totalBids:"\u05E1\u05DA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA",hookViolation:"\u26A0\uFE0F \u05E1\u05DA \u05D4\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D4\u05D5\u05D0 \u05D1\u05D3\u05D9\u05D5\u05E7 13 (\u05D7\u05D5\u05E7 \u05D4\u05DE\u05D7\u05DC\u05E7). \u05D9\u05E9 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05D4\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05DB\u05D3\u05D9 \u05DC\u05D4\u05DE\u05E9\u05D9\u05DA.",lastBidderCannotBid:"\u05DC\u05D0 \u05D9\u05DB\u05D5\u05DC \u05DC\u05D4\u05DB\u05E8\u05D9\u05D6",enterTricksBtn:"\u05D4\u05D6\u05DF \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D1\u05E4\u05D5\u05E2\u05DC \u2190",tricksValid:"\u2713 13 \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D1\u05E1\u05DA \u05D4\u05DB\u05DC",remainingToAssign:"\u05E0\u05D5\u05EA\u05E8\u05D5 \u05DC\u05D7\u05DC\u05D5\u05E7\u05D4",autoFillBids:"\u26A1 \u05DE\u05D9\u05DC\u05D5\u05D9 \u05DC\u05E4\u05D9 \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA",exact:"\u2713 \u05DE\u05D3\u05D5\u05D9\u05E7",editBids:"\u2190 \u05E2\u05E8\u05D5\u05DA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA",calculateNextDeal:"\u05D7\u05E9\u05D1 \u05E0\u05D9\u05E7\u05D5\u05D3 \u05D5\u05E1\u05D9\u05D1\u05D5\u05D1 \u05D4\u05D1\u05D0 \u2713",roundScoreCalc:"\u05D7\u05D9\u05E9\u05D5\u05D1 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D4\u05E1\u05D9\u05D1\u05D5\u05D1",rank:"\u05DE\u05E7\u05D5\u05DD",noDeals:"\u05D8\u05E8\u05DD \u05E0\u05E8\u05E9\u05DE\u05D5 \u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD",noDealsSub:"\u05D4\u05EA\u05D7\u05DC \u05D0\u05EA \u05E1\u05D9\u05D1\u05D5\u05D1 1 \u05DC\u05DE\u05E2\u05DC\u05D4 \u05DB\u05D3\u05D9 \u05DC\u05E8\u05E9\u05D5\u05DD \u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D9\u05EA \u05E0\u05D9\u05E7\u05D5\u05D3.",historyTitle:"\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4",deals:"\u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD",undoLastDeal:"\u05D1\u05D8\u05DC \u05E1\u05D9\u05D1\u05D5\u05D1 \u05D0\u05D7\u05E8\u05D5\u05DF",undoConfirm:"\u05DC\u05D1\u05D8\u05DC \u05D0\u05EA \u05D4\u05E1\u05D9\u05D1\u05D5\u05D1 \u05D4\u05D0\u05D7\u05E8\u05D5\u05DF \u05E9\u05D4\u05D5\u05E9\u05DC\u05DD?",dragToReorder:"\u05D2\u05E8\u05D5\u05E8 \u05DB\u05E8\u05D8\u05D9\u05E1 \u05E9\u05D7\u05E7\u05DF \u05DC\u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05E7\u05D5\u05DD \u05D9\u05E9\u05D9\u05D1\u05D4",doneReordering:"\u05E1\u05D9\u05D5\u05DD \u2713",menuTitle:"\u05EA\u05E4\u05E8\u05D9\u05D8 \u05D5\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA",reorganizeSeating:"\u{1FA91} \u05E1\u05D9\u05D3\u05D5\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA \u05D9\u05E9\u05D9\u05D1\u05D4",reorganizeDesc:"\u05DC\u05D7\u05D9\u05E6\u05D4 \u05D0\u05E8\u05D5\u05DB\u05D4 \u05E2\u05DC \u05E9\u05D7\u05E7\u05DF \u05D5\u05D2\u05E8\u05D9\u05E8\u05D4 \u05DC\u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA",editPlayersSettings:"\u270F\uFE0F \u05E2\u05E8\u05D9\u05DB\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05D5\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA",editPlayersDesc:"\u05E9\u05D9\u05E0\u05D5\u05D9 \u05E9\u05DE\u05D5\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD, \u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05D7\u05DC\u05E7 \u05D0\u05D5 \u05D4\u05EA\u05D0\u05DE\u05EA \u05D7\u05D5\u05E7\u05D9\u05DD",modeToggleTitle:"\u05DE\u05E6\u05D1 \u05DE\u05E9\u05D7\u05E7",savedGames:"\u{1F4C2} \u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05E9\u05DE\u05D5\u05E8\u05D9\u05DD",savedGamesDesc:"\u05D4\u05DE\u05E9\u05DA \u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05E7\u05D5\u05D3\u05DE\u05D9\u05DD \u05E2\u05DD \u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05E0\u05D9\u05E7\u05D5\u05D3",statsAccuracy:"\u{1F4CA} \u05E1\u05D8\u05D8\u05D9\u05E1\u05D8\u05D9\u05E7\u05D4 \u05D5\u05D3\u05D9\u05D5\u05E7",exportShare:"\u{1F4E4} \u05D9\u05D9\u05E6\u05D5\u05D0 / \u05E9\u05D9\u05EA\u05D5\u05E3 \u05D8\u05E7\u05E1\u05D8",startNewGameMenu:"\u{1F3B2} \u05D4\u05EA\u05D7\u05DC \u05DE\u05E9\u05D7\u05E7 \u05D7\u05D3\u05E9",returnToLobby:"\u{1F3E0} \u05D7\u05D6\u05E8\u05D4 \u05DC\u05DC\u05D5\u05D1\u05D9 \u05D4\u05E8\u05D0\u05E9\u05D9",close:"\u05E1\u05D2\u05D5\u05E8",done:"\u05E1\u05D9\u05D5\u05DD",cancel:"\u05D1\u05D9\u05D8\u05D5\u05DC",saveChanges:"\u05E9\u05DE\u05D5\u05E8 \u05E9\u05D9\u05E0\u05D5\u05D9\u05D9\u05DD \u2713",reorganizeTitle:"\u05E1\u05D9\u05D3\u05D5\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA \u05D9\u05E9\u05D9\u05D1\u05D4",reorganizeSub:"\u05D2\u05E8\u05D5\u05E8 \u05D5\u05E9\u05D7\u05E8\u05E8 \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05DC\u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA, \u05D0\u05D5 \u05E1\u05D5\u05D1\u05D1 \u05E2\u05DD \u05D4\u05E9\u05E2\u05D5\u05DF.",rotateClockwise:"\u21BB \u05E1\u05D9\u05D1\u05D5\u05D1 \u05E2\u05DD \u05D4\u05E9\u05E2\u05D5\u05DF",rotateCounterClockwise:"\u21BA \u05E0\u05D2\u05D3 \u05D4\u05E9\u05E2\u05D5\u05DF",swapSeatsHint:"\u05D2\u05E8\u05D5\u05E8 \u05E9\u05D7\u05E7\u05DF \u05D0\u05D5 \u05D4\u05E7\u05E9 \u05E2\u05DC \u05E9\u05E0\u05D9\u05D9\u05DD \u05DC\u05D4\u05D7\u05DC\u05E4\u05EA \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA",seatNumber:"\u05DE\u05E7\u05D5\u05DD",doneSeating:"\u05E9\u05DE\u05D5\u05E8 \u05E1\u05D9\u05D3\u05D5\u05E8 \u05DE\u05E7\u05D5\u05DE\u05D5\u05EA \u2713",tapToSwap:"\u05D4\u05E7\u05E9 \u05DC\u05D4\u05D7\u05DC\u05E4\u05D4 \u05E2\u05DD",editTitle:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05D5\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA",playerNames:"\u05E9\u05DE\u05D5\u05EA \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD",currentDealer:"\u05DE\u05D7\u05DC\u05E7 \u05E0\u05D5\u05DB\u05D7\u05D9",gameMode:"\u05DE\u05E6\u05D1 \u05DE\u05E9\u05D7\u05E7",simplifiedOpt:"\u26A1 \u05DE\u05E4\u05D5\u05E9\u05D8 (\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D5\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA)",fullOpt:"\u{1F3B4} \u05DE\u05DC\u05D0 (\u05DB\u05D5\u05DC\u05DC \u05DE\u05DB\u05E8\u05D6 \u05E9\u05DC\u05D9\u05D8 \u05D5\u05E1\u05D3\u05E8\u05D5\u05EA)",scoringRules:"\u05E2\u05E8\u05DB\u05EA \u05D7\u05D5\u05E7\u05D9 \u05E0\u05D9\u05E7\u05D5\u05D3",enforceHook:"\u05D0\u05DB\u05D5\u05E3 \u05D0\u05EA \u05D7\u05D5\u05E7 \u05D4\u05DE\u05D7\u05DC\u05E7 (\u05E1\u05DA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u2260 13)",newGameTitle:"\u05DE\u05E9\u05D7\u05E7 \u05D7\u05D3\u05E9",newGameSub:"\u05D4\u05D2\u05D3\u05E8 \u05D0\u05EA \u05D4\u05E9\u05D7\u05E7\u05E0\u05D9\u05DD \u05D5\u05D4\u05EA\u05D7\u05DC \u05E1\u05D9\u05D1\u05D5\u05D1 \u05E8\u05D0\u05E9\u05D5\u05DF.",gameLimit:"\u05D4\u05D2\u05D1\u05DC\u05EA \u05DE\u05E9\u05D7\u05E7",freePlay:"\u05DE\u05E9\u05D7\u05E7 \u05D7\u05D5\u05E4\u05E9\u05D9 (\u05DC\u05DC\u05D0 \u05D4\u05D2\u05D1\u05DC\u05EA \u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD)",deals13:"13 \u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD",deals16:"16 \u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD (4 \u05DC\u05DB\u05DC \u05E9\u05D7\u05E7\u05DF)",target500:"\u05D4\u05E8\u05D0\u05E9\u05D5\u05DF \u05DC-500 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA",target1000:"\u05D4\u05E8\u05D0\u05E9\u05D5\u05DF \u05DC-1000 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA",startGame:"\u05D4\u05EA\u05D7\u05DC \u05DE\u05E9\u05D7\u05E7",orResume:"\u{1F4C2} \u05D0\u05D5 \u05D4\u05DE\u05E9\u05DA \u05DE\u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05E9\u05DE\u05D5\u05E8\u05D9\u05DD",shareTitle:"\u05E9\u05D9\u05EA\u05D5\u05E3 \u05D7\u05D3\u05E8 \u05DE\u05E9\u05D7\u05E7",shareSub:"\u05E1\u05E0\u05DB\u05E8\u05D5\u05DF \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA \u05D1\u05D9\u05DF \u05DE\u05DB\u05E9\u05D9\u05E8\u05D9\u05DD \u05DE\u05E8\u05D5\u05D1\u05D9\u05DD",scanQr:"\u05E1\u05E8\u05D5\u05E7 \u05D0\u05EA \u05E7\u05D5\u05D3 \u05D4-QR \u05D1\u05DE\u05E6\u05DC\u05DE\u05EA \u05D4\u05D8\u05DC\u05E4\u05D5\u05DF \u05DB\u05D3\u05D9 \u05DC\u05D4\u05E6\u05D8\u05E8\u05E3",shareUrlLabel:"\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D9\u05E9\u05D9\u05E8 \u05DC\u05E9\u05D9\u05EA\u05D5\u05E3",copy:"\u05D4\u05E2\u05EA\u05E7",copied:"\u05D4\u05D5\u05E2\u05EA\u05E7!",shareMobile:"\u05E9\u05EA\u05E3 \u05D1\u05E0\u05D9\u05D9\u05D3",gameStats:"\u05E1\u05D8\u05D8\u05D9\u05E1\u05D8\u05D9\u05E7\u05EA \u05DE\u05E9\u05D7\u05E7",over:"\u05D0\u05D5\u05D1\u05E8 (\u05DE\u05E2\u05DC 13)",under:"\u05D0\u05E0\u05D3\u05E8 (\u05DE\u05EA\u05D7\u05EA \u05DC-13)",playerAccuracy:"\u05D3\u05D9\u05D5\u05E7 \u05E9\u05D7\u05E7\u05E0\u05D9\u05DD",made:"\u05E4\u05D2\u05D9\u05E2\u05D5\u05EA \u05DE\u05D3\u05D5\u05D9\u05E7\u05D5\u05EA",avgTricksPerDeal:"\u05DE\u05DE\u05D5\u05E6\u05E2 \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05DC\u05E1\u05D9\u05D1\u05D5\u05D1",zeroSuccess:"\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA 0 \u05DE\u05D5\u05E6\u05DC\u05D7\u05D5\u05EA",passSuccess:"\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA 0 \u05DE\u05D5\u05E6\u05DC\u05D7\u05D5\u05EA",noSavedGames:"\u05D0\u05D9\u05DF \u05E2\u05D3\u05D9\u05D9\u05DF \u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05E9\u05DE\u05D5\u05E8\u05D9\u05DD",noSavedGamesSub:"\u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05E4\u05E2\u05D9\u05DC\u05D9\u05DD \u05D5\u05E9\u05D4\u05D5\u05E9\u05DC\u05DE\u05D5 \u05D9\u05D5\u05E4\u05D9\u05E2\u05D5 \u05DB\u05D0\u05DF \u05D1\u05D0\u05D5\u05E4\u05DF \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9.",deleteConfirm:"\u05DC\u05D4\u05E1\u05D9\u05E8 \u05D0\u05EA \u05D4\u05D7\u05D3\u05E8 \u05DE\u05D4\u05DE\u05E9\u05D7\u05E7\u05D9\u05DD \u05D4\u05E9\u05DE\u05D5\u05E8\u05D9\u05DD?",delete:"\u05DE\u05D7\u05E7",currentGame:"\u05DE\u05E9\u05D7\u05E7 \u05E4\u05E2\u05D9\u05DC",editDeal:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05E1\u05D9\u05D1\u05D5\u05D1",editDealTitle:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05E1\u05D9\u05D1\u05D5\u05D1 #{num}",editDealSub:"\u05E2\u05E8\u05D9\u05DB\u05EA \u05D4\u05DB\u05E8\u05D6\u05D5\u05EA, \u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D5\u05DE\u05D7\u05DC\u05E7. \u05DB\u05DC \u05D4\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D5\u05D4\u05E1\u05D9\u05D1\u05D5\u05D1\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD \u05D9\u05D7\u05D5\u05E9\u05D1\u05D5 \u05DE\u05D7\u05D3\u05E9 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05EA.",saveDeal:"\u05E9\u05DE\u05D5\u05E8 \u05D5\u05D7\u05E9\u05D1 \u05DE\u05D7\u05D3\u05E9 \u2713",baselineScores:"\u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05EA\u05D7\u05DC\u05EA\u05D9 / \u05E4\u05EA\u05D9\u05D7\u05D4",baselineDesc:"\u05D4\u05D2\u05D3\u05E8\u05EA \u05E0\u05D9\u05E7\u05D5\u05D3 \u05D4\u05EA\u05D7\u05DC\u05EA\u05D9 \u05DC\u05DE\u05E9\u05D7\u05E7 \u05E9\u05E0\u05E8\u05E9\u05DD \u05D1\u05DE\u05E7\u05D5\u05DD \u05D0\u05D7\u05E8 \u05D5\u05DE\u05DE\u05E9\u05D9\u05DA \u05DB\u05D0\u05DF.",setBaseline:"\u05E0\u05D9\u05E7\u05D5\u05D3 \u05E4\u05EA\u05D9\u05D7\u05D4",baselineRow:"\u05E0\u05D9\u05E7\u05D5\u05D3 \u05E4\u05EA\u05D9\u05D7\u05D4",saveBaseline:"\u05E9\u05DE\u05D5\u05E8 \u05E0\u05D9\u05E7\u05D5\u05D3 \u05E4\u05EA\u05D9\u05D7\u05D4 \u2713",invalidTricksSum:"\u05E1\u05DA \u05D4\u05DC\u05E7\u05D9\u05D7\u05D5\u05EA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05D1\u05D3\u05D9\u05D5\u05E7 13 (\u05DB\u05E8\u05D2\u05E2 {sum})",hookWarning:"\u05E1\u05DA \u05DB\u05DC \u05D4\u05D4\u05DB\u05E8\u05D6\u05D5\u05EA \u05D0\u05D9\u05E0\u05D5 \u05D9\u05DB\u05D5\u05DC \u05DC\u05D4\u05D9\u05D5\u05EA 13 (\u05D7\u05D5\u05E7 \u05D4\u05D4\u05D5\u05E7)",deleteDeal:"\u05DE\u05D7\u05E7 \u05E1\u05D9\u05D1\u05D5\u05D1",deleteDealConfirm:"\u05D4\u05D0\u05DD \u05DC\u05DE\u05D7\u05D5\u05E7 \u05D0\u05EA \u05E1\u05D9\u05D1\u05D5\u05D1 #{num}? \u05DB\u05DC \u05D4\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D4\u05D1\u05D0\u05D5\u05EA \u05D9\u05D7\u05D5\u05E9\u05D1\u05D5 \u05DE\u05D7\u05D3\u05E9.",switchLang:"English"};var Q=class{constructor(){window.__ISRAELI_WHIST_APP__=this,this.initLanguage();let e=new URLSearchParams(window.location.search),s=e.get("game")||e.get("room")||(window.location.hash.length>1?window.location.hash.replace("#","").trim():null),t=!!s;this.session=this.loadInitialSession(s),this.initElements(),this.initControllers(),this.initSyncManager(),this.bindGlobalEvents(),this.updateStaticI18n(),M.syncWithServer(()=>{this.landingContainer&&this.landingContainer.style.display!=="none"&&this.landingView.render()}),t?(this.showGameView(),this.fetchRoomStateFromServer(s)):this.showLandingView(),this.bindSessionListeners(this.session)}loadInitialSession(e){if(e){let t=M.getRecentGames().find(i=>i.roomId===e||i.id===e);if(t&&t.fullState)return new G(t.fullState)}return G.loadFromStorage()}async fetchRoomStateFromServer(e){if(e)try{let s=window.location,t=`/whist/api/session/${e}`;(s.pathname==="/"||!s.pathname.startsWith("/whist"))&&(t=`/api/session/${e}`);let i=await fetch(t);if(i.ok){let r=await i.json();r&&r.success&&r.session&&this.applyRemoteState(r.session)}}catch(s){console.warn("REST session fetch failed, relying on WebSocket:",s)}}bindSessionListeners(e){e&&e.subscribe(()=>{this.roundView.updateSession(this.session),this.scoreboard.updateSession(this.session),this.chartView.updateSession(this.session),this.syncManager&&this.syncManager.broadcastLocalState(),this.archiveCurrentGame()})}initLanguage(){let e=null;try{e=localStorage.getItem("israeli_whist_lang")}catch{}!e&&typeof navigator<"u"&&navigator.language&&navigator.language.startsWith("he")&&(e="he"),this.i18n=e==="he"?se:te,document.documentElement.lang=this.i18n.lang,document.documentElement.dir=this.i18n.dir}setLanguage(e){this.i18n=e==="he"?se:te,document.documentElement.lang=this.i18n.lang,document.documentElement.dir=this.i18n.dir;try{localStorage.setItem("israeli_whist_lang",e)}catch{}this.updateStaticI18n(),this.landingView.render(),this.roundView.updateI18n(this.i18n),this.scoreboard.updateI18n(this.i18n),this.chartView.render()}updateStaticI18n(){let e=this.i18n;this.btnBrandHome&&(this.btnBrandHome.textContent=e.appName),this.btnLangToggle&&(this.btnLangToggle.textContent=e.lang==="he"?"EN":"\u05E2\u05D1"),this.btnShare&&(this.btnShare.textContent=e.share),this.btnMenu&&(this.btnMenu.textContent=e.menu);let s=document.getElementById("tab-btn-round"),t=document.getElementById("tab-btn-history"),i=document.getElementById("tab-btn-chart");s&&(s.textContent=e.tabActiveDeal),t&&(t.textContent=e.tabHistory),i&&(i.textContent=e.tabChart)}initElements(){this.landingContainer=document.getElementById("landing-view-container"),this.gameContainer=document.getElementById("game-view-container"),this.leaderboardContainer=document.getElementById("leaderboard-section"),this.roundContainer=document.getElementById("round-view-container"),this.historyContainer=document.getElementById("history-view-container"),this.chartContainer=document.getElementById("chart-view-container"),this.roomCodeDisplay=document.getElementById("room-code-display"),this.syncIndicator=document.getElementById("sync-indicator"),this.btnBrandHome=document.getElementById("btn-brand-home"),this.btnLangToggle=document.getElementById("btn-lang-toggle"),this.btnShare=document.getElementById("btn-open-share"),this.btnMenu=document.getElementById("btn-open-menu")}initControllers(){this.dialogs=new Z(this),this.landingView=new W(this,this.landingContainer),this.roundView=new J(this.session,this.roundContainer,this.i18n,()=>{this.scoreboard.render(),this.chartView.render()}),this.scoreboard=new Y(this.session,this.leaderboardContainer,this.historyContainer,this.i18n,()=>{this.session.undoLastRound(),this.roundView.render(),this.scoreboard.render(),this.chartView.render()},e=>{this.dialogs.showReorganizeSeatingModal(e)},e=>{this.dialogs.showEditDealModal(e)},()=>{this.dialogs.showBaselineModal()}),this.chartView=new X(this.session,this.chartContainer,this.i18n)}initSyncManager(){this.syncManager=new O(this,e=>{this.applyRemoteState(e)}),this.syncManager.subscribe(e=>{this.roomCodeDisplay&&(this.roomCodeDisplay.textContent=e.roomId||"W-..."),this.syncIndicator&&(this.syncIndicator.style.background=e.connected?"#10b981":"#ef4444",this.syncIndicator.style.boxShadow=e.connected?"0 0 8px #10b981":"none",this.syncIndicator.title=e.connected?`Connected (${e.userCount} online)`:"Connecting...")}),this.syncManager.notify()}showLandingView(){this.landingContainer&&(this.landingContainer.style.display="block"),this.gameContainer&&(this.gameContainer.style.display="none"),this.landingView.render();let e=new URL(window.location.href);e.searchParams.delete("game"),e.searchParams.delete("room"),e.hash="",window.history.replaceState({},"",e.toString())}showGameView(){this.landingContainer&&(this.landingContainer.style.display="none"),this.gameContainer&&(this.gameContainer.style.display="block"),this.syncManager&&this.syncManager.updateUrl(this.syncManager.roomId),this.roundView.updateSession(this.session),this.scoreboard.updateSession(this.session),this.chartView.updateSession(this.session)}joinRoomByCode(e){e&&(this.syncManager&&this.syncManager.joinRoom(e),this.showGameView(),this.fetchRoomStateFromServer(e))}archiveCurrentGame(){if(this.session){let e=this.syncManager?this.syncManager.roomId:this.session.id;M.saveGameToArchive(this.session,e)}}startNewGame(e={}){this.session&&this.archiveCurrentGame();let s="game_"+Date.now();this.syncManager&&(s=this.syncManager.createNewRoom());let t=new G({id:s,...e});this.setSession(t),this.showGameView()}applyRemoteState(e){e&&(this.session=new G(e),this.session.saveToStorage(),this.roundView.updateSession(this.session),this.scoreboard.updateSession(this.session),this.chartView.updateSession(this.session),this.archiveCurrentGame(),this.bindSessionListeners(this.session))}setSession(e){this.session=e,this.session.saveToStorage(),this.roundView.updateSession(this.session),this.scoreboard.updateSession(this.session),this.chartView.updateSession(this.session),this.archiveCurrentGame(),this.syncManager&&this.syncManager.broadcastLocalState(),this.bindSessionListeners(this.session)}resumeGameFromArchive(e){!e||!e.fullState||(this.session=new G(e.fullState),this.session.saveToStorage(),this.syncManager&&e.roomId&&this.syncManager.joinRoom(e.roomId),this.showGameView(),this.bindSessionListeners(this.session))}bindGlobalEvents(){this.btnShare&&this.btnShare.addEventListener("click",()=>this.dialogs.showShareModal());let e=document.getElementById("btn-room-badge");e&&e.addEventListener("click",()=>this.dialogs.showShareModal()),this.btnMenu&&this.btnMenu.addEventListener("click",()=>this.dialogs.showMenuModal()),this.btnLangToggle&&this.btnLangToggle.addEventListener("click",()=>{let i=this.i18n.lang==="he"?"en":"he";this.setLanguage(i)}),this.btnBrandHome&&this.btnBrandHome.addEventListener("click",()=>this.showLandingView());let s=document.querySelectorAll(".tab-item"),t=document.querySelectorAll(".tab-panel");s.forEach(i=>{i.addEventListener("click",()=>{s.forEach(l=>l.classList.remove("active")),t.forEach(l=>{l.classList.remove("active"),l.style.display="none"}),i.classList.add("active");let r=i.dataset.tab,n=document.getElementById(r);n&&(n.classList.add("active"),n.style.display="block")})})}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.app=new Q}):window.app=new Q;
