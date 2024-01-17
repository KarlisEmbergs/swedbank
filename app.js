// Lets start by removing the default error messages provided by the browser when the input is invalid.
document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
    };
})(), true);

const survey = document.getElementById('survey');
const summary = document.getElementById('summary');

// To show next question, hide the previous question.
let currQuestionNum = 1;
function showQuestion(index) {
    const currQuestion = document.getElementById('q' + currQuestionNum);
    currQuestion.classList.add('hidden')
    currQuestionNum = index;

    const nextQuestion = document.getElementById('q' + currQuestionNum);
    nextQuestion.classList.remove('hidden');

    if (currQuestionNum === 6) {
        conBtn.classList.add('hidden')
        submitBtn.classList.remove('hidden')
    } else {
        conBtn.classList.remove('hidden')
        submitBtn.classList.add('hidden')
    }

    if (currQuestionNum > 1) {
        prevBtn.classList.remove('hidden')
    } else {
        prevBtn.classList.add('hidden')
    }
}

// To move to the next question.
function nextQuestion() {
    if (currQuestionNum <= 6) {
        showQuestion(currQuestionNum + 1);
    }
}

// To go to the previous question. 
function prevQuestion() {
    if (currQuestionNum >= 1) {
        showQuestion(currQuestionNum - 1);
    }
}

// To go to the question if the input value is valid. 
const conBtn = document.getElementById('conBtn')
conBtn.addEventListener('click', function inputCheck() {
    let hasError = false;
    switch (currQuestionNum) {
        case 1:
            let fullName = document.getElementById('fullName');
            let errorMsgQ1 = document.getElementById('errorMsgQ1')
            if (hasError = fullName.value === '') {
                errorMsgQ1.classList.remove('hidden')
                errorMsgQ1.classList.add('error')
            } else {
                errorMsgQ1.classList.add('hidden')
                errorMsgQ1.classList.remove('error')
            }
            break;
        case 2:
            let loanAmount = document.getElementById('loanAmount');
            let errorMsgQ2 = document.getElementById('errorMsgQ2')
            loanAmount.addEventListener('invalid', function (e) {
                if (e.target.validity.rangeOverflow) {
                    errorMsgQ2.classList.remove('hidden')
                    errorMsgQ2.classList.add('error')
                }
            })
            hasError = loanAmount.value === '' || loanAmount.value > 20000;
            if (!hasError) {
                errorMsgQ2.classList.add('hidden')
                errorMsgQ2.classList.remove('error')
            }
            break
        case 3:
            break
        case 4:
            let loanReason = document.getElementById('loanReason');
            let errorMsgQ4 = document.getElementById('errorMsgQ4')

            if (hasError = loanReason.value === '' || loanReason.value.length < 3 || loanReason.value.length > 2000) {
                errorMsgQ4.classList.remove('hidden')
                errorMsgQ4.classList.add('error')
            } else {
                errorMsgQ4.classList.add('hidden')
                errorMsgQ4.classList.remove('error')
            }
            break
        case 5:
            let radioButtons = document.getElementsByClassName('radio');
            let errorMsgQ5 = document.getElementById('errorMsgQ5')
            let radioValue = false;
            for (let radioButton of radioButtons) {
                if (radioButton.checked) {
                    radioValue = true;
                    errorMsgQ5.classList.add('hidden')
                    errorMsgQ5.classList.remove('error')
                }
            }
            hasError = !radioValue
            if (hasError) {
                errorMsgQ5.classList.remove('hidden')
                errorMsgQ5.classList.add('error')
            }
        default:
            console.log('Error')
    }
    if (!hasError) {
        showQuestion(currQuestionNum + 1)
    }
})

// To go back a question.
const prevBtn = document.getElementById('prevBtn')
prevBtn.addEventListener('click', () => prevQuestion(currQuestionNum - 1))

// To retrieve form data.
function retrieveFormInfo() {
    function retrieveFullName() {
        let fullName = document.getElementById('fullName');
        return fullName.value
    }

    function retrieveLoanAmount() {
        let loanAmount = document.getElementById('loanAmount');
        return parseInt(loanAmount.value)
    }

    function loanTermCheck() {
        let loanTerm = document.getElementById('loanTerm');
        return loanTerm.value;
    }

    function loanReasonCheck() {
        let loanReason = document.getElementById('loanReason');
        return loanReason.value
    }

    function loanCommitCheck() {
        let radioButtons = document.getElementsByClassName('radio');
        for (let radioButton of radioButtons) {
            if (radioButton.checked) {
                return true;
            }
        }
        return false;
    }

    function parseCommitValue() {
        let loanCommitValue = loanCommitCheck();
        if (loanCommitValue) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    // Assigning all retrieved values to variables. 
    let fullName = retrieveFullName();
    let loanAmount = retrieveLoanAmount();
    let loanTerm = loanTermCheck();
    let loanReason = loanReasonCheck();
    let loanCommit = parseCommitValue()

    let listFullname = document.getElementById('listFullname');
    let listLoanAmount = document.getElementById('listLoanAmount');
    let listLoanTerm = document.getElementById('listLoanTerm');
    let listLoanReason = document.getElementById('listLoanReason');
    let listLoanCommitment = document.getElementById('listLoanCommitment');

    listFullname.innerText = `Full name: ${fullName}`;
    listLoanAmount.innerText = `Loan amount: €${loanAmount}`;
    listLoanTerm.innerText = `Loan term: ${loanTerm}`;
    listLoanReason.innerText = `Loan reason: ${loanReason}`;
    listLoanCommitment.innerText = `Other commitments: ${loanCommit}`;
}

// Submit the form, retrieve and show data.
const submitBtn = document.getElementById('submit')
const form = document.getElementById('form');

submitBtn.addEventListener('click', tocCheck)

// Function to check if the use has agree to Terms and Conditions (TOC)
function tocCheck() {
    let checkbox = document.getElementById('toc');
    let errorMsgQ6 = document.getElementById('errorMsgQ6')
    if (checkbox.checked) {
        errorMsgQ6.classList.add('hidden')
        errorMsgQ6.classList.remove('error')
    } else {
        errorMsgQ6.classList.remove('hidden')
        errorMsgQ6.classList.add('error')
    }
}

form.addEventListener('submit', formSubmit);

function formSubmit(e) {
    e.preventDefault();
    retrieveFormInfo();
    survey.classList.add('hidden');
    summary.classList.remove('hidden');
}

const resetBtn = document.getElementById('reset')
resetBtn.addEventListener('click', () => {
    window.location.reload();
})

