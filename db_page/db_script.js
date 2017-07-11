//Submenu
$(".menu_toggle").click(function() {
    $(this).children(".submenu").toggle();
});

$(".menu_toggle").mouseleave(function() {
    $(this).children(".submenu").css("display", "none");
});

$(".submenu").mouseleave(function() {
    $(this).css("display", "none");
});

$(".submenu a").click(function() {
    $(this).parent("li").parent(".submenu").toggle();
});

//Get data from json
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://rawgit.com/TanyaGordiychuk/KMS/master/db_page/knowledge_db.json",
        dataType: "json",
        async: false,
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

            $("#content").append(
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
});

//Pagination
var Imtech = {};
Imtech.Pager = function() {

    this.paragraphsPerPage = 6;
    this.currentPage = 1;
    this.pagingControlsContainer = '#pagingControls';
    this.pagingContainerPath = '#content';
    // number of pages
    this.numPages = function() {
        var numPages = 0;

        if (this.paragraphs != null && this.paragraphsPerPage != null) {
            // ceil - returns the smallest integer
            numPages = Math.ceil(this.paragraphs.length / this.paragraphsPerPage);
        }

        return numPages;
    };
    
    // page - The current (open - number) page, that is, we pass to the function the number of the 
    //current page, the content that we output then
    this.showPage = function(page) {
        this.currentPage = page;
        var html = '';
        // slice - This method does not change the original array, but simply returns its part. 
        //it displays the content that corresponds to the current page
        this.paragraphs.slice((page-1) * this.paragraphsPerPage,
            ((page-1)*this.paragraphsPerPage) + this.paragraphsPerPage).each(function() {
            html += '<div>' + $(this).html() + '</div>';
        });
        // insert content
        $(this.pagingContainerPath).html(html);
        // #pagingControls,  current page,  total number of pages     
        renderControls(this.pagingControlsContainer, this.currentPage, this.numPages());
    }
    
    // Block with navigation
    var renderControls = function(container, currentPage, numPages) {
        // Markup with navigation
        var pagingControls = 'Page: <ul>';
        for (var i = 1; i <= numPages; i++) {
            if (i != currentPage) {
                pagingControls += '<li><a href="#" onclick="pager.showPage(' + i + '); return false;">' + i + '</a></li>';
            } else {
                pagingControls += '<li>' + i + '</li>';
            }
        }

        pagingControls += '</ul>';

        $(container).html(pagingControls);
    }   
}

var pager = new Imtech.Pager();
$(document).ready(function() {
    // Number of output paragraphs () or div on one page
    pager.paragraphsPerPage = 6; 
    // Main container
    pager.pagingContainer = $('#content'); 
    // Denote the required block
    pager.paragraphs = $('div.user_card', pager.pagingContainer); 
    pager.showPage(1);
});   


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

//sort
$(".fe_sortBtn").click(function() {
    var usernames = $(".content_wrapper .user_name");
    console.log(usernames);
});


//search
