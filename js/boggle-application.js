//----------------------------------
//*** Event when jqm init **********
//----------------------------------
$(document).on("mobileinit", function() {
	
});

//-----------------------------------
//*** Event in page Step 2 **********
//-----------------------------------
$(document).on("pagecreate", "#step2", function(event) {
	
	$("#step2ContinueBtn").on("click", function(){
		// alert("initialize");
		initialize();
		$("#player").attr("src", "");
		var groupID = parseInt($.cookie("groupID"));
		// var groupID = "4";

		switch(groupID){
			case 0:
				// recordStartTime(2, groupID, -1, -1);
				$("#prevGoal1").html("My goal is to find as many words as I can.");
				break;
			case 1:
				$("#systemGoal1_1").html(150);
				break;
			case 2:
				$("#systemGoal2_1").html(75);
				$("#systemGoal2_2").html(150);
			default:
				break;
		}

	});
	
});

// $(document).on("pageshow", "#step2", function(event) {
// });

// //-----------------------------------
// //*** Event in page Step 3 **********
// //-----------------------------------
// $(document).on("pagecreate", "#step3", function(event) {
	
// 	$("#step3InitStartBtn").on("click", function(){
// 		timer = utils.setTimer(renderMole, speed);
// 		flag = 1;//start as clicked
// 		$("#step3InitPopup").popup("close");
// 		var groupID = $.cookie("groupID");
// 		recordStartTime(0, parseInt(groupID), -1, -1);
// 	});
	
// });

// $(document).on("pageshow", "#step3", function(event) {
// 	initGame("step3");
// 	$("#step3InitPopup").popup("open");
// });

// function showStep3Result(score, level) {
// 	$("#step3Result").html(score);
// 	$("#step3ResultPopup").popup("open");

// 	recordEndTime(score, level);

// 	var groupID = $.cookie("groupID");
// 	if(groupID == 1){
// 		$("#systemGoal1_1").html(score + 13);
// 	}else if (groupID == 2){
// 		$("#systemGoal2_1").html(score + 7);
// 		$("#systemGoal2_2").html(score + 13);
// 	}
// }

//-----------------------------------
//*** Event in page Step 4 **********
//-----------------------------------
$(document).on("pagecreate", "#step4", function(event) {

	$.validator.addMethod("myGreaterThan", function(value, element) {
        return parseInt($("#goal2_2").val()) > parseInt($("#goal2_1").val());
    }, "main goal must larger than backup goal");

	var groupID = $.cookie("groupID");
	// var groupID = "4";
	if(parseInt(groupID) == 0)
		setTimeout(recordStartTime(2, groupID, -1, -1), 5000);
		

	$("#step4InitStartBtn" + groupID).on("click", function(){

		var goal1 = -1;
		var goal2 = -1;
		switch(parseInt(groupID)){
			case 0:
				break;
			case 1:
				goal2 = $("#systemGoal1_1").html();
				
				$("#prevGoal1").html("My goal is to play until I score " + goal2 + " points.");				
				break;
			case 2:
				goal1 = $("#systemGoal2_1").html();
				goal2 = $("#systemGoal2_2").html();

				$("#prevGoal1").html("My goal is to play until I score " + goal2 + " points.");
				$("#prevGoal2").html("If that is too hard, I want to score at least " + goal1 + " points.");
				break;
		}
		recordStartTime(2, parseInt(groupID), goal1, goal2);
		$("#step4InitPopup" + groupID).popup("close");

	});

	$("#step4ContinueBtn").on("click", function(){

		var score = $('#score span').html();
		showStep4Result(score);
		recordEndTime(score);
		endSession();

	});

});

$(document).on("pageshow", "#step4", function(event) {
	var groupID = $.cookie("groupID");
	// var groupID = "4"
	// alert("hello"+groupID);
	if(groupID != "0")
		$("#step4InitPopup" + groupID).popup("open");
	
	$("#step4InitPopup3Form").validate({
		rules:{
    		goal1_1: {
      			required: true,
     			number: true,
     			min: 1
    		},
    	},
        errorPlacement: function(error, element) {
            error.insertAfter($(element).parent());
        },
        submitHandler: function(form) {

            var goal1 = -1;
            var goal2 = -1;
            
            goal2 = $("#goal1_1").val();
            $("#prevGoal1").html("My goal is to play until I score " + goal2 + " points.");

            recordStartTime(2, parseInt(groupID), goal1, goal2);

            $("#step4InitPopup3").popup("close");
            
            return false;
        }
    });
    
    $("#step4InitPopup4Form").validate({
    	rules:{
    		goal2_1: {
      			required: true,
     			number: true,
     			min: 1
    		},
    		goal2_2: {
      			required: true,
     			number: true,
     			min: 1
    		}
    	},
        errorPlacement: function(error, element) {
            error.insertAfter($(element).parent());
        },
        submitHandler: function(form) {

            var goal1 = -1;
            var goal2 = -1;
            
            goal1 = $("#goal2_1").val();
            goal2 = $("#goal2_2").val();

            $("#prevGoal1").html("My goal is to play until I score " + goal2 + " points.");
			$("#prevGoal2").html("If that is too hard, I want to score at least " + goal1 + " points.");
            
            recordStartTime(2, parseInt(groupID), goal1, goal2);

            $("#step4InitPopup4").popup("close");
            
            return false;
        }
    });
});

