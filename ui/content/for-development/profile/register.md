---
title: Register
hed: Register
slug: register
---
<form action="/profile/register/" method="post"> <input type="hidden" name="csrfmiddlewaretoken" value="F8oh7DwuAcIOIhrx2IcHiZl0avFjhHcKPZwcv11TlzBlQyy0qoseawZbQ5PsV0CR"> <div id="div_id_email" class="form-group"> <label for="id_email" class="control-label  requiredField">
                Email<span class="asteriskField">*</span> </label> <div class="controls "> <input type="email" name="email" required="" class="emailinput form-control" id="id_email"> </div> </div> <div id="div_id_password" class="form-group"> <label for="id_password" class="control-label  requiredField">
                Password<span class="asteriskField">*</span> </label> <div class="controls "> <input type="password" name="password" minlength="6" required="" class="textinput textInput form-control" id="id_password"> </div> </div> <div id="div_id_password_again" class="form-group"> <label for="id_password_again" class="control-label  requiredField">
                Password again<span class="asteriskField">*</span> </label> <div class="controls "> <input type="password" name="password_again" minlength="6" required="" class="textinput textInput form-control" id="id_password_again"> </div> </div> <div id="div_id_first_name" class="form-group"> <label for="id_first_name" class="control-label  requiredField">
                First name<span class="asteriskField">*</span> </label> <div class="controls "> <input type="text" name="first_name" id="id_first_name" minlength="2" required="" class="textinput textInput form-control" maxlength="100"> </div> </div> <div id="div_id_last_name" class="form-group"> <label for="id_last_name" class="control-label  requiredField">
                Last name<span class="asteriskField">*</span> </label> <div class="controls "> <input type="text" name="last_name" id="id_last_name" minlength="2" required="" class="textinput textInput form-control" maxlength="100"> </div> </div> <div id="div_id_organisation" class="form-group"> <label for="id_organisation" class="control-label  requiredField">
                Organisation<span class="asteriskField">*</span> </label> <div class="controls "> <input type="text" name="organisation" id="id_organisation" required="" class="textinput textInput form-control" maxlength="100"> </div> </div> <div id="div_id_role" class="form-group"> <label for="id_role" class="control-label ">
                Role
            </label> <div class="controls "> <select name="role" class="select form-control" id="id_role"> <option value="0">--</option> <option value="57">Clinical Officer</option> <option value="728">Community</option> <option value="13">Community Health Worker</option> <option value="58">Doctor</option> <option value="16">Midwife</option> <option value="55">Nurse</option> <option value="56">Pharmacist</option> <option value="65">Student</option> <option value="66">Trainer</option> <option value="18">Volunteer Community Health Worker</option>

</select> <p id="hint_id_role" class="help-block">Please select from the options above, or enter in the field below:</p> </div> </div> <div id="div_id_role_other" class="form-group"> <label for="id_role_other" class="control-label ">
                &nbsp;
            </label> <div class="controls "> <input type="text" name="role_other" id="id_role_other" class="textinput textInput form-control" maxlength="100"> </div> </div> <div id="div_id_age_range" class="form-group"> <label for="id_age_range" class="control-label ">
                Age Range
            </label> <div class="controls "> <select name="age_range" class="select form-control" id="id_age_range"> <option value="0">--</option> <option value="under_18">under 18</option> <option value="18_25">18-24</option> <option value="25_35">25-34</option> <option value="35_50">35-50</option> <option value="over_50">over 50</option> <option value="none">Prefer not to say</option>

</select> </div> </div> <div id="div_id_gender" class="form-group"> <label for="id_gender" class="control-label ">
                Gender
            </label> <div class="controls "> <select name="gender" class="select form-control" id="id_gender"> <option value="0">--</option> <option value="female">Female</option> <option value="male">Male</option> <option value="none">Prefer not to say</option>

</select> </div> </div> <div class="form-group"> <div id="div_id_mailing" class="checkbox"> <label for="id_mailing" class=""> <input type="checkbox" name="mailing" checked="" class="checkboxinput" id="id_mailing">
                    Subscribe to COVID-19 Digital Classroom update emails
                </label> </div> </div> <div class="form-group"> <div id="div_id_survey" class="checkbox"> <label for="id_survey" class=""> <input type="checkbox" name="survey" checked="" class="checkboxinput" id="id_survey">
                    I allow COVID-19 Digital Classroom to ask me to participate in surveys about my usage of COVID-19 Library resources
                </label> </div> </div> <div class="form-group"> <div id="div_id_terms" class="checkbox"> <label for="id_terms" class=" requiredField"> <input type="checkbox" name="terms" required="" class="checkboxinput" id="id_terms">
                    Please tick the box to confirm that you have read the <a href="/terms/" target="_blank" class="prominent">terms</a> about registering with COVID-19 Library<span class="asteriskField">*</span> </label> </div> </div> <input type="hidden" name="next" id="id_next">

<div class="form-controls"> <button class="control--primary" type="submit" onclick="ga('send', 'event', 'Registration', 'submit', '')"><span>Register</span></button>
</div> </form>
