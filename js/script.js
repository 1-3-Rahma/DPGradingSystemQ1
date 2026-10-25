document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the student ID entered by the user
    let studentID = document.getElementById('studentID').value.trim();

    // Define grades for each student ID (all sheets: SA-G1, SA-G2, DS)
    const grades = {
  "122300001": [6],
  "122300009": [9],
  "122300010": [7],
  "122300011": [8],
  "122300017": [8],
  "191900254": [7.5],
  "192100022": [7],
  "192100068": [7],
  "192200001": [9],
  "192200005": [6.5],
  "192200008": [8],
  "192200012": [9.5],
  "192200015": [9.5],
  "192200017": [9.5],
  "192200024": [8.5],
  "192200027": [10],
  "192200031": [10],
  "192200032": [9.5],
  "192200033": [5],
  "192200038": [6.5],
  "192200047": [4],
  "192200052": [6.5],
  "192200055": ["No grade"],
  "192200057": [10],
  "192200058": [6.5],
  "192200059": [6],
  "192200062": [9.5],
  "192200064": [9.5],
  "192200065": [6],
  "192200066": [7.5],
  "192200069": [4.5],
  "192200073": [7.5],
  "192200074": [8.5],
  "192200080": [7.5],
  "192200084": [10],
  "192200086": [7],
  "192200089": [9],
  "192200093": [6],
  "192200095": [10],
  "192200106": [8.5],
  "192200111": [9],
  "192200112": [10],
  "192200115": [10],
  "192200119": [9.5],
  "192200120": [10],
  "192200121": [10],
  "192200122": [9],
  "192200126": [7.5],
  "192200127": [9.5],
  "192200128": [9],
  "192200131": [6.5],
  "192200134": [7],
  "192200135": [8.5],
  "192200140": [8.5],
  "192200144": [10],
  "192200145": [8.5],
  "192200146": [6.5],
  "192200147": [5],
  "192200148": [10],
  "192200149": [7.5],
  "192200150": [10],
  "192200153": [10],
  "192200154": [9.5],
  "192200157": [10],
  "192200158": [8],
  "192200159": [7],
  "192200160": [5],
  "192200161": [10],
  "192200162": [2],
  "192200163": [8.5],
  "192200164": [10],
  "192200167": [10],
  "192200168": [5.5],
  "192200175": [6],
  "192200186": [10],
  "192200187": [9.5],
  "192200188": [9],
  "192200190": [7],
  "192200193": [10],
  "192200197": [10],
  "192200198": [9.5],
  "192200199": [10],
  "192200200": [10],
  "192200204": ["Contact TA"],
  "192200210": [10],
  "192200211": [6.5],
  "192200212": [9.5],
  "192200214": [10],
  "192200216": [10],
  "192200217": [10],
  "192200221": [10],
  "192200222": [6.5],
  "192200231": [10],
  "192200232": [10],
  "192200233": [10],
  "192200241": [9],
  "192200243": [8.5],
  "192200244": [9.5],
  "192200246": [10],
  "192200247": [9],
  "192200250": [10],
  "192200251": [10],
  "192200252": [10],
  "192200253": [7.5],
  "192200254": [10],
  "192200255": [7],
  "192200256": [5.5],
  "192200259": [10],
  "192200260": [9],
  "192200264": [10],
  "192200266": [10],
  "192200277": [9.5],
  "192200278": [9],
  "192200279": [9.5],
  "192200288": [5],
  "192200292": [8],
  "192200293": [4.5],
  "192200297": [9.5],
  "192200299": [0.5],
  "192200303": [10],
  "192200304": [10],
  "192200306": [8],
  "192200309": [2],
  "192200310": [6.5],
  "192200315": [8],
  "192200317": [8.5],
  "192200322": [9],
  "192200323": [10],
  "192200325": [9],
  "192200335": [10],
  "192200336": [6.5],
  "192200339": [5.5],
  "192200340": [10],
  "192200343": [9],
  "192200346": [9.5],
  "192200348": [5],
  "192200355": [9.5],
  "192200356": [7.5],
  "192200358": [10],
  "192200360": [10],
  "192200361": [8.5],
  "192200362": [3],
  "192200365": [7],
  "192200366": [5],
  "192200367": [6.5],
  "192200371": [9],
  "192200372": [10],
  "192200379": [10],
  "192200380": [9],
  "192200383": [2],
  "192200387": [10],
  "192200397": [4],
  "192300005": [10],
  "192300022": [3.5],
  "192300146": [8.5],
  "192300203": [9.5],
  "192300497": [10],
  "192300544": [7],
  "192300557": [9.5],
  "192300576": [4]
    };

    // Students whose paper had no name / ID (yellow in the sheet)
    const noNameIDs = ["192200162", "192200279"];

    // Students who must contact the TA to set a date for their quiz (red in the sheet)
    const contactTAIDs = ["192200204"];

    // Students who will not retake the quiz: no grade, just wish them luck in Quiz 2
    const quiz2IDs = ["192200055"];

    // Students who got 5 bonus points (Points column in the sheet)
    const bonusIDs = ["192200057", "192200112", "192200115", "192200157", "192200161", "192200164", "192200186", "192200197", "192200216", "192200254", "192200259", "192200264", "192200303", "192200323", "192200340", "192200358", "192200379"];

    // Grades below this value get the "contact the TA / study well" comment
    const LOW_GRADE_LIMIT = 5;

    let gradeDisplay = document.getElementById('gradeDisplay');

    if (studentID in grades) {
        // Display grades for the student
        let gradeList = '<h2>Your Grades : ' + '</h2>';
        gradeList += '<ul>';
        grades[studentID].forEach(function(grade) {
            gradeList += '<li>' + 'Quiz 1 Grade : ' + grade + '</li>';
        });
        if (bonusIDs.includes(studentID)) {
            gradeList += '<li>Bonus Points : 5</li>';
        }
        gradeList += '</ul>';

        if (bonusIDs.includes(studentID)) {
            gradeList += '<p>Your paper was really great, so you got 5 bonus points. Thank you!</p>';
        }

        let grade = grades[studentID][0];

        if (quiz2IDs.includes(studentID)) {
            gradeList += "<p>Good luck with Quiz 2, Insha'Allah!</p>";
        } else if (contactTAIDs.includes(studentID)) {
            // Red: must meet the TA in C111 to arrange the quiz
            gradeList += '<p>Please contact the TA and come to room C111 to set a date for your quiz "3omra maqbola inshaAllah ^_^ ".</p>';
        } else {
            if (noNameIDs.includes(studentID)) {
                // Yellow: paper had no name and ID
                gradeList += '<p>Your paper did not have your name and ID. If this happens again, no grade will be recorded for you. ' +
                             'Please be careful: in the midterm and the final exams, there is no chance that the Dr will search for the owner of a paper.</p>';
            }
            if (typeof grade === 'number' && grade < LOW_GRADE_LIMIT) {
                // Low grade: encourage contacting the TA and studying
                gradeList += '<p>If there is anything you did not understand in the course, please contact the TA. ' +
                             'If this grade discouraged you, please study the material well for the midterm and the final exams.</p>';
            } else {
                gradeList += '<p>Good luck!</p>';
            }
        }
        gradeDisplay.innerHTML = gradeList;

    } else {
        // Display error message if ID is not found
        gradeDisplay.innerHTML = '<p>Student ID not found</p>';
    }
});