function showStep4Result(score) {
	var groupID = $.cookie("groupID");
	// var groupID = "4";

	switch(parseInt(groupID)){
		case 0:
			$("#step4Result").html("You got " + score + " points.");
			break;
		case 1:
			if(score >= parseInt($("#systemGoal1_1").html())){
				exPoints = score - parseInt($("#systemGoal1_1").html());
				if(exPoints > 1)
					$("#step4Result").html("Congratulations! You exceeded your goal by " + exPoints + " points!");
				else if (exPoints == 1)
					$("#step4Result").html("Congratulations! You exceeded your goal by " + exPoints + " point!");
				else if (exPoints == 0)
					$("#step4Result").html("Congratulations! You met your goal (" + score + " points)!");
			}
			else
				$("#step4Result").html("You got " + score + " points, " + (parseInt($("#systemGoal1_1").html()) -  score) + " short of your goal." );
			break;
		case 2:
			if(score >= parseInt($("#systemGoal2_2").html())){
				exPoints = score - parseInt($("#systemGoal2_2").html());
				if(exPoints > 1)
					$("#step4Result").html("Congratulations! You exceeded your main goal by " + exPoints + " points!");
				else if (exPoints == 1)
					$("#step4Result").html("Congratulations! You exceeded your main goal by " + exPoints + " point!");
				else if (exPoints == 0)
					$("#step4Result").html("Congratulations! You met your main goal (" + score + " points)!");
			}
			else if(score >= parseInt($("#systemGoal2_1").html()))
				$("#step4Result").html("You were " + (parseInt($("#systemGoal2_2").html()) - score) + " points short of your main goal, but you met your backup goal with " + score + " points!");
			else
				$("#step4Result").html("You got " + score + " points, " +(parseInt($("#systemGoal2_2").html()) - score) + " short of your main goal and " + (parseInt($("#systemGoal2_1").html()) - score)+ " short of your backup goal.");
			break;
		case 3:
			if(score >= parseInt($("#goal1_1").val())){
				exPoints = score - parseInt($("#goal1_1").val());
				if(exPoints > 1)
					$("#step4Result").html("Congratulations! You exceeded your goal by " + exPoints + " points!");
				else if (exPoints == 1)
					$("#step4Result").html("Congratulations! You exceeded your goal by " + exPoints + " point!");
				else if (exPoints == 0)
					$("#step4Result").html("Congratulations! You met your goal (" + score + " points)!");
			}
			else
				$("#step4Result").html("You got " + score + " points, " + (parseInt($("#goal1_1").val()) - score) + " short of your goal.");
			break;
		case 4:
			if(score >= parseInt($("#goal2_2").val())){
				exPoints = score - parseInt($("#goal2_2").val());
				if(exPoints > 1)
					$("#step4Result").html("Congratulations! You exceeded your main goal by " + exPoints + " points!");
				else if (exPoints == 1)
					$("#step4Result").html("Congratulations! You exceeded your main goal by " + exPoints + " point!");
				else if (exPoints == 0)
					$("#step4Result").html("Congratulations! You met your main goal (" + score + " points)!");
			}
			else if(score >= parseInt($("#goal2_1").val()))
				$("#step4Result").html("You were " + (parseInt($("#goal2_2").val()) - score) + " points short of your main goal, but you met your backup goal with " + score + " points!");
			else
				$("#step4Result").html("You got " + score + " points, " + (parseInt($("#goal2_2").val()) - score) + " short of your main goal and " + (parseInt($("#goal2_1").val()) - score) + " short of your backup goal.");
			break;
	}
	// $("#step4Result").html(score);
	$("#step4ResultPopup").popup("open");	
}

//-----------------------------------
//*** Event in page Step 5 **********
//-----------------------------------
// $(document).on("pagecreate", "#step5", function(event) {

