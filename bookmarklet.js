/**
 * MIT License, see 'LICENSE' file.
 * @author ComFreek <comfreek@outlook.com>
 */ (function () {
    // the minimum version of jQuery we want
    var v = "2.0.3";

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }

    function initMyBookmarklet() {
        (window.myBookmarklet = function () {
            var $ = jQuery;
            $.noConflict();
            var rows = $("div.puzzle table").rows;
            var vRegexes = [];
            var hRegexes = [];
            var hTexts = [];
            var vTexts = [];

            var headerCells = rows[0].cells;
            // start with 1, first upper-left cell is empty!
            for (var i = 1; i < headerCells.length; i++) {
                vRegexes.push([headerCells[i].innerText.replace(/\n/, "")]);
            }

            var footerCells = rows[rows.length - 1].cells;
            // if we actually have footer regexes
            // (note that there is always an empty <td>, therefore >1!)
            if (footerCells.length > 1) {
                for (var i = 1; i < footerCells.length; i++) {
                    vRegexes[i - 1].push(footerCells[i].innerText.replace(/\n/, ""));
                }
            }

            // iterate all rows except header and footer ones
            for (var y = 1; y < rows.length - 1; y++) {
                hRegexes.push([rows[y].cells[0].innerText]);
                hTexts.push("");

                for (var x = 1; x < rows[y].cells.length; x++) {
                    var cell = rows[y].cells[x];
                    // another hRegex
                    if (x == rows[y].cells.length - 1 && $(cell).find("input").length === 0) {
                        hRegexes[y - 1].push(cell.innerText);
                    } else {
                        hTexts[y - 1] += $(cell).find("input").val();
                        if (typeof vTexts[x - 1] === "undefined") {
                            vTexts.push("");
                        }
                        vTexts[x - 1] += $(cell).find("input").val();
                    }
                }
            }

            // READY FOR TAKE OFF
            var errors = "";

            for (var x = 0; x < vRegexes.length; x++) {
                for (var r = 0; r < vRegexes[x].length; r++) {
                    var re = new RegExp(vRegexes[x][r]);
                    if (!re.test(vTexts[x])) {
                        errors += "Column " + (x + 1) + " (" + (r == 0 ? "1st" : "2nd") + " regexp) \n";
                    }
                }

            }

            if (errors != "") {
                errors += "\n\n";
            }

            for (var y = 0; y < hRegexes.length; y++) {
                for (var r = 0; r < hRegexes[y].length; r++) {
                    var re = new RegExp(hRegexes[y][r]);
                    if (!re.test(hTexts[y])) {
                        errors += "Row " + (y + 1) + " (" + (r == 0 ? "1st" : "2nd") + " regexp) \n";
                    }
                }
            }

            if (errors != "") {
                alert("Errors\n======\n" + errors);
            } else {
                alert("Valid! Congratulations :)");
            }
        })();
    }

})();
