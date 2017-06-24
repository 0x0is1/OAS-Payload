

function ikhor()
{ 
    $(".loaderings").css("display","block");
    
    $("center").remove(".QA");
    $("div").remove(".QA");
// var AvailableTests;
//      $.get({
//          url: "redirector.php?here=https://oas.lpu.in/api/OnlineExam/GetTestToAttemptDetail?LoginId=11111",
//          success: function(data){AvailableTests=data;//console.log("data here");console.log(data.length);console.log("data done");
//         },
//          async: false,
//          dataType: "json"
//      });

//     var testID;

// $.each(AvailableTests, function(i,test){
//     if(test.TestName.toLowerCase().localeCompare($("#TestName").val().toLowerCase())==0)
//     {
//         testID=test.TestId;
//        // console.log("here is the testID bro: "+test.TestId);
//     }
// });
var testID = $("#TestName").val();

var retuner = $.get( "redirector.php?here=https://oas.lpu.in/api/OnlineExam/GetSavedTestDesignDetail?TestId="+testID, function( data1 ) {
 
 var questionsHolder=data1; //console.log("object loaded"+questionsHolder[0].Message);
  //$('#appender').append(questionsHolder.length);
 // console.log("TOTAL QUESTIONS  : "+questionsHolder.length);

for(var looper=0;looper<questionsHolder.length;looper++)
{
    var qid = questionsHolder[looper].QuestionId;
    var urlTOGetAnswer="redirector.php?here=https://oas.lpu.in/api/OnlineExam/GetQuestionOptionDetail?QuestionId="+qid;
$.get(urlTOGetAnswer,function(OptionsObj){
},"json").done(function (data){
});
}
caller(data1);
},"json");
}

function caller(obj)
{

    var QuestionsArray = [];
    var AnswersArray = [];
    if(obj.length<5)
    {
  $(".loaderings").css("display","none");

$("#displayer").append("<center class=\"QA\"><h1 style=\"margin:0px;color:#f00;\">No Match Found!</h1><span style=\"font-weight:100;font-size: 1em;margin-top:-10px;\">That looks like an incorrect test name. </span></center>");
  
    $("#last").css("display","block");
    }
    else
    {
    $.each(obj,function (i,Onequestion){
        

 var QuestionToDisplay="";

 if (Onequestion.QuestionImage != "") {
                                QuestionToDisplay += '<img class="img-responsive"  src="data:image/gif;base64,' + Onequestion.QuestionImage + '" />';
                            }
                            else {
                                QuestionToDisplay += "<p style='color: brown;margin-top:0px;font-size:1em;color:#1B809E' class='QuestionDescription'>" + Onequestion.QuestionDescription + "</p>";
                            }

        QuestionsArray.push(QuestionToDisplay);
    var qid = Onequestion.QuestionId;
         var urlTOGetAnswer="redirector.php?here=https://oas.lpu.in/api/OnlineExam/GetQuestionOptionDetail?QuestionId="+qid;
$.get(
    { url:urlTOGetAnswer,success: function(OptionsObj){
$.each(OptionsObj,function(i,optinstance){
 if(optinstance.IsRightAnswer=="True")
 {
     AnswersArray.push(optinstance.Option);
 }
});
}, dataType: "json",async: false});

    });
    //console.log("printing arrays");
     for(var j= 0;j<QuestionsArray.length;j++)
    {
$("#displayer").append("<div class=\"QA\"> <span style=\"font-weight:800;\">Q"+(j+1)+". </span> "+QuestionsArray[j]+"<hr><div class=\"answer\">Answer: "+AnswersArray[j]+"</div></div>");
  //   console.log(QuestionsArray[j]);
    // console.log(AnswersArray[j]);
     }
    $(".loaderings").css("display","none");
    $("#last").css("display","block");
}
}