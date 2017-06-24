      function tryFetch()
            {
            console.log("start fetch try");
  var captureText = $('#ifraam').contents();
  console.log('printingnow');
  console.log(captureText);
  console.log('print complete');
            }

            function iframeRef( frameRef ) {
    return frameRef.contentWindow
        ? frameRef.contentWindow.document
        : frameRef.contentDocument
}

function other()
{
var andar = iframeRef(document.getElementById('ifraam'));
console.log('count'+andar.getElementsByTagName('Message').length);
}

function ikhor()
{ 
    $(".loaderings").css("display","block");
    
    var testID= $("#TestID").val();

var retuner = $.get( "redirector.php?here=https://oas.lpu.in/api/OnlineExam/GetSavedTestDesignDetail?TestId="+testID, function( data1 ) {
 
 var questionsHolder=data1; console.log("object loaded"+questionsHolder[0].Message);
  $('#appender').append(questionsHolder.length);
  console.log("TOTAL QUESTIONS  : "+questionsHolder.length);

for(var looper=0;looper<questionsHolder.length;looper++)
{
    var qid = questionsHolder[looper].QuestionId;
    // console.log("Question:"+qid+" >"+looper+" "+questionsHolder[looper].QuestionDescription)+"<";
    var urlTOGetAnswer="redirector.php?here=https://oas.lpu.in/api/OnlineExam/GetQuestionOptionDetail?QuestionId="+qid;
$.get(urlTOGetAnswer,function(OptionsObj){
$.each(OptionsObj,function(i,optinstance){
// if(optinstance.IsRightAnswer=="True")
// console.log(optinstance.Option);
});
},"json").done(function (data){
    // console.log("in done");
});
}
caller(data1);
},"json");
}

function caller(obj)
{

    var QuestionsArray = [];
    var AnswersArray = [];
    console.log(obj);
    $.each(obj,function (i,Onequestion){
        QuestionsArray.push(Onequestion.QuestionDescription);
//console.log("Question: "+Onequestion.QuestionDescription);
    var qid = Onequestion.QuestionId;
         var urlTOGetAnswer="redirector.php?here=https://oas.lpu.in/api/OnlineExam/GetQuestionOptionDetail?QuestionId="+qid;
$.get(
    { url:urlTOGetAnswer,success: function(OptionsObj){
$.each(OptionsObj,function(i,optinstance){
 if(optinstance.IsRightAnswer=="True")
 {
     AnswersArray.push(optinstance.Option);
 //console.log(optinstance.Option);
 }
});
}, dataType: "json",async: false});

    });

    console.log("printing arrays");
    
     for(var j= 0;j<QuestionsArray.length;j++)
    {
$("#displayer").append("<div class=\"QA\"> <span style=\"font-weight:800;\">Q"+(j+1)+". </span> "+QuestionsArray[j]+"<hr><div class=\"answer\">Answer: "+AnswersArray[j]+"</div></div>");
     console.log(QuestionsArray[j]);
     console.log(AnswersArray[j]);
     }
    $(".loaderings").css("display","none");
    $("#last").css("display","block");
     
}


function chainedAJAX()
{
    var testID= $("#TestID").val();

    var getQuestions = $.get("redirector.php?here=https://oas.lpu.in/api/OnlineExam/GetSavedTestDesignDetail?TestId=4391",function(dataism){console.log("in request");},"json");

    var getAnswers = getQuestions.then(
        function (questions){

        console.log("Question Fetched. SIze: "+questions.length);
$.each(questions,function(i,question){

             $.get("redirector.php?here=https://oas.lpu.in/api/OnlineExam/GetQuestionOptionDetail?QuestionId="+question.QuestionId,function(dataism){console.log("in Option Fetch request");},"json").then(

                 function (options)
                 {
                     console.log(options);
                 }
             );
});
        }
    );

getAnswers.done(
    function (options)
    {
        console.log("in done");
    }
);

}

            