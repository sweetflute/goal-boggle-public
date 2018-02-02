$(document).ready(function() {
	var letters = '',
	squareIndexes = [],
	words = [],
	used = [],
	print_used = [],
	score = 0;

	//populate the cells with configuration one or two
	var combinations = [['S', 'E', 'R', 'S', 'P', 'A', 'T', 'G', 'L', 'I', 'N', 'E', 'S', 'E', 'R', 'S'],
	['G', 'R', 'E', 'P', 'T', 'N', 'A', 'L', 'E', 'S', 'I', 'T', 'D', 'R', 'E', 'S'],
	['p', 'l', 's', 't', 'e', 'a', 'i', 'e', 'r', 't', 'n', 'r', 's', 'g', 'e', 's'],
	['a', 'r', 'e', 's', 's', 't', 'a', 'p', 'e', 'n', 'i', 'l', 'd', 'r', 'e', 's'],
	['p', 'e', 'r', 's', 'l', 'a', 't', 'g', 's', 'i', 'n', 'e', 't', 'e', 'r', 's']];
	var random = Math.floor(Math.random()*5);
	populate(combinations[random])

	function populate(data) {
		for(let in data) {
			$('#' + let).html(data[let].toUpperCase())
		}
	}

	//load all possible words
	$.getJSON('data/words.json', function(data) {
		for(item in data) {
			words.push(data[item]['word']);
		}
	});

	//click handlers for adding a letter
	//and submitting a word
	$('.cell').click(function(e) {
		letterClick(e);
	});

	$('#try').click(function() {
		checkWord();
	});

	$(document).keypress(function(e) {
		if (e.which == 13) {
			checkWord();
		}
	});

	//called by cell click handler 
	function letterClick(e) {
		var el = $(e.target);

		if(validateNewLetter(el)) {
			if(el.attr('id') == lastSquareSelected()) {
				backspace(el);
				console.log('back it up')
			} else if (!el.hasClass("active")) {
				accept(el);
			}
			$('#letters').html(letters);
		} else {

		}
	}

	//add letter to currently clicked cells
	function accept(el) {
		el.addClass('active');
		squareIndexes.push(el.attr('id'));
		letters += el.text();
	}

	//remove most recent cell
	function backspace(el) {
		el.removeClass('active');
		squareIndexes.pop();
		letters = letters.substring(0, letters.length - 1);
	}

	//check to see if the clicked cell is adjacent
	//to the most recently clicked cell
	function validateNewLetter(el) {
		return squareIndexes.length == 0 || hasActiveNeighbor(el);
	}

	//checks neighboring cells to see if they're active
	function hasActiveNeighbor(el) {
		var loc = parseFloat(el.attr('id')),
		last = lastSquareSelected(),
		r1 = Math.floor(loc / 4),
		c1 = loc % 4,
		r2 = Math.floor(last / 4),
		c2 = last % 4;
		return (Math.abs(r1-r2) <= 1) && (Math.abs(c1-c2) <= 1);
	}

	//returns most recent cell clicked
	function lastSquareSelected() {
		if(squareIndexes.length == 0) {
			return undefined;
		} else {
			return squareIndexes[squareIndexes.length - 1];
		}
	}

	//checks to see if a word is in the array of possible words
	//also checks to see if use has tried that word already
	//clears board after a clicking
	function checkWord() {
		letters = String(letters.toLowerCase());
		if ($.inArray(letters, words) > -1){
			if($.inArray(letters, used) == -1) {
				inductWord();
			} else {
				sendAlert('You already used that word.');				
			}
		} else {
			sendAlert("That's not a word!");
		}
		restart();
	}

	function inductWord() {
		used.push(letters);
		score += calcPoints();
		$('#score span').html(score);
		print_used = Array.prototype.slice.call(used);
		$('#words').html(print_used.sort().join(', '))
	}

	function calcPoints() {
		var len = letters.length;
		if(len < 3) {
			return 0;
		} else if (len == 3 || len == 4) {
			return 1;
		} else if (len == 5) {
			return 2;
		} else if (len == 6) {
			return 3;
		} else if (len == 7) {
			return 5;
		} else if (len >= 8) {
			return 11;
		}
	}

	function sendAlert(text) {
		$alert = $("#alert p");
		$alert.html(text);
		$alert.fadeIn(1000).delay(2000).fadeOut(1000);
	}

	//clears the board
	function restart() {
		letters = '';
		$('#letters').html('');
		squareIndexes = [];
		var cells = $('.cell');
		cells.removeClass('active');
	}

})