//Get data from json
$.ajax({
    type: "GET",
    url: "knowledge_db.json",
    dataType: "json",
    success: jsonParser,
    error: function() {
        console.log("Can`t get data");
    }
});

function jsonParser(jsondata) {
    console.log("Seccessful data download!")
    
    var data = jsondata;

    data.forEach(function(el) {
        var skills = el.skills;
        var skillsArr = [];

        skills.forEach(function(arr) {
            skillsArr.push("<p>" +arr.skill+ ": <span class=\"right clear\">" +arr.level+ "/10</span></p>");
        }, this);

        var userSkills = skillsArr.join("");

        $("main").append(
            "<div class=\"user_card\">" +
                "<div class=\"user_name\">" +el.user+ "</div>" +
                "<div>"+
                    "<div class=\"user_photo\"><img src=\"" +el.photo+ "\"></div>" +
                    "<div class=\"user_info clear\">" +
                        "<p class=\"spec\">" +el.spec+ "</p>" +
                        "<p>Experience: " +el.experience+ " years</p>" +
                        "<p>English: " +el.english+ "</p>" +
                    "</div>" +
                "</div>" +
                "<div class=\"user_skills\">" +
                    "<p class=\"skills_title\"> Professional skills: </p>" +
                    userSkills+
                "</div>" +
            "</div>"
        );
    }, this);
};

//Add input for more skills
$(".add_input").click(function() {
    $(".tech").append(
        '<input type="text" id="skill" placeholder="YOUR SKILL">' +
        '<span class="level_text"> Skill level from 1 to 10 </span>' +
        '<input type="number" id="level" min="1" max="10"><br>'
    )
    return false;
});

//Post data
$(".add_user").click(function() {
    var user = $("#user").val();
    var spec = $("#spec").val();
    var experience = $("#experience").val();
    var english = $("#english").val();
    var skills = [];

    var skillsElmnts = $(".tech input#skill");
    var levelElmnts = $(".tech input#level");

    skillsElmnts.each(function(skl) {
        skills.push({"skill": $(this).val()});
    },this);

    levelElmnts.each(function(index) {
        skills[index].level = $(this).val();
    });

    var userdata = {};
    userdata.user = user;
    userdata.spec = spec;
    userdata.experience = experience;
    userdata.english = english;
    userdata.skills = skills;

    console.log(userdata);

    $.ajax({
        url: "knowledge_db.json",
        type: "POST",
        data: JSON.stringify(userdata),
        dataType: "json",
        success: function() {
            console.log("Seccessful data upload!")
        },
        error: function() {
            alert("Can`t upload data! Error");
        }
    });

    $("form")[0].reset();

    return false;
});
