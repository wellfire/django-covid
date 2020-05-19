---
title: Login
hed: Log in
slug: login
---

<form action="/profile/login/" class="form-horizontal" method="post" _lpchecked="1">
    <input type="hidden" name="csrfmiddlewaretoken" value="cArsO65QHY41Yufgq3l3tsLaLzZPC3q4slYtBTp1hwPEDi9I5ZLQSGGmhxH8LeOE" />
    <div class="alert alert-block alert-danger"> <ul> <li>Invalid username or password. Please try again.</li> </ul> </div>
    <div id="div_id_username" class="form-group">
        <label for="id_username" class="control-label requiredField"> Username<span class="asteriskField">*</span> </label>
        <div class="controls">
            <input
                type="text"
                name="username"
                id="id_username"
                required=""
                class="textinput textInput form-control"
                maxlength="30"
                autocomplete="off"
            />
        </div>
    </div>
    <div id="div_id_password" class="form-group">
        <label for="id_password" class="control-label requiredField"> Password<span class="asteriskField">*</span> </label>
        <div class="controls">
            <input
                type="password"
                name="password"
                required=""
                class="textinput textInput form-control"
                id="id_password"
                autocomplete="off"
            />
            <p id="hint_id_password" class="help-block">Please note that your username and password are case-sensitive.</p>
        </div>
    </div>
    <input type="hidden" name="next" id="id_next" />
    <div class="form-controls">
    <button class="control--primary" type="submit"><span>Login</span></button><a class="control--text" href="/profile/reset/">Forgotten password?</a>
    </div>
</form>