//     $("#step5 label[for^='radiolike']").each(function(index) {
// 	    switch(index % 10) {
// 			case 0:
//                 $(this).attr("title", "1 = I don't like it at all");
// 				break;
// 			case 9:
// 			    $(this).attr("title", "10 = I like it very much");
// 				break;
// 			case 10:
// 				break;	
// 		}
//     });

//     $("#step5 label[for^='radioeffort']").each(function(index) {
// 	    switch(index % 10) {
// 			case 0:
//                 $(this).attr("title", "1 = Not at all");
// 				break;
// 			case 9:
// 			    $(this).attr("title", "10 = Very hard");
// 				break;
// 			case 10:
// 				break;	
// 		}
//     });

//     $("#step5 label[for^='radioperform']").each(function(index) {
// 	    switch(index % 10) {
// 			case 0:
//                 $(this).attr("title", "1 = Very poor");
// 				break;
// 			case 9:
// 			    $(this).attr("title", "10 = Very well");
// 				break;
// 			case 10:
// 				break;	
// 		}
//     });
	
// 	$("#step5").tooltip();

// });

// $(document).on("pageshow", "#step5", function(event) {
// 	$("#step5Form").validate({
// 		rules:{
//     		age: {
//       			required: true,
//      			number: true
//     		},
//     	},
//         errorPlacement: function(error, element) {
//             if (element.attr("name") === "age") {
// 				error.insertAfter($(element).parent());
// 			}
// 			else {
// 				error.insertAfter(element);
// 			}
//         },
//         submitHandler: function(form) {
            
//             //Submit data
//             //== age ==
//             var age = parseInt($("#age").val());

//             //== gender ==
//             var genderValue = $('input[name=radioGender]:radio:checked').val();
//             var gender = -1;
//             if(genderValue == "male"){
//                 gender = 0;
//             }else if (genderValue == "female"){
//                 gender = 1;
//             }else{
//                 gender = 2;
//             }

//             //== like ==
//             var enjoyment = parseInt($('input[name=radiolike]:radio:checked').val()); 

//             //== performance ==
//             var performance = parseInt($('input[name=radioperform]:radio:checked').val());

//             //== effort ==
//             var effort = parseInt($('input[name=radioeffort]:radio:checked').val())
//             // alert(like + "," + performance + "," + effort);

//             //== Native English Speaker ==
//             var nesValue = $('input[name=radioNES]:radio:checked').val();
//             var nes = -1;
//             if(nesValue == "yes"){
//                 nes = 1;
//             }else{
//                 nes = 0;
//             }

//             //== Mini IPIP ==
//             // var scoreE = parseInt($('input[name=radioIPip1]:radio:checked').val()) + 
//             //             (6-parseInt($('input[name=radioIPip6]:radio:checked').val())) + 
//             //             parseInt($('input[name=radioIPip11]:radio:checked').val()) + 
//             //             (6 - parseInt($('input[name=radioIPip16]:radio:checked').val()));
//             // var scoreA = parseInt($('input[name=radioIPip2]:radio:checked').val()) + 
//             //             (6-parseInt($('input[name=radioIPip7]:radio:checked').val())) + 
//             //             parseInt($('input[name=radioIPip12]:radio:checked').val()) + 
//             //             (6 - parseInt($('input[name=radioIPip17]:radio:checked').val()));
//             // var scoreC = parseInt($('input[name=radioIPip3]:radio:checked').val()) + 
//             //             (6-parseInt($('input[name=radioIPip8]:radio:checked').val())) + 
//             //             parseInt($('input[name=radioIPip13]:radio:checked').val()) + 
//             //             (6 - parseInt($('input[name=radioIPip18]:radio:checked').val()));
//             // var scoreN = parseInt($('input[name=radioIPip4]:radio:checked').val()) + 
//             //             (6-parseInt($('input[name=radioIPip9]:radio:checked').val())) + 
//             //             parseInt($('input[name=radioIPip14]:radio:checked').val()) + 
//             //             (6 - parseInt($('input[name=radioIPip19]:radio:checked').val()));
//             // var scoreI = parseInt($('input[name=radioIPip5]:radio:checked').val()) + 
//             //             (6-parseInt($('input[name=radioIPip10]:radio:checked').val())) + 
//             //             parseInt($('input[name=radioIPip15]:radio:checked').val()) + 
//             //             (6 - parseInt($('input[name=radioIPip20]:radio:checked').val()));

//             // alert("age:" + age + ":::gender:" + gender + ":::scoreE:" + scoreE + ":::scoreA:" + ":::socreC:" + scoreC + ":::scoreN:" + scoreN + ":::scoreI:" + scoreI)

