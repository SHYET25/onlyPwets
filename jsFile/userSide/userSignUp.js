$(document).ready(function () {
    $("#btnSign").click(function (e) {
        e.preventDefault(); // Prevent default action

        let userFname = $("#userFname").val();
        let userLname = $("#userLname").val();
        let userEmail = $("#userEmail").val();
        let countryCode = $("#countryCode").val();
        let contNumber = $("#contNumber").val();
        let userPass = $("#userPass").val();
        let userConfirmPass = $("#userConfirmPass").val();

        // Validate required fields
        if (!userFname || !userLname || !userEmail || !contNumber || !userPass || !userConfirmPass) {
            $("#responseMessage").html('<div class="alert alert-danger">All fields are required!</div>');
            return;
        }

        // Validate password match
        if (userPass !== userConfirmPass) {
            $("#responseMessage").html('<div class="alert alert-danger">Passwords do not match!</div>');
            return;
        }


        $.ajax({
            url: "phpFile/userSide/userSignUp.php",
            type: "POST",
            data: {
                userFname: userFname,
                userLname: userLname,
                userEmail: userEmail,
                userContact: countryCode + contNumber,
                userPass: userPass
            },
            success: function (response) {
                $("#responseMessage").html(response);
                setTimeout(function() {
                    // Refresh the page instead of clearing the form
                    window.location.href = 'index.html';
                }, 1000);
                
            },
            error: function () {
                $("#responseMessage").html('<div class="alert alert-danger">Something went wrong. Try again!</div>');
            }
        });
    });
});
