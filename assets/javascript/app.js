
var triviaQuestions = [
    {
        q: "Which fruit is the most popular and most consumed in the world?",
        c: ["Apple", "Banana", "Orange", "Mango"],
        a: "Banana"
    },
    {
        q: "Which is the biggest spider in the world?",
        c: ["Armed spider", "Wolf spider", "Tarantula", "Widow spider"],
        a: "Tarantula"
    },
    {
        q: "Where do apricots originate from?",
        c: ["China", "India", "England", "Spain"],
        a: "China"
    },
    {
        q: "How many planets are in our solar system?",
        c: ["Six", "Seven", "Eight", "Nine"],
        a: "Eight"
    },
    {
        q: "Which is usually named as the most famous museum in the world?",
        c: ["MET", "Louvre Museum", "British Museum", "Acropolis Museum"],
        a: "Louvre"
    },
    {
        q: "Which is the smallest country in the world",
        c: ["Palau", "Monaco", "Maldives", "Vatican"],
        a: "Vatican"
    },
    {
        q: "How many rings make up the symbol of the Olympic Games?",
        c: ["Three", "Four", "Five", "Six"],
        a: "Five"
    },
    {
        q: "In which continent is the country of Egypt found?",
        c: ["Africa", "Europe", "Asia", "North America"],
        a: "Africa"
    },
    {
        q: "How many ounces are there in a pound",
        c: ["Eight", "Twelve", "Sixteen", "Twenty"],
        a: "Twelve"
    },
    {
        q: "What's the colored part of the human eye called?",
        c: ["Sclera", "Cornea", "Iris", "Pupil"],
        a: "Iris"
    }
];

var timer = 60;
var timeOut = false;
var answers = [];

for (var i = 0; i < 10; i++) {
    answers.push(-1);
};
// console.log(answers);

$(".start").on("click", function (event) {
    $(".start").remove();

    $(".container").append("<div class='main'></div>");
    $(".main").append("<h4 class='timer'>Time Remaining: " + timer + " Seconds</h4>");

    for (var i = 0; i < triviaQuestions.length; i++) {
        $(".main").append("<h5 class='question' id='q" + i + "'>" + (i + 1) + ". " + triviaQuestions[i].q + "</h5>");

        for (var j = 0; j < 4; j++) {
            var value = triviaQuestions[i].c[j];
            $(".main").append("<input type='radio' class='choice' name='c" + i + "' value=" + value + ">" + value);
        };
    };

    $(".main").append("<br><button class='submit'>Done</button>");

    intervalID = setInterval(countDown, 1000);

});

$(document).on("click", ".submit", stop);

$(document).on("click", ".choice", selectAnswer);

function selectAnswer() {
    // console.log(this);
    var name = $(this).attr("name");
    var value = $(this).attr("value");
    var index = name.charAt(1);

    if (triviaQuestions[index].a === value) {
        answers[index] = 1;
    } else {
        answers[index] = 0;
    };

};

function countDown() {
    timer--;
    // console.log(timer);
    $(".timer").text("Time Remaining: " + timer + " Seconds");

    if (timer === 0 || timeOut) {
        stop();
    };
};

function stop() {
    clearInterval(intervalID);
    timeOut = true;

    $(".main").remove();
    updateResult();
};

function updateResult() {
    // console.log(answers);
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;

    for (var i=0; i<answers.length; i++) {
        if (answers[i] === 1) {
            correctAnswers++;
        } else if (answers[i] === 0) {
            incorrectAnswers++;
        } else  {
            unanswered++;
        };
    };

    $(".container").append("<div class='result'></div>");
    $(".result").append("<h4>All Done!</h4>");
    $(".result").append("<h5>Correct Answer: " + correctAnswers + "</h5>");
    $(".result").append("<h5>Incorrect Answers: " + incorrectAnswers + "</h5>");
    $(".result").append("<h5>Unanswered: " + unanswered + "</h5>");
};