//             submitSurvey(age, gender, enjoyment, performance, effort, nes);
            
//             $.mobile.changePage("#step6");
            
//             return false;
//         }
//     });
// });

//-----------------------------------
//*** Event in page Step 6 **********
//-----------------------------------
// $(document).on("pagecreate", "#step6", function(event) {
	
// 	$("#step6 label[for^='radioIPip']").each(function(index) {
// 	    switch(index % 8) {
// 			case 0:
//                 $(this).attr("title", "1 = Disagree strongly");
// 				break;
// 			case 1:
// 			    $(this).attr("title", "2 = Disagree moderately");
// 				break;
// 			case 2:
// 			    $(this).attr("title", "3 = Disagree a little");
// 				break;
// 			case 3:
// 			    $(this).attr("title", "4 = Neither agree nor disagree");
// 				break;
// 			case 4:
// 			    $(this).attr("title", "5 = Agree a little");
// 				break;
// 			case 5:
// 			    $(this).attr("title", "6 = Agree moderately");
// 				break;
// 			case 6:
// 			    $(this).attr("title", "7 = Agree strongly");
// 				break;
// 			case 7:
// 				break;	
// 		}
//     });
	
// 	$("#step6").tooltip();

// });

// $(document).on("pageshow", "#step6", function(event) {
// 	$("#step6Form").validate({
// 		// rules:{
//   //   		age: {
//   //     			required: true,
//   //    			number: true
//   //   		},
//   //   	},
//   //       errorPlacement: function(error, element) {
//   //           if (element.attr("name") === "age") {
// 		// 		error.insertAfter($(element).parent());
// 		// 	}
// 		// 	else {
// 		// 		error.insertAfter(element);
// 		// 	}
//   //       },
//         submitHandler: function(form) {
// 			//== TIPI ==
// 		    //E: 1, 6R
// 		    var scoreE = parseInt($('input[name=radioIPip1]:radio:checked').val()) + 
// 		                (8-parseInt($('input[name=radioIPip6]:radio:checked').val()));
// 		    //A: 2R, 7
// 		    var scoreA = parseInt($('input[name=radioIPip7]:radio:checked').val()) + 
// 		                (8-parseInt($('input[name=radioIPip2]:radio:checked').val()));
// 		    //C: 3, 8R
// 		    var scoreC = parseInt($('input[name=radioIPip3]:radio:checked').val()) + 
// 		                (8-parseInt($('input[name=radioIPip8]:radio:checked').val()));
// 		    //N: 4R, 9
// 		    var scoreN = parseInt($('input[name=radioIPip9]:radio:checked').val()) + 
// 		                (8-parseInt($('input[name=radioIPip4]:radio:checked').val()));
// 		    //I: 5, 10R
// 		    var scoreI = parseInt($('input[name=radioIPip5]:radio:checked').val()) + 
// 		                (8-parseInt($('input[name=radioIPip10]:radio:checked').val()));

// 		    // alert("age:" + age + ":::gender:" + gender + ":::scoreE:" + scoreE + ":::scoreA:" + ":::socreC:" + scoreC + ":::scoreN:" + scoreN + ":::scoreI:" + scoreI)

// 		    submitBig5(scoreE, scoreA, scoreC, scoreN, scoreI);
		    
// 		    $.mobile.changePage("#step7");
// 		    return false;
// 		}
//     });
// });

//-----------------------------------
//*** Event in page Step 7 **********
//-----------------------------------
// $(document).on("pagecreate", "#step7", function(event) {
	
// });

// $(document).on("pageshow", "#step7", function(event) {
// 	$("#step7Form").validate({
//         errorPlacement: function(error, element) {
//             if (element.attr("name") === "email") {
// 				error.insertAfter($(element).parent());
// 			}
// 			else {
// 				error.insertAfter(element);
// 			}
//         },
//         submitHandler: function(form) {
//             enterRaffle($("#email").val());
//             $("#step7ExitPopup").popup("open");
//             return false;
//         }
//     });
// });

//-----------------------------------
//*** Event in all pages **********
//-----------------------------------

$(window).on("beforeunload", function (e) {
	endSession();

  // var confirmationMessage = "";

  // (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
  // return confirmationMessage;                                //Webkit, Safari, Chrome etc.
});

$(document).keydown(function(e) {
	var element = e.target.nodeName.toLowerCase();
	if (element != 'input' && element != 'textarea') {
	    if (e.keyCode === 8) {
	        return false;
	    }
	}
});


