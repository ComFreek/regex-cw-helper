Use the link below for creating your bookmarklet:
[Drag here](javascript:(function(){var%20v=%222.0.3%22;if(window.jQuery===undefined%20||%20window.jQuery.fn.jquery%20%3C%20v){var%20done=false;var%20script=document.createElement(%22script%22);script.src=%22http://ajax.googleapis.com/ajax/libs/jquery/%22+v+%22/jquery.min.js%22;script.onload=script.onreadystatechange=function(){if(!done%20%26%26(!this.readyState%20||%20this.readyState==%22loaded%22%20||%20this.readyState==%22complete%22)){done=true;initMyBookmarklet();}};document.getElementsByTagName(%22head%22)[0].appendChild(script);}else{initMyBookmarklet();}function%20initMyBookmarklet(){(window.myBookmarklet=function(){var%20$=jQuery;$.noConflict();var%20rows=$(%22div.puzzle%20table%22).rows;var%20vRegexes=[];var%20hRegexes=[];var%20hTexts=[];var%20vTexts=[];var%20headerCells=rows[0].cells;for(var%20i=1;i%20%3C%20headerCells.length;i++){vRegexes.push([headerCells[i].innerText.replace(/\n/,%22%22)]);}var%20footerCells=rows[rows.length%20-%201].cells;if(footerCells.length%20%3E%201){for(var%20i=1;i%20%3C%20footerCells.length;i++){vRegexes[i%20-%201].push(footerCells[i].innerText.replace(/\n/,%22%22));}}for(var%20y=1;y%20%3C%20rows.length%20-%201;y++){hRegexes.push([rows[y].cells[0].innerText]);hTexts.push(%22%22);for(var%20x=1;x%20%3C%20rows[y].cells.length;x++){var%20cell=rows[y].cells[x];if(x==rows[y].cells.length%20-%201%20%26%26%20$(cell).find(%22input%22).length===0){hRegexes[y%20-%201].push(cell.innerText);}else{hTexts[y%20-%201]+=$(cell).find(%22input%22).val();if(typeof%20vTexts[x%20-%201]===%22undefined%22){vTexts.push(%22%22);}vTexts[x%20-%201]+=$(cell).find(%22input%22).val();}}}var%20errors=%22%22;for(var%20x=0;x%20%3C%20vRegexes.length;x++){for(var%20r=0;r%20%3C%20vRegexes[x].length;r++){var%20re=new%20RegExp(vRegexes[x][r]);if(!re.test(vTexts[x])){errors+=%22Column%20%22+(x+1)+%22%20(%22+(r==0%3F%221st%22:%222nd%22)+%22%20regexp)%20\n%22;}}}if(errors%20!=%22%22){errors+=%22\n\n%22;}for(var%20y=0;y%20%3C%20hRegexes.length;y++){for(var%20r=0;r%20%3C%20hRegexes[y].length;r++){var%20re=new%20RegExp(hRegexes[y][r]);if(!re.test(hTexts[y])){errors+=%22Row%20%22+(y+1)+%22%20(%22+(r==0%3F%221st%22:%222nd%22)+%22%20regexp)%20\n%22;}}}if(errors%20!=%22%22){alert(%22Errors\n======\n%22+errors);}else{alert(%22Valid!%20Congratulations%20:)%22);}})();}})();)
