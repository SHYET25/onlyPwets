$('#signInButton').on('click', function(e) {
    e.preventDefault(); // Prevent default button behavior

    const userEmailLog = $('#userEmailLog').val().trim();
    const userPassLog = $('#userPassLog').val().trim();

    var $submitBtn = $('#signInButton');
    var $userEmailInput = $('#userEmailLog');
    var $userPassInput = $('#userPassLog');
    let isValid = true;

    // Initialize message container
    var message = '';

    if (userEmailLog === '' && userPassLog === '') {
        // Both fields are empty
        message = 'Please enter your email address and password.';
        $userEmailInput.addClass('is-invalid');
        $userPassInput.addClass('is-invalid');
        isValid = false;
    } else if (userEmailLog === '') {
        // Only email is empty
        message = 'Please enter your email address.';
        $userEmailInput.addClass('is-invalid');
        $userPassInput.removeClass('is-invalid');
        isValid = false;
    } else if (userPassLog === '') {
        // Only password is empty
        message = 'Please enter your password.';
        $userPassInput.addClass('is-invalid');
        $userEmailInput.removeClass('is-invalid');
        isValid = false;
    } else {
        // Both fields are filled
        $userEmailInput.removeClass('is-invalid');
        $userPassInput.removeClass('is-invalid');
    }

    if (!isValid) {
        // Delay the alert to allow the browser to render the invalid feedback first
        setTimeout(function() {
            alert(message);
        }, 100); // Short delay to ensure the warning is shown first
        return; // Stop further execution if validation fails
    }

    // Disable the button and show spinner
    $submitBtn.prop('disabled', true);
    $submitBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing in...');



    $.ajax({
        type: 'POST',
        url: 'phpFile/buttonFunction/signInButton.php',
        data: {
            userEmailLog: userEmailLog,
            userPassLog: userPassLog
        },
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                alert('User logged in successfully!');
                $('#userEmailLog').val('');
                $('#userPassLog').val('');
                window.location.href = response.redirectUrl;
            } else {
                alert('Error: ' + response.message);
                $submitBtn.prop('disabled', false);
                $submitBtn.html('Sign In'); // Reset button text
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX Error:', status, error);
            alert('AJAX Error: ' + status + ' - ' + error);
            $submitBtn.prop('disabled', false);
            $submitBtn.html('Sign In'); // Reset button text
        },
        complete: function() {
            // Hide the spinner when the AJAX request is complete
            $submitBtn.html('Sign In'); // Reset button text
        }
    });